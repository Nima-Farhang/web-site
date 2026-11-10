# Architecture Decision Records

These records capture the project decisions already made during repository setup. The structure follows Data Platform Demo; the decisions themselves belong to this smaller personal website.

Use [the template](template.md) for new records. Number records sequentially without reusing numbers. Status values are Proposed, Accepted, Superseded, and Rejected. Preserve superseded records and link their replacements. See [development workflow](../development-workflow.md) for when and how to record user decisions.

| Record | Status | Topic |
| --- | --- | --- |
| [0001](0001-personal-website-scope.md) | Accepted | Personal website scope |
| [0002](0002-frontend-and-future-lambda-backend.md) | Accepted | Frontend and future Lambda backend |
| [0003](0003-flat-terraform-and-existing-backend.md) | Accepted | Flat Terraform and existing backend |
| [0004](0004-environments-and-delivery.md) | Superseded by 0007 | Environments and delivery |
| [0005](0005-codespaces-and-aws-authentication.md) | Accepted | Codespaces and AWS authentication |
| [0006](0006-document-decisions-and-commit-changes.md) | Accepted | Document decisions and commit changes |
| [0007](0007-add-dev-environment.md) | Deployment model superseded by 0010 | Add dev environment |
| [0008](0008-environment-teardown.md) | Accepted | Environment teardown |
| [0009](0009-minimal-portfolio-infrastructure.md) | Accepted | Minimal portfolio infrastructure; no NAT gateways |
| [0010](0010-manual-environment-deployments.md) | Website trigger superseded by 0012; Terraform accepted | Manual environment deployments |
| [0011](0011-www-domain-on-prod.md) | Accepted | www.farhang.io on prod with Squarespace DNS |
| [0012](0012-first-portfolio-and-automatic-dev-delivery.md) | Accepted | First portfolio and automatic dev website delivery |
