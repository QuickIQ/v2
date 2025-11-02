# Auto-backup background script
# Runs backup every 20 minutes with change detection and push failure handling

$ErrorActionPreference = "Continue"
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$automationScript = Join-Path $scriptPath ".git-automation.ps1"

# Load automation state
$stateFile = Join-Path $scriptPath ".git-automation-state.json"
function Get-AutomationState {
    if (Test-Path $stateFile) {
        try {
            $state = Get-Content $stateFile -Raw | ConvertFrom-Json
            return $state
        } catch {
            return @{ Paused = $false; PauseReason = "" }
        }
    }
    return @{ Paused = $false; PauseReason = "" }
}

Write-Host "🔄 Auto-backup scheduler starting..." -ForegroundColor Cyan
Write-Host "   Interval: 20 minutes" -ForegroundColor Gray
Write-Host "   Press Ctrl+C to stop" -ForegroundColor Gray

while ($true) {
    # Check if automation is paused
    $state = Get-AutomationState
    if ($state.Paused) {
        Write-Host "`n⏸️  Automation is paused. Reason: $($state.PauseReason)" -ForegroundColor Yellow
        Write-Host "Waiting for resume command..." -ForegroundColor Yellow
        
        # Wait for resume (check state file every 5 seconds)
        while ($true) {
            Start-Sleep -Seconds 5
            $state = Get-AutomationState
            if (-not $state.Paused) {
                Write-Host "▶️  Automation resumed. Continuing backups..." -ForegroundColor Green
                break
            }
        }
    }
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    Write-Host "`n[$timestamp] Checking for changes..." -ForegroundColor Cyan
    
    # Run backup (this handles change detection internally)
    & $automationScript backup
    
    # Check if push failed and automation was paused
    $state = Get-AutomationState
    if ($state.Paused) {
        Write-Host "`n❌ Backup failed — push error" -ForegroundColor Red
        Write-Host "⏸️  Automation stopped. Run 'resume automation' to continue." -ForegroundColor Yellow
        break
    }
    
    # Wait 20 minutes (1200 seconds)
    Write-Host "Next backup in 20 minutes..." -ForegroundColor Gray
    Start-Sleep -Seconds 1200
}
