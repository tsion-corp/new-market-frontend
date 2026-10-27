#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-full}"
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

step() {
  echo -e "\n${BLUE}[$1] $2${NC}"
}

step "1/8" "Format"
pnpm format:check

step "2/8" "Lint"
pnpm lint

step "3/8" "Comments"
pnpm comments:check

step "4/8" "Typecheck"
pnpm typecheck

step "5/8" "Unit tests"
pnpm test

step "6/8" "Unused files, exports and dependencies"
pnpm knip

if [ "$MODE" = "--fast" ]; then
  echo -e "\n${GREEN}Fast preflight passed. Build and Lighthouse run in CI and in a full preflight.${NC}"
  exit 0
fi

step "7/8" "Cloudflare build (clean)"
rm -rf .next .open-next
pnpm build:cloudflare

step "8/8" "Lighthouse (mobile, every category at 100)"
pnpm lighthouse

echo -e "\n${GREEN}All preflight gates passed.${NC}"
