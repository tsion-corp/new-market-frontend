---
date: 2026-10-27
branch: main
base: main
scenario-impact: none
---

# Project foundation

The first commit: a Next.js 16 app on Cloudflare Workers with the governance, quality gates and design system the market will be built on.

## Changes

- Next.js 16.4, React 19.3 with the React Compiler, TypeScript strict, Tailwind CSS v4.
- shadcn/ui with the Vengeance UI theme and registry.
- Feature-based architecture enforced by ESLint; a `landing` feature renders the home page.
- Lefthook, commitlint, knip, comment checks, Lighthouse CI, gitleaks, Dependabot.
- OpenNext Cloudflare config for the `new-market` and `new-market-staging` Workers.
- AGENTS.md, CONTRIBUTING.md, engineering standards, architecture, ADR, plan and release-note templates.

## Removed

- `create-next-app` sample page and SVGs, the Geist fonts, and the shadcn button with its packages, all unused.

## Verification

- Vitest: the landing hero renders its heading and description.
- Lighthouse mobile on `/`: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
