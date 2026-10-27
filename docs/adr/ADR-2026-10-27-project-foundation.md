# ADR-2026-10-27: Project foundation

- **Status:** Proposed
- **Approved by:** (maintainer, date)
- **Companion:** [ADR-2026-10-27-project-foundation-for-dummies.md](ADR-2026-10-27-project-foundation-for-dummies.md)

## Context

Tsion Market is a new frontend in a new repository. The previous frontend used a feature-based layout with lint-enforced layers, ADR-gated AI governance and a five-gate preflight. It also grew unused packages, comment noise and parallel old and new implementations. The new app must deploy to Cloudflare Workers, use Vengeance UI, and score 100 in every Lighthouse category on mobile.

## Options considered

### Architecture

- **Layer-by-type** (`components/`, `hooks/`, `services/` at the root): simple at first, scatters every feature across the tree.
- **Feature-Sliced Design**: strict and well documented, but six layers and its own vocabulary are more structure than a single app needs.
- **Feature-based with one-way layers and feature entry points** (Bulletproof React style): what the previous frontend used, plus public entry points and a default-deny lint policy.

### Tooling

- Git hooks: Husky with lint-staged, or Lefthook (one binary, one config, parallel jobs, no extra package for staged files).
- Unused code: manual review, or knip in CI.
- Performance: manual Lighthouse runs, or Lighthouse CI with hard assertions.

## Decision

- Next.js 16.4 with the `create-next-app` defaults: App Router, `src/` directory, TypeScript strict, Tailwind CSS v4 through the Turbopack loader, Cache Components and Partial Prefetching on, React Compiler on.
- Feature-based architecture with one-way layers. Features are imported only through `index.ts` or `server.ts`. ESLint (`eslint-plugin-boundaries`) enforces it with a default-deny policy. Detail in `docs/architecture.md`.
- shadcn/ui (Radix base, Nova preset) with the Vengeance UI theme tokens and the `@vengeanceui` registry. Components are added when first used.
- System font stack. Measured: Geist via `next/font` added about 30 KB to the LCP path and held mobile Performance at 99.
- Lefthook for pre-commit (Prettier, ESLint, comment check), commit-msg (commitlint, Conventional Commits) and pre-push (fast preflight).
- Vitest with Testing Library; knip; a repository comment checker; Lighthouse CI asserting 100 in all four categories on mobile; gitleaks in CI.
- Cloudflare Workers via `@opennextjs/cloudflare`, Workers Free plan: no incremental cache store. Workers `new-market` (from `main`) and `new-market-staging` (from `staging`), deployed by Workers Builds.
- Governance from the previous frontend carried over and extended: read-first, no agent-written comments, replace-means-remove, packages only when used, hook rules, Lighthouse 100.

## Diagram

```
 developer / agent
        │
        ▼
 lefthook: format, lint, comments ─► commitlint ─► fast preflight (push)
        │
        ▼
 GitHub PR ─► CI: checks, tests, Cloudflare build, Lighthouse, gitleaks ─► quality
        │
        ▼ squash merge
 dev ─► staging ─► Workers Builds ─► new-market-staging
            └────► main ─► Workers Builds ─► new-market
```

## Consequences

- Better: architecture and comment rules are checked by machines, not memory; unused code and packages fail CI; performance regressions fail CI.
- Costs: Lighthouse in CI adds a few minutes per PR; the default-deny lint policy means each new top-level folder needs an architecture update first; brand typography needs a measured case before a web font is added.
- `experimental.inlineCss` was tried and dropped: it improved FCP but not the score. `vengeanceui init` (agent skill and MCP) is documented upstream but not published on npm, so it is not installed.

## Verification

`pnpm preflight` passes on the starter: format, lint, comments, typecheck, tests, knip, Cloudflare build, and Lighthouse mobile at 100 / 100 / 100 / 100.
