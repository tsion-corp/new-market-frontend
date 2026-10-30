# Dashboard plan

- **Date:** 2026-10-29
- **Branch:** `feat/dashboard`, worktree `.worktrees/feat-dashboard`, cut from `origin/dev`
- **Status:** Accepted

## 1. Scope

Build the signed-in Home screen from Figma file `Xvb6VkxaS6oiCAi6rOXr0G`: desktop frame `592:3565` (1440 × 968) and mobile frame `611:5514` (430 × 1474), with the shared shell and the minimal routes.

Implements these accepted ADRs:

- [ADR-2026-10-29-dashboard-shell-and-routes](../adr/ADR-2026-10-29-dashboard-shell-and-routes.md)
- [ADR-2026-10-29-dashboard-fixture-data](../adr/ADR-2026-10-29-dashboard-fixture-data.md)
- [ADR-2026-10-29-dark-only-theme](../adr/ADR-2026-10-29-dark-only-theme.md)
- [ADR-2026-10-29-web-fonts](../adr/ADR-2026-10-29-web-fonts.md)
- [ADR-2026-10-29-image-strategy](../adr/ADR-2026-10-29-image-strategy.md)

and, if approved, [ADR-2026-10-29-funnel-sans-font](../adr/ADR-2026-10-29-funnel-sans-font.md) (Proposed).

**What the two frames contain** (from Figma, checked 2026-10-29):

| Part        | Desktop (≥ 1280 px)                                                                                                                               | Mobile (< 1280 px)                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Navigation  | Sidebar 237.844 wide: logo, Home, Games, Payments, Predictions, Portfolio, divider, Trading (chevron), and Help and Settings pinned to the bottom | Bottom nav `BNB-19`, 430 × 75, `#1b1b1b`: Home, Payments, Games, Predictions, Profile (Funnel Sans 500, 12 px; inactive `#848484`) |
| Top         | Header: search field 441.852 × 53.739, bell 47.131, avatar 48 with `#71efff` ring                                                                 | Top bar 373 × 44: avatar 44, logo 102.576 × 36 centred, bell 40. No search field                                                   |
| Hero banner | 716 × 228                                                                                                                                         | Not shown                                                                                                                          |
| Balance     | Wallet panel 403.455 × 845.911: balance card 352 × 273, Send and Receive, 7 transaction rows (row 7 cut off by the panel edge, as drawn)          | Balance card 388.103 × 301 with Send and Receive, then a transactions section 390 × 274 showing 3 rows                             |
| Predictions | Section card, two 350-wide cards in a 670-wide row (the second overflows by 42 px)                                                                | Header row, then 278.686-wide cards scrolling sideways                                                                             |
| Games       | Section card, three 300-wide cards in a 670-wide row (scrolls)                                                                                    | Header row, then 278.686-wide cards scrolling sideways                                                                             |
| Scrolling   | The content column is 1328 px tall in a 968 px frame, so the page scrolls; the sidebar stays put                                                  | The page scrolls; top bar and bottom nav stay put                                                                                  |

**Build order.** Parallel agents in the worktree, one per lane, each test-first:

1. Foundation (one agent, first): tokens and theme removal in `globals.css`, fonts and `themeColor` in `layout.tsx`, `next.config.ts` images, `scripts/optimize-images.mjs`, asset export, `server-only`, docs updates.
2. Then in parallel: (a) `components/ui` primitives, (b) `components/layout` shell and the `(app)` layout with the twelve routes, (c) the dashboard feature types, fixture, formatter, server module and hooks.
3. Then: dashboard components composed from (a) and (c), and the `/home` page.
4. Then: full preflight, Lighthouse, side-by-side visual check, release note.

## 2. Files

**Added**

