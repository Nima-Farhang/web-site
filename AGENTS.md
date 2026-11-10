# Repository instructions

Read this file and `docs/README.md` before changing this repository. Follow `docs/standards.md` for coding, naming, commenting, scripts, and infrastructure conventions. Consult `docs/adr/README.md` for accepted decisions. User instructions take precedence when they change a recorded decision; update the documentation accordingly.

## Project boundaries

- Keep this a small personal website with React and TypeScript in `website/frontend/`.
- Reserve `website/backend/` for future AWS Lambda processes; add backend implementation only when requested.
- Keep Terraform flat under `terraform/`, following Data Product Demo. Resources go directly in `main.tf`; do not introduce modules or bootstrap infrastructure without a new decision.
- Use the existing shared S3/DynamoDB backend. Never provision or destroy the shared backend from this repository.
- Use `test` then `prod`; work directly on `master` without introducing a branching strategy.
- Reuse scripts under `scripts/` for local and CI operations.

## Record decisions as part of the work

Whenever the user makes a decision, record it in the repository in the same change. Whenever the user asks to document something, update the relevant documentation before considering the task complete. Do not rely on chat history as the durable record.

Follow `docs/development-workflow.md`: use an ADR for architecture, infrastructure, environment, delivery, security, or enduring workflow decisions; put routine local conventions and operating instructions in the relevant guide. Update both when a decision affects current instructions. Distinguish user decisions from implementation choices and proposals. Do not mark a proposal as accepted.

## Validate and commit

After every completed change, run appropriate checks, update affected documentation, review the diff, and create a local Git commit with a clear description. Documentation-only changes need link and whitespace checks, not unrelated application builds. Report the commit hash and checks in the final response.

Commit only files belonging to the task. Preserve unrelated user changes and never include secrets, state, generated plans, or build output. Do not amend, reset, force-push, or push unless the user requests it. A local commit does not deploy or publish the change. If a check or commit is blocked, report the reason clearly and leave the work intact.
