# Terraform

A single Terraform root provisions the website's private S3 bucket and HTTPS CloudFront distribution in dev, test, and prod. The flat structure follows [Data Product Demo](https://github.com/Nima-Farhang/Data-Product-Demo/tree/master/TERRAFORM). Resources are defined directly in `main.tf`; there are no modules or bootstrap resources.

## Scope constraint

Provision only what this static personal promotion and sample-work website needs. Do not add or connect to NAT gateways, VPC networking, compute resources, databases, or customer-data services. Sample projects are showcased through static content and links. The shared backend remains externally managed. Future backend implementation requires an explicit user scope decision; see [ADR 0009](../docs/adr/0009-minimal-portfolio-infrastructure.md).

## Files

| File | Purpose |
| --- | --- |
| `main.tf` | Website S3 and CloudFront resources and access policies |
| `variables.tf` | Environment, AWS account, and region inputs |
| `outputs.tf` | Website bucket, distribution ID, and URL |
| `provider.tf` / `versions.tf` | AWS provider configuration and tool versions |
| `backend.tf` | Common settings for the existing shared backend |
| `backend-dev.hcl` / `backend-test.hcl` / `backend-prod.hcl` | Environment-specific state keys |
| `environments/dev.tfvars` / `environments/test.tfvars` / `environments/prod.tfvars` | Environment input values |
| `commands.md` | Direct Terraform and helper script commands |

## Existing backend

Use the same backend as Data Product Demo:

- Bucket: `nima-terraform-state-210006516097`.
- DynamoDB table: `terraform-state-lock`.
- Region: `ap-southeast-2`.
- Website state keys: `dev/website/terraform.tfstate`, `test/website/terraform.tfstate`, and `prod/website/terraform.tfstate`.

The backend resources are managed elsewhere. This repository neither creates nor destroys them. Website state keys are separate from Data Product Demo's Snowflake keys. Backend credentials come from the AWS environment/profile, never from committed configuration. The provider and backend restrict access to account `210006516097`.

## Deployment

Run `./scripts/validate_terraform.sh`. Deploy dev manually with `./scripts/deploy_environment.sh dev`. For other targets, deploy test with `./scripts/deploy_environment.sh test` and prod with `./scripts/deploy_environment.sh prod`. The script initializes the selected backend, validates, saves a plan, and applies that exact plan after typed confirmation. CI uses the same script with `APPLY_APPROVE=true`. Separate local data directories prevent environment switching from reusing the wrong backend metadata.

Terraform is pinned to `1.9.6`, matching the container and workflows. The AWS provider uses `~> 5.0` with a committed lock file. DynamoDB provides state locking for this Terraform version.

## Hosting and permissions

`main.tf` defines a versioned, encrypted private bucket with public access blocked, CloudFront origin access control, an HTTPS-only bucket policy, and a default-domain HTTPS distribution. Website uploads are managed by the website pipeline. No Lambda, DNS, custom-domain, or client-side route fallback resources are included.

Outputs are `website_bucket_name`, `cloudfront_distribution_id`, and `website_url`. The website script reads them from the selected state.

Deployment credentials need permission to manage these website S3/CloudFront resources, read/write the website's state objects in the shared bucket, and describe/get/put/delete DynamoDB locks. They do not need to create the backend bucket or lock table. Website deployment also needs S3 object uploads and CloudFront invalidation access. No IAM resources are created here.

State, saved plans, downloaded providers, and local overrides are ignored by Git. Commit provider lock files. Website buckets retain versions and old assets; normal deletion does not force-empty them. Explicit teardown uses `./scripts/destroy_environment.sh <environment>` to enable `force_destroy_buckets` only for bucket preparation and destroy plans; it deletes all site object versions after typed confirmation. See [commands](commands.md#destroy-one-environment). Dev has been deployed and verified; see the [deployment record](../docs/deployments.md).
