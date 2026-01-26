#!/bin/bash

# ============================================================================
# Azure Container Apps Deployment Script for Customer UI
# ============================================================================
# This script automates the deployment of Customer UI to Azure Container Apps.
# Customer UI is a React SPA served by Nginx that connects to Web BFF.
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Print functions
print_header() {
    echo -e "\n${CYAN}============================================================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}============================================================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Prompt functions
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local var_name="$3"
    
    if [ -n "$default" ]; then
        read -p "$prompt [$default]: " value
        value="${value:-$default}"
    else
        read -p "$prompt: " value
    fi
    
    eval "$var_name='$value'"
}

# ============================================================================
# Prerequisites Check
# ============================================================================
print_header "Checking Prerequisites"

# Check Azure CLI
if ! command -v az &> /dev/null; then
    print_error "Azure CLI is not installed. Please install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi
print_success "Azure CLI is installed"

# Check Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi
print_success "Docker is installed"

# Check if logged into Azure
if ! az account show &> /dev/null; then
    print_warning "Not logged into Azure. Initiating login..."
    az login
fi
AZURE_USER=$(az account show --query user.name --output tsv)
print_success "Logged into Azure as: $AZURE_USER"

# ============================================================================
# User Input Collection
# ============================================================================
print_header "Azure Configuration"

# List available subscriptions
echo -e "\n${BLUE}Available Azure Subscriptions:${NC}"
az account list --query "[].{Name:name, SubscriptionId:id, IsDefault:isDefault}" --output table

echo ""
prompt_with_default "Enter Azure Subscription ID (leave empty for default)" "" SUBSCRIPTION_ID

if [ -n "$SUBSCRIPTION_ID" ]; then
    az account set --subscription "$SUBSCRIPTION_ID"
    print_success "Subscription set to: $SUBSCRIPTION_ID"
else
    SUBSCRIPTION_ID=$(az account show --query id --output tsv)
    print_info "Using default subscription: $SUBSCRIPTION_ID"
fi

# Resource Group
echo ""
prompt_with_default "Enter Resource Group name" "rg-xshopai-aca" RESOURCE_GROUP

# Location
echo ""
echo -e "${BLUE}Common Azure Locations:${NC}"
echo "  - swedencentral (Sweden Central)"
echo "  - eastus (East US)"
echo "  - westus2 (West US 2)"
echo "  - westeurope (West Europe)"
echo "  - northeurope (North Europe)"
prompt_with_default "Enter Azure Location" "swedencentral" LOCATION

# Azure Container Registry
echo ""
prompt_with_default "Enter Azure Container Registry name (must be globally unique)" "acrxshopaiaca" ACR_NAME

# Container Apps Environment
echo ""
prompt_with_default "Enter Container Apps Environment name" "cae-xshopai-aca" ENVIRONMENT_NAME

# Web BFF URL
echo ""
print_info "Customer UI needs to know the Web BFF URL at build time"
EXISTING_BFF_URL=$(az containerapp show --name web-bff --resource-group "$RESOURCE_GROUP" --query "properties.configuration.ingress.fqdn" --output tsv 2>/dev/null || echo "")
if [ -n "$EXISTING_BFF_URL" ]; then
    DEFAULT_BFF_URL="https://$EXISTING_BFF_URL"
    print_success "Found existing Web BFF: $DEFAULT_BFF_URL"
else
    DEFAULT_BFF_URL="https://web-bff.salmonwater-195e7cf1.swedencentral.azurecontainerapps.io"
    print_warning "Web BFF not found in resource group. Using default URL."
fi
prompt_with_default "Enter Web BFF URL" "$DEFAULT_BFF_URL" WEB_BFF_URL

# App name
APP_NAME="customer-ui"

# ============================================================================
# Confirmation
# ============================================================================
print_header "Deployment Configuration Summary"

echo "Resource Group:           $RESOURCE_GROUP"
echo "Location:                 $LOCATION"
echo "Container Registry:       $ACR_NAME"
echo "Environment:              $ENVIRONMENT_NAME"
echo "Web BFF URL:              $WEB_BFF_URL"
echo "App Name:                 $APP_NAME"
echo ""

read -p "Do you want to proceed with deployment? (y/N): " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    print_warning "Deployment cancelled by user"
    exit 0
fi

# ============================================================================
# Step 1: Create Resource Group (if needed)
# ============================================================================
print_header "Step 1: Verifying Resource Group"

if az group exists --name "$RESOURCE_GROUP" | grep -q "true"; then
    print_info "Resource group '$RESOURCE_GROUP' already exists"
else
    az group create \
        --name "$RESOURCE_GROUP" \
        --location "$LOCATION" \
        --output none
    print_success "Resource group '$RESOURCE_GROUP' created"
fi

# ============================================================================
# Step 2: Verify Azure Container Registry
# ============================================================================
print_header "Step 2: Verifying Azure Container Registry"

if az acr show --name "$ACR_NAME" &> /dev/null; then
    print_info "ACR '$ACR_NAME' already exists"
else
    az acr create \
        --resource-group "$RESOURCE_GROUP" \
        --name "$ACR_NAME" \
        --sku Basic \
        --admin-enabled true \
        --output none
    print_success "ACR '$ACR_NAME' created"
