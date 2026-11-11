# Scripts

Run entry points from any directory. Environment-aware scripts accept `dev` or `prod` as the first argument, with `ENVIRONMENT` as a fallback.

| Command | Behavior |
| --- | --- |
| `./scripts/validate_terraform.sh` | Check formatting and validate the Terraform root without a state backend or AWS credentials |
| `./scripts/destroy_environment.sh dev` | Confirm and destroy one environment, including versioned site objects; preserve the shared backend |
| `./scripts/deploy_environment.sh dev` | Initialize dev state, validate, save a plan, confirm, then apply that exact plan |
| `./scripts/build_website.sh` | Install locked dependencies, type-check, build, and write the release marker |
| `./scripts/dev_website.sh` | Start the installed frontend development server on `0.0.0.0:5173` |
| `./scripts/deploy_website.sh dev` | Deploy an existing build, invalidate CloudFront, verify the deployed HTML and release marker |

Use `./scripts/deploy_environment.sh dev` for manual AWS development checks. Website deploys to dev automatically on master pushes; both workflows retain manual environment selection, and Terraform remains manual-only. Test a revision before choosing prod. CI sets `APPLY_APPROVE=true` to skip the script's local confirmation. Terraform 1.9.6 and AWS CLI v2 are required for deployment; Node 22.12+ is required for builds.

`lib/environment.sh` shares path resolution and environment validation. Each deployed environment uses a separate `TF_DATA_DIR` under ignored `terraform/.terraform/`. This prevents switching dev/prod from reusing backend metadata or plan files. Scripts fail on errors and use Terraform's remote state lock with a five-minute lock timeout.

Website deployment preserves existing assets for cached pages, uploads assets before HTML, waits for invalidation, and compares the deployed HTML and release marker against the artifact. Old S3 versions and assets are retained; lifecycle cleanup can be added when a retention policy is chosen. Failed verification fails the selected deployment but does not automatically roll back a partial deployment; rerun a known-good revision to restore it.

Keep shell scripts focused and use strict Bash. Explain intent and operational choices in comments. Share these entry points between local development and CI, following the reference repositories.

Run deployment failure-boundary checks without AWS access using `python3 -m unittest discover -s scripts/tests -v`. These use temporary fixtures and fake tools to verify failed plans cannot apply, saved plans are reused, invalid environments fail early, and incorrect deployed releases fail verification. Both CI workflows run these checks.

## Destroy an environment

```bash
./scripts/destroy_environment.sh dev
# Or: ENVIRONMENT=dev ./scripts/destroy_environment.sh
```

Use `dev` or `prod`. Stop deployments targeting that environment before teardown. The script always requires the exact phrase `DESTROY <environment>`; deployment's `APPLY_APPROVE` setting does not bypass it. All website object versions and delete markers in that environment's bucket are permanently deleted.

Following Data Platform Demo, the script first saves a targeted plan setting `force_destroy_buckets=true` on the existing website bucket, checks that preparation does not create/replace/delete resources or change another resource, and applies that plan. It then saves and applies the full destroy plan for the selected environment. An empty environment skips bucket preparation. Normal configuration defaults `force_destroy_buckets` to false.

The shared S3 state bucket, DynamoDB lock table, and other environments remain outside the selected stack. State and plan files are retained in their existing remote/local locations; plans stay under ignored `terraform/.terraform/<environment>/`. CloudFront deletion may take several minutes. AWS permissions must allow CloudFront deletion and S3 bucket, object-version, and delete-marker removal.

If preparation succeeds but later teardown fails, deletion remains enabled for the bucket in state. Rerun the destroy script to finish, or run the normal environment deployment to restore the default. Review any state drift that the preparation check rejects before retrying. No destroy operation is added to CI.
