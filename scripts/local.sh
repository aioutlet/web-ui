#!/bin/bash

# Customer UI - Run without Dapr (local development)

echo "Starting Customer UI..."
echo "UI will be available at: http://localhost:3000"
echo ""
echo "Note: Make sure web-bff is running at http://localhost:8014"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run React development server
npm start
