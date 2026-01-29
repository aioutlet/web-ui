# ============================================================================
# Azure Container Apps Deployment Script for Customer UI
# ============================================================================
# This script deploys the Customer UI to Azure Container Apps.
# Customer UI is a React SPA served by Nginx that connects to Web BFF.
# 
# PREREQUISITE: Run the infrastructure deployment script first:
#   cd infrastructure/azure/aca/scripts
#   ./deploy-infra.ps1
#
# The infrastructure script creates all shared resources:
#   - Resource Group, ACR, Container Apps Environment
#   - Service Bus, Redis, Cosmos DB, MySQL, Key Vault
#   - Dapr components (pubsub, statestore, secretstore)
# ============================================================================

#Requires -Version 5.1

param(
    [switch]$SkipConfirmation
)

$ErrorActionPreference = "Stop"

# -----------------------------------------------------------------------------
# Colors for output
# -----------------------------------------------------------------------------
function Write-Header {
    param([string]$Message)
    Write-Host "`n==============================================================================" -ForegroundColor Blue
    Write-Host $Message -ForegroundColor Blue
    Write-Host "==============================================================================`n" -ForegroundColor Blue
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
    Write-Host "ℹ $Message" -ForegroundColor Cyan
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
Write-Success "Logged into Azure"

# ============================================================================
# Configuration
# ============================================================================
Write-Header "Configuration"

# Service-specific configuration
$ServiceName = "customer-ui"
$ServiceVersion = "1.0.0"
$AppPort = 8080
$ProjectName = "xshopai"

# Get script directory and service directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ServiceDir = Split-Path -Parent $ScriptDir

# ============================================================================
# Environment Selection
# ============================================================================
Write-Host "Available Environments:" -ForegroundColor Cyan
Write-Host "   dev     - Development environment"
Write-Host "   prod    - Production environment"
Write-Host ""

$Environment = Get-UserInput -Prompt "Enter environment (dev/prod)" -Default "dev"

if ($Environment -notmatch '^(dev|prod)$') {
    Write-Error "Invalid environment: $Environment"
    Write-Host "   Valid values: dev, prod"
    exit 1
}
Write-Success "Environment: $Environment"

# ============================================================================
# Suffix Configuration
# ============================================================================
Write-Header "Infrastructure Configuration"

Write-Host "The suffix was set during infrastructure deployment." -ForegroundColor Cyan
Write-Host "You can find it by running:"
Write-Host "   az group list --query `"[?starts_with(name, 'rg-xshopai-$Environment')].{Name:name, Suffix:tags.suffix}`" -o table" -ForegroundColor Blue
Write-Host ""

$Suffix = Get-UserInput -Prompt "Enter the infrastructure suffix" -Default ""

if ([string]::IsNullOrWhiteSpace($Suffix)) {
    Write-Error "Suffix is required. Please run the infrastructure deployment first."
    exit 1
}

# Validate suffix format
if ($Suffix -notmatch '^[a-z0-9]{3,6}$') {
    Write-Error "Invalid suffix format: $Suffix"
    Write-Host "   Suffix must be 3-6 lowercase alphanumeric characters."
    exit 1
}
Write-Success "Using suffix: $Suffix"

# ============================================================================
# Derive Resource Names from Infrastructure
# ============================================================================
# These names must match what was created by deploy-infra.ps1
$ResourceGroup = "rg-${ProjectName}-${Environment}-${Suffix}"
$AcrName = "${ProjectName}${Environment}${Suffix}"
$ContainerEnv = "cae-${ProjectName}-${Environment}-${Suffix}"
$KeyVault = "kv-${ProjectName}-${Environment}-${Suffix}"
$ManagedIdentity = "id-${ProjectName}-${Environment}-${Suffix}"

Write-Info "Derived resource names:"
Write-Host "   Resource Group:      $ResourceGroup"
Write-Host "   Container Registry:  $AcrName"
Write-Host "   Container Env:       $ContainerEnv"
Write-Host "   Key Vault:           $KeyVault"
Write-Host ""

# ============================================================================
# Verify Infrastructure Exists
# ============================================================================
Write-Header "Verifying Infrastructure"

# Check Resource Group
$rgExists = az group show --name $ResourceGroup 2>$null
if (-not $rgExists) {
    Write-Error "Resource group '$ResourceGroup' does not exist."
    Write-Host ""
    Write-Host "Please run the infrastructure deployment first:"
    Write-Host "   cd infrastructure/azure/aca/scripts" -ForegroundColor Blue
    Write-Host "   ./deploy-infra.ps1" -ForegroundColor Blue
    exit 1
}
Write-Success "Resource Group exists: $ResourceGroup"

# Check ACR
$acrExists = az acr show --name $AcrName 2>$null
if (-not $acrExists) {
    Write-Error "Container Registry '$AcrName' does not exist."
    exit 1
}
$AcrLoginServer = (az acr show --name $AcrName --query loginServer -o tsv)
Write-Success "Container Registry exists: $AcrLoginServer"

# Check Container Apps Environment
$envExists = az containerapp env show --name $ContainerEnv --resource-group $ResourceGroup 2>$null
if (-not $envExists) {
    Write-Error "Container Apps Environment '$ContainerEnv' does not exist."
    exit 1
}
Write-Success "Container Apps Environment exists: $ContainerEnv"

# Get Managed Identity ID
$IdentityId = az identity show --name $ManagedIdentity --resource-group $ResourceGroup --query id -o tsv 2>$null
if (-not $IdentityId) {
    Write-Warning "Managed Identity not found, will deploy without it"
}
else {
    Write-Success "Managed Identity exists: $ManagedIdentity"
}

# ============================================================================
# Web BFF URL Detection
# ============================================================================
Write-Header "Web BFF Configuration"

Write-Info "Customer UI connects to Web BFF at runtime via Nginx proxy"
$existingBffUrl = az containerapp show --name web-bff --resource-group $ResourceGroup --query "properties.configuration.ingress.fqdn" --output tsv 2>$null
if ($existingBffUrl) {
    $WebBffUrl = "https://$existingBffUrl"
    Write-Success "Found existing Web BFF: $WebBffUrl"
}
else {
    Write-Warning "Web BFF not found in resource group."
    Write-Host ""
    $WebBffUrl = Get-UserInput -Prompt "Enter Web BFF URL (or leave empty for default)" -Default ""
    if ([string]::IsNullOrWhiteSpace($WebBffUrl)) {
        $WebBffUrl = "http://localhost:3100"
        Write-Warning "Using default URL (update after deploying Web BFF): $WebBffUrl"
    }
}

# ============================================================================
# Confirmation
# ============================================================================
Write-Header "Deployment Configuration Summary"

Write-Host "Environment:          " -NoNewline; Write-Host $Environment -ForegroundColor Cyan
Write-Host "Suffix:               " -NoNewline; Write-Host $Suffix -ForegroundColor Cyan
Write-Host "Resource Group:       " -NoNewline; Write-Host $ResourceGroup -ForegroundColor Cyan
Write-Host "Container Registry:   " -NoNewline; Write-Host $AcrLoginServer -ForegroundColor Cyan
Write-Host "Container Env:        " -NoNewline; Write-Host $ContainerEnv -ForegroundColor Cyan
Write-Host ""
Write-Host "Service Configuration:" -ForegroundColor Cyan
Write-Host "   Service Name:      $ServiceName"
Write-Host "   Service Version:   $ServiceVersion"
Write-Host "   App Port:          $AppPort"
Write-Host "   Web BFF URL:       $WebBffUrl"
Write-Host ""

if (-not $SkipConfirmation) {
    $confirm = Read-Host "Do you want to proceed with deployment? (y/N)"
    if ($confirm -notmatch '^[Yy]$') {
        Write-Warning "Deployment cancelled by user"
        exit 0
    }
}

# ============================================================================
# Step 1: Build and Push Container Image
# ============================================================================
Write-Header "Step 1: Building and Pushing Container Image"

# Login to ACR
Write-Info "Logging into ACR..."
az acr login --name $AcrName
Write-Success "Logged into ACR"

# Navigate to service directory
Push-Location $ServiceDir

try {
    # Build Docker image (using production target)
    Write-Info "Building Docker image..."
    docker build --target production -t "${ServiceName}:latest" .
    
    if ($LASTEXITCODE -ne 0) {
        throw "Docker build failed"
    }
    Write-Success "Docker image built"

    # Tag and push
    $ImageTag = "$AcrLoginServer/${ServiceName}:latest"
    docker tag "${ServiceName}:latest" $ImageTag
    Write-Info "Pushing image to ACR..."
    docker push $ImageTag
    
    if ($LASTEXITCODE -ne 0) {
        throw "Docker push failed"
    }
    Write-Success "Image pushed: $ImageTag"
}
finally {
    Pop-Location
}

# ============================================================================
# Step 2: Deploy Container App
# ============================================================================
Write-Header "Step 2: Deploying Container App"

# Get ACR credentials
$AcrPassword = (az acr credential show --name $AcrName --query "passwords[0].value" -o tsv)

# Check if container app exists
$appExists = az containerapp show --name $ServiceName --resource-group $ResourceGroup 2>$null

if ($appExists) {
    Write-Info "Container app '$ServiceName' exists, updating..."
    az containerapp update `
        --name $ServiceName `
        --resource-group $ResourceGroup `
        --image $ImageTag `
        --set-env-vars "BFF_URL=$WebBffUrl" `
        --output none
    Write-Success "Container app updated"
}
else {
    Write-Info "Creating container app '$ServiceName'..."
    
    $createArgs = @(
        "--name", $ServiceName,
        "--resource-group", $ResourceGroup,
        "--environment", $ContainerEnv,
        "--image", $ImageTag,
        "--registry-server", $AcrLoginServer,
        "--registry-username", $AcrName,
        "--registry-password", $AcrPassword,
        "--target-port", $AppPort,
        "--ingress", "external",
        "--min-replicas", "1",
        "--max-replicas", "5",
        "--cpu", "0.25",
        "--memory", "0.5Gi",
        "--env-vars", "BFF_URL=$WebBffUrl",
        "--output", "none"
    )
    
    if ($IdentityId) {
        $createArgs += "--user-assigned"
        $createArgs += $IdentityId
    }
    
    az containerapp create @createArgs
    Write-Success "Container app created"
}

