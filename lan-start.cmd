@echo off
cd /d "%~dp0"
for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "try { $r=Invoke-WebRequest -Uri 'http://127.0.0.1:8080' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -ge 200) { 'RUNNING' } } catch {}"`) do set SITE_STATUS=%%i
if /i "%SITE_STATUS%"=="RUNNING" (
  echo Site already running on port 8080.
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -WindowStyle Hidden -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'scripts/serve-static.mjs','deploy-dist','8080' -WorkingDirectory '%cd%'"
  timeout /t 2 /nobreak >nul
  set SITE_STATUS=
  for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "try { $r=Invoke-WebRequest -Uri 'http://127.0.0.1:8080' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -ge 200) { 'RUNNING' } } catch {}"`) do set SITE_STATUS=%%i
  if /i "%SITE_STATUS%"=="RUNNING" (
    echo Site started on port 8080.
  ) else (
    echo Start failed.
  )
)
echo.
if /i not "%~1"=="--nopause" pause
