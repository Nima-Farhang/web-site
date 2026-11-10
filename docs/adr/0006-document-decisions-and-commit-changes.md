# 0006 — Document decisions and commit changes

## Status

Accepted

## Recorded

2026-11-10

## Source

Explicit user instruction to establish coding/naming/commenting guidelines, document decisions and documentation requests, and commit changes.

## Context

Preferences and decisions need to survive beyond chat history and guide continued development consistently.

## Decision

Maintain coding, naming, and commenting conventions in `docs/standards.md`. Record user decisions in repository documentation during the same task, and satisfy explicit documentation requests before finishing. Use ADRs for durable design/workflow decisions and guides for routine conventions. Keep `AGENTS.md` as the discoverable instruction entry point. Validate, review, and locally commit every completed change.

## Consequences

Documentation is part of completion, not a separate optional follow-up. Commit only task-related files, preserve unrelated work, and report checks plus the commit hash. Local commits do not authorize a push or deployment. Record replacement decisions without erasing accepted history.

## Related documents

- [Repository instructions](../../AGENTS.md)
- [Development workflow](../development-workflow.md)
- [Standards](../standards.md)
