# 0014 — Manual-only Website delivery

## Status

Accepted

## Recorded

2026-11-12

## Source

User decision: remove the automatic push trigger from the Website workflow.

## Context

The Website workflow deployed dev on every master push. The user now wants manual control of website deployments.

## Decision

Remove the Website push trigger and use only `workflow_dispatch`, with dev or prod selection and dev as the default. Use the selected input directly for the deployment name, GitHub environment, script environment, and concurrency group. Keep the master deployment restriction, artifact verification, shared scripts, and per-environment concurrency.

Terraform remains manual-only. Pushing commits makes revisions available but does not start either deployment workflow. This supersedes the Website trigger decisions in [0012](0012-first-portfolio-and-automatic-dev-delivery.md) and [0013](0013-retire-test-environment.md); their other decisions remain in effect.

## Consequences

Start Website manually in GitHub Actions after pushing the desired revision. This change does not deploy a website or infrastructure.

## Related documents

- [Pipeline instructions](../../.github/workflows/README.md)
- [Environment strategy](../environment-strategy.md)
