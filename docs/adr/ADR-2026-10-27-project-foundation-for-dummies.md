# How the new market app is built, in plain English

- **Status:** Proposed
- **Technical version:** [ADR-2026-10-27-project-foundation.md](ADR-2026-10-27-project-foundation.md)

## What is the problem?

We are starting the market website from scratch. The old one worked, but over time it collected unused code, extra libraries and messy notes in the code, which made it slower to change. We want the new one to start clean and stay clean.

## What are we doing about it?

We organise the code by product area (markets, portfolio, and so on), so everything about one area sits in one place. Automatic checks run every time someone saves work: they block messy notes in the code, unused files and libraries, code placed in the wrong folder, and any page that is not perfectly fast, accessible and search-friendly. AI assistants follow written rules, and a person must approve every big decision before they start.

## What changes for people?

Users get a site that loads fast on phones and works with screen readers. The team gets code that is easier to find and change. Each change takes a few extra minutes of automatic checking before it can be merged.

## What could go wrong?

The checks could feel strict and slow the team down. If a rule proves wrong, we change the rule openly with a new decision record rather than working around it.
