# 0013 — Retire the test environment

## Status

Website trigger superseded by [0014](0014-manual-only-website-delivery.md); Website delivery is manual-only.

Accepted

## Recorded

2026-11-12

## Source

User decision: this personal development and portfolio website needs only dev and prod; destroy the AWS test environment using the existing script and remove it from both pipelines and current documentation.

## Context

A third environment adds maintenance without enough benefit for this small static personal site.

## Decision

Support only dev and prod. Run the existing destroy script for the retired environment before removing its backend override and input file. Preserve the externally managed shared backend and its historical state. Remove the retired target from both workflow dropdowns, Terraform validation, operational scripts, and current guides.

Website continues deploying automatically to dev on master pushes. Both workflows retain manual dev/prod selection; Terraform remains manual-only. Verify changes in dev before manually deploying prod.

This supersedes environment selection in ADRs 0003, 0007, 0008, 0010, 0011, and 0012. Their unrelated decisions remain in effect. Historical ADRs and deployment evidence remain available as history rather than current operating instructions.

## Consequences

Only two deployment targets need configuration and credentials. Reintroducing another environment requires a new decision. This change does not deploy dev or prod, delete the shared backend, or change the static-site scope.

## Related documents

- [Environment strategy](../environment-strategy.md)
- [Deployment record](../deployments.md)
- [Pipeline instructions](../../.github/workflows/README.md)
