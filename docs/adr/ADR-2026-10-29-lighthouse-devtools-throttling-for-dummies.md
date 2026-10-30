# Measuring page speed the way a phone sees it, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-29-lighthouse-devtools-throttling.md](ADR-2026-10-29-lighthouse-devtools-throttling.md)

## What is the problem?

Every page must score 98 or more on Google's Lighthouse speed test before it ships. Today the test loads each page at full speed on the build computer, then estimates how slow it would be on a phone. On the build computer some code arrives almost instantly, and on the new Home screen the estimate wrongly counts all of it against the page. Home scores 92 in the estimate, but 98 when the test actually slows the connection down like a real phone.

## What are we doing about it?

We switch the test to really slow down the network and the processor while it loads each page, instead of estimating. The bar stays the same: 98 or more on every page, in every category.

## What changes for people?

Users see no change. The speed check reflects what phone users actually experience. The check takes a few more minutes to run.

## What could go wrong?

Real measurements wobble a little from run to run, so a page could occasionally fail by chance. The test already takes the middle score of three runs. If wobbles still cause failures, we run it more times. We never lower the bar.
