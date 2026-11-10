# 0005 — Codespaces and AWS authentication

## Status

Accepted

## Recorded

2026-11-10

## Source

User requirement for GitHub Codespaces and preference for Data Product Demo AWS setup; credentials and AWS connectivity were configured during repository setup.

## Context

Development needs reproducible tooling and authenticated AWS access without storing credentials in Git.

## Decision

Use the devcontainer for Node/npm, Terraform, and AWS CLI tooling. Follow Data Product Demo's environment-variable credential approach: access key ID and secret access key, with an optional session token for temporary credentials. Keep Codespaces secrets separate from GitHub Actions environment secrets. The current target is account `210006516097` in `ap-southeast-2`.

## Consequences

The frontend can be developed without AWS credentials. Initialization must not expose secret values. The existing shared backend is consumed rather than provisioned. An OIDC migration or additional IAM infrastructure is not implied by the platform sample and remains a separate decision.

## Related documents

- [Security model](../security-model.md)
- [Setup](../../README.md)
