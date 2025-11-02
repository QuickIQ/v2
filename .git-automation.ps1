# Git Automation Script for QuickIQv2
# Professional automation with change detection, push failure handling, and safe version control

$ErrorActionPreference = "Stop"
$gitPath = "C:\Program Files\Git\bin\git.exe"
$stateFile = Join-Path $PSScriptRoot ".git-automation-state.json"

# Load automation state
function Get-AutomationState {
    if (Test-Path $stateFile) {
        $state = Get-Content $stateFile -Raw | ConvertFrom-Json
        return $state
    }
    return @{
        Paused = $false
        PauseReason = ""
    } | ConvertTo-Json | ConvertFrom-Json
}

# Save automation state
function Save-AutomationState {
    param([bool]$Paused, [string]$Reason = "")
    $state = @{
        Paused = $Paused
        PauseReason = $Reason
        LastUpdate = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    }
    $state | ConvertTo-Json | Set-Content $stateFile
}

function Invoke-GitBackup {
    param(
        [string]$Message = $null,
        [bool]$IsAutoBackup = $false
    )
    
    try {
        # Check if there are changes before proceeding
        $status = & $gitPath status --porcelain
        if ([string]::IsNullOrWhiteSpace($status)) {
            if ($IsAutoBackup) {
                Write-Host "ℹ️  No changes — skipped backup" -ForegroundColor Yellow
                return @{ Success = $true; Skipped = $true }
            } else {
                Write-Host "ℹ️  No changes to commit" -ForegroundColor Yellow
                return @{ Success = $true; Skipped = $true }
            }
        }
        
        # Generate timestamp message if not provided
        if (-not $Message) {
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
            $Message = "Auto backup: $timestamp"
        }
        
        Write-Host "🔄 Starting backup..." -ForegroundColor Cyan
        
        & $gitPath add .
        if ($LASTEXITCODE -ne 0) { throw "git add failed" }
        
        & $gitPath commit -m $Message
        if ($LASTEXITCODE -ne 0) { throw "git commit failed" }
        
        # Get commit info
        $commitHash = & $gitPath rev-parse --short HEAD
        $commitTime = Get-Date -Format "yyyy-MM-dd HH:mm"
        
        # Push if remote exists
        $remoteExists = & $gitPath remote | Where-Object { $_ -eq "origin" }
        if ($remoteExists) {
            & $gitPath push 2>&1 | Out-Null
            if ($LASTEXITCODE -ne 0) {
                # Push failed - pause automation if auto backup
                if ($IsAutoBackup) {
                    Save-AutomationState -Paused $true -Reason "Push failed"
                    Write-Host "❌ Backup failed — push error" -ForegroundColor Red
                    Write-Host "⏸️  Automation paused. Type 'resume automation' to continue." -ForegroundColor Yellow
                    return @{ Success = $false; PushFailed = $true }
                } else {
                    throw "git push failed"
                }
            }
        }
        
        Write-Host "✅ Backup saved — $commitTime ($commitHash)" -ForegroundColor Green
        return @{ Success = $true; Hash = $commitHash; Time = $commitTime }
    }
    catch {
        Write-Host "❌ Backup failed: $_" -ForegroundColor Red
        if ($IsAutoBackup) {
            Save-AutomationState -Paused $true -Reason $_.ToString()
        }
        return @{ Success = $false; Error = $_.ToString() }
    }
}

function Start-AutoBackup {
    Write-Host "🔄 Auto-backup scheduler started (every 20 minutes)" -ForegroundColor Cyan
    Save-AutomationState -Paused $false
    
    while ($true) {
        # Check if automation is paused
        $state = Get-AutomationState
        if ($state.Paused) {
            Write-Host "⏸️  Automation is paused. Reason: $($state.PauseReason)" -ForegroundColor Yellow
            Write-Host "Type 'resume automation' to continue..." -ForegroundColor Yellow
            
            # Wait for resume command (check state file every 5 seconds)
            $resumed = $false
            while (-not $resumed) {
                Start-Sleep -Seconds 5
                $state = Get-AutomationState
                if (-not $state.Paused) {
                    $resumed = $true
                    Write-Host "▶️  Automation resumed" -ForegroundColor Green
                }
            }
        }
        
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        $result = Invoke-GitBackup -IsAutoBackup $true
        
        if ($result.PushFailed) {
            # Stop automation - already paused in Invoke-GitBackup
            break
        }
        
        Start-Sleep -Seconds 1200  # 20 minutes
    }
}

function Resume-Automation {
    Save-AutomationState -Paused $false
    Write-Host "✅ Automation resumed" -ForegroundColor Green
}