# ============================================================================
# Step 3: Verify Deployment
# ============================================================================
Write-Header "Step 3: Verifying Deployment"

$AppUrl = (az containerapp show `
    --name $ServiceName `
    --resource-group $ResourceGroup `
    --query properties.configuration.ingress.fqdn `
    -o tsv)

Write-Success "Deployment completed!"
Write-Host ""
Write-Info "Application URL: https://$AppUrl"
Write-Host ""

# Test health endpoint
Write-Info "Waiting for app to start (30s)..."
Start-Sleep -Seconds 30

Write-Info "Testing health endpoint..."
try {
    $response = Invoke-WebRequest -Uri "https://$AppUrl" -UseBasicParsing -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Write-Success "Health check passed! (HTTP $($response.StatusCode))"
    }
}
catch {
    Write-Warning "Health check failed. The app may still be starting."
}

# ============================================================================
# Summary
# ============================================================================
Write-Header "Deployment Summary"

Write-Host "==============================================================================" -ForegroundColor Green
Write-Host "   ✅ $ServiceName DEPLOYED SUCCESSFULLY" -ForegroundColor Green
Write-Host "==============================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Application:" -ForegroundColor Cyan
Write-Host "   URL:              https://$AppUrl"
Write-Host ""
Write-Host "Infrastructure:" -ForegroundColor Cyan
Write-Host "   Resource Group:   $ResourceGroup"
Write-Host "   Environment:      $ContainerEnv"
Write-Host "   Registry:         $AcrLoginServer"
Write-Host ""
Write-Host "Configuration:" -ForegroundColor Cyan
Write-Host "   Web BFF URL:      $WebBffUrl"
Write-Host ""
Write-Host "Useful Commands:" -ForegroundColor Cyan
Write-Host "   View logs:        " -NoNewline; Write-Host "az containerapp logs show --name $ServiceName --resource-group $ResourceGroup --follow" -ForegroundColor Blue
Write-Host "   Update BFF URL:   " -NoNewline; Write-Host "az containerapp update --name $ServiceName --resource-group $ResourceGroup --set-env-vars `"BFF_URL=https://new-bff-url`"" -ForegroundColor Blue
Write-Host "   Delete app:       " -NoNewline; Write-Host "az containerapp delete --name $ServiceName --resource-group $ResourceGroup --yes" -ForegroundColor Blue
Write-Host ""
Write-Host "Test the deployment:" -ForegroundColor Cyan
Write-Host "   curl https://$AppUrl"
Write-Host "   # Then open in browser: https://$AppUrl"
Write-Host ""
Write-Warning "Note: Ensure Web BFF is deployed for full functionality."
Write-Host ""
