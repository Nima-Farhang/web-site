# Scripts

Run entry points from any directory. Environment-aware scripts accept `test` or `prod` as the first argument, with `ENVIRONMENT` as a fallback.

| Command | Behavior |
| --- | --- |
| `./scripts/validate_terraform.sh` | Check formatting and validate the Terraform root without a state backend or AWS credentials |
| `./scripts/deploy_environment.sh test` | Initialize test state, validate, save a plan, confirm, then apply that exact plan |
| `./scripts/build_website.sh` | Install locked dependencies, type-check, build, and write the release marker |
| `./scripts/dev_website.sh` | Start the installed frontend development server on `0.0.0.0:5173` |
| `./scripts/deploy_website.sh test` | Deploy an existing build, invalidate CloudFront, verify the deployed HTML and release marker |

Repeat environment deployments with `prod` after test succeeds. CI sets `APPLY_APPROVE=true` to skip the script's local confirmation. Terraform 1.9.6 and AWS CLI v2 are required for deployment; Node 22.12+ is required for builds.

`lib/environment.sh` shares path resolution and environment validation. Each deployed environment uses a separate `TF_DATA_DIR` under ignored `terraform/.terraform/`. This prevents switching test/prod from reusing backend metadata or plan files. Scripts fail on errors and use Terraform's remote state lock with a five-minute lock timeout.

Website deployment preserves existing assets for cached pages, uploads assets before HTML, waits for invalidation, and compares the deployed HTML and release marker against the artifact. Old S3 versions and assets are retained; lifecycle cleanup can be added when a retention policy is chosen. Failed verification stops promotion but does not automatically roll back a partial deployment; rerun a known-good revision to restore it.

Keep shell scripts focused and use strict Bash. Explain intent and operational choices in comments. Share these entry points between local development and CI, following the reference repositories.

Run deployment failure-boundary checks without AWS access using `python3 -m unittest discover -s scripts/tests -v`. These use temporary fixtures and fake tools to verify failed plans cannot apply, saved plans are reused, invalid environments fail early, and incorrect deployed releases fail verification. Both CI workflows run these checks.
