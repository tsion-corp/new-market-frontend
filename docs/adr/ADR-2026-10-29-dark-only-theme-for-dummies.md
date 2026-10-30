# A dark-only look, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-29-dark-only-theme.md](ADR-2026-10-29-dark-only-theme.md)

## What is the problem?

The project was set up expecting both a light and a dark look, but the designer only drew a dark one. Keeping a light look nobody designed means guessing at it and testing it forever. Separately, one grey in the transaction list is slightly too faint to read comfortably, and our accessibility check fails it.

## What are we doing about it?

The app will have one look: the dark one from the design, with the designer's exact colours, sizes and spacing stored in one place. We remove the unused light look and update our written rules to match. The faint grey becomes a very slightly lighter grey, a difference most people will not notice, so the text passes the readability check.

## What changes for people?

The app looks exactly like the design. People with weaker eyesight can read the transaction list more easily. Adding a light look in future would need a new design and a new decision.

## What could go wrong?

The designer may want a different grey. Any replacement must still pass the readability check, and our automatic checks will catch it if it does not.
