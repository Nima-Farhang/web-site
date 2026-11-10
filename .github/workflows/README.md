# Deployment pipelines

This directory will contain two executable GitHub Actions workflows:

- `website.yml`: validate and build once, deploy the artifact to test, verify the deployed site, then promote the same artifact to prod.
- `terraform.yml`: check formatting and validate, plan/apply test, then plan/apply prod after test succeeds.

Use relevant path filters on pushes to `master`, include shared script changes in those filters, and support `workflow_dispatch`. Each prod job must depend on successful test deployment. Configure GitHub environments `test` and `prod` with their AWS configuration and credentials. Serialize deployments that target the same environment and preserve ordering between queued releases. Apply a saved Terraform plan for each environment rather than re-planning during apply.

The workflows are intentionally not created until the application, infrastructure, state backend, and deployment settings exist. This scaffold cannot trigger AWS deployments.