function Show-VersionHistory {
    param(
        [string]$DateFilter
    )
    
    try {
        Write-Host "`n📋 Searching commits around: $DateFilter" -ForegroundColor Cyan
        
        # Parse date and show commits around that time
        $commits = & $gitPath log --since="$DateFilter" --until="$($DateFilter) +1 day" --format="%h|%ci|%s" --all
        
        if (-not $commits -or $commits.Count -eq 0) {
            # If no commits on that day, show commits from that day and nearby
            $commits = & $gitPath log --format="%h|%ci|%s" -20 | Where-Object { $_ -match $DateFilter }
            
            if (-not $commits -or $commits.Count -eq 0) {
                Write-Host "No commits found around $DateFilter. Showing recent commits:" -ForegroundColor Yellow
                $commits = & $gitPath log --format="%h|%ci|%s" -10
            }
        }
        
        if ($commits) {
            Write-Host "`nAvailable commits:" -ForegroundColor Cyan
            Write-Host ("-" * 80) -ForegroundColor Gray
            $index = 1
            foreach ($commit in $commits) {
                $parts = $commit -split '\|'
                $hash = $parts[0]
                $date = $parts[1]
                $message = $parts[2]
                Write-Host "[$index] $hash | $date | $message" -ForegroundColor White
                $index++
            }
            Write-Host ("-" * 80) -ForegroundColor Gray
            return $commits
        } else {
            Write-Host "No commits found" -ForegroundColor Yellow
            return $null
        }
    }
    catch {
        Write-Host "❌ Error fetching commits: $_" -ForegroundColor Red
        return $null
    }
}

function Restore-Version {
    param(
        [string]$DateFilter
    )
    
    try {
        # Show commits around the specified date
        $commits = Show-VersionHistory -DateFilter $DateFilter
        
        if (-not $commits -or $commits.Count -eq 0) {
            Write-Host "❌ No commits found to restore" -ForegroundColor Red
            return $false
        }
        
        Write-Host "`nWhich commit should I restore? (Enter number or commit hash): " -NoNewline -ForegroundColor Cyan
        $selection = Read-Host
        
        # Parse selection
        $selectedCommit = $null
        if ($selection -match '^\d+$') {
            $index = [int]$selection - 1
            if ($index -ge 0 -and $index -lt $commits.Count) {
                $selectedCommit = ($commits[$index] -split '\|')[0]
            }
        } else {
            # Assume it's a commit hash
            $selectedCommit = $selection
        }
        
        if (-not $selectedCommit) {
            Write-Host "❌ Invalid selection" -ForegroundColor Red
            return $false
        }
        
        # Verify commit exists
        $commitInfo = & $gitPath log -1 --format="%h|%ci|%s" $selectedCommit 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Commit not found: $selectedCommit" -ForegroundColor Red
            return $false
        }
        
        $commitParts = $commitInfo -split '\|'
        Write-Host "`n⚠️  WARNING: This will reset your working directory to:" -ForegroundColor Yellow
        Write-Host "   Hash: $($commitParts[0])" -ForegroundColor White
        Write-Host "   Date: $($commitParts[1])" -ForegroundColor White
        Write-Host "   Message: $($commitParts[2])" -ForegroundColor White
        Write-Host "`nThis action cannot be undone. Type 'confirm' to proceed: " -NoNewline -ForegroundColor Red
        
        $confirm = Read-Host
        if ($confirm -ne "confirm") {
            Write-Host "❌ Action cancelled" -ForegroundColor Yellow
            return $false
        }
        
        Write-Host "`n🔄 Restoring version..." -ForegroundColor Cyan
        
        & $gitPath reset --hard $selectedCommit
        if ($LASTEXITCODE -ne 0) { throw "git reset failed" }
        
        # Force push if remote exists
        $remoteExists = & $gitPath remote | Where-Object { $_ -eq "origin" }
        if ($remoteExists) {
            Write-Host "🔄 Pushing to remote..." -ForegroundColor Cyan
            & $gitPath push --force
            if ($LASTEXITCODE -ne 0) { throw "git push --force failed" }
        }
        
        Write-Host "✅ Version restored to $selectedCommit" -ForegroundColor Green
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
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        Invoke-GitBackup -Message "Auto backup: $timestamp" -IsAutoBackup $false
    }
    "auto" {
        Start-AutoBackup
    }
    "resume" {
        Resume-Automation
    }
    "restore" {
        if ($args[1]) {
            Restore-Version -DateFilter $args[1]
        } else {
            Write-Host "Usage: .git-automation.ps1 restore <date/time>" -ForegroundColor Yellow
            Write-Host "Example: .git-automation.ps1 restore '2024-01-15'" -ForegroundColor Gray
        }
    }
    default {
        Write-Host "Git Automation Commands:" -ForegroundColor Cyan
        Write-Host "  backup              - Manual backup with timestamp"
        Write-Host "  auto                - Start auto-backup (20 min intervals)"
        Write-Host "  resume              - Resume paused automation"
        Write-Host "  restore <date>      - Restore to version at specific date"
        Write-Host ""
        Write-Host "In Chat: Type 'backup' or 'go back to <date>' to use commands" -ForegroundColor Gray
    }
}
