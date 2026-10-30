# ADR-2026-10-29: One dark theme, with tokens taken from Figma

- **Status:** Accepted
- **Approved by:** (MarkDavid, 29 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-29-dark-only-theme-for-dummies.md](ADR-2026-10-29-dark-only-theme-for-dummies.md)

## Context

Every Tsion Market frame in Figma is dark. There is no light design, and the file defines one variable (`color/grey/10` = `#ffffff`) and no light/dark modes. Every other colour, radius, size and spacing is a raw value on the layers.

The scaffold expects two themes. `src/app/globals.css` holds the shadcn light tokens in `:root`, a `.dark` block and `@custom-variant dark`, and nothing ever sets the `.dark` class. `src/app/layout.tsx` declares two `themeColor` values. The written rules assume both themes:

- `docs/engineering-standards.md`: "Dark mode uses the `.dark` class and the `.dark` token block. Every component works in both." and "Text contrast meets WCAG AA in light and dark themes."
- `CONTRIBUTING.md`: verify "in light and dark mode"; screenshots "light and dark".
- `.github/pull_request_template.md`: testing "in light and dark mode".

The product owner decided the product is dark only.

One design colour cannot ship as drawn. The transaction list's header, subtitles and amounts use `#747474` on `#050606`, a contrast of **4.34:1**. WCAG AA needs 4.5:1 for text of that size (12 px and 16 px), and Lighthouse's accessibility audit fails it, which breaks Directive 9. Every other text colour in the design passes (the lowest is `#969696` on `#1a1b1b` at 5.84:1).

## Options considered

### Option A: keep two themes and invent a light theme

Matches the current rules, but nobody designed a light theme, so we would be guessing at half the product and testing it forever.

### Option B: one dark theme

Matches the design. The unused light tokens, the `.dark` block and the dark variant are removed, and the rules that mention two themes are updated in the same change.

## Decision

Option B.

- The design's values become the only theme, defined once in `:root` in `globals.css` and exposed through `@theme inline` as Tailwind utilities. Components use only these tokens, never raw hex values.
- Values are kept exactly as Figma gives them, fractions included (`--radius-panel: 33.621px`, `--size-nav-item: 61.7px`, `--text-nav: 14.927px`). The brand gradient read from the "new gradient style logo" paint style becomes one token: `#1181FF 0%`, `#00FED6 50%`, `#CFA9F0 75%`, `#FBD2D4 100%`.
- Removed: the shadcn light values, the `.dark` block, `@custom-variant dark` and any token no component uses (knip and review check this). shadcn token names that primitives depend on (`--background`, `--foreground`, `--border`, `--ring` and so on) are kept and given the design's dark values.
- `layout.tsx` declares one `themeColor`, the page background `#050606`, and `color-scheme: dark` is set so form controls and scrollbars render dark.
- **The one exception to exact fidelity:** `#747474` becomes `#787878` (4.59:1), the closest grey that passes AA on `#050606`. The visible difference is 4 steps out of 255. If the designer prefers another value, it must also pass 4.5:1.
- The same change rewrites the two-theme rules: the standards say the app has one dark theme and text contrast meets WCAG AA; CONTRIBUTING and the PR template drop "light and dark".

## Diagram

```
 Figma values ──► globals.css :root (single dark theme) ──► @theme inline ──► Tailwind utilities
                                                                                 │
                                                       components/ui, layout, features
 removed: light :root values, .dark block, @custom-variant dark, second themeColor
```

## Consequences

- What is built matches what is designed, and there is no untested second theme.
- Simpler CSS and fewer rules to follow.
- Adding a light theme later needs a new ADR and a design.
- One colour differs from Figma by a barely visible amount, so the product passes accessibility checks.
- Docs updated in the same change: `docs/engineering-standards.md`, `CONTRIBUTING.md`, `.github/pull_request_template.md`.
- No packages added or removed.

## Verification

- Lighthouse accessibility 98 or more on every route; no colour-contrast failures.
- `rg "\.dark|dark:" src` returns nothing; `rg "#[0-9a-fA-F]{3,8}" src --glob '!globals.css'` returns only the `themeColor` in `layout.tsx`.
- Visual check against the Figma screenshots.
