#!/usr/bin/env pwsh
# Run Customer UI
# Usage: .\run.ps1

# Set terminal title - use both methods to ensure it persists
$host.ui.RawUI.WindowTitle = "Customer UI"
[Console]::Title = "Customer UI"

Write-Host "Starting Customer UI..." -ForegroundColor Green
Write-Host "UI will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

npm start
