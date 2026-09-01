@echo off
REM ============================================================
REM  Captain Exim - build and run the PRODUCTION server
REM
REM  Slower to start than start.cmd, but this is what the real
REM  site behaves like: optimised images, no dev overlay,
REM  fast page loads. Use this when showing the site to someone.
REM ============================================================

setlocal
cd /d "%~dp0"

echo.
echo   CAPTAIN EXIM - production build
echo   -------------------------------
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo   [X] Node.js was not found on your PATH.
  echo       Install Node.js 20 or newer from https://nodejs.org
  pause
  exit /b 1
)

netstat -aon | findstr /R /C:":3000 .*LISTENING" >nul 2>nul
if not errorlevel 1 (
  echo   [!] Port 3000 is already in use. Run stop.cmd first.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo   Installing dependencies ^(first run only^)...
  call npm ci
  if errorlevel 1 ( pause & exit /b 1 )
)

echo   Building ^(1-3 minutes^)...
echo.
call npm run build
if errorlevel 1 (
  echo.
  echo   [X] Build failed. Nothing was started.
  pause
  exit /b 1
)

echo.
echo   Build complete. Serving at  http://localhost:3000
echo   Keep this window open. Ctrl+C to stop.
echo.

call npm run start

endlocal
