@echo off
cd /d "%~dp0"
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>&1
  echo Stopped PID %%a
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "ESTABLISHED"') do (
  taskkill /PID %%a /F >nul 2>&1
)
echo.
if /i not "%~1"=="--nopause" pause
