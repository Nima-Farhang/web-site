# Environment strategy

There are three AWS environments: `dev`, `test`, and `prod`. Website automatically targets dev on master pushes; both workflows also allow a manual selection of exactly one target per run. The Codespace provides local development separately. One developer works directly on `master`.

| Setting | Dev | Test | Prod |
| --- | --- | --- | --- |
| Input file | `terraform/environments/dev.tfvars` | `terraform/environments/test.tfvars` | `terraform/environments/prod.tfvars` |
| Backend override | `terraform/backend-dev.hcl` | `terraform/backend-test.hcl` | `terraform/backend-prod.hcl` |
| State key | `dev/website/terraform.tfstate` | `test/website/terraform.tfstate` | `prod/website/terraform.tfstate` |
| Site bucket | `personal-website-dev-210006516097` | `personal-website-test-210006516097` | `personal-website-prod-210006516097` |
| GitHub environment | `dev` | `test` | `prod` |

All three environments currently use account `210006516097` in `ap-southeast-2`, with separate CloudFront distributions and site buckets. Dev uses `terraform/environments/dev.tfvars`, `terraform/backend-dev.hcl`, state key `dev/website/terraform.tfstate`, and bucket `personal-website-dev-210006516097`. Configure a matching GitHub environment and AWS secrets for each target used through Actions.

State is separate within the existing shared bucket `nima-terraform-state-210006516097`; locks use `terraform-state-lock`. Do not reuse the sample data product's Snowflake state keys.

Terraform remains manual-only. Website targets dev automatically on every master push and retains manual environment selection. There is no automatic promotion. Testing a revision in test before selecting prod is recommended. GitHub environment protection rules are optional. The website builds and verifies an artifact within one run; separate environment runs do not share a guaranteed identical artifact.

The shared concurrency group per environment prevents overlapping infrastructure/content releases to that target. Different environments can run independently. GitHub may replace pending runs, so it is not a FIFO queue. For first deployment or infrastructure-dependent content changes, complete Terraform before running Website.

Direct Terraform commands require initialization for the selected environment before planning or applying. Deployment scripts isolate backend metadata per environment to reduce accidental switching. See [commands](../terraform/commands.md) and [ADR 0012](adr/0012-first-portfolio-and-automatic-dev-delivery.md).
