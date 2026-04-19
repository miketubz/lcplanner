$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mobileRoot = Split-Path -Parent $scriptDir
$projectRoot = Split-Path -Parent $mobileRoot
$wwwDir = Join-Path $mobileRoot 'www'

if (Test-Path $wwwDir) {
    Remove-Item $wwwDir -Recurse -Force
}

New-Item -ItemType Directory -Path $wwwDir | Out-Null

$filesToCopy = @(
    'index.html',
    'app.js',
    'styles.css',
    'icon.png'
)

foreach ($file in $filesToCopy) {
    Copy-Item (Join-Path $projectRoot $file) (Join-Path $wwwDir $file)
}

Write-Host "Copied web assets into $wwwDir"