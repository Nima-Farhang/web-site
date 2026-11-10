# 0001 — Personal website scope

## Status

Accepted

## Recorded

2026-11-10

## Source

User requirement from the initial repository setup, plus the existing hosting implementation.

## Context

The project needs a small personal introduction site with inexpensive static hosting and no initial backend.

## Decision

Build the frontend in React and TypeScript and host static assets in S3. The current implementation uses private S3 behind HTTPS CloudFront with origin access control. Keep the personal website, infrastructure, and CI/CD together in this repository.

## Consequences

The site can deploy without a server application or database. CloudFront is an implementation choice supporting the requested S3 hosting. A custom domain, certificate, routing expansion, or additional services remain future work.

## Related documents

- [Architecture](../architecture.md)
- [Security model](../security-model.md)
