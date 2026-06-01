@echo off
setlocal
cd /d "%~dp0"

python -m PyInstaller --noconfirm --clean --windowed --name InventoryTool --add-data "index.html;." --add-data "app.js;." --add-data "styles.css;." --add-data "sample_inventory.csv;." --add-data "vendor;vendor" --add-data "demo-data;demo-data" --add-data "source-data;source-data" server.py

if errorlevel 1 (
  echo.
  echo Build failed. Please make sure PyInstaller and openpyxl are installed on this computer.
  pause
  exit /b 1
)

echo.
echo Build completed:
echo %cd%\dist\InventoryTool
echo.
echo Copy the whole dist\InventoryTool folder to another Windows computer.
echo Double-click InventoryTool.exe to use it offline.
pause
