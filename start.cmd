@echo off
REM ============================================================
REM  Captain Exim - start the DEVELOPMENT server on port 3000
REM
REM  Double-click this file, or run it from a terminal.
REM  Leave the window open while you use the site.
REM  Press Ctrl+C (then Y) in this window, or run stop.cmd,
REM  to shut the server down.
REM ============================================================

setlocal
cd /d "%~dp0"

echo.
echo   CAPTAIN EXIM - development server
echo   ---------------------------------
echo.

REM --- Node present? ------------------------------------------
where node >nul 2>nul
if errorlevel 1 (
  echo   [X] Node.js was not found on your PATH.
  echo       Install Node.js 20 or newer from https://nodejs.org
  echo.
  pause
  exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do echo   Node %%v

REM --- Port 3000 already busy? --------------------------------
netstat -aon | findstr /R /C:":3000 .*LISTENING" >nul 2>nul
if not errorlevel 1 (
  echo.
  echo   [!] Port 3000 is already in use.
  echo       Run stop.cmd first, or open http://localhost:3000
  echo.
  pause
  exit /b 1
)

REM --- Dependencies installed? --------------------------------
if not exist "node_modules" (
  echo   Installing dependencies ^(first run only, a few minutes^)...
  call npm ci
  if errorlevel 1 (
    echo   [X] npm ci failed.
    pause
    exit /b 1
  )
)

echo.
echo   Starting...  the site will be at  http://localhost:3000
echo   Keep this window open. Ctrl+C to stop.
echo.

call npm run dev

endlocal
