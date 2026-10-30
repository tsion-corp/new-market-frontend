# A third font for the phone menu, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-29-funnel-sans-font.md](ADR-2026-10-29-funnel-sans-font.md)

## What is the problem?

We already agreed to use two fonts from the design. Looking closer, the menu at the bottom of the phone screen uses a third one, Funnel Sans, a sister font of the main one. The earlier decision did not include it.

## What are we doing about it?

We include Funnel Sans the same way as the other two: shipped with the site, only the one weight the design uses, and loaded only when the phone menu is on screen.

## What changes for people?

The phone menu looks exactly like the design. Phones download one more small file the first time, and we measure that the site stays fast.

## What could go wrong?

The extra file could slow the site below our target. We check every page before release and stop to decide together if it does.
