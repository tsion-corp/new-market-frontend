#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-full}"
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

step() {
  echo -e "\n${BLUE}[$1] $2${NC}"
}

step "1/9" "Format"
pnpm format:check

step "2/9" "Lint"
pnpm lint

step "3/9" "Comments"
pnpm comments:check

step "4/9" "Typecheck"
pnpm typecheck

step "5/9" "Unit tests"
pnpm test

step "6/9" "Unused files, exports and dependencies"
pnpm knip

if [ "$MODE" = "--fast" ]; then
  echo -e "\n${GREEN}Fast preflight passed. Build and Lighthouse run in CI and in a full preflight.${NC}"
  exit 0
fi

step "7/9" "Cloudflare build (clean)"
rm -rf .next .open-next
pnpm build:cloudflare

step "8/9" "Worker smoke test (Workers runtime)"
pnpm smoke:worker

step "9/9" "Lighthouse (mobile, every category 98 or more)"
pnpm lighthouse

echo -e "\n${GREEN}All preflight gates passed.${NC}"
