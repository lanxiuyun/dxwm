$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$runtimeDir = Join-Path $projectRoot '.runtime'
$port = 8080
$pidFile = Join-Path $runtimeDir 'lan-site.pid'

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

$sitePid = Get-ListeningPid -TargetPort $port
if ($sitePid) {
  Stop-Process -Id $sitePid -Force
  Write-Output "Stopped LAN site PID $sitePid"
} else {
  Write-Output 'LAN site already stopped'
}

Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
