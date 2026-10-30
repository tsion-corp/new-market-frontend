# Using the design's fonts, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-29-web-fonts.md](ADR-2026-10-29-web-fonts.md)

## What is the problem?

By default the site uses the fonts already on each person's device, because they load instantly. The design uses two specific fonts, Funnel Display almost everywhere and Mona Sans on two small labels. Without them the site will not look like the design.

## What are we doing about it?

We will include both fonts with the site itself, so visitors download them from us, not from Google. The main font loads first; the second one loads only when needed. Text shows straight away in a similar-looking font and switches as soon as the real one arrives.

## What changes for people?

The site looks like the design. The first visit downloads a little more, typically less than one small photo. We measure the speed before and after and report it.

## What could go wrong?

The fonts could slow the site below our speed target. We check that on every page before release, and if it happens we stop and decide together, rather than quietly changing the design.
