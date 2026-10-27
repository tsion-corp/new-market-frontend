# ADR-2026-10-27: TanStack Query for client-side server state

- **Status:** Proposed
- **Approved by:** (maintainer, date)
- **Companion:** [ADR-2026-10-27-client-server-state-tanstack-query-for-dummies.md](ADR-2026-10-27-client-server-state-tanstack-query-for-dummies.md)

## Context

A market shows data that changes while the page is open: prices, order books, balances, positions, order status. Some of it must refresh on a timer or when the tab regains focus, some is paginated, and some changes optimistically when the user acts.

Next.js 16 already covers data on the server: Server Components read it, `"use cache"` with `cacheLife` caches it, `revalidateTag` and `updateTag` invalidate it, and Server Functions write it. What it does not provide is a client-side cache: deduplicated requests across components, background refetching, polling, retries, pagination and optimistic updates in the browser. Without a library, every feature would rebuild that with `useEffect`, which the standards forbid for data fetching.

## Options considered

- **Hand-written hooks over `fetch`:** no dependency, but every feature reimplements caching, deduplication, retries and race handling. Violates DRY and the effect rules.
- **SWR:** small and simple, but weaker mutation, infinite-query and devtools support.
- **TanStack Query v5:** the industry standard for client-side server state. Typed `queryOptions`, Suspense support, a documented App Router pattern (prefetch on the server, hydrate on the client), mutations with cache updates. About 13 KB gzipped.

## Decision

Use TanStack Query v5 for **client-side server state only**.

- Server reads stay in Server Components and feature `server/` modules, cached with `"use cache"`. TanStack Query does not replace Next.js caching.
- TanStack Query is used when data must live and refresh in the browser: polling, refetch on focus or reconnect, pagination and infinite lists, optimistic mutations, data shared by several client components.
- Install `@tanstack/react-query` and `@tanstack/eslint-plugin-query` (exact versions) in the pull request of the first feature that needs it, not before.
- One `getQueryClient()` in `src/lib/query-client.ts`: a new client per request on the server, one shared client in the browser, default `staleTime` of 60 seconds.
- The `QueryClientProvider` lives in the layout of the route group that needs it, not the root layout, so pages without client data (landing, marketing) do not pay for it.
- Each feature defines its queries as `queryOptions` factories in `features/<name>/queries.ts`, with query keys starting with the feature name. Components use them only through a named custom hook (`useMarketPrice`), never `useQuery` directly.
- `queryFn` calls our own route handlers in `app/api/`, never an upstream service directly. Mutations call Server Functions through `useMutation` and update or invalidate the affected queries.
- When a page needs the data on first paint and keeps it fresh afterwards, prefetch on the server with `prefetchQuery` and pass it through `HydrationBoundary`.

## Diagram

```
 Server Component ──prefetchQuery──► QueryClient (per request) ──dehydrate──► HydrationBoundary
                                                                                  │
 Client component ──useMarketPrice()──► useQuery(marketPriceOptions(id)) ◄────────┘
                                              │ refetch, poll, retry
                                              ▼
                                      /api/markets/[id]/price (route handler)
                                              │ validates, maps
                                              ▼
                                       upstream market service
```

## Consequences

- One cache and one pattern for live data in the browser; no hand-written fetching effects.
- Adds about 13 KB gzipped to routes that mount the provider. Kept off routes that do not need it, and checked by Lighthouse (98 or more).
- Two caches exist (Next.js on the server, TanStack Query in the browser). The rule above says which owns what; reviewers reject a feature that uses both for the same data without a reason.

## Verification

The first feature using it ships with hook tests (`renderHook` with a test `QueryClient`), covering loading, success, error and refetch, and a Lighthouse result for its routes.
