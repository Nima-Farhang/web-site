# Deployment pipelines

Both workflows follow Data Platform Demo's `workflow_dispatch` pattern. They have no push, pull-request, scheduled, or chained-workflow triggers.

## Run a deployment

1. Push the workflow files to the repository's default branch so GitHub can show the controls.
2. Open GitHub → Actions → **Terraform** or **Website**.
3. Click **Run workflow**, select branch `master`, and choose `dev`, `test`, or `prod` from the **environment** dropdown (default: `dev`).
4. Click **Run workflow** to start the selected deployment.

Each run targets one environment only. Terraform validates and applies a saved plan for that target. Website builds one artifact, deploys it to that target, and checks the deployed HTML and release marker. There is no automatic test-to-prod promotion or automatic trigger when code is committed or pushed. Deployments from other branches are skipped by the existing master guard.

Create GitHub environments `dev`, `test`, and `prod`; configure `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in each environment's secrets. `AWS_SESSION_TOKEN` is optional for temporary credentials. Codespaces secrets are separate. GitHub environment protection rules remain optional.

The selected input controls the job's GitHub environment, AWS secrets, script environment argument, Terraform backend key, and concurrency group. Both workflows use `aws-website-release-<environment>` so infrastructure and content releases to the same target cannot overlap, while different targets can run independently. GitHub may replace pending runs with newer ones.

Run Terraform before Website when creating a target or introducing infrastructure-dependent changes. Test a revision in test before manually deploying that revision to prod; the workflows do not enforce cross-run promotion or guarantee matching artifacts between separate runs.

The workflows target account `210006516097` in `ap-southeast-2` and reuse the existing shared state bucket and DynamoDB table. Website targets come from Terraform outputs. Saved plans remain on the job runner; frontend artifacts are retained for seven days. These workflows do not destroy resources.

See [ADR 0010](../../docs/adr/0010-manual-environment-deployments.md).
