# ADR-2026-10-29: Dashboard, app shell and routes

- **Status:** Accepted
- **Approved by:** (MarkDavid, 29 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-29-dashboard-shell-and-routes-for-dummies.md](ADR-2026-10-29-dashboard-shell-and-routes-for-dummies.md)

## Context

The designer delivered the signed-in Home screen first (Figma file `Xvb6VkxaS6oiCAi6rOXr0G`, frame `592:3565`, 1440 × 968, and the mobile frame `611:5514`, 430 × 1474). It is the first product screen in the new scaffold, so it also sets the shape every later signed-in page will use: a sidebar and header on desktop, a top bar and bottom navigation on mobile, and content beside them.

Today the app has one route, `/`, which renders the landing `Hero`. A separate landing design exists, so `/` stays the public landing page.

The design links to places that have no screens yet: Payments, Games, Predictions, Portfolio, Trading, Help, Settings, Profile, notifications, search and "View all" transactions. The standards forbid dead UI (no links to `#`). The product owner chose to give each of them a minimal real route now.

The owner also requires pixel-exact fidelity: widths, heights, padding, fonts and text exactly as drawn in Figma, including fractional values (`15.923px`, `61.7px`, `14.927px`) and the small inconsistencies between similar elements.

## Options considered

### Option A: dashboard at `/`, replacing the landing hero

Shortest URL, but removes the landing page that has its own design, and mixes the public and signed-in shells in one tree.

### Option B: dashboard at `/home` inside an `(app)` route group

The route group's layout owns the signed-in shell, so every signed-in page gets it without repeating it. `/` keeps the landing page. Costs one extra URL segment.

### Option C: build only the designed screen and leave undesigned links out

Smallest change, but the sidebar and bottom navigation would not match the design. Rejected by the owner.

## Decision

Option B, with minimal routes for every undesigned destination.

- **Routes.** `src/app/(app)/layout.tsx` renders the shell. Pages: `/home` (the dashboard), `/payments`, `/games`, `/predictions`, `/portfolio`, `/trading`, `/help`, `/settings`, `/profile`, `/notifications`, `/search` and `/transactions`. Each minimal page renders inside the shell with one `h1` naming the page and one line saying the page is not designed yet. All twelve are added to `lighthouserc.json` and to `ROUTES` in `scripts/worker-smoke.sh`.
- **Where links go.** Sidebar and bottom-nav items link to their routes. Search is a real `form` that submits `GET /search?q=`, so it works without JavaScript. The bell links to `/notifications`, the avatar to `/profile`, "View all" to `/transactions`, Send and Receive to `/payments`, prediction cards and their Yes/No buttons to `/predictions`, and "Play Now" to `/games`. Trading has a chevron but no submenu is drawn, so for now it is a plain link to `/trading`.
- **Controls with real behaviour now.** The eye button hides and shows the balance (client state in a custom hook). Carousel previous and next buttons scroll their row and disable at each end, as the design's 40 % opacity "previous" button shows.
- **Controls with no destination and no behaviour.** The currency pill ("USD") and the "take a tour" button render as drawn, as disabled buttons with accessible names, until their behaviour is designed.
- **Layers.**
  - `src/components/layout/`: `Sidebar`, `NavItem`, `Header`, `MobileTopBar`, `BottomNav`, `Logo`.
  - `src/components/ui/`: primitives repeated across features, added through shadcn or Vengeance UI where one matches and edited to the design: `Button` (`cva` variants for each drawn style), `IconButton`, `Avatar`, `SearchField`, `Card`, `SectionCard`, `SectionHeader`, `Carousel`, `TextLink`, `ListRow`.
  - `src/features/dashboard/`: `HeroBanner`, `BalanceCard`, `TransactionList`, `PredictionCard`, `GameCard`, the dashboard page component, its hooks, types and server module. Prediction and game cards move to their own features when those features are built.
- **Fidelity.** Values are taken from Figma as given, fractions included, and stored as tokens in `globals.css` (see the theme ADR). The desktop frame is matched at 1440 px and the mobile frame at 430 px. Widths in between, which the design does not show, are a responsive proposal in the plan. Inconsistencies between similar elements (two nav radii, Receive in Mona Sans and 0.37 px shorter than Send, Yes filled and No not, row 6 "Sent Money" with the receive icon) are reproduced as drawn.
- **States the design does not show** (hover, focus, loading, empty, error) are proposed in the plan using only colours already in the design.

## Diagram

```
 src/app/(app)/layout.tsx ──► components/layout: Sidebar | Header | MobileTopBar | BottomNav
          │
          ├─ home/page.tsx ──► features/dashboard (index.ts, server.ts)
          │                        │ HeroBanner, BalanceCard, TransactionList,
          │                        │ PredictionCard, GameCard
          │                        ▼
          │                  components/ui: Button, IconButton, Avatar, Card,
          │                  SectionCard, SectionHeader, Carousel, TextLink, ListRow
          │
          └─ payments | games | predictions | portfolio | trading | help |
             settings | profile | notifications | search | transactions
             (minimal pages: h1 + one line, inside the shell)

 src/app/page.tsx (/) ──► features/landing  (unchanged)
```

## Consequences

- Every signed-in page gets the shell from one layout; later screens only add their content.
- The navigation matches the design and has no dead links.
- Twelve new routes: Lighthouse CI (3 runs each) and the Worker smoke test take longer.
- Eleven routes are placeholders. Each one is replaced, not duplicated, when its design arrives (Directive 6).
- Fractional pixel values are harder to read in code than whole numbers. Tokens keep them in one place.
- Packages: shadcn and Vengeance primitives are added only as each is used. Their own dependencies (for example `framer-motion` for Vengeance components) are recorded in the PR with pinned versions.

## Verification

- Behaviour tests for each component: rendering, keyboard focus, the balance toggle, carousel limits, links and their targets, and loading, empty and error states.
- A side-by-side visual check of `/home` against the Figma screenshots at 1440 × 968 and 430 × 1474.
- `pnpm preflight` clean, including Lighthouse 98 or more on all twelve routes and a 200 from each route in the Worker smoke test.
