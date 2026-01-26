#!/bin/sh
# Docker entrypoint script for customer-ui
# Substitutes environment variables in nginx config at container startup

set -e

# Default BFF URL if not set
BFF_URL=${BFF_URL:-"http://localhost:3100"}

echo "🔧 Configuring nginx with BFF_URL: ${BFF_URL}"

# Create nginx config with environment variable substitution
envsubst '${BFF_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

echo "✅ Nginx configuration updated"

# Execute the main command (nginx)
exec "$@"
