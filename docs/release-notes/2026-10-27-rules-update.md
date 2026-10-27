---
date: 2026-10-27
branch: chore/rules-update
base: dev
scenario-impact: none
---

# Branch flow, Lighthouse threshold, no AI co-authors, and the TanStack Query decision

No user-visible change. The rules the team works by changed.

## Changes

- Lighthouse passes at 98 to 100 in every category on mobile, instead of exactly 100. CI asserts the median of three runs.
- Code flows feature branch → `dev` → `staging` → `main`. A new `branch flow` CI check, part of `quality`, rejects pull requests into `staging` not from `dev` and into `main` not from `staging`.
- TanStack Query is the chosen tool for client-side server state (ADR pair, Proposed). It is installed with the first feature that uses it.
- AI tools never co-author commits: `.claude/settings.json` disables Claude Code attribution, and a commitlint rule (`no-ai-attribution`) rejects AI co-author, session and "Generated with" lines.
- `.worktrees/` is ignored by Git, ESLint and Prettier.

## Removed

- Nothing.

## Verification

- `pnpm preflight --fast` passes.
- The previous CI run on `dev` failed only on Lighthouse Performance (median 0.99 against a minimum of 1); the new minimum of 0.98 accepts it.
