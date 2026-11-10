# 0004 — Environments and delivery

## Status

Accepted

## Recorded

2026-11-10

## Source

User requirements for two environments, separate website and infrastructure pipelines, and test-before-prod promotion. Artifact verification and concurrency details describe the implemented delivery design.

## Context

One developer needs repeatable releases with a pre-production stage and separate application/infrastructure changes.

## Decision

Use exactly `test` and `prod` deployed environments. Work directly on `master` without a branching strategy. Use separate GitHub Actions workflows for website and Terraform, each promoting test before prod. Reuse operational scripts locally and in CI. The website builds once and promotes the same verified artifact; Terraform applies a saved plan separately for each environment.

## Consequences

The Codespace is local development rather than a third deployed environment. A shared concurrency group prevents overlapping releases but does not order the two workflows; infrastructure must exist before website deployment. Environment approval rules are optional, not a new mandatory approval step.

## Related documents

- [Environment strategy](../environment-strategy.md)
- [Pipeline operations](../../.github/workflows/README.md)
