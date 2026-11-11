# 0012 — First portfolio and automatic dev delivery

## Status

Environment selection superseded by [0013](0013-retire-test-environment.md); only dev and prod remain supported. Other decisions below retain their existing status.

Accepted; replaces the Website trigger rule in [0010](0010-manual-environment-deployments.md). Terraform's manual-only deployment rule remains in effect.

## Recorded

2026-11-10

## Source

Explicit user request for a small first-draft portfolio, colours and CSS from Full-Stack-WebApp-Demo, public repository introductions based on READMEs, automatic website build/deployment to dev when committing to master, and deployment of this draft to AWS dev.

## Context

The frontend was a placeholder, and both workflows were manual-only. Dev hosting already exists; test and prod were destroyed separately and must not be automatically recreated.

## Decision

Build one React/TypeScript page with a personal introduction and five public repository summaries and links. Reuse the navy/teal Lux CSS template from the supplied reference with local responsive overrides and retained license attribution. Keep project copy in static typed content, with no runtime GitHub integration, private repository content, backend, compute connection, or customer data.

Add an unfiltered `push` trigger for the Website workflow on master: each push builds and deploys only to dev. GitHub receives pushed commits, so a local commit alone does not start Actions. Retain manual dev/test/prod selection and the master-branch deployment restriction. Resolve push runs to dev explicitly in the job environment, script environment, and concurrency group. Terraform stays manual-only, and test/prod stay manual targets.

## Consequences

Every master push, including documentation-only changes, refreshes dev. It never automatically deploys infrastructure, test, or prod. Dev hosting must exist and the GitHub dev environment needs AWS credentials. The initial draft may be deployed using the same local scripts and Codespaces credentials; installing the workflow locally does not activate it remotely until pushed. The www.farhang.io/prod domain work remains separate and unchanged.

## Related documents

- [Portfolio sources and editing](../portfolio-content.md)
- [Pipeline instructions](../../.github/workflows/README.md)
- [Verified deployments](../deployments.md)
