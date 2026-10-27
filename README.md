# Tsion Market

The Tsion Market web app: Next.js 16 (App Router, React 19, React Compiler), TypeScript, Tailwind CSS v4, shadcn/ui with Vengeance UI, deployed to Cloudflare Workers with OpenNext.

## Quick start

```bash
corepack enable
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Read next

| Document                                                         | For                                              |
| ---------------------------------------------------------------- | ------------------------------------------------ |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                             | Setup, scripts, branches, commits, pull requests |
| [`docs/engineering-standards.md`](docs/engineering-standards.md) | The coding bar                                   |
| [`docs/architecture.md`](docs/architecture.md)                   | Layers and import rules                          |
| [`AGENTS.md`](AGENTS.md)                                         | Rules for AI coding agents                       |
| [`docs/adr/`](docs/adr/)                                         | Architectural decisions                          |

## Stack

| Concern         | Choice                                                             |
| --------------- | ------------------------------------------------------------------ |
| Framework       | Next.js 16.4, App Router, React 19.3 with the React Compiler       |
| Language        | TypeScript, strict                                                 |
| Styling         | Tailwind CSS v4                                                    |
| UI              | shadcn/ui, Vengeance UI registry and theme                         |
| Tests           | Vitest, Testing Library                                            |
| Quality         | ESLint with architecture boundaries, Prettier, knip, Lighthouse CI |
| Git hooks       | Lefthook, commitlint                                               |
| Hosting         | Cloudflare Workers via OpenNext                                    |
| Package manager | pnpm                                                               |
