---
date: 2026-10-29
branch: feat/dashboard
base: dev
scenario-impact: needs_automation
---

# The signed-in Home screen, built from the Figma design

Signed-in users land on `/home`. It shows the balance (hide and show it with the eye button), recent transactions, prediction markets and games, matching the Figma frames at 1440 px and 430 px. A sidebar on desktop and a bottom bar on phones link to the other sections. Each section is a simple placeholder page until it is designed. The app now uses one dark theme and the design's fonts.

## Changes

- **Routes:**
  - New `/home` with loading and error states.
  - New placeholder pages inside the same shell: `/payments`, `/games`, `/predictions`, `/portfolio`, `/trading`, `/help`, `/settings`, `/profile`, `/notifications`, `/transactions` and `/search` (which shows the query).
  - All twelve are added to `lighthouserc.json` and the Worker smoke test.
- **Shell (`src/components/layout`):**
  - Desktop: sidebar and header with search.
  - Phone: top bar and bottom navigation.
  - The current page is marked with `aria-current`.
- **UI primitives (`src/components/ui`):** Button, IconButton, Icon, MaskedIcon, Avatar, SearchField, Card, SectionCard, SectionHeader, Carousel, TextLink, ListRow and Skeleton.
  - Button and Skeleton started from the shadcn originals and were edited to the design.
  - `cn` now knows the theme's font-size and radius tokens, so it no longer drops them.
- **Dashboard feature (`src/features/dashboard`):**
  - Types, a typed fixture behind `getDashboard()` (temporary, per the fixture ADR), and the money formatter (`bigint` cents).
  - `useBalanceVisibility` and the components for balance, transactions, predictions and games.
  - `useCarousel` in `src/hooks`.
- **Theme:**
  - Design tokens in `globals.css`.
  - One dark theme, with `#787878` in place of `#747474` for contrast.
  - The landing paragraph uses the `foreground-secondary` grey, so it passes AA on the page background.
- **Fonts:** Funnel Display (preloaded), Mona Sans 600 and Funnel Sans 500, through `next/font`.
- **Images:**
  - Figma SVGs committed unchanged in `public/icons` and `public/images/brand`.
  - Photos converted to AVIF by `scripts/optimize-images.mjs`. The mobile balance-card background is cropped to the part the card shows, which cuts it from 113 KB to 37 KB.
  - Raster files total about 240 KB, down from 14 MB of PNG exports.
  - `images.unoptimized` is on, per the image ADR.
- **Packages (exact versions):**
  - `server-only` 0.0.1: guards the dashboard server module.
  - `class-variance-authority` 0.7.1: Button and IconButton variants.
  - `radix-ui` 1.8.1: `Slot` for `Button asChild`.
  - `sharp` 0.35.5 (dev): the image script.
- **Docs:** the standards, CONTRIBUTING and the PR template now describe a single dark theme, and the standards' token example names a token that exists.
- **Changes from the owner's review of the running app:**
  - Hero: the globe is anchored to the banner's right edge (as drawn at 1440 px) and sits behind the text, so it moves with the banner as the window resizes.
  - Desktop: the header and the wallet panel stay in place while the hero and sections scroll.
  - Carousels: slides run to both edges while scrolling, with the drawn 20 px (phone) or 24 px (desktop) gap at rest and at the end.
  - Wallet panel: shows the five most recent transactions (three on phones, as drawn), headed "Recent transactions"; the panel fits its content.
  - Wallet panel width: 403.455 px up to 1440 px, then a quarter of each extra pixel, up to 480 px; the balance card and list stretch with it.
  - Borders read through the Figma Plugin API, where the code export had flattened them:
    - Receive and Play Now: the vertical brand gradient.
    - Carousel arrows: the brand gradient at 20 percent opacity; the Next arrow's fill is mirrored as drawn.
    - Profile avatar: a cyan to pink-lilac gradient drawn over the photo.
  - All of these borders use one `band-ring` utility drawn inside the element, matching Figma's inside strokes. Play Now drops an inner highlight that Figma's stroke hides.
  - Navigation: the active link's icon takes the brand gradient and every other icon is plain, in the sidebar (white) and the bottom bar (`#848484`). Icons are drawn as masks of the unchanged SVG files.

## Removed

- The light theme values, the `.dark` block and `@custom-variant dark`.
- The unused `--chart-*`, `--sidebar-*`, `--vng-*` and `--destructive` tokens, and the second `themeColor`.
- The solid `brand-blue` and `avatar-ring` colour tokens, replaced by the gradient borders.
- The fixed 845.911 px wallet panel height and the fixed 352 px card and list widths.

## Verification

- 162 unit tests across 41 files. Each new behaviour was red before green, including loading, empty and error states.
- `pnpm preflight` passes all nine gates. The Cloudflare build succeeds, and the Worker smoke test returns 200 on all 15 routes.
- Lighthouse, mobile, DevTools throttling (`lighthouserc.json`, per ADR-2026-10-29-lighthouse-devtools-throttling), 3 runs per route, final preflight:

  | Route             | Performance (3 runs) | Accessibility, Best Practices, SEO |
  | ----------------- | -------------------- | ---------------------------------- |
  | `/home`           | 98, 98, 98           | 100                                |
  | Every other route | 99 to 100            | 100                                |
  - Under the previous simulated throttling, `/home` scored 92. The ADR explains why.
  - Locally, about one `/home` run in three holds its first paint until 2.7 s and scores 92. No page resource is render blocking, and preloading or not preloading Funnel Display makes no difference. The CI runner has not shown it (three runs at 99). Under investigation.
  - On the CI runner, the mobile logo was the largest element on the placeholder pages and was lazy loaded, so their LCP was about 2.5 s. The logo now loads eagerly.
  - `/home` passes with a narrow margin.

- Visual check in Chrome with device emulation, against Figma renders at 1440 × 968 and 430 × 1474, and against Plugin API exports at 2× to 4× for the borders and navigation icons.
  - Positions match to within the 0.7 px card border.
  - Known differences:
    - Hairline borders thinner than one device pixel (the 0.373 px carousel ring) render at one device pixel.
    - Mobile shows the fixture's markets rather than the frame's placeholder question.
- Not automated yet: an end-to-end scenario for the Home screen (`needs_automation`).
