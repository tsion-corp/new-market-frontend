#!/usr/bin/env bash
set -euo pipefail

PORT="${SMOKE_PORT:-8799}"
ROUTES=("/" "/robots.txt" "/sitemap.xml")
LOG="$(mktemp)"

pnpm exec wrangler dev --port "$PORT" --env staging >"$LOG" 2>&1 &
PID=$!
trap 'kill "$PID" 2>/dev/null || true; rm -f "$LOG"' EXIT

for _ in $(seq 1 60); do
  if curl -s -o /dev/null "http://localhost:$PORT/robots.txt"; then break; fi
  sleep 1
done

FAILED=0
for route in "${ROUTES[@]}"; do
  status="$(curl -s -o /dev/null -w '%{http_code}' --max-time 30 "http://localhost:$PORT$route")"
  echo "$status $route"
  [ "$status" = "200" ] || FAILED=1
done

if [ "$FAILED" -ne 0 ]; then
  echo "Worker smoke test failed. Worker log:"
  cat "$LOG"
  exit 1
fi
echo "Worker serves every route."
