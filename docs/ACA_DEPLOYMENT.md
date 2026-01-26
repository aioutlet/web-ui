# Customer UI - Azure Container Apps Deployment

This document describes how to deploy Customer UI to Azure Container Apps.

## Overview

Customer UI is deployed as a static React application served by Nginx in a Docker container. It connects to the Web BFF for all backend API calls.

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│              Azure Container Apps Environment                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────┐                      │
│  │          customer-ui                   │                      │
│  │      (Container App)                   │                      │
│  │                                        │                      │
│  │  ┌──────────────────────────────────┐  │                      │
│  │  │         Nginx (8080)             │  │                      │
│  │  │    Serves React static files     │  │                      │
│  │  └──────────────────────────────────┘  │                      │
│  │                                        │                      │
│  │  External Ingress: HTTPS              │                      │
│  │  https://customer-ui.*.azurecontainerapps.io                 │
│  └───────────────────┬────────────────────┘                      │
│                      │                                           │
│                      │ HTTPS (via browser)                       │
│                      ▼                                           │
│  ┌────────────────────────────────────────┐                      │
│  │          web-bff                       │                      │
│  │      (Container App)                   │                      │
│  │  External Ingress: HTTPS              │                      │
│  └────────────────────────────────────────┘                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Prerequisites

- Azure CLI installed and logged in
- Docker installed
- Azure subscription with appropriate permissions
- Web BFF deployed and accessible

See [PREREQUISITES.md](PREREQUISITES.md) for detailed requirements.

## Quick Deployment

### Using Deployment Scripts

The easiest way to deploy is using the provided scripts:

**PowerShell (Windows):**

```powershell
cd scripts
.\aca.ps1
```

**Bash (Linux/Mac):**

```bash
cd scripts
chmod +x aca.sh
./aca.sh
```

The scripts will:

1. Check prerequisites
2. Prompt for configuration
3. Create/verify Azure resources
4. Build and push Docker image
5. Deploy to Container Apps
6. Configure environment variables

## Manual Deployment

### Step 1: Configure Environment

```bash
# Set variables
RESOURCE_GROUP="rg-xshopai-aca"
LOCATION="swedencentral"
ACR_NAME="acrxshopaiaca"
ENVIRONMENT_NAME="cae-xshopai-aca"
APP_NAME="customer-ui"
```

### Step 2: Build Docker Image

```bash
# Navigate to customer-ui directory
cd customer-ui

# Get Web BFF URL (if already deployed)
WEB_BFF_URL=$(az containerapp show \
    --name web-bff \
    --resource-group $RESOURCE_GROUP \
    --query properties.configuration.ingress.fqdn \
    --output tsv)

# Build with BFF URL embedded
docker build \
    --build-arg REACT_APP_BFF_URL=https://$WEB_BFF_URL \
    -t $ACR_NAME.azurecr.io/$APP_NAME:latest \
    .
```

### Step 3: Push to Azure Container Registry

```bash
# Login to ACR
az acr login --name $ACR_NAME

# Push image
docker push $ACR_NAME.azurecr.io/$APP_NAME:latest
```

### Step 4: Deploy to Container Apps

```bash
# Check if app exists
APP_EXISTS=$(az containerapp show --name $APP_NAME --resource-group $RESOURCE_GROUP 2>/dev/null)

if [ -z "$APP_EXISTS" ]; then
    # Create new container app
    az containerapp create \
        --name $APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --environment $ENVIRONMENT_NAME \
        --image $ACR_NAME.azurecr.io/$APP_NAME:latest \
        --registry-server $ACR_NAME.azurecr.io \
        --target-port 8080 \
        --ingress external \
        --min-replicas 1 \
        --max-replicas 3 \
        --cpu 0.25 \
        --memory 0.5Gi
else
    # Update existing app
    az containerapp update \
        --name $APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --image $ACR_NAME.azurecr.io/$APP_NAME:latest
fi
```

### Step 5: Verify Deployment

