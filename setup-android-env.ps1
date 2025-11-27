# Android Development Environment Setup Script
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Android Environment Setup for React Native" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Define paths
$JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"

# Check if paths exist
Write-Host "Checking paths..." -ForegroundColor Yellow
if (Test-Path $JAVA_HOME) {
    Write-Host "✓ JDK found at: $JAVA_HOME" -ForegroundColor Green
} else {
    Write-Host "✗ JDK not found at: $JAVA_HOME" -ForegroundColor Red
    exit 1
}

if (Test-Path $ANDROID_HOME) {
    Write-Host "✓ Android SDK found at: $ANDROID_HOME" -ForegroundColor Green
} else {
    Write-Host "✗ Android SDK not found at: $ANDROID_HOME" -ForegroundColor Red
    exit 1
}

Write-Host "`nSetting up environment variables..." -ForegroundColor Yellow

# Set JAVA_HOME
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', $JAVA_HOME, [System.EnvironmentVariableTarget]::User)
Write-Host "✓ JAVA_HOME set to: $JAVA_HOME" -ForegroundColor Green

# Set ANDROID_HOME
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $ANDROID_HOME, [System.EnvironmentVariableTarget]::User)
Write-Host "✓ ANDROID_HOME set to: $ANDROID_HOME" -ForegroundColor Green

# Get current PATH
$currentPath = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::User)

# Paths to add
$pathsToAdd = @(
    "$JAVA_HOME\bin",
    "$ANDROID_HOME\platform-tools",
    "$ANDROID_HOME\emulator",
    "$ANDROID_HOME\tools",
    "$ANDROID_HOME\tools\bin"
)

# Add paths if not already present
$pathChanged = $false
foreach ($path in $pathsToAdd) {
    if ($currentPath -notlike "*$path*") {
        $currentPath = "$currentPath;$path"
        $pathChanged = $true
        Write-Host "✓ Added to PATH: $path" -ForegroundColor Green
    } else {
        Write-Host "- Already in PATH: $path" -ForegroundColor Gray
    }
}

# Update PATH if changed
if ($pathChanged) {
    [System.Environment]::SetEnvironmentVariable('Path', $currentPath, [System.EnvironmentVariableTarget]::User)
    Write-Host "`n✓ PATH updated successfully!" -ForegroundColor Green
} else {
    Write-Host "`n- PATH already contains all required entries" -ForegroundColor Gray
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
