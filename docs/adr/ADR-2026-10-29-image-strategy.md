# ADR-2026-10-29: Image strategy on Cloudflare Workers

- **Status:** Accepted
- **Approved by:** (MarkDavid, 29 Oct 2026; filled in by the maintainer)
- **Companion:** [ADR-2026-10-29-image-strategy-for-dummies.md](ADR-2026-10-29-image-strategy-for-dummies.md)

## Context

The standards say: images go through `next/image`, and the Cloudflare image strategy is decided in an ADR before the first raster image. The dashboard brings the first ones.

**What Figma exports for the Home screen (checked 2026-10-29):**

| Asset                   | Export                        | Bytes                   | Displayed at                          |
| ----------------------- | ----------------------------- | ----------------------- | ------------------------------------- |
| Header avatar           | PNG 1185 × 1835               | 2,197,669               | 48 × 48                               |
| Transaction avatars (2) | PNG 1254 × 1254               | 1,972,780 and 2,145,623 | 42.94 × 42.94                         |
| Balance card background | PNG 683 × 1024                | 1,025,283               | 445 × 667, behind an 85 % black layer |
| Hero texture            | PNG 1080 × 1440               | 900,650                 | 919 × 1225 at 25 % opacity            |
| Hero globe              | PNG 1448 × 1086               | 1,483,867               | 389.333 × 292                         |
| Game cover              | PNG 1678 × 937                | 1,594,512               | 275.76 × 165                          |
| Prediction images (2)   | PNG 909 × 909 and 1200 × 1500 | 785,459 and 2,040,657   | 325.76 × 165                          |
| USD flag                | PNG 80 × 42                   | 430                     | 24 × 24                               |

About 14 MB of PNG for images shown at a few hundred pixels at most. Served as they are, the page fails Lighthouse performance.

The avatars and pictures are photographs. Converting a photograph to SVG does not make it smaller: the SVG either wraps the same bitmap as base64 text (about a third larger) or traces it into shapes that no longer look like the photo. Every icon, the logo, the glow and the notification bell are already vectors in Figma and ship as SVG.

**How `next/image` behaves on our Worker:** OpenNext serves `/_next/image` through Cloudflare's Images binding (`env.IMAGES`). Without that binding it returns the original file unchanged (`@opennextjs/cloudflare`, `cli/templates/images.js`). `wrangler.jsonc` has no Images binding today. Lighthouse runs against `pnpm start` on Node, where Next resizes images with `sharp`, so Lighthouse would pass while the Worker serves the 2 MB originals.

## Options considered

### Option A: add the Cloudflare Images binding

On-demand resizing on the Worker. It is billed per unique transformation beyond a free allowance, needs the binding in both Workers, and Lighthouse (on Node) would not test it.

### Option B: optimise each image once, commit the result, and turn off runtime optimisation

Each raster image is converted once to AVIF at twice its largest displayed size (sharp on retina screens), committed under `public/images/`, and rendered with `next/image` with `images.unoptimized: true`. The Worker serves the same small files from its static assets as Node does, so Lighthouse measures what users get. No runtime cost, no binding.

### Option C: plain `<img>` tags

Loses `next/image`'s width and height enforcement, lazy loading and priority hints, and breaks the standard.

## Decision

Option B, for images that ship with the code.

- **Vectors stay SVG.** Icons, the logo, the glow and other vector layers are exported from Figma as SVG files, unchanged, into `public/icons/` and `public/images/`, and rendered through `next/image` with their root `width` and `height`.
- **Photographs become AVIF.** Each raster asset is exported at 2× its largest displayed size across the desktop and mobile frames, encoded as AVIF, and committed under `public/images/<area>/`. The source PNGs are not committed.
- **Conversion tool.** `sharp`, already installed with Next.js, is added as an exact-pinned dev dependency, and a script `scripts/optimize-images.mjs` converts `design-exports/` (git-ignored) into `public/images/`. The script is used in the same PR, so Directive 7 is met.
- **`next.config.ts`:** `images: { unoptimized: true }`, so no request ever reaches `/_next/image`, which on our Worker would return originals.
- **Usage:** `next/image` with explicit `width` and `height` (or `fill` with `sizes`), `priority` only on the largest above-the-fold image (the hero globe on desktop, the balance card on mobile), `loading="lazy"` for everything below the fold.
- **Images from data.** User avatars and market or game images will come from the API once it exists. Serving those (Cloudflare Images, R2 or the upstream's own CDN) is a separate ADR at that time. Until then the fixture points at the committed files.

## Diagram

```
 Figma PNG/SVG ──► design-exports/ (git-ignored)
                        │ scripts/optimize-images.mjs (sharp: AVIF at 2× display size)
                        ▼
                  public/images/*.avif, public/icons/*.svg  (committed)
                        │ next build → Worker static assets
                        ▼
 browser ◄── <Image unoptimized width height> ◄── served as-is, same on Node and Worker
```

## Consequences

- Image weight on `/home` goes from about 14 MB to a few hundred kilobytes; exact numbers in the PR.
- Lighthouse results match production because Node and the Worker serve the same files.
- No Cloudflare billing and no new binding.
- Adding or changing an image needs one script run; forgetting it means a missing file, which the build and the smoke test catch.
- One size per image instead of a full set of widths. Fine at these display sizes; a large responsive image in future may need its own decision.
- Packages added: `sharp` (dev dependency, exact version).

## Verification

- Every committed raster file is AVIF and no larger than 2× its displayed size; total image bytes for `/home` reported in the PR.
- Lighthouse mobile 98 or more on every route, with no "properly size images" or "modern formats" findings.
- Worker smoke test returns 200 for `/home`, and a manual check on `pnpm preview:cloudflare` shows the images loading from static assets.
