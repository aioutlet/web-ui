# ============================================================================
# Azure Container Apps Deployment Script for Customer UI
# ============================================================================
# This script automates the deployment of Customer UI to Azure Container Apps.
# Customer UI is a React SPA served by Nginx that connects to Web BFF.
# ============================================================================

#Requires -Version 5.1

param(
    [switch]$SkipConfirmation
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Header {
    param([string]$Message)
    Write-Host "`n============================================================================" -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Cyan
    Write-Host "============================================================================`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

function Get-UserInput {
    param(
        [string]$Prompt,
        [string]$Default
    )
    
    if ($Default) {
        $input = Read-Host "$Prompt [$Default]"
        if ([string]::IsNullOrWhiteSpace($input)) {
            return $Default
        }
        return $input
    }
    else {
        return Read-Host $Prompt
    }
}

# ============================================================================
# Prerequisites Check
# ============================================================================
Write-Header "Checking Prerequisites"

# Check Azure CLI
try {
    $null = az --version
    Write-Success "Azure CLI is installed"
}
catch {
    Write-Error "Azure CLI is not installed. Please install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
}

# Check Docker
try {
    $null = docker --version
    Write-Success "Docker is installed"
}
catch {
    Write-Error "Docker is not installed. Please install Docker first."
    exit 1
}

# Check if logged into Azure
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Warning "Not logged into Azure. Initiating login..."
    az login
    $account = az account show | ConvertFrom-Json
}
Write-Success "Logged into Azure as: $($account.user.name)"

# ============================================================================
# User Input Collection
# ============================================================================
Write-Header "Azure Configuration"

# List available subscriptions
Write-Host "`nAvailable Azure Subscriptions:" -ForegroundColor Blue
az account list --query "[].{Name:name, SubscriptionId:id, IsDefault:isDefault}" --output table

Write-Host ""
$SubscriptionId = Get-UserInput -Prompt "Enter Azure Subscription ID (leave empty for default)" -Default ""

if ($SubscriptionId) {
    az account set --subscription $SubscriptionId
    Write-Success "Subscription set to: $SubscriptionId"
}
else {
    $SubscriptionId = (az account show --query id --output tsv)
    Write-Info "Using default subscription: $SubscriptionId"
}

# Resource Group
Write-Host ""
$ResourceGroup = Get-UserInput -Prompt "Enter Resource Group name" -Default "rg-xshopai-aca"

# Location
Write-Host ""
Write-Host "Common Azure Locations:" -ForegroundColor Blue
Write-Host "  - swedencentral (Sweden Central)"
Write-Host "  - eastus (East US)"
Write-Host "  - westus2 (West US 2)"
Write-Host "  - westeurope (West Europe)"
Write-Host "  - northeurope (North Europe)"
$Location = Get-UserInput -Prompt "Enter Azure Location" -Default "swedencentral"

# Azure Container Registry
Write-Host ""
$AcrName = Get-UserInput -Prompt "Enter Azure Container Registry name (must be globally unique)" -Default "acrxshopaiaca"

# Container Apps Environment
Write-Host ""
$EnvironmentName = Get-UserInput -Prompt "Enter Container Apps Environment name" -Default "cae-xshopai-aca"

# Web BFF URL
Write-Host ""
Write-Info "Customer UI needs to know the Web BFF URL at build time"
$existingBffUrl = az containerapp show --name web-bff --resource-group $ResourceGroup --query "properties.configuration.ingress.fqdn" --output tsv 2>$null
if ($existingBffUrl) {
    $defaultBffUrl = "https://$existingBffUrl"
    Write-Success "Found existing Web BFF: $defaultBffUrl"
}
else {
    $defaultBffUrl = "https://web-bff.salmonwater-195e7cf1.swedencentral.azurecontainerapps.io"
    Write-Warning "Web BFF not found in resource group. Using default URL."
}
$WebBffUrl = Get-UserInput -Prompt "Enter Web BFF URL" -Default $defaultBffUrl

# App name
$AppName = "customer-ui"

# ============================================================================
# Confirmation
# ============================================================================
Write-Header "Deployment Configuration Summary"

Write-Host "Resource Group:           $ResourceGroup"
Write-Host "Location:                 $Location"
Write-Host "Container Registry:       $AcrName"
Write-Host "Environment:              $EnvironmentName"
Write-Host "Web BFF URL:              $WebBffUrl"
Write-Host "App Name:                 $AppName"
Write-Host ""

if (-not $SkipConfirmation) {
    $confirm = Read-Host "Do you want to proceed with deployment? (y/N)"
    if ($confirm -notmatch '^[Yy]$') {
        Write-Warning "Deployment cancelled by user"
        exit 0
    }
}

# ============================================================================
# Step 1: Create Resource Group (if needed)
# ============================================================================
Write-Header "Step 1: Verifying Resource Group"

$rgExists = az group exists --name $ResourceGroup
if ($rgExists -eq "true") {
    Write-Info "Resource group '$ResourceGroup' already exists"
}
else {
    az group create `
        --name $ResourceGroup `
        --location $Location `
        --output none
    Write-Success "Resource group '$ResourceGroup' created"
}

# ============================================================================
# Step 2: Verify Azure Container Registry
# ============================================================================
Write-Header "Step 2: Verifying Azure Container Registry"

$acrExists = az acr show --name $AcrName 2>$null
if ($acrExists) {
    Write-Info "ACR '$AcrName' already exists"
}
else {
    az acr create `
        --resource-group $ResourceGroup `
        --name $AcrName `
        --sku Basic `
        --admin-enabled true `
        --output none
    Write-Success "ACR '$AcrName' created"
}

$AcrLoginServer = (az acr show --name $AcrName --query loginServer --output tsv)
Write-Info "ACR Login Server: $AcrLoginServer"

# ============================================================================
# Step 3: Build and Push Container Image
# ============================================================================
Write-Header "Step 3: Building and Pushing Container Image"

# Login to ACR
az acr login --name $AcrName
Write-Success "Logged into ACR"

# Navigate to service directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ServiceDir = Split-Path -Parent $ScriptDir

Write-Info "Building from: $ServiceDir"
Push-Location $ServiceDir

try {
    # Build image with BFF URL
    $ImageTag = "${AcrLoginServer}/${AppName}:latest"
    Write-Info "Building image: $ImageTag"
    Write-Info "REACT_APP_BFF_URL: $WebBffUrl"
    
    docker build `
        --build-arg REACT_APP_BFF_URL=$WebBffUrl `
        -t $ImageTag `
        .
    
    if ($LASTEXITCODE -ne 0) {
        throw "Docker build failed"
    }
    Write-Success "Docker image built successfully"

    # Push image
    Write-Info "Pushing image to ACR..."
    docker push $ImageTag
    
    if ($LASTEXITCODE -ne 0) {
        throw "Docker push failed"
    }
    Write-Success "Docker image pushed to ACR"
}
finally {
    Pop-Location
}

# ============================================================================
# Step 4: Verify Container Apps Environment
# ============================================================================
Write-Header "Step 4: Verifying Container Apps Environment"

$envExists = az containerapp env show --name $EnvironmentName --resource-group $ResourceGroup 2>$null
if ($envExists) {
    Write-Info "Container Apps Environment '$EnvironmentName' already exists"
}
else {
    Write-Error "Container Apps Environment '$EnvironmentName' does not exist."
    Write-Error "Please deploy Web BFF or another service first to create the environment."
    exit 1
}

# ============================================================================
# Step 5: Deploy Container App
# ============================================================================
Write-Header "Step 5: Deploying Customer UI Container App"

# Check if app already exists
$appExists = az containerapp show --name $AppName --resource-group $ResourceGroup 2>$null

if ($appExists) {
    Write-Info "Container app '$AppName' already exists. Updating..."
    
    az containerapp update `
        --name $AppName `
        --resource-group $ResourceGroup `
        --image $ImageTag `
        --set-env-vars "BFF_URL=$WebBffUrl" `
        --output none
    
    Write-Success "Container app updated"
}
else {
    Write-Info "Creating new container app '$AppName'..."
    
    az containerapp create `
        --name $AppName `
        --resource-group $ResourceGroup `
        --environment $EnvironmentName `
        --image $ImageTag `
        --registry-server $AcrLoginServer `
        --target-port 8080 `
        --ingress external `
        --min-replicas 1 `
        --max-replicas 3 `
        --cpu 0.25 `
        --memory 0.5Gi `
        --env-vars "BFF_URL=$WebBffUrl" `
        --output none
    
    Write-Success "Container app created"
}

# ============================================================================
# Step 6: Configure Scaling
# ============================================================================
Write-Header "Step 6: Configuring Auto-Scaling"

az containerapp update `
    --name $AppName `
    --resource-group $ResourceGroup `
    --min-replicas 1 `
    --max-replicas 5 `
    --output none

Write-Success "Auto-scaling configured (1-5 replicas)"

# ============================================================================
# Step 7: Verify Deployment
# ============================================================================
Write-Header "Step 7: Verifying Deployment"

$AppUrl = (az containerapp show `
    --name $AppName `
    --resource-group $ResourceGroup `
    --query "properties.configuration.ingress.fqdn" `
    --output tsv)

Write-Info "Waiting for app to start..."
Start-Sleep -Seconds 15

# Test health endpoint
try {
    $response = Invoke-WebRequest -Uri "https://$AppUrl/health" -UseBasicParsing -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Write-Success "Health check passed"
    }
}
catch {
    Write-Warning "Health check failed, but app may still be starting..."
}

# ============================================================================
# Deployment Summary
# ============================================================================
Write-Header "Deployment Complete!"

Write-Host "Customer UI has been deployed successfully!`n" -ForegroundColor Green

Write-Host "Application URL:" -ForegroundColor Yellow
Write-Host "  https://$AppUrl`n"

Write-Host "Health Check:" -ForegroundColor Yellow
Write-Host "  https://$AppUrl/health`n"

Write-Host "Web BFF URL (runtime environment variable):" -ForegroundColor Yellow
Write-Host "  $WebBffUrl`n"

Write-Host "Update BFF URL if needed:" -ForegroundColor Yellow
Write-Host "  az containerapp update --name $AppName --resource-group $ResourceGroup --set-env-vars `"BFF_URL=https://new-bff-url`"`n"

Write-Host "Useful Commands:" -ForegroundColor Yellow
Write-Host "  # View logs"
Write-Host "  az containerapp logs show --name $AppName --resource-group $ResourceGroup --type console --follow`n"
Write-Host "  # View app details"
Write-Host "  az containerapp show --name $AppName --resource-group $ResourceGroup`n"
Write-Host "  # Update image"
Write-Host "  az containerapp update --name $AppName --resource-group $ResourceGroup --image ${AcrLoginServer}/${AppName}:v2`n"

Write-Host "`nTest the deployment:" -ForegroundColor Cyan
Write-Host "  curl https://$AppUrl/health"
Write-Host "  # Then open in browser: https://$AppUrl"
