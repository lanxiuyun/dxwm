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

function Get-NetworkUrls {
  param(
    [int]$TargetPort
  )

  $addresses = [System.Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces() |
    Where-Object { $_.OperationalStatus -eq 'Up' } |
    ForEach-Object { $_.GetIPProperties().UnicastAddresses } |
    Where-Object {
      $_.Address.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and
      -not $_.Address.IPAddressToString.StartsWith('127.')
    } |
    ForEach-Object { $_.Address.IPAddressToString } |
    Select-Object -Unique

  return $addresses | ForEach-Object { "http://${_}:$TargetPort" }
}

$sitePid = Get-ListeningPid -TargetPort $port
if (-not $sitePid) {
  Write-Output 'LAN site: stopped'
  exit 0
}

Write-Output "LAN site: running (PID $sitePid)"
Write-Output "Local URL: http://localhost:$port"
foreach ($url in Get-NetworkUrls -TargetPort $port) {
  Write-Output "Network URL: $url"
}

if (Test-Path $pidFile) {
  $savedPid = (Get-Content $pidFile -Raw).Trim()
  if ($savedPid -and $savedPid -ne "$sitePid") {
    Write-Output "Saved PID differs from live PID: $savedPid"
  }
}