fi

ACR_LOGIN_SERVER=$(az acr show --name "$ACR_NAME" --query loginServer --output tsv)
print_info "ACR Login Server: $ACR_LOGIN_SERVER"

# ============================================================================
# Step 3: Build and Push Container Image
# ============================================================================
print_header "Step 3: Building and Pushing Container Image"

# Login to ACR
az acr login --name "$ACR_NAME"
print_success "Logged into ACR"

# Navigate to service directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_DIR="$(dirname "$SCRIPT_DIR")"

print_info "Building from: $SERVICE_DIR"
cd "$SERVICE_DIR"

# Build image with BFF URL
IMAGE_TAG="${ACR_LOGIN_SERVER}/${APP_NAME}:latest"
print_info "Building image: $IMAGE_TAG"
print_info "REACT_APP_BFF_URL: $WEB_BFF_URL"

docker build \
    --build-arg REACT_APP_BFF_URL="$WEB_BFF_URL" \
    -t "$IMAGE_TAG" \
    .

print_success "Docker image built successfully"

# Push image
print_info "Pushing image to ACR..."
docker push "$IMAGE_TAG"
print_success "Docker image pushed to ACR"

# ============================================================================
# Step 4: Verify Container Apps Environment
# ============================================================================
print_header "Step 4: Verifying Container Apps Environment"

if az containerapp env show --name "$ENVIRONMENT_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
    print_info "Container Apps Environment '$ENVIRONMENT_NAME' already exists"
else
    print_error "Container Apps Environment '$ENVIRONMENT_NAME' does not exist."
    print_error "Please deploy Web BFF or another service first to create the environment."
    exit 1
fi

# ============================================================================
# Step 5: Deploy Container App
# ============================================================================
print_header "Step 5: Deploying Customer UI Container App"

# Check if app already exists
if az containerapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
    print_info "Container app '$APP_NAME' already exists. Updating..."
    
    az containerapp update \
        --name "$APP_NAME" \
        --resource-group "$RESOURCE_GROUP" \
        --image "$IMAGE_TAG" \
        --set-env-vars "BFF_URL=$WEB_BFF_URL" \
        --output none
    
    print_success "Container app updated"
else
    print_info "Creating new container app '$APP_NAME'..."
    
    az containerapp create \
        --name "$APP_NAME" \
        --resource-group "$RESOURCE_GROUP" \
        --environment "$ENVIRONMENT_NAME" \
        --image "$IMAGE_TAG" \
        --registry-server "$ACR_LOGIN_SERVER" \
        --target-port 8080 \
        --ingress external \
        --min-replicas 1 \
        --max-replicas 3 \
        --cpu 0.25 \
        --memory 0.5Gi \
        --env-vars "BFF_URL=$WEB_BFF_URL" \
        --output none
    
    print_success "Container app created"
fi

# ============================================================================
# Step 6: Configure Scaling
# ============================================================================
print_header "Step 6: Configuring Auto-Scaling"

az containerapp update \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --min-replicas 1 \
    --max-replicas 5 \
    --output none

print_success "Auto-scaling configured (1-5 replicas)"

# ============================================================================
# Step 7: Verify Deployment
# ============================================================================
print_header "Step 7: Verifying Deployment"

APP_URL=$(az containerapp show \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --query "properties.configuration.ingress.fqdn" \
    --output tsv)

print_info "Waiting for app to start..."
sleep 15

# Test health endpoint
if curl -s -f "https://$APP_URL/health" > /dev/null 2>&1; then
    print_success "Health check passed"
else
    print_warning "Health check failed, but app may still be starting..."
fi

# ============================================================================
# Deployment Summary
# ============================================================================
print_header "Deployment Complete!"

echo -e "${GREEN}Customer UI has been deployed successfully!${NC}\n"

echo -e "${YELLOW}Application URL:${NC}"
echo "  https://$APP_URL"
echo ""

echo -e "${YELLOW}Health Check:${NC}"
echo "  https://$APP_URL/health"
echo ""

echo -e "${YELLOW}Web BFF URL (runtime environment variable):${NC}"
echo "  $WEB_BFF_URL"
echo ""

echo -e "${YELLOW}Update BFF URL if needed:${NC}"
echo "  az containerapp update --name $APP_NAME --resource-group $RESOURCE_GROUP --set-env-vars \"BFF_URL=https://new-bff-url\""
echo ""

echo -e "${YELLOW}Useful Commands:${NC}"
echo "  # View logs"
echo "  az containerapp logs show --name $APP_NAME --resource-group $RESOURCE_GROUP --type console --follow"
echo ""
echo "  # View app details"
echo "  az containerapp show --name $APP_NAME --resource-group $RESOURCE_GROUP"
echo ""
echo "  # Update image"
echo "  az containerapp update --name $APP_NAME --resource-group $RESOURCE_GROUP --image ${ACR_LOGIN_SERVER}/${APP_NAME}:v2"
echo ""

echo -e "\n${CYAN}Test the deployment:${NC}"
echo "  curl https://$APP_URL/health"
echo "  # Then open in browser: https://$APP_URL"
