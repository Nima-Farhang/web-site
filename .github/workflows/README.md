# Deployment pipelines

Two workflows run on relevant pushes to `master` and support manual dispatch:

- `terraform.yml`: formatting and backend-free validation, then saved-plan apply to test, then prod.
- `website.yml`: type-check and build once, upload a versioned artifact, then deploy and verify the same artifact in test and prod.

Dev is available through local deployment scripts and is not added to CI promotion. Only `master` can deploy through these workflows, including manually triggered runs. Both workflows use the shared `aws-website-release` concurrency group with cancellation of active runs disabled. GitHub may replace pending runs with newer ones. The two workflows do not impose ordering on each other: run Terraform before Website for the first deployment or whenever content depends on infrastructure changes.

Create GitHub environments `test` and `prod`. Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to each environment's secrets; optionally add `AWS_SESSION_TOKEN` for temporary credentials. Environment protection rules are optional and may be configured in GitHub. Without protection rules, successful test deployment promotes automatically to prod.

The workflows target account `210006516097` in `ap-southeast-2`, matching the Terraform configuration. They use the existing key-based approach from Data Product Demo. Keys must have the permissions described in `terraform/README.md`. No secrets are embedded in the workflows.

The existing S3 state bucket and DynamoDB lock table are configured in `terraform/backend.tf`; the pipelines do not create or manage them. Site targets come from Terraform outputs, so bucket names and CloudFront IDs are not duplicated as workflow secrets. Saved plans stay on their job runner and are applied directly; they are not uploaded as artifacts. Frontend artifacts are retained for seven days.
