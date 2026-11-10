# Development standards

These conventions extend the simple, readable style of the reference repositories to this website. They are the working defaults for future changes.

## Coding

Keep changes focused and code easy to read. Prefer small functions and components with explicit responsibilities. Add abstractions and dependencies when a concrete requirement justifies them. Use the existing layers instead of introducing a framework or module hierarchy preemptively.

Use strict TypeScript and descriptive types. Prefer typed props and public function boundaries, allow clear local inference, and avoid `any` and unnecessary type assertions. Keep UI components in `website/frontend/src/components/`, personal copy in `src/content/`, shared CSS in `src/styles/`, and imported media in `src/assets/`. Keep future Lambda code and dependencies under `website/backend/`.

Keep Terraform resources directly in `terraform/main.tf`, inputs in `variables.tf`, outputs in `outputs.tf`, provider configuration in `provider.tf`, and versions in `versions.tf`. Shared backend settings belong in `backend.tf`; environment overrides contain state keys. Describe variables and any non-obvious outputs. Follow Data Product Demo's flat root; introduce modules only after a new decision.

Use two-space indentation for frontend, shell, HCL, JSON, and YAML; Python uses four spaces. Use UTF-8, LF endings, and a final newline. Follow `.editorconfig` and `terraform fmt`. Do not reformat unrelated files during a focused change.

## Infrastructure simplicity

Choose the smallest infrastructure change that supports the static portfolio. Keep S3/CloudFront hosting and the existing external Terraform backend as the baseline. Do not introduce platform components just because a reference repository contains them. Never add or connect to a NAT gateway under the current scope.

Keep sample work as public static content or links. Do not add customer-data handling, live compute integrations, VPC networking, servers, containers, or databases. The reserved backend folder does not authorize Lambda deployment. Broader capabilities require a new explicit user decision recorded before implementation; see [ADR 0009](adr/0009-minimal-portfolio-infrastructure.md).

## Naming

| Item | Convention | Example |
| --- | --- | --- |
| Directories | Lowercase; hyphens for multiple words | `website/frontend`, `docs/adr` |
| React components and component files | PascalCase | `ProjectCard.tsx` |
| TypeScript types/interfaces | PascalCase without an `I` prefix | `Project`, `ProjectCardProps` |
| TypeScript functions/variables | camelCase | `formatProjectDate`, `projectTitle` |
| React hooks | camelCase starting with `use` | `useProjects` |
| Non-component frontend files and CSS | kebab-case | `project-data.ts`, `site.css` |
| Shell entry points | snake_case with `.sh` | `deploy_environment.sh` |
| Exported shell settings | UPPER_SNAKE_CASE | `ENVIRONMENT`, `AWS_REGION` |
| Shell-local variables | Descriptive lowercase snake_case | `confirmation`, `variable_name` |
| Terraform labels, variables, outputs | snake_case | `website`, `website_bucket_name` |
| Workflow files | Short lowercase names | `website.yml`, `terraform.yml` |
| ADRs | Four-digit sequence and kebab-case title | `0003-flat-terraform-and-existing-backend.md` |

Existing script-scoped path/settings variables such as `REPO_ROOT` and `PLAN_FILE` use uppercase; preserve that established style. Do not repurpose system variables such as `HOME`.

Name AWS resources with `<project>-<environment>-<component>` where the service permits it; add the account ID or a documented unique suffix for S3. Existing website bucket names are `personal-website-<environment>-<account-id>`. Preserve established names and Terraform labels unless a deliberate change includes review of any replacement or state migration. Tag taggable website resources with `Project`, `Environment`, and `ManagedBy = Terraform`.

## Comments and documentation

Explain intent, assumptions, ordering constraints, service limitations, and reasons for unusual behavior. Avoid comments that merely repeat the next statement, speculative future code, or commented-out implementations. Update or remove comments when behavior changes.

A useful deployment comment explains why immutable assets are uploaded before HTML. A redundant comment merely says that the next line uploads a file. Use function documentation for public contracts or behavior that callers cannot infer from names and types; do not require boilerplate comments on every function.

Document setup and operational commands in the nearest README or command guide. Keep architectural rationale in ADRs and the current system description in the design guides. Record user decisions and explicit documentation requests as described in [development workflow](development-workflow.md).

## Scripts and checks

Use executable Bash entry points with `set -euo pipefail`, paths resolved from the script location, quoted expansions, and clear errors. Accept the environment as the first argument with `ENVIRONMENT` as fallback, and reject anything except `dev`, `test`, or `prod` before invoking tools. Keep secrets out of output. Reuse the same entry points in CI and locally.

Run checks appropriate to the change. Verify meaningful behavior and failure boundaries; avoid tests that only restate an implementation. Commit completed changes following the [development workflow](development-workflow.md).