```bash
# Get app URL
APP_URL=$(az containerapp show \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --query properties.configuration.ingress.fqdn \
    --output tsv)

echo "Customer UI deployed at: https://$APP_URL"

# Test health endpoint
curl -s https://$APP_URL/health
```

## Configuration

### Environment Variables at Runtime

The Customer UI uses nginx as a reverse proxy to forward API requests to the Web BFF. The **BFF_URL** is configured at **runtime** (not build time) as an environment variable in the container app.

**How it works:**

1. The `docker-entrypoint.sh` script uses `envsubst` to substitute the `BFF_URL` environment variable into `nginx.conf` at container startup
2. Nginx then proxies all `/api/*` requests to the configured BFF URL
3. This allows changing the BFF URL without rebuilding the Docker image

**Setting BFF_URL during deployment:**

```bash
# When creating the container app
az containerapp create \
    --name customer-ui \
    --resource-group $RESOURCE_GROUP \
    --env-vars "BFF_URL=https://web-bff.<unique-id>.azurecontainerapps.io"

# When updating an existing container app
az containerapp update \
    --name customer-ui \
    --resource-group $RESOURCE_GROUP \
    --set-env-vars "BFF_URL=https://web-bff.<unique-id>.azurecontainerapps.io"
```

### Nginx SSL Proxy Configuration

Since Web BFF in Azure Container Apps is served over HTTPS, nginx requires proper SSL configuration to proxy requests:

```nginx
location /api/ {
    # DNS resolver for dynamic upstream resolution
    resolver 8.8.8.8 8.8.4.4 valid=30s;

    # Variable forces DNS re-resolution
    set $upstream_bff "${BFF_URL}";

    proxy_pass $upstream_bff;

    # Required for Azure Container Apps HTTPS
    proxy_ssl_server_name on;      # Enable SNI for HTTPS
    proxy_ssl_protocols TLSv1.2 TLSv1.3;
    proxy_ssl_verify off;          # Skip cert verification (internal traffic)

    # Host header must match the upstream FQDN
    proxy_set_header Host web-bff.<unique-id>.swedencentral.azurecontainerapps.io;
}
```

> **Important:** The `proxy_ssl_server_name on` directive is critical for Azure Container Apps as it enables SNI (Server Name Indication), which is required when the upstream serves multiple apps on shared infrastructure.

### Build Arguments (Optional)

If you need to embed certain values at build time (e.g., for React environment variables that the app reads at startup):

```bash
docker build \
    --build-arg REACT_APP_BFF_URL=https://web-bff.*.azurecontainerapps.io \
    -t customer-ui:latest .
```

> **Note:** The build-time `REACT_APP_BFF_URL` is optional since the nginx proxy handles API routing at runtime.

### Container App Settings

| Setting      | Value    | Description                    |
| ------------ | -------- | ------------------------------ |
| Target Port  | 8080     | Nginx listens on 8080          |
| Ingress      | External | Public internet access         |
| Min Replicas | 1        | Minimum running instances      |
| Max Replicas | 3        | Maximum for auto-scaling       |
| CPU          | 0.25     | CPU allocation per instance    |
| Memory       | 0.5Gi    | Memory allocation per instance |

## Resource Scaling

### Auto-Scaling Rules

The container app is configured for HTTP-based auto-scaling:

```bash
az containerapp update \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --min-replicas 1 \
    --max-replicas 10 \
    --scale-rule-name http-scaling \
    --scale-rule-type http \
    --scale-rule-http-concurrency 100
```

### Manual Scaling

```bash
# Scale to specific replica count
az containerapp update \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --min-replicas 2 \
    --max-replicas 5
```

## Health Checks

### Nginx Health Endpoint

The Nginx configuration includes a `/health` endpoint:

```nginx
location /health {
    access_log off;
    return 200 "healthy\n";
    add_header Content-Type text/plain;
}
```

### Container Health Check

```bash
# View container health
az containerapp show \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --query properties.runningStatus
```

## Monitoring

