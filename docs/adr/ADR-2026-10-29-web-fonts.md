# ADR-2026-10-29: Funnel Display and Mona Sans through next/font

- **Status:** Accepted
- **Approved by:** (MarkDavid, 29 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-29-web-fonts-for-dummies.md](ADR-2026-10-29-web-fonts-for-dummies.md)

## Context

The standards default to the system font stack and allow a web font only through `next/font`, with `display: "swap"`, and with a Lighthouse run in the PR proving the page still scores 98 or more.

The design uses:

- **Funnel Display** for almost all text, in weights 400 (search placeholder), 500 (questions, "Total balance", Help, Settings), 600 (navigation, headings, buttons) and 700 (balance, transaction rows, game titles).
- **Mona Sans** SemiBold (600) in two places only: the "USD" currency pill (14.128 px) and the "Receive" button (15.611 px).
- Geist and Inter appear only inside the logo artwork, which ships as an SVG, so they need no font file.

Both fonts are free on Google Fonts and both are variable fonts. The owner requires exact fidelity, so both are loaded.

## Options considered

### Option A: system fonts only

Fastest, but every screen would look different from the design.

### Option B: `next/font/google`

Next.js downloads the font files at build time and serves them from our own domain, so no request goes to Google when someone visits. It generates a matching fallback font to limit layout shift and can preload the main font.

### Option C: font files committed to the repo with `next/font/local`

Same runtime result as B, but we would have to download, subset and update the files ourselves.

## Decision

Option B.

- Funnel Display: `next/font/google`, `subsets: ["latin"]`, the variable font (covers 400 to 700), `display: "swap"`, preloaded, exposed as `--font-funnel-display` and used as the default sans font in `globals.css`.
- Mona Sans: `next/font/google`, `subsets: ["latin"]`, weight 600 only, `display: "swap"`, **not preloaded** (it styles two short labels), exposed as `--font-mona-sans` and used only by those two elements.
- Both are set up once in `src/app/layout.tsx` on `<html>`.
- If the PR's Lighthouse run shows either font pushing any route below 98, the PR stops and the owner decides; the fonts are not quietly swapped.

## Diagram

```
 build: next/font/google ──downloads──► .next static font files (self-hosted)
 request: browser ──► our Worker assets ──► Funnel Display (preloaded), Mona Sans (on use)
 no runtime request to fonts.googleapis.com
```

## Consequences

- Text matches the design.
- More bytes on first load: roughly 30 to 60 KB for Funnel Display's Latin variable file, and a smaller Mona Sans file fetched when first used. Measured in the PR.
- The build needs network access to Google Fonts (CI already has it).
- No packages added: `next/font` ships with Next.js.

## Verification

- Lighthouse mobile, 98 or more in every category, on `/home` and every other route, with the before and after numbers in the PR.
- No layout shift from font swap (CLS reported in the same run).
- Visual check of text against the Figma screenshots.
