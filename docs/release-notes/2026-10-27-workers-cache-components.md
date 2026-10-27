---
date: 2026-10-27
branch: fix/workers-cache-components
base: dev
scenario-impact: updated
---

# The home page loads on Cloudflare Workers

The first staging deploy returned HTTP 500 on `/`. Cache Components, which `create-next-app` turns on in Next.js 16.4, deadlock on the Workers runtime: Next.js warns that it "cannot guarantee that Cache Components will run as expected due to the current runtime's implementation of `setTimeout()`", the render hangs, and Cloudflare cancels the request. OpenNext pins its own Cache Components tests to Next 16.2 for the same reason.

## Changes

- `cacheComponents` and `partialPrefetching` removed from `next.config.ts`.
- New `pnpm smoke:worker` (`scripts/worker-smoke.sh`): runs the built Worker in the Workers runtime and requires 200 on `/`, `/robots.txt` and `/sitemap.xml`. Runs in CI after the Cloudflare build and in the full preflight.
- Architecture and standards now describe the caching model the app actually uses (`fetch` cache options, `unstable_cache`, `revalidateTag`), and that these caches do not persist between requests on the Workers Free plan.
- Foundation ADR corrected: `experimental.inlineCss` is on, as measured.

## Removed

- `cacheComponents: true` and `partialPrefetching: true`.

## Verification

- Red: `pnpm smoke:worker` on the previous config returned 500 on `/` with the hang error.
- Green: after the change, 200 on all three routes.
- Lighthouse mobile on `/` unchanged at 98 or more in every category.
