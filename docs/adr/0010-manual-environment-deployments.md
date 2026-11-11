# 0010 — Manual environment deployments

## Status

Environment selection superseded by [0013](0013-retire-test-environment.md); only dev and prod remain supported. Other decisions below retain their existing status.

Website trigger superseded by [0012](0012-first-portfolio-and-automatic-dev-delivery.md); Terraform manual deployment remains accepted. Originally accepted; supersedes the deployment-trigger and promotion model in [0007](0007-add-dev-environment.md), retaining all three environments.

## Recorded

2026-11-10

## Source

Explicit user request for a button and environment selector on both CI/CD pipelines instead of automatic triggers, following the reference repositories.

## Context

Workflows previously ran on relevant master pushes and promoted test to prod. The user wants direct control of when and where each deployment runs, like Data Platform Demo's manual environment workflow.

## Decision

Use only `workflow_dispatch` on Terraform and Website with a required choice input named `environment`: dev, test, or prod, defaulting to dev. Each run validates/builds as appropriate and deploys only the selected target. Remove automatic push triggers and multi-environment promotion jobs. Continue restricting deployment jobs to master and selecting environment secrets through the target GitHub environment.

Share a concurrency group per environment across workflows. Keep local deployment scripts, account checks, Terraform saved plans, and website release verification. Testing in test before prod is recommended as a manual release sequence rather than an enforced pipeline stage.

## Consequences

Code changes alone do not deploy. GitHub's Run workflow menu controls releases after workflow files reach the default branch. All three GitHub environments need their own AWS configuration. Separate runs rebuild artifacts and do not guarantee the identical artifact across environments. Infrastructure-dependent content requires running Terraform before Website. This change does not run workflows or alter live AWS resources.

## Related documents

- [Pipeline instructions](../../.github/workflows/README.md)
- [Environment strategy](../environment-strategy.md)
- [Reference workflow](https://github.com/Nima-Farhang/Data-Platform-Demo/blob/master/.github/workflows/deploy-environment.yml)
