# ADR-2026-10-30: A 30 minute limit for the Lighthouse CI job

- **Status:** Accepted
- **Approved by:** (MarkDavid, 30 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-30-lighthouse-ci-timeout-for-dummies.md](ADR-2026-10-30-lighthouse-ci-timeout-for-dummies.md)

## Context

[ADR-2026-10-29-lighthouse-devtools-throttling](ADR-2026-10-29-lighthouse-devtools-throttling.md) (accepted) switched Lighthouse CI to DevTools throttling. It said runs would take longer, and that "`scripts/preflight.sh` and the CI workflow need no change". The second part was wrong.

The `lighthouse` job in `.github/workflows/ci.yml` has `timeout-minutes: 15`. On the dashboard pull request (#7, run 41000923352), GitHub cancelled it at exactly 15 minutes (04:05:23 to 04:20:40):

- It was cancelled while running Lighthouse on `/search`, the 12th of 13 routes.
- Installing and building took about 2 minutes.
- The 11 finished routes took about 13 minutes, roughly 70 seconds per route for 3 throttled runs.
- All 13 routes therefore need about 17 to 18 minutes.

With real throttling, each run takes real time on a slow simulated phone network, so the job grows by roughly 70 seconds for every route added to `lighthouserc.json`.

Lighthouse CI writes its reports only at the end of the run, so a cancelled job uploads nothing. The `quality` gate then fails because the job's result is `cancelled`, not `success`.

## Options considered

### Option A: raise the job's limit to 30 minutes

One line in `ci.yml`. It covers the current 13 routes with about 12 minutes of headroom, enough for roughly 10 more routes before the limit is reached again. Each pull request's Lighthouse job takes as long as it needs, up to 30 minutes.

### Option B: fewer runs per route

`numberOfRuns: 1` would fit in 15 minutes, but the throttling ADR relies on the median of three runs to absorb real-timing variance. It would make the gate flakier.

### Option C: split routes across parallel jobs

A matrix of jobs, each running a few routes, keeps the wall time short as routes grow. It needs a sharded Lighthouse config and a step that merges the results for the `quality` gate. That is a larger change than this problem needs today.

## Decision

Option A. In `.github/workflows/ci.yml`, set the `lighthouse` job's `timeout-minutes` from 15 to 30. Nothing else changes: same steps, same `lighthouserc.json`, same 0.98 threshold and three runs per route.

When the route count makes the job approach 30 minutes (about 23 routes at today's pace), the next step is Option C, in its own ADR.

## Diagram

```
 before: lighthouse job ── install + build (2 min) ── 13 routes × 3 runs (~16 min) ──X cancelled at 15 min
 after:  lighthouse job ── install + build (2 min) ── 13 routes × 3 runs (~16 min) ── asserts ── done (< 30 min)
```

## Consequences

- The Lighthouse gate completes, and pull requests can pass `quality` again.
- Lighthouse feedback on a pull request takes about 18 minutes instead of being cut off at 15.
- More GitHub Actions minutes per pull request: about 18 instead of the 15 at which the job was cut off. The repository's Actions plan covers this.
- No packages added or removed.

## Verification

- The `lighthouse` job on pull request #7 completes within the limit and every assertion passes.
- Record the job's duration in the pull request. Revisit with Option C when it passes 25 minutes.
