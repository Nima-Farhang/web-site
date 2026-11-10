# 0009 — Minimal portfolio infrastructure

## Status

Accepted; clarifies [0001](0001-personal-website-scope.md) and the future-only reservation in [0002](0002-frontend-and-future-lambda-backend.md).

## Recorded

2026-11-10

## Source

Explicit user instruction to keep infrastructure uncomplicated: the website is only for self-promotion and sample work, has no compute connections or customer data, and must especially avoid NAT gateways.

## Context

The reference repositories include broader platform infrastructure. Those patterns and the earlier future Lambda idea must not cause the simple website to expand into a compute or data platform.

## Decision

Keep this a static personal promotion and portfolio website hosted with S3 and CloudFront, reusing the existing external Terraform backend. Show sample work through public descriptions, screenshots, static examples, and links. Do not connect the website to compute resources or collect, store, or process customer data.

Do not create, attach, or depend on a NAT gateway. VPC networking, servers, containers, databases, and live compute integrations are outside the current scope. Keep the reserved backend folder without deploying Lambda services. Any expansion, including Lambda or a change to the NAT-gateway restriction, requires a new explicit user decision documented before implementation.

## Consequences

The infrastructure stays small and focused on static hosting. Sample projects do not require running their infrastructure behind this website. The reserved folder layout remains useful without introducing resources or costs. This is a documentation and scope clarification; it does not change deployed AWS resources or the existing environment/pipeline model.

## Related documents

- [Architecture](../architecture.md)
- [Development standards](../standards.md)
- [Security model](../security-model.md)
- [Terraform scope](../../terraform/README.md)
- [Repository instructions](../../AGENTS.md)
