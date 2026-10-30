# Keeping the speed test's reports, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-30-lighthouse-ci-reports.md](ADR-2026-10-30-lighthouse-ci-reports.md)

## What is the problem?

The speed test on each pull request writes a detailed report for every page, and the build is supposed to keep those reports. Because of one missing setting, it has been throwing them away. Now the test says ten simple pages are slightly too slow on GitHub's computers, while they are fast on ours, and without the reports we cannot see why.

## What are we doing about it?

We turn on the setting so the reports are kept with every test run.

## What changes for people?

Users see no change. Developers can open the reports when a speed test fails, instead of guessing.

## What could go wrong?

Very little: the reports use a small amount of storage, which GitHub deletes automatically after 90 days.
