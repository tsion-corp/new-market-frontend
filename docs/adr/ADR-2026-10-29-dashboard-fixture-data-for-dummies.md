# Using sample data until the real system is ready, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-29-dashboard-fixture-data.md](ADR-2026-10-29-dashboard-fixture-data.md)

## What is the problem?

The Home screen shows a balance, transactions, predictions and games. The system that will supply the real figures does not exist yet. Our rules forbid quietly filling screens with made-up numbers, so we need an open, approved decision to do it for now.

## What are we doing about it?

We will use the sample figures from the design, kept in one clearly named file and shaped exactly the way the real figures will be. The screen does not know where its figures come from. When the real system is ready, we change that one file's source and delete the sample file.

## What changes for people?

People can see and review the finished Home screen now, but the figures on it are not real. Anyone testing the site will be told. Connecting the real system later is a small change, not a rebuild.

## What could go wrong?

Someone could mistake the sample figures for real ones. The release note says clearly that they are samples, and the sample file is recorded here so it is removed when the real data arrives.
