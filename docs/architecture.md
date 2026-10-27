# Architecture

This is the shape of the codebase and the rules that keep it that way. ESLint enforces the import rules, so a violation fails `pnpm lint` and CI.

## Model

The project uses a **feature-based architecture with one-way layers**, the structure popularised by [Bulletproof React](https://github.com/alan2207/bulletproof-react) and used by most large Next.js codebases. Code is grouped by what it does for the product (a feature), not by its technical kind. Every import points down the layer diagram, and features never import each other.

Two rules on top of the previous frontend:

1. **Features have a public entry point.** Outside code imports a feature only through `index.ts` (client-safe) or `server.ts` (server-only). Everything else in the folder is private and free to change.
2. **The lint policy is default-deny.** An import is allowed only if a policy names it. A new folder under `src/` that fits no layer fails lint until the architecture says where it belongs.

## Layers

```
            ┌────────────────────────────┐
            │  app/   routes, layouts,   │
            │         route handlers     │
            └─────────────┬──────────────┘
                          │
            ┌─────────────▼──────────────┐
            │  components/layout/        │
            │  app shell                 │
            └─────────────┬──────────────┘
                          │  (features via index.ts / server.ts only)
            ┌─────────────▼──────────────┐
            │  features/<name>/          │
            │  one folder per product    │
            │  area, never cross-import  │
            └─────────────┬──────────────┘
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  │
┌──────────────┐   ┌──────────────┐          │
│ components/  │──▶│   hooks/     │          │
│ ui/          │   │ cross-cutting│          │
└──────┬───────┘   └──────┬───────┘          │
       └────────┬─────────┘                  │
                ▼                            ▼
         ┌──────────────┐            ┌──────────────┐
         │    lib/      │───────────▶│   config/    │
         │ pure utils   │            │ static config│
         └──────────────┘            └──────────────┘
```

| Layer                | Holds                                                                                  | May import                                                         |
| -------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `app/`               | Routes, layouts, metadata files, route handlers. Composes features, owns no logic.     | everything below; features through their entry files only          |
| `components/layout/` | The app shell: header, navigation, footer.                                             | `ui`, `hooks`, `lib`, `config`; features through their entry files |
| `features/<name>/`   | Everything one product area needs: components, hooks, server code, types.              | its own files, `ui`, `hooks`, `lib`, `config`                      |
| `components/ui/`     | Design system primitives from shadcn and Vengeance UI. Know nothing about any feature. | `ui`, `hooks`, `lib`                                               |
| `hooks/`             | Hooks needed by two or more features.                                                  | `hooks`, `lib`, `config`                                           |
| `lib/`               | Framework-free code needed by two or more features.                                    | `lib`, `config`                                                    |
| `config/`            | Static configuration: site name, URLs, constants.                                      | `config`                                                           |

## Inside a feature

Create only the folders a feature needs. An empty folder is noise.

```
src/features/<name>/
├── components/      UI for this feature only
├── hooks/           stateful logic for this feature (custom hooks)
├── server/          data access, Server Functions, upstream clients (server-only)
├── lib/             pure logic and mappers for this feature, with tests
├── types.ts         the feature's domain types
├── index.ts         public API for client and server components
└── server.ts        public API for server-only code (route handlers, Server Functions)
```

- `index.ts` exports what the rest of the app may render or call from the client. It never re-exports anything under `server/`.
- `server.ts` starts with `import "server-only"` (add the `server-only` package with the first server module) and exports what route handlers and Server Components need.
- Tests sit next to the file they cover: `price.ts` and `price.test.ts`.

## Where does this go?

| You are adding                                   | Put it in                                                |
| ------------------------------------------------ | -------------------------------------------------------- |
| A page or a route handler                        | `src/app/`, as thin as possible, delegating to a feature |
| UI used by one feature                           | that feature's `components/`, even if it looks generic   |
| A primitive that knows nothing about any feature | `src/components/ui/`, via `pnpm dlx shadcn add`          |
| Stateful logic used by one feature               | that feature's `hooks/`                                  |
| A hook two or more features need                 | `src/hooks/`                                             |
| A pure function two or more features need        | `src/lib/`                                               |
| A call to an upstream API                        | the feature's `server/`, exposed through `server.ts`     |
| A constant shared across the app                 | `src/config/`                                            |

When two features keep needing each other, they are one feature. Merge them; do not open a path between them. When one feature must show another's UI, the route composes them and passes a slot (`children`, a render prop, or a callback).

## Server and client

- Components are Server Components by default. Add `"use client"` only to the smallest component that needs state, effects, event handlers or browser APIs.
- Data is fetched on the server, in a feature's `server/` module, and passed down as props. Components never call `fetch`; lint enforces it for `components/` folders.
- Secrets never reach the client. If a value would need a `NEXT_PUBLIC_` prefix to work, the design is wrong: put the call behind a route handler or a Server Function.
- Upstream responses are validated at the server boundary and mapped to the feature's types. Components only see our types.

## Rendering and caching

**Cache Components are off.** On Cloudflare Workers they deadlock with Next.js 16.3 and later: the page render hangs until the runtime cancels it (HTTP 500). OpenNext's own test suite is pinned to Next 16.2 for this reason. Do not turn on `cacheComponents` or `partialPrefetching`, and do not use `"use cache"` or `cacheLife`, until OpenNext supports them on our Next version; turning them back on is an ADR, and `pnpm smoke:worker` must pass.

The app uses the caching model Next.js documents as the previous model. Read `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md` before writing data code.

- Pages with no request-time data are prerendered at build time and served as static files.
- `fetch` is uncached by default. Opt in per request with `cache: "force-cache"` or `next: { revalidate, tags }`; use `unstable_cache` for non-`fetch` work; invalidate with `revalidateTag` or `revalidatePath` from a Server Function.
- **On the Worker those caches do not persist between requests.** The app runs on the Workers Free plan without an incremental cache store (see `open-next.config.ts`), so cached data and time-based revalidation live only as long as one request. Persistent server caching needs R2, KV or Durable Objects, and adding one is an ADR.
- Stream slow, request-time data inside `<Suspense>` with a fallback that keeps layout stable.
- Every change to rendering or caching config must pass `pnpm smoke:worker`, which runs the built Worker in the Workers runtime and requires a 200 on every route.

## Deployment

The app runs on Cloudflare Workers through [OpenNext](https://opennext.js.org/cloudflare). `wrangler.jsonc` defines two Workers: `new-market` (production, from `main`) and `new-market-staging` (`--env staging`, from `staging`). `pnpm build:cloudflare` produces the Worker; `pnpm preview:cloudflare` runs it locally in the Workers runtime.
