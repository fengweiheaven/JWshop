#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

APP_EXE="./dist/InventoryTool.app/Contents/MacOS/InventoryTool"
PORT=8876

if [[ ! -x "$APP_EXE" ]]; then
  echo "Cannot find built app executable: $APP_EXE"
  echo "Run ./build_mac.sh first."
  exit 1
fi

"$APP_EXE" --no-browser --port "$PORT" &
APP_PID=$!

cleanup() {
  kill "$APP_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT

sleep 2

curl -fsS "http://127.0.0.1:$PORT/" | grep -q "库存汇总工具"
curl -fsS -F "file=@sample_inventory.csv" "http://127.0.0.1:$PORT/api/analyze" | grep -q '"ok": true'

echo "Mac build verification passed."
