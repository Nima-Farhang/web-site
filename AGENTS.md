# Repository instructions

Read this file and `docs/README.md` before changing this repository. Follow `docs/standards.md` for coding, naming, commenting, scripts, and infrastructure conventions. Consult `docs/adr/README.md` for accepted decisions. User instructions take precedence when they change a recorded decision; update the documentation accordingly.

## Project boundaries

- Keep this a small personal self-promotion and portfolio website with React and TypeScript in `website/frontend/`. Publish personal introductions and sample work only; do not collect, store, or process customer data.
- Keep infrastructure minimal: static S3/CloudFront hosting and the existing external Terraform backend. Do not create, attach, or depend on a NAT gateway. Do not add VPC networking, servers, containers, databases, or connections to compute resources for portfolio examples. Showcase examples with static content and links. Any future expansion requires an explicit user scope decision.
- Keep `website/backend/` as a reserved folder only. The earlier Lambda idea does not authorize provisioning compute; implement it only after an explicit user decision to expand the static-site scope.
- Keep Terraform flat under `terraform/`, following Data Product Demo. Resources go directly in `main.tf`; do not introduce modules or bootstrap infrastructure without a new decision.
- Use the existing shared S3/DynamoDB backend. Never provision or destroy the shared backend from this repository.
- Support `dev` and `prod`; Terraform deployment is manual-only; Website deploys automatically to dev on pushes to master and retains a manual dev/prod dropdown. Manual runs deploy only the selected target; work directly on `master` without introducing a branching strategy.
- Reuse scripts under `scripts/` for local and CI operations.

## Record decisions as part of the work

Whenever the user makes a decision, record it in the repository in the same change. Whenever the user asks to document something, update the relevant documentation before considering the task complete. Do not rely on chat history as the durable record.

Follow `docs/development-workflow.md`: use an ADR for architecture, infrastructure, environment, delivery, security, or enduring workflow decisions; put routine local conventions and operating instructions in the relevant guide. Update both when a decision affects current instructions. Distinguish user decisions from implementation choices and proposals. Do not mark a proposal as accepted.

## Validate and commit

After every completed change, run appropriate checks, update affected documentation, review the diff, and create a local Git commit with a clear description. Documentation-only changes need link and whitespace checks, not unrelated application builds. Report the commit hash and checks in the final response.

Commit only files belonging to the task. Preserve unrelated user changes and never include secrets, state, generated plans, or build output. Do not amend, reset, force-push, or push unless the user requests it. A local commit does not deploy or publish the change. If a check or commit is blocked, report the reason clearly and leave the work intact.
