# Terraform

This directory reserves the infrastructure layout. No Terraform resources or deployable configuration exist yet.

Use a single shared root configuration here, with environment inputs and backend configuration under `environments/test/` and `environments/prod/`. Put reusable hosting resources in `modules/website/`. Use `bootstrap/` for the remote-state foundation, keeping its lifecycle separate from website hosting.

Planned infrastructure:

- Private S3 website buckets with public access blocked.
- CloudFront distributions with HTTPS and origin access control for S3 access.
- Bucket policies allowing reads only through the appropriate distribution.
- A protected, versioned S3 Terraform state backend with separate state keys for test and prod and a locking mechanism compatible with the selected Terraform version.
- Optional DNS and ACM resources after selecting a custom domain.

The container uses Terraform 1.9.6 to match the reference projects. Choose compatible backend locking when implementing bootstrap, or update the tool version consistently before adopting features that require newer Terraform.

Expected environment files are `backend-test.hcl` and `test.tfvars` under `environments/test/`, and `backend-prod.hcl` and `prod.tfvars` under `environments/prod/`. Add these after choosing actual resource names and backend details. Backend files contain location settings, never credentials. Use `*.local.hcl` and `*.local.tfvars` for uncommitted overrides.

Commit provider lock files. Keep downloaded providers, state, saved plans, credentials, and local overrides out of Git. Apply infrastructure to test before prod. The website pipeline owns the built site objects; Terraform owns hosting resources.
