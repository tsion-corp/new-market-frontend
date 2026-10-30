# ADR-2026-10-29: Typed fixture as the dashboard's temporary data source

- **Status:** Accepted
- **Approved by:** (MarkDavid, 29 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-29-dashboard-fixture-data-for-dummies.md](ADR-2026-10-29-dashboard-fixture-data-for-dummies.md)

## Context

The dashboard shows a balance, recent transactions, prediction markets and games. No backend API exists yet. Directive 4 forbids dummy data standing in for a broken upstream, so the only honest ways forward are to wait for the API or to record an explicit, approved, temporary data source. The product owner chose the second.

## Options considered

### Option A: wait for the API

No temporary code, but the dashboard cannot be built or reviewed until the backend exists.

### Option B: hard-code values inside components

Fast, but components would hold data, money would end up as strings or numbers, and replacing it later would touch every component.

### Option C: a typed fixture behind the feature's server module

The fixture returns exactly the domain types the real API will be mapped to. Components receive props and never know where the data came from. Replacing it later changes one server module.

## Decision

Option C.

- `src/features/dashboard/types.ts` defines the domain types: `Balance`, `Transaction`, `PredictionMarket`, `Game` and `Dashboard`.
- Money is `bigint` in base units (cents), never `number`: the balance, each transaction amount and each outcome price ("Yes 62¢" is `62n`). Formatting into "$5,000.87" lives in a tested pure function in `src/features/dashboard/lib/`.
- `src/features/dashboard/server/fixture.ts` holds the values drawn in Figma, typed as those domain types. `src/features/dashboard/server/get-dashboard.ts` exposes `getDashboard(): Promise<Dashboard>`, which reads the fixture today.
- `src/features/dashboard/server.ts` starts with `import "server-only"` and exports `getDashboard`. The `/home` page calls it in a Server Component and passes the result down as props.
- No client fetching and no route handler yet, so TanStack Query is not installed (its ADR says to add it with the first feature that needs client-side server state).
- When the API exists, a new ADR covers it, `get-dashboard.ts` calls it, validates the response and maps it to the same types, and `fixture.ts` is deleted in the same change.

## Diagram

```
 app/(app)/home/page.tsx (Server Component)
        │ await getDashboard()
        ▼
 features/dashboard/server.ts ──► server/get-dashboard.ts ──► server/fixture.ts   (today)
                                          │
                                          └────────────────► upstream API          (later, new ADR)
        │ Dashboard (our types, bigint money)
        ▼
 features/dashboard components (props only)
```

## Consequences

- The dashboard can be built and reviewed now, with the same types and boundaries the real data will use.
- The values on screen are not real. Anyone reviewing the staging site must know this; the release note says so.
- One temporary file to remove later, recorded here so it is not forgotten.
- Packages added: `server-only` (exact version), which the architecture says to add with the first server module.

## Verification

- Unit tests for the money formatter (zero, cents, thousands, large values) and for `getDashboard` returning valid domain types.
- Component tests render from typed props, including empty lists.
- `pnpm typecheck` proves no `number` money reaches the components.
