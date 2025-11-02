# Git Automation Script for QuickIQv2
# This script handles manual backups, auto backups, and version management

$ErrorActionPreference = "Stop"
$gitPath = "C:\Program Files\Git\bin\git.exe"

function Invoke-GitBackup {
    param(
        [string]$Message = "Manual backup"
    )
    
    try {
        Write-Host "🔄 Starting backup..." -ForegroundColor Cyan
        
        & $gitPath add .
        if ($LASTEXITCODE -ne 0) { throw "git add failed" }
        
        # Check if there are changes to commit
        $status = & $gitPath status --porcelain
        if ([string]::IsNullOrWhiteSpace($status)) {
            Write-Host "ℹ️  No changes to commit" -ForegroundColor Yellow
            return $false
        }
        
        $commitMsg = $Message
        & $gitPath commit -m $commitMsg
        if ($LASTEXITCODE -ne 0) { throw "git commit failed" }
        
        # Get commit hash
        $commitHash = & $gitPath rev-parse --short HEAD
        $commitTime = & $gitPath log -1 --format="%ci"
        
        # Push if remote exists
        $remoteExists = & $gitPath remote | Where-Object { $_ -eq "origin" }
        if ($remoteExists) {
            & $gitPath push
            if ($LASTEXITCODE -ne 0) { throw "git push failed" }
        }
        
        Write-Host "✅ Backup successful" -ForegroundColor Green
        Write-Host "   Commit: $commitHash" -ForegroundColor Gray
        Write-Host "   Time: $commitTime" -ForegroundColor Gray
        
        return $true
    }
    catch {
        Write-Host "❌ Backup failed: $_" -ForegroundColor Red
        return $false
    }
}

function Start-AutoBackup {
    Write-Host "🔄 Auto-backup scheduler started (every 20 minutes)" -ForegroundColor Cyan
    
    while ($true) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        Invoke-GitBackup -Message "Auto backup: $timestamp"
        Start-Sleep -Seconds 1200  # 20 minutes
    }
}

function Show-VersionHistory {
    param(
        [string]$DateFilter
    )
    
    try {
        if ($DateFilter) {
            $commits = & $gitPath log --since="$DateFilter" --until="$($DateFilter) +1 day" --oneline --all
        } else {
            $commits = & $gitPath log --oneline -20
        }
        
        if ($commits) {
            Write-Host "`n📋 Available commits:" -ForegroundColor Cyan
            Write-Host $commits
        } else {
            Write-Host "No commits found" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "❌ Error fetching commits: $_" -ForegroundColor Red
    }
}

function Restore-Version {
    param(
        [string]$CommitHash
    )
    
    if (-not $CommitHash) {
        Write-Host "❌ Commit hash is required" -ForegroundColor Red
        return $false
    }
    
    try {
        Write-Host "⚠️  WARNING: This will reset your working directory to commit $CommitHash" -ForegroundColor Yellow
        Write-Host "Type 'FORCE ACTION' to confirm, or anything else to cancel: " -NoNewline
        
        $confirm = Read-Host
        if ($confirm -ne "FORCE ACTION") {
            Write-Host "❌ Action cancelled" -ForegroundColor Yellow
            return $false
        }
        
        & $gitPath reset --hard $CommitHash
        if ($LASTEXITCODE -ne 0) { throw "git reset failed" }
        
        # Force push if remote exists
        $remoteExists = & $gitPath remote | Where-Object { $_ -eq "origin" }
        if ($remoteExists) {
            & $gitPath push --force
            if ($LASTEXITCODE -ne 0) { throw "git push --force failed" }
        }
        
        Write-Host "✅ Version restored to $CommitHash" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Restore failed: $_" -ForegroundColor Red
        return $false
    }
}

# Main command handler
$command = $args[0]

switch ($command.ToLower()) {
    "backup" {
        Invoke-GitBackup
    }
    "auto" {
        Start-AutoBackup
    }
    "history" {
        if ($args[1]) {
            Show-VersionHistory -DateFilter $args[1]
        } else {
            Show-VersionHistory
        }
    }
    "restore" {
        if ($args[1]) {
            Restore-Version -CommitHash $args[1]
        } else {
            Write-Host "Usage: .git-automation.ps1 restore <COMMIT_HASH>" -ForegroundColor Yellow
        }
    }
    default {
        Write-Host "Git Automation Commands:" -ForegroundColor Cyan
        Write-Host "  backup          - Manual backup"
        Write-Host "  auto            - Start auto-backup (20 min intervals)"
        Write-Host "  history [date]  - Show commit history"
        Write-Host "  restore <hash>  - Restore to specific commit"
    }
}

