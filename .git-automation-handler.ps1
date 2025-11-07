# Chat command handler for Git automation
# This file is referenced by the AI assistant to handle chat commands

param(
    [string]$Command
)

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$automationScript = Join-Path $scriptPath ".git-automation.ps1"
$gitPath = "C:\Program Files\Git\bin\git.exe"

switch -Regex ($Command.ToLower().Trim()) {
    "^backup$" {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        & $automationScript backup
    }
    
    "^go back to (.+)$" {
        $dateFilter = $matches[1].Trim()
        Write-Host "🔍 Finding commits around: $dateFilter" -ForegroundColor Cyan
        & $automationScript restore $dateFilter
    }
    
    "^resume automation$" {
        & $automationScript resume
    }
    
    default {
        Write-Host "Unknown command. Available commands:" -ForegroundColor Yellow
        Write-Host "  backup              - Manual backup"
        Write-Host "  go back to <date>   - Restore version"
        Write-Host "  resume automation   - Resume paused automation"
    }
}


