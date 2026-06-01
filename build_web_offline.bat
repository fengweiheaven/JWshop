@echo off
setlocal
cd /d "%~dp0"

set OUT_DIR=dist-web\InventoryTool

if not exist "dist-web" mkdir "dist-web"
if not exist "%OUT_DIR%" mkdir "%OUT_DIR%"
if not exist "%OUT_DIR%\vendor" mkdir "%OUT_DIR%\vendor"
if not exist "%OUT_DIR%\demo-data" mkdir "%OUT_DIR%\demo-data"
if not exist "%OUT_DIR%\source-data" mkdir "%OUT_DIR%\source-data"

copy /Y "index.html" "%OUT_DIR%\" >nul
copy /Y "app.js" "%OUT_DIR%\" >nul
copy /Y "styles.css" "%OUT_DIR%\" >nul
copy /Y "sample_inventory.csv" "%OUT_DIR%\" >nul
copy /Y "vendor\xlsx.full.min.js" "%OUT_DIR%\vendor\" >nul
copy /Y "demo-data\*.*" "%OUT_DIR%\demo-data\" >nul
copy /Y "source-data\*.*" "%OUT_DIR%\source-data\" >nul
copy /Y "README.md" "%OUT_DIR%\" >nul
if exist "README_EXPERIENCE.txt" copy /Y "README_EXPERIENCE.txt" "%OUT_DIR%\" >nul
powershell -NoProfile -ExecutionPolicy Bypass -Command "$name = -join ([char]20351, [char]29992, [char]35828, [char]26126) + '.txt'; Copy-Item -LiteralPath $name -Destination '%OUT_DIR%\' -Force"

echo.
echo Offline web package created:
echo %cd%\%OUT_DIR%
echo.
echo Copy this folder to Windows or Mac and open index.html.
pause
