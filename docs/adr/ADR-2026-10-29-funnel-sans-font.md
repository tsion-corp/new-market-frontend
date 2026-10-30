# ADR-2026-10-29: Funnel Sans for the mobile bottom navigation

- **Status:** Accepted
- **Approved by:** (MarkDavid, 29 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-29-funnel-sans-font-for-dummies.md](ADR-2026-10-29-funnel-sans-font-for-dummies.md)

## Context

[ADR-2026-10-29-web-fonts](ADR-2026-10-29-web-fonts.md) (accepted) loads Funnel Display and Mona Sans. While planning the build, the mobile bottom navigation (Figma component `BNB-19`, node `317:2916`, used in the mobile Home frame `611:5514`) turned out to use a third font: **Funnel Sans** Medium (500), 12 px, for its five labels (Home, Payments, Games, Predictions, Profile). That ADR does not cover it, and an accepted ADR's decision is never edited, so this one adds to it.

Funnel Sans is the text companion of Funnel Display, free on Google Fonts, and a variable font. The owner requires exact fidelity.

## Options considered

### Option A: load Funnel Sans 500 through `next/font/google`

Matches the design. Adds one more small font file, fetched only on screens that show the bottom navigation.

### Option B: render the labels in Funnel Display 500

No extra file, but the labels would not match the design.

## Decision

Option A, on the same terms as the web-fonts ADR: `next/font/google`, `subsets: ["latin"]`, weight 500 only, `display: "swap"`, **not preloaded**, exposed as `--font-funnel-sans` and used only by the bottom navigation labels. Set up in `src/app/layout.tsx` beside the other two fonts. If the Lighthouse run shows it pushing any route below 98, the PR stops and the owner decides.

## Diagram

```
 build: next/font/google ──► self-hosted Funnel Sans 500 (latin)
 request (< 1280 px, bottom nav visible) ──► fetched on first use, not preloaded
```

## Consequences

- The bottom navigation matches the design.
- One more font file, typically 15 to 25 KB, on mobile-layout screens; measured in the PR.
- No packages added.

## Verification

Lighthouse mobile 98 or more on every route (the Lighthouse viewport shows the bottom navigation), with font bytes and CLS reported in the PR; visual check of the bottom navigation against the Figma screenshot.
