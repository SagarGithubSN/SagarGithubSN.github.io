@echo off
REM ============================================================
REM  Captain Exim - stop whatever is serving port 3000
REM
REM  Use this if you closed the server window without Ctrl+C,
REM  or if start.cmd reports "port 3000 is already in use".
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo   CAPTAIN EXIM - stopping server on port 3000
echo   -------------------------------------------
echo.

set FOUND=0

for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R /C:":3000 .*LISTENING"') do (
  if not "%%a"=="0" (
    set FOUND=1
    echo   Stopping process %%a ...
    taskkill /F /PID %%a >nul 2>nul
    if errorlevel 1 (
      echo   [!] Could not stop %%a - try running this file as Administrator.
    ) else (
      echo   [OK] Stopped %%a
    )
  )
)

if "!FOUND!"=="0" (
  echo   Nothing was listening on port 3000.
) else (
  echo.
  echo   Port 3000 is now free.
)

echo.
pause
endlocal
