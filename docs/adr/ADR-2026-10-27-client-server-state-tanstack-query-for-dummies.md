# Keeping live data fresh in the browser, in plain English

- **Status:** Proposed
- **Technical version:** [ADR-2026-10-27-client-server-state-tanstack-query.md](ADR-2026-10-27-client-server-state-tanstack-query.md)

## What is the problem?

Prices and balances change while someone is looking at the page. The site needs to update them in the background, avoid asking the server for the same thing twice, and retry when the network drops. The framework we use is very good at preparing pages on the server, but it does not manage data that keeps changing inside the open page.

## What are we doing about it?

We will use TanStack Query, the most widely used tool for this job, only for data that has to stay fresh in the browser. Everything that can be prepared on the server stays on the server. We add the tool when the first feature that needs it is built, not before.

## What changes for people?

Users see live numbers update smoothly without reloading. Developers get one standard way to do it instead of each feature inventing its own. Pages that do not show live data stay as small and fast as before.

## What could go wrong?

Having two places that store data could confuse people about which one to use. The rule is written down: server first, the browser tool only for live data. Code review enforces it.
