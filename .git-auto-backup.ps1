# Auto-backup background script
# Runs backup every 20 minutes

$ErrorActionPreference = "Continue"
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$automationScript = Join-Path $scriptPath ".git-automation.ps1"

while ($true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    Write-Host "[$timestamp] Running auto-backup..." -ForegroundColor Cyan
    
    & $automationScript backup
    
    # Wait 20 minutes (1200 seconds)
    Start-Sleep -Seconds 1200
}