### View Logs

```bash
# Stream logs
az containerapp logs show \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --type console \
    --follow
```

### Application Insights (Optional)

If Application Insights is configured in the environment:

```bash
# View app insights connection string
az containerapp env show \
    --name $ENVIRONMENT_NAME \
    --resource-group $RESOURCE_GROUP \
    --query properties.appInsightsConfiguration
```

## Updating the Application

### Code Updates

1. Make changes to source code
2. Build new Docker image with updated BFF URL if needed
3. Push to ACR
4. Update container app

```bash
# Build new version
docker build \
    --build-arg REACT_APP_BFF_URL=https://$WEB_BFF_URL \
    -t $ACR_NAME.azurecr.io/$APP_NAME:v2 .

# Push
docker push $ACR_NAME.azurecr.io/$APP_NAME:v2

# Update app
az containerapp update \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --image $ACR_NAME.azurecr.io/$APP_NAME:v2
```

### Rolling Updates

Container Apps performs rolling updates by default:

- New revision is created
- Traffic gradually shifts to new revision
- Old revision is deactivated after successful deployment

## Troubleshooting

### App Not Loading

1. Check container logs:

   ```bash
   az containerapp logs show --name $APP_NAME --resource-group $RESOURCE_GROUP --type console
   ```

2. Verify image exists in ACR:

   ```bash
   az acr repository show-tags --name $ACR_NAME --repository $APP_NAME
   ```

3. Check ingress configuration:
   ```bash
   az containerapp ingress show --name $APP_NAME --resource-group $RESOURCE_GROUP
   ```

### API Calls Failing (502 Bad Gateway)

1. **Verify BFF_URL environment variable is set:**

   ```bash
   az containerapp show --name customer-ui --resource-group $RESOURCE_GROUP \
       --query "properties.template.containers[0].env"
   ```

   If `BFF_URL` is missing, set it:

   ```bash
   az containerapp update --name customer-ui --resource-group $RESOURCE_GROUP \
       --set-env-vars "BFF_URL=https://web-bff.<unique-id>.azurecontainerapps.io"
   ```

2. **Check nginx logs for SSL errors:**

   ```bash
   az containerapp logs show --name customer-ui --resource-group $RESOURCE_GROUP --type console
   ```

   Common SSL errors:
   - `peer closed connection in SSL handshake` - Missing `proxy_ssl_server_name on`
   - `no resolver defined` - Missing `resolver` directive in nginx.conf

3. **Verify Web BFF is running and accessible:**

   ```bash
   curl https://web-bff.<unique-id>.azurecontainerapps.io/api/health
   ```

4. **Check nginx configuration substitution:**
   The `docker-entrypoint.sh` script should substitute `${BFF_URL}` in nginx.conf. If the BFF_URL contains the literal `${BFF_URL}`, the environment variable wasn't set.

### Slow Performance

1. Check replica count:

   ```bash
   az containerapp revision list --name $APP_NAME --resource-group $RESOURCE_GROUP
   ```

2. Increase resources:
   ```bash
   az containerapp update --name $APP_NAME --resource-group $RESOURCE_GROUP --cpu 0.5 --memory 1Gi
   ```

## Cost Optimization

### Development/Testing

```bash
# Reduce to minimum resources
az containerapp update \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --min-replicas 0 \
    --max-replicas 1 \
    --cpu 0.25 \
    --memory 0.5Gi
```

### Production

```bash
# Production settings
az containerapp update \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --min-replicas 2 \
    --max-replicas 10 \
    --cpu 0.5 \
    --memory 1Gi
```

## Security Considerations

### HTTPS Only

Container Apps automatically provides HTTPS with managed certificates.

### CORS

CORS is handled by the Web BFF, not the Customer UI. The React app makes same-origin requests to its BFF.

### Content Security Policy

Nginx headers provide basic security:

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`

---

**Related Documentation:**

- [PREREQUISITES.md](PREREQUISITES.md) - Setup requirements
- [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) - Local development
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
