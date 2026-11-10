# 0007 — Add dev environment

## Status

Superseded by [0010](0010-manual-environment-deployments.md) for deployment triggers and promotion; dev/test/prod separation remains. Originally accepted; supersedes [0004](0004-environments-and-delivery.md).

## Recorded

2026-11-10

## Source

The user requested an AWS deployment into dev and explicitly selected “Add and deploy dev” when asked whether to use the existing test environment or introduce a third environment.

## Context

Only test and prod existed. A distinct AWS development target is needed for manual infrastructure checks without deploying either CI target.

## Decision

Support dev, test, and prod with separate input files, backend overrides, state keys, buckets, and distributions. Dev uses `dev/website/terraform.tfstate` in the existing shared backend. Allow dev in Terraform and deployment-script validation. Deploy dev manually; preserve the existing test → prod CI sequence and solo development on master. Reuse the same flat Terraform resources in each environment.

## Consequences

Dev creates additional billable AWS resources and has its own state. The shared backend remains externally managed. The Codespace remains local development. Adding dev does not deploy test or prod or automatically add a third pipeline stage. Record verified deployment results separately from this design decision.

## Related documents

- [Environment strategy](../environment-strategy.md)
- [Deployment record](../deployments.md)
- [Terraform commands](../../terraform/commands.md)
