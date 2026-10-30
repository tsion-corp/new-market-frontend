# ADR-2026-10-29: Lighthouse CI with DevTools throttling

- **Status:** Accepted
- **Approved by:** (MarkDavid, 29 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-29-lighthouse-devtools-throttling-for-dummies.md](ADR-2026-10-29-lighthouse-devtools-throttling-for-dummies.md)

## Context

Directive 9 requires every route to score 98 to 100 in every Lighthouse category on mobile. `lighthouserc.json` runs Lighthouse against `pnpm start` on the CI machine with the default **simulated** throttling (Lantern). Lantern loads the page at full speed, records a trace, then estimates how long the page would take on a slow phone by replaying a dependency graph.

Lantern's estimate depends on the order of events in that fast local trace:

- A script counts toward First Contentful Paint and Largest Contentful Paint if it **started evaluating before the observed first paint**. Otherwise it is excluded.
- Against a local server the JavaScript chunks arrive almost instantly (about 15 ms), so each route races its first paint against the framework scripts (about 190 KB, the same on every route).
- `/payments` presents its first frame at 31 ms, before any script runs. Lantern excludes the scripts and estimates LCP at 2.0 s (performance 99).
- `/home` has more to parse and lay out. Its first frame is painted at about 53 ms and presented at about 90 ms, after the scripts start at about 46 ms. Lantern then counts all script download and CPU time inside LCP and estimates 3.3 s (performance 92).

On a real phone the scripts take far longer than a few milliseconds to download, so the page paints first. The dashboard feature PR measured `/home` both ways on the same build:

| Throttling                   | `/home` performance | `/home` LCP | `/payments` performance |
| ---------------------------- | ------------------- | ----------- | ----------------------- |
| Simulated (current CI)       | 92                  | 3.3 s       | 98 to 99                |
| DevTools (real network, CPU) | 98                  | 2.4 s       | 100                     |

Ten experiments on `/home` under simulation did not move it past 92:

- cropping the LCP image from 113 KB to 37 KB
- removing every icon request
- removing Mona Sans, or preloading it
- preloading the LCP image
- `content-visibility` on below-the-fold sections
- turning `inlineCss` off

The same race explains why placeholder routes moved between 97 and 99 across runs.

A full `lhci autorun` with only `--collect.settings.throttlingMethod=devtools` changed (13 routes × 3 runs, same build, same thresholds) passed every assertion:

| Route                | Performance (3 runs) | Accessibility, Best Practices, SEO | LCP (median) |
| -------------------- | -------------------- | ---------------------------------- | ------------ |
| `/home`              | 98, 99, 98           | 100                                | 2.4 s        |
| `/portfolio`         | 99, 100, 100         | 100                                | 0.8 s        |
| `/` and the other 11 | 100, 100, 100        | 100                                | 0.8 s        |

`/home` passes with a narrow margin. Future work on that screen must keep it at 98 or above, measured the same way.

## Options considered

### Option A: keep simulated throttling

The gate stays as it is. `/home` cannot pass without changing the design or deferring visible content. Other routes stay flaky as the codebase grows, because more work before first paint loses the race.

### Option B: DevTools throttling in CI

Set `throttlingMethod: "devtools"` in `lighthouserc.json`. Lighthouse really slows the network and CPU (Lighthouse's mobile slow-4G preset and 4× CPU slowdown) and measures what happens, rather than estimating from a fast trace.

- **Gives:** scores that follow how a phone actually loads the page, with no race against a local server.
- **Costs:** runs take longer (about 10 to 15 minutes for 13 routes × 3 runs), and real timing varies more between runs. The median of three runs, already configured, absorbs most of that.

### Option C: run Lighthouse against a deployed preview

This is the most realistic option. It needs a deployed URL per pull request, Cloudflare credentials in CI, and a decision on preview environments. That is a larger change than this problem needs.

## Decision

Option B. In `lighthouserc.json`:

- set `ci.collect.settings.throttlingMethod` to `"devtools"`;
- keep everything else unchanged: the mobile form factor, the 412 × 823 screen, `numberOfRuns: 3`, the median aggregation, and the 0.98 minimum in every category;
- keep the URL list unchanged.

`scripts/preflight.sh` and the CI workflow need no change, because both call `pnpm lighthouse`.

## Diagram

```
 before: pnpm start ─► Lighthouse (fast load) ─► trace ─► Lantern estimate ─► score
                        local scripts arrive in ~15 ms; the estimate depends on that race

 after:  pnpm start ─► Lighthouse (slow-4G network + 4× CPU applied for real) ─► measured timings ─► score
```

## Consequences

- `/home` and every other route are measured as a phone experiences them; the 98 threshold stays.
- The Lighthouse CI job and full preflight take longer.
- Scores vary more from run to run. If CI shows flaky failures, the follow-up is more runs per URL, not a lower threshold.
- No packages added or removed.

## Verification

- `pnpm lighthouse` with the new setting passes on all 13 routes locally (numbers recorded in the dashboard PR).
- The CI `lighthouse` job passes on the dashboard PR.
- Watch the next three PRs for flaky Lighthouse failures. If any appear, raise `numberOfRuns` in a follow-up.
