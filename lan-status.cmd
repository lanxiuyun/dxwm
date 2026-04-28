@echo off
cd /d "%~dp0"
set SITE_STATUS=
for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "try { $r=Invoke-WebRequest -Uri 'http://127.0.0.1:8080' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -ge 200) { 'RUNNING' } } catch {}"`) do set SITE_STATUS=%%i
if /i "%SITE_STATUS%"=="RUNNING" (
  echo Site is running.
  echo Local URL: http://localhost:8080
  powershell -NoProfile -Command "$ips=[System.Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces() | ? { $_.OperationalStatus -eq 'Up' } | %% { $_.GetIPProperties().UnicastAddresses } | ? { $_.Address.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and -not $_.Address.IPAddressToString.StartsWith('127.') } | %% { $_.Address.IPAddressToString } | Select-Object -Unique; $ips | %% { Write-Output ('Network URL: http://' + $_ + ':8080') }"
) else (
  echo Site is stopped.
)
echo.
if /i not "%~1"=="--nopause" pause
