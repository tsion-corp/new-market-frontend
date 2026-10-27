---
name: market-engineering-standards
description: Engineering standards for the Tsion Market frontend. Load before reading, writing, reviewing or deleting any code, comment, config or document in this repository.
---

# Tsion Market engineering standards

The rules live in the repository, not in this skill, so every agent and every human reads the same text.

Before any change, read these in full:

1. `AGENTS.md`: the directives, the lifecycle and the pre-review audit.
2. `docs/engineering-standards.md`: TypeScript, components, the hook table, custom hooks, data, styling, Lighthouse, accessibility, testing, comments, cleanup.
3. `docs/architecture.md`: the layers and the import rules.

Then read the code you will change, its callers and its tests, and the Next.js guide for the APIs involved in `node_modules/next/dist/docs/`.

Non-negotiables to keep in view while working:

- You do not write code comments.
- You do not approve your own ADR or plan.
- A replaced implementation is deleted in the same change, with its packages.
- No package is added before the code that uses it.
- Stateful logic lives in custom hooks; pick the hook from the table.
- Every route scores 98 to 100 in every category on mobile Lighthouse.
- `pnpm preflight` passes before you call anything done.
