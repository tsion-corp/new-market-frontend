# Giving the speed check enough time to finish, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-30-lighthouse-ci-timeout.md](ADR-2026-10-30-lighthouse-ci-timeout.md)

## What is the problem?

Every pull request runs Google's Lighthouse speed test on all 13 pages. Yesterday we switched the test to slow the connection down like a real phone, which is more accurate but takes longer. GitHub stops the test after 15 minutes, and it now needs about 18. So the test was stopped before the last two pages, and the pull request was blocked even though nothing failed.

## What are we doing about it?

We give the speed test up to 30 minutes instead of 15. The test itself, and the 98 or more bar it enforces, stay exactly the same.

## What changes for people?

Users see no change. Developers wait a few more minutes for the speed result on each pull request.

## What could go wrong?

Each new page adds about a minute, so the test will outgrow 30 minutes once the app has roughly 23 pages. Before then we will split it into several tests that run side by side, with its own decision.
