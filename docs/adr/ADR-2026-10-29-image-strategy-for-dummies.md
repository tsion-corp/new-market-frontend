# How we handle pictures, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-29-image-strategy.md](ADR-2026-10-29-image-strategy.md)

## What is the problem?

The design's pictures (profile photos, the globe, game and prediction images) come out of Figma as huge files, about 14 MB in total, while most are shown smaller than a thumbnail. Sent like that, the page would be slow, especially on phones. Our hosting does not shrink pictures automatically unless we pay for an extra service.

## What are we doing about it?

We shrink each picture once, to the size it is actually shown (doubled for sharp screens), save it in a modern compact format, and ship those small files with the site. Icons and the logo stay as drawings (SVG), which are already tiny. Photos stay photos, because turning a photo into a drawing makes it bigger or makes it look wrong.

## What changes for people?

The page loads fast and pictures look sharp. There is no extra hosting cost. When we add or change a picture, a developer runs one command to shrink it.

## What could go wrong?

Someone could add a picture without shrinking it. Our speed check flags oversized pictures before release. Pictures that will later come from the real system, such as people's own profile photos, will need their own decision when that system exists.
