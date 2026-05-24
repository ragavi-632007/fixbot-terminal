# ==============================================================
#  Fixbot Installer
#  Usage: iwr -useb https://raw.githubusercontent.com/ragavi-632007/fixbot-terminal/main/install.ps1 | iex
# ==============================================================

$ErrorActionPreference = 'Stop'
$REPO_URL  = "https://github.com/ragavi-632007/fixbot-terminal.git"
$INSTALL_DIR = "$HOME\.fixbot"

function Write-Banner {
    Write-Host ""
    Write-Host "   _____ _      _           _   " -ForegroundColor Cyan
    Write-Host "  |  ___(_)_  _| |__   ___ | |_ " -ForegroundColor Cyan
    Write-Host "  | |_  | \ \/ / '_ \ / _ \| __|" -ForegroundColor Cyan
    Write-Host "  |  _| | |>  <| |_) | (_) | |_ " -ForegroundColor Cyan
    Write-Host "  |_|   |_/_/\_\_.__/ \___/ \__|" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Autonomous Windows Support Agent  v4.0" -ForegroundColor DarkGray
    Write-Host ""
}

Write-Banner

# ── Preflight checks ──────────────────────────────────────────
Write-Host "  Checking prerequisites..." -ForegroundColor Yellow

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "  [ERROR] Git is not installed." -ForegroundColor Red
    Write-Host "  Install it from: https://git-scm.com/download/win" -ForegroundColor Red
    Write-Host "  Then re-run this installer." -ForegroundColor Red
    exit 1
}
Write-Host "  [OK] Git found" -ForegroundColor Green

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "  [ERROR] Python 3.9+ is not installed." -ForegroundColor Red
    Write-Host "  Download it from: https://python.org/downloads" -ForegroundColor Red
    exit 1
}

$pyVersion = python --version 2>&1
Write-Host "  [OK] $pyVersion found" -ForegroundColor Green

# ── Clone or update ───────────────────────────────────────────
Write-Host ""
if (Test-Path "$INSTALL_DIR\.git") {
    Write-Host "  Fixbot already installed. Updating to latest version..." -ForegroundColor Yellow
    Push-Location $INSTALL_DIR
    git pull origin main -q
    Pop-Location
    Write-Host "  [OK] Updated successfully" -ForegroundColor Green
} else {
    Write-Host "  Downloading Fixbot from GitHub..." -ForegroundColor Yellow
    git clone $REPO_URL $INSTALL_DIR -q
    Write-Host "  [OK] Downloaded to $INSTALL_DIR" -ForegroundColor Green
}

# ── Install Python dependencies ───────────────────────────────
Write-Host ""
Write-Host "  Installing Python dependencies..." -ForegroundColor Yellow
python -m pip install -r "$INSTALL_DIR\sysdoc\requirements.txt" -q
Write-Host "  [OK] Dependencies installed" -ForegroundColor Green

# ── Gemini API Key setup ──────────────────────────────────────
Write-Host ""
Write-Host "  ─────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "  Fixbot uses Google Gemini AI (free API key)." -ForegroundColor White
Write-Host "  Get your key at: https://aistudio.google.com" -ForegroundColor Cyan
Write-Host "  ─────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""
$apiKey = Read-Host "  Enter your Gemini API Key"

$envContent = "`nGEMINI_API_KEY=$apiKey`n"
Set-Content -Path "$INSTALL_DIR\sysdoc\.env" -Value $envContent
Write-Host "  [OK] API key saved" -ForegroundColor Green

# ── Create global fixbot.cmd launcher ────────────────────────
$launcherContent = @"
@echo off
python "$INSTALL_DIR\sysdoc\main.py" %*
"@
Set-Content -Path "$INSTALL_DIR\fixbot.cmd" -Value $launcherContent

# ── Add to user PATH ──────────────────────────────────────────
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$INSTALL_DIR*") {
    Write-Host ""
    Write-Host "  Adding Fixbot to your system PATH..." -ForegroundColor Yellow
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$INSTALL_DIR", "User")
    Write-Host "  [OK] PATH updated" -ForegroundColor Green
}

# ── Done ──────────────────────────────────────────────────────
Write-Host ""
Write-Host "  ============================================" -ForegroundColor Cyan
Write-Host "   Fixbot installed successfully!" -ForegroundColor Green
Write-Host "  ============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor White
Write-Host "   1. Close and reopen your terminal" -ForegroundColor DarkGray
Write-Host "   2. Type: fixbot" -ForegroundColor Yellow
Write-Host ""
