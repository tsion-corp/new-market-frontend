## Summary

What this changes and why. Link the issue: Closes #

## Type

- [ ] feat
- [ ] fix
- [ ] perf
- [ ] refactor
- [ ] docs, build, ci or chore

## Decision and plan

- ADR pair: `docs/adr/...` (approved by: ) or **not required** because:
- Plan: `docs/plans/...` or **not required** because:

## Pre-review audit

- [ ] **Read first:** I read the code, callers, tests and docs for everything I changed.
- [ ] **Layers:** imports point down; features imported only through `index.ts` / `server.ts`; no cross-feature imports.
- [ ] **Server boundary:** upstream data validated and mapped on the server; no `fetch` or secrets in components.
- [ ] **Hooks:** the right hook for each job; stateful logic and effects in custom hooks.
- [ ] **Tests:** behaviour tests for success, empty, loading and error states; bug fixes were red before green.
- [ ] **Money:** amounts in base units with `bigint`.
- [ ] **States:** every async path has loading and error states.
- [ ] **Accessibility:** keyboard, labels, contrast, reduced motion.
- [ ] **Comments:** no agent-written comments; human comments explain why in three lines or fewer.
- [ ] **Cleanup:** replaced code, assets, config and packages removed; `pnpm knip` is clean.
- [ ] **Dependencies:** any new package is used in this PR, pinned, and justified below.
- [ ] **Preflight:** `pnpm preflight` passed with zero warnings.
- [ ] **Release note:** `docs/release-notes/<date>-<topic>.md` with `scenario-impact` set.

## Removed

Code, files, config and packages this PR deletes.

## Lighthouse (mobile)

| Route | Performance | Accessibility | Best Practices | SEO |
| ----- | ----------- | ------------- | -------------- | --- |
| `/`   |             |               |                |     |

## How this was verified

What you ran and what you clicked, on a phone-sized screen.

## Screenshots
