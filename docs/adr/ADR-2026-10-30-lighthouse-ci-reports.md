# ADR-2026-10-30: Upload the Lighthouse CI reports

- **Status:** Accepted
- **Approved by:** (MarkDavid, 30 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-30-lighthouse-ci-reports-for-dummies.md](ADR-2026-10-30-lighthouse-ci-reports-for-dummies.md)

## Context

The `lighthouse` job in `.github/workflows/ci.yml` ends with an `actions/upload-artifact@v7` step that is meant to keep the reports (`path: .lighthouseci`, `if: always()`). It has never uploaded anything.

On the dashboard pull request (#7, run 41003657780):

- Lighthouse CI logged "Dumping 39 reports to disk at .../.lighthouseci".
- The upload step then logged "No files were found with the provided path: .lighthouseci. No artifacts will be uploaded."

Since version 4.4, `upload-artifact` skips hidden files and folders (names starting with a dot) unless `include-hidden-files: true` is set, and `.lighthouseci` is a hidden folder. Because the step also sets `if-no-files-found: ignore`, the job did not warn about it.

That run failed the 98 bar on ten placeholder routes (performance 95 to 97 on the CI runner, 99 to 100 locally, even with a 10× CPU slowdown). Without the reports there is no way to see which metric failed or why. The standards say to measure before optimising.

## Options considered

### Option A: set `include-hidden-files: true` on the upload step

One line. Every Lighthouse run in CI, passed or failed, keeps its 39 JSON and HTML reports as the `lighthouse-reports` artifact (the default 90-day retention).

### Option B: change Lighthouse CI's output folder to a non-hidden one

It would also work, but it changes `lighthouserc.json`, the `.gitignore` entry and the local habit of reading `.lighthouseci/`, for the same result.

### Option C: upload to temporary public storage (`upload.target: temporary-public-storage`)

It puts reports of unreleased pages on a public Google server. No.

## Decision

Option A. Add `include-hidden-files: true` to the `actions/upload-artifact@v7` step of the `lighthouse` job. Nothing else changes.

## Diagram

```
 before: lhci writes .lighthouseci/*.json ──► upload-artifact skips hidden folder ──► no artifact
 after:  lhci writes .lighthouseci/*.json ──► upload-artifact (include-hidden-files) ──► lighthouse-reports artifact
```

## Consequences

- Every pull request's Lighthouse reports can be downloaded from the run, so a CI-only score can be diagnosed from evidence.
- A few megabytes of artifact storage per run, within the plan's limits.
- No packages added or removed.

## Verification

The next CI run on pull request #7 shows a `lighthouse-reports` artifact with 39 reports, and `gh run download <run> -n lighthouse-reports` fetches them.
