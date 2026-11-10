# 0002 — Frontend and future Lambda backend

## Status

Accepted

## Recorded

2026-11-10

## Source

Explicit user decision to split website into frontend and backend folders and reserve backend processes for AWS Lambda.

## Context

The initial site is static, but future functionality may need server-side processes.

## Decision

Keep React code under `website/frontend/` and reserve `website/backend/` for future Lambda source and dependencies. No Lambda runtime or backend behavior is selected or implemented yet. Future AWS resources still belong under `terraform/`.

## Consequences

Frontend build/deployment stays independent of backend dependencies. Add backend tooling, API interfaces, and deployment behavior only when requirements are defined.

## Related documents

- [Application layout](../../website/README.md)
- [Backend reservation](../../website/backend/README.md)
- [Scope clarification: minimal portfolio infrastructure](0009-minimal-portfolio-infrastructure.md)
