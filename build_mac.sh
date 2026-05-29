#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

python3 -m PyInstaller \
  --noconfirm \
  --clean \
  --windowed \
  --name InventoryTool \
  --add-data "index.html:." \
  --add-data "app.js:." \
  --add-data "styles.css:." \
  --add-data "sample_inventory.csv:." \
  server.py

echo
echo "Build completed:"
echo "$(pwd)/dist/InventoryTool.app"
echo
echo "Copy InventoryTool.app to another Mac and double-click it to use offline."
