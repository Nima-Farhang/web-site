# Environment strategy

There are three AWS environments: `dev`, `test`, and `prod`. Dev supports manual AWS development checks; test and prod remain the CI promotion sequence. The Codespace provides local development separately. One developer works directly on `master`.

| Setting | Test | Prod |
| --- | --- | --- |
| Input file | `terraform/environments/test.tfvars` | `terraform/environments/prod.tfvars` |
| Backend override | `terraform/backend-test.hcl` | `terraform/backend-prod.hcl` |
| State key | `test/website/terraform.tfstate` | `prod/website/terraform.tfstate` |
| Site bucket | `personal-website-test-210006516097` | `personal-website-prod-210006516097` |
| GitHub environment | `test` | `prod` |

All three environments currently use account `210006516097` in `ap-southeast-2`, with separate CloudFront distributions and site buckets. Dev uses `terraform/environments/dev.tfvars`, `terraform/backend-dev.hcl`, state key `dev/website/terraform.tfstate`, and bucket `personal-website-dev-210006516097`. It does not require a GitHub environment because it is deployed through the local scripts.

State is separate within the existing shared bucket `nima-terraform-state-210006516097`; locks use `terraform-state-lock`. Do not reuse the sample data product's Snowflake state keys.

Each pipeline must finish test successfully before its prod stage. The website promotes the identical build artifact; Terraform uses the same code with each environment's inputs and its own saved plan. GitHub environment protection rules are optional; without them successful test deployment promotes automatically.

The shared workflow concurrency group prevents overlapping infrastructure/content releases. GitHub may replace an older pending run; it is not a FIFO queue. For first deployment or infrastructure-dependent content changes, complete Terraform before running Website.

Direct Terraform commands require initialization for the selected environment before planning or applying. Deployment scripts isolate backend metadata per environment to reduce accidental switching. See [commands](../terraform/commands.md) and [ADR 0007](adr/0007-add-dev-environment.md).
