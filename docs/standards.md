# Development standards

## Code and comments

Prefer small components, clear TypeScript types, descriptive names, and simple functions. Keep personal content separate from reusable presentation code. Add dependencies only when they solve a concrete requirement.

Use comments to explain why a choice exists, assumptions, or an operational constraint. Avoid comments that repeat the code. Document scripts and modules in nearby README files. Use two-space indentation, LF endings, and a final newline; `.editorconfig` captures these defaults.

## Scripts

Keep operational shell commands under `scripts/`, use strict Bash, and resolve paths from the script location. Accept an environment argument with an `ENVIRONMENT` fallback and reject anything other than `test` or `prod`. Make entry points executable. Local development and GitHub Actions should call the same scripts.

## Infrastructure

Use lowercase folders and descriptive Terraform resource labels. Name AWS resources with `<project>-<environment>-<component>`, adding a unique suffix where needed for globally unique S3 names. Keep account-specific values in environment configuration rather than modules.

Apply `Project`, `Environment`, and `ManagedBy = Terraform` tags to taggable resources. Separate test and prod configuration and state. Keep credentials out of Terraform files and Git; commit provider lock files.

## Development workflow

Work directly on `master` as the sole developer. Keep commits focused. Check the frontend's types and production build when application code changes; check Terraform formatting and validation when infrastructure changes. Add tests for meaningful behavior as it is introduced.
