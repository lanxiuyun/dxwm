$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$runtimeDir = Join-Path $projectRoot '.runtime'
$port = 8080
$pidFile = Join-Path $runtimeDir 'lan-site.pid'
$logFile = Join-Path $runtimeDir 'lan-site.log'
$nodePath = (Get-Command node -ErrorAction Stop).Source

function Get-ListeningPid {
  param(
    [int]$TargetPort
  )

  $line = netstat -ano | Select-String -Pattern "0\.0\.0\.0:$TargetPort\s+.*LISTENING\s+(\d+)"
  if (-not $line) {
    return $null
  }

  return [int]$line.Matches[0].Groups[1].Value
}

if (-not (Test-Path $runtimeDir)) {
  New-Item -ItemType Directory -Path $runtimeDir | Out-Null
}

$existingPid = Get-ListeningPid -TargetPort $port
if ($existingPid) {
  Write-Output "Site already running on port $port (PID $existingPid)"
  $existingPid | Set-Content $pidFile
  exit 0
}

if (Test-Path $logFile) {
  Remove-Item $logFile -Force
}

$innerCommand = "`"$nodePath`" scripts\\serve-static.mjs deploy-dist $port 1>>`"$logFile`" 2>>&1"
$launchCommand = "cd /d `"$projectRoot`" && start `"`" /b cmd /c $innerCommand"
cmd /c $launchCommand | Out-Null

for ($attempt = 0; $attempt -lt 20; $attempt += 1) {
  Start-Sleep -Milliseconds 500
  $listeningPid = Get-ListeningPid -TargetPort $port
  if ($listeningPid) {
    $listeningPid | Set-Content $pidFile
    Write-Output "LAN site started on port $port (PID $listeningPid)"
    exit 0
  }
}

throw "LAN site did not start on port $port."