| Layer                 | Path                                                                                                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`                | `(app)/layout.tsx`, `(app)/home/page.tsx`, `(app)/home/loading.tsx`, `(app)/home/error.tsx`                                                                                                     |
| `app/`                | `(app)/{payments,games,predictions,portfolio,trading,help,settings,profile,notifications,search,transactions}/page.tsx`                                                                         |
| `components/layout/`  | `sidebar.tsx`, `nav-link.tsx`, `header.tsx`, `mobile-top-bar.tsx`, `bottom-nav.tsx`, `logo.tsx`, `nav-items.ts`, `placeholder-page.tsx`, tests beside each                                      |
| `components/ui/`      | `button.tsx`, `icon-button.tsx`, `avatar.tsx`, `search-field.tsx`, `card.tsx`, `section-card.tsx`, `section-header.tsx`, `carousel.tsx`, `text-link.tsx`, `list-row.tsx`, `skeleton.tsx`, tests |
| `hooks/`              | `use-carousel.ts` (+ test)                                                                                                                                                                      |
| `features/dashboard/` | `types.ts`, `index.ts`, `server.ts`, `server/fixture.ts`, `server/get-dashboard.ts`, `lib/format-money.ts`, `hooks/use-balance-visibility.ts`                                                   |
| `features/dashboard/` | `components/{dashboard-view,hero-banner,balance-card,transaction-list,transaction-row,prediction-card,game-card,predictions-section,games-section}.tsx`, tests beside each                      |
| `public/`             | `icons/*.svg` (Figma SVG exports, unchanged), `images/dashboard/*.avif`, `images/brand/*.svg`                                                                                                   |
| `scripts/`            | `optimize-images.mjs`                                                                                                                                                                           |
| `docs/`               | `release-notes/2026-10-29-dashboard.md`                                                                                                                                                         |

**Changed**

- `src/app/globals.css`: design tokens in `:root`; shadcn names mapped to them; `color-scheme: dark`; font variables.
- `src/app/layout.tsx`: three `next/font/google` fonts on `<html>`; one `themeColor` `#050606`.
- `next.config.ts`: `images: { unoptimized: true }`.
- `lighthouserc.json`: the twelve new URLs.
- `scripts/worker-smoke.sh`: the twelve new routes in `ROUTES`.
- `knip.json`: `scripts/optimize-images.mjs` as an entry.
- `.gitignore`: `/design-exports/`.
- `package.json`: `server-only` (dependency) and `sharp` (dev dependency), exact versions.
- `docs/engineering-standards.md` lines 135 and 156, `CONTRIBUTING.md` lines 142 and 169, `.github/pull_request_template.md` line 46: one dark theme instead of light and dark.
- `docs/architecture.md`: no change needed; the new folders fit existing layers.

**Removed:** see section 7.

## 3. Interfaces

```ts
// features/dashboard/types.ts
export type Currency = "USD";
export type Money = { amount: bigint; currency: Currency };

export type ImageAsset = { src: string; width: number; height: number; alt: string };

export type TransactionVisual =
  { kind: "icon"; icon: "send" | "receive" } | { kind: "image"; image: ImageAsset };

export type Transaction = {
  id: string;
  title: string;
  counterparty: string;
  amount: Money;
  visual: TransactionVisual;
};

export type PredictionMarket = {
  id: string;
  question: string;
  image: ImageAsset;
  yesPrice: bigint;
  noPrice: bigint;
};

export type Game = { id: string; title: string; description: string; cover: ImageAsset };

export type Dashboard = {
  balance: Money;
  transactions: Transaction[];
  markets: PredictionMarket[];
  games: Game[];
};

// features/dashboard/server/get-dashboard.ts
export function getDashboard(): Promise<Dashboard>;

// features/dashboard/lib/format-money.ts
export function formatMoney(money: Money): string; // 500087n USD -> "$5,000.87", 450000n -> "$4,500"
export function formatCents(cents: bigint): string; // 62n -> "62¢"

// features/dashboard/hooks/use-balance-visibility.ts
export function useBalanceVisibility(): { visible: boolean; toggle: () => void };

// hooks/use-carousel.ts
export function useCarousel(): {
  viewportRef: React.RefCallback<HTMLElement>;
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
};
```

The design draws whole-dollar transaction amounts without cents ("$4,500") and the balance with cents ("$5,000.87"). `formatMoney` drops `.00` and keeps any other cents, which reproduces both.

**Components** (props only, no data fetching):

- `DashboardView({ dashboard }: { dashboard: Dashboard })`: lays out both layouts; the server page passes the fixture result.
- `BalanceCard({ balance }: { balance: Money })` (client: the eye toggle).
- `TransactionList({ transactions }: { transactions: Transaction[] })` (all rows on desktop, the first 3 on mobile, as drawn), `TransactionRow({ transaction })`.
- `PredictionCard({ market })`, `GameCard({ game })`, `PredictionsSection({ markets })`, `GamesSection({ games })` (client only for the carousel buttons).
- `HeroBanner()` (static content from the design).
- `Button` (`cva` variants: `send`, `receive`, `play`, `outcome-yes`, `outcome-no`; `asChild` for links), `IconButton` (variants: `glass`, `ghost`, `carousel`; optional `badge`), `Avatar({ src, alt, size, ring })`, `SearchField({ action, name, placeholder })`, `Card`, `SectionCard`, `SectionHeader({ title, controls })`, `Carousel({ label, children })`, `TextLink({ href, children })` with the arrow, `ListRow({ leading, title, subtitle, trailing })`, `Skeleton`.
- `NavLink({ href, label, icon, weight, trailing })` (client: `usePathname` sets `aria-current="page"` and the active style).
- `PlaceholderPage({ title }: { title: string })`.

## 4. State

| State                         | Owner                            | Hook                                                                                                       |
| ----------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Dashboard data                | Server Component `home/page.tsx` | none: `await getDashboard()`, passed as props                                                              |
| Balance hidden or shown       | `BalanceCard`                    | `useBalanceVisibility` → `useState`; hidden shows "••••••" and the button label switches Hide/Show balance |
| Carousel can scroll back/next | `Carousel`                       | `useCarousel` → `IntersectionObserver` on the first and last item, subscribed in the hook, cleaned up      |
| Active navigation item        | `NavLink`                        | `usePathname`                                                                                              |
| Search query                  | the URL (`/search?q=`)           | none: a plain `form method="get"`; `/search` reads `searchParams`                                          |

No context, no global store, no `useEffect` in components, no `useMemo`/`useCallback` (React Compiler).

## 5. Tests

Vitest and Testing Library, beside each file. Written first; each run red before the code exists.

- `format-money.test.ts`: zero, cents only, whole dollars, thousands separators, very large `bigint`, `formatCents`.
- `get-dashboard.test.ts`: returns the fixture shape; every amount is a `bigint`.
- `use-balance-visibility.test.ts`: starts visible; toggles.
- `use-carousel.test.ts`: `canPrev` false at start; `next` scrolls; flags follow the observer; observer disconnected on unmount.
- `balance-card.test.tsx`: shows "$5,000.87"; eye button hides and restores it; button has an accessible name; Send and Receive link to `/payments`; currency and tour buttons are disabled with names.
- `transaction-list.test.tsx`: renders each row's title, counterparty and amount; icon rows and avatar rows; **empty state** "No transactions yet"; "View all" links to `/transactions`.
- `prediction-card.test.tsx`, `predictions-section.test.tsx`: question, Yes 62¢ / No 38¢ linking to `/predictions`; prev disabled at start; **empty state** "No markets right now".
- `game-card.test.tsx`, `games-section.test.tsx`: title, description, Play Now linking to `/games`; **empty state** "No games right now".
- `sidebar.test.tsx`, `bottom-nav.test.tsx`, `nav-link.test.tsx`: every item links to its route; the current route has `aria-current="page"`.
- `header.test.tsx`, `mobile-top-bar.test.tsx`: search form submits `GET /search` with `q`; bell links to `/notifications` and is named "Notifications, unread"; avatar links to `/profile`.
- `home/loading.tsx` and `home/error.tsx`: **loading** renders skeletons with the same box sizes; **error** shows a message and a "Try again" button that calls `reset`.
- `placeholder-page.test.tsx`: one `h1` with the page title.
- `components/ui` primitives: variants render the right classes; disabled states; keyboard focus.

## 6. UI

Values come from Figma as given and live in `globals.css` tokens. Sketches show structure only.

**Desktop, ≥ 1280 px** (exact at 1440):

```
┌──────────┬───────────────────────────────────────────────────────────────┐
│ Logo     │ [🔍 Search Market            ]                    (🔔) (◯)    │
│          │ ┌───────────────────────────────┐ ┌────────────────────────┐   │
│ ▣ Home   │ │ Your Money, More      (globe) │ │ ┌ balance card ──────┐ │   │
│ ◇ Games  │ │ Possibilities                 │ │ │ (USD) (tour)       │ │   │
│ ◇ Paym.  │ └───────────────────────────────┘ │ │ Total balance (👁) │ │   │
│ ◇ Pred.  │ ┌ Stake your opinions ─ (<)(>) ─┐ │ │ $5,000.87          │ │   │
│ ◇ Portf. │ │ [card 350] [card 350 →        │ │ │ [Send] [Receive]   │ │   │
│ ──────── │ └───────────────────────────────┘ │ └────────────────────┘ │   │
│ ◇ Trad.˅ │ ┌ Trending Games ─────── (<)(>) ┐ │ Last  transactions  View│   │
│          │ │ [game 300][game 300][game →   │ │ ○ Sent Money   $4,500  │   │
│ ◇ Help   │ └───────────────────────────────┘ │ ○ … 7 rows, 7th cut    │   │
│ ◇ Sett.  │                                   └────────────────────────┘   │
└──────────┴───────────────────────────────────────────────────────────────┘
```

- Sidebar `position: sticky`, full viewport height, so Help and Settings stay at the bottom as drawn.
- Wallet panel fixed at 403.455 wide. The left column takes the remaining width: 716 at 1440 (exact), wider above 1440 (more cards visible, hero art anchored left as drawn), narrower down to 1280 (the hero clips more of the globe; carousels scroll).

**Mobile, < 1280 px** (exact at 430):

```
┌──────────────────────────┐
│ (◯)     [logo]      (🔔) │
│ ┌ balance card ────────┐ │
│ │ $5,000.87            │ │
│ │ [Send]   [Receive]   │ │
│ └──────────────────────┘ │
│ Last  transactions  View │
│ ○ Sent Money     $4,500  │  3 rows
│ Stake your opinions (<)(>)│
│ [card 278.686][card →    │
│ Trending Games     (<)(>)│
│ [game 278.686][game →    │
├──────────────────────────┤
│ Home Paym. Games Pred. Pro│  fixed, 75 tall
└──────────────────────────┘
```

- Content keeps the frame's 20 px side margins. **Proposal for 431 to 1279 px** (not designed): the same mobile layout, content column capped at 640 px and centred, so the balance card and rows do not stretch across a tablet; carousels show more cards as width grows.
- Bottom padding equals the bottom nav height plus the safe-area inset so the last card is never hidden.

**States not in the design** (proposal, using only design colours):

- **Hover:** inactive nav items get the active background `#242626`; outline buttons and cards raise the border from 10 % to 20 % white; links underline.
- **Focus:** a 2 px `#00FED6` outline (from the brand gradient) with 2 px offset on every focusable element, `:focus-visible` only.
- **Pressed/disabled:** disabled controls use the design's own 40 % opacity (the drawn "previous" button).
- **Loading** (`home/loading.tsx`): the same panels and cards at the same sizes, filled with `#1a1b1b` blocks, no shimmer (respects reduced motion), so nothing shifts when data arrives.
- **Empty:** inside the same panel, one line in `#787878`, 16 px Funnel Display 600: "No transactions yet", "No markets right now", "No games right now".
- **Error** (`home/error.tsx`): inside the shell, a `#050606` panel with radius 33.621, the message "We couldn't load your dashboard." in white 600, and a "Try again" button in the Receive style.

## 7. Removal

- `globals.css`: the light values in `:root`, the whole `.dark` block, `@custom-variant dark`, the `--chart-*` and `--sidebar-*` tokens if no component uses them, and Vengeance `--vng-*` values that the design replaces. Knip and `rg` confirm nothing references what is removed.
- `layout.tsx`: the second `themeColor` entry and both light/dark media queries.
- The landing page at `/` stays and renders in the dark theme; no landing code is removed.
- No package is removed. Added: `server-only`, `sharp` (dev), and any shadcn or Vengeance dependency only when a primitive that needs it is added, each pinned and named in the PR.
- Temporary by decision: `features/dashboard/server/fixture.ts`, removed when the API ADR lands.

## 8. Lighthouse

- Routes: `/` plus the twelve new routes, all in `lighthouserc.json`, three runs each, median 0.98 or more in every category. The Lighthouse viewport (412 × 823) shows the mobile layout.
- **Performance:** Server Components by default; client code limited to `NavLink`, `BalanceCard`, the carousel sections and `error.tsx`. Images are committed AVIF at 2× display size with explicit dimensions; the largest above-the-fold image on mobile (the balance card background) gets `priority`, everything below the fold is lazy. Fonts self-hosted, Funnel Display preloaded, the others not. No layout shift: every image, skeleton and font fallback has reserved space.
- **Accessibility:** one `h1` per page (visually hidden "Home" on `/home`, since the design has no visible page title); landmarks `nav`, `header`, `main`; every icon button named; `#787878` instead of `#747474`; all other text pairs measured at 4.6:1 or more.
- **Best practices / SEO:** no console errors; each page sets `metadata.title`; links have real `href`s.
- Before and after numbers for every route go in the PR, with font and image bytes.
