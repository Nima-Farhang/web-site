# Verified deployments

Current environment policy: only dev and prod are supported under [ADR 0013](adr/0013-retire-test-environment.md). Entries below retain historical deployment evidence; references to the retired target do not authorize redeployment.

Deployment results are recorded after live verification. Infrastructure creation and website content deployment are separate operations.

## All-environment teardown — 2026-11-11

The user requested destruction of all infrastructure owned by this repository in dev, test, and prod using `scripts/destroy_environment.sh`. This operational request uses the existing teardown decision in [ADR 0008](adr/0008-environment-teardown.md); it does not change the environment or delivery design.

Verified the active identity as `arn:aws:iam::210006516097:user/terraform`. Before teardown, GitHub Actions had no queued or in-progress runs. Remote state contained eight dev resources, eight test resources, and six resources from the partial prod deployment, all within the website stack. No ACM certificate was recorded in any state. Independent ACM inventory in us-east-1 was denied by the existing region restriction policy.

The container's Python installation lacked its standard library, preventing the script's JSON plan guard from running. Installed the missing Python 3.12 standard library in the running container, verified the JSON import, and passed all 13 deployment-script tests and Bash syntax checks before invoking teardown. No destroy-script changes were needed.

Ran the existing destroy script sequentially for dev, test, and prod, supplying each exact `DESTROY <environment>` confirmation under the user's explicit authorization. Each run applied its checked bucket-preparation plan and saved destroy plan, then exited successfully.

| Environment | Resources destroyed | Removed bucket | Removed CloudFront distribution | Removed origin access control |
| --- | --- | --- | --- | --- |
| Dev | 8 | `personal-website-dev-210006516097` | `E2H4XFCUBL35SI` | `E1P7NMLWP4BX8E` |
| Test | 8 | `personal-website-test-210006516097` | `E1MJOF11EMF5QH` | `ETM3BD8Q9IUTU` |
| Prod | 6 | `personal-website-prod-210006516097` | None in state | `E3VJK5M25QSJFT` |

All three Terraform state listings were empty afterward. AWS returned 404 for all three website buckets, NoSuchDistribution for both distribution IDs, and NoSuchOriginAccessControl for all three origin access controls. Final inventories found no remaining `personal-website-` buckets, distributions, or origin access controls. Successful bucket deletion includes removal of website object versions and delete markers.

The shared bucket `nima-terraform-state-210006516097` remains accessible in ap-southeast-2, and `terraform-state-lock` remains ACTIVE. Remote state and its history were preserved. No IAM or external DNS changes were made. ACM absence outside Terraform state could not be independently verified because of the inventory denial noted above.

All website environments are now destroyed; the deployment entries below are historical. Infrastructure must be explicitly redeployed before a website-content deployment can succeed. Existing workflow configuration remains unchanged: master pushes trigger the dev content workflow, but that workflow does not provision the missing infrastructure. This task does not push commits or trigger a deployment.

## Dev — 2026-11-10

Deployed at the user's request after the decision to add dev as a third environment ([ADR 0007](adr/0007-add-dev-environment.md)).

| Setting | Verified value |
| --- | --- |
| AWS account | `210006516097` |
| Region | `ap-southeast-2` |
| Website bucket | `personal-website-dev-210006516097` |
| CloudFront distribution | `E2H4XFCUBL35SI` |
| CloudFront URL | `https://d3j2k1nh9scjof.cloudfront.net` |
| Origin access control | `E1P7NMLWP4BX8E` |
| State location | `s3://nima-terraform-state-210006516097/dev/website/terraform.tfstate` |
| Lock table | `terraform-state-lock` |

Terraform applied the reviewed saved plan: 8 added, 0 changed, 0 destroyed. A subsequent live plan with detailed exit codes returned 0 and reported no changes. AWS confirmed CloudFront status `Deployed`, all four S3 public-access blocks enabled, bucket policy `IsPublic: false`, versioning enabled, AES-256 bucket encryption, and AES-256 encryption for the remote state object.

The shared backend resources were reused, not created or modified by the infrastructure plan. Test and prod were not deployed during this task. Website assets were not uploaded, so this URL is not yet a populated site. No Lambda resources were created.

Local verification also passed Terraform validation and formatting, six deployment-script tests, Bash syntax, workflow linting, local documentation links, and Git whitespace checks. State and saved plans remain outside version control.

## Prod domain preparation — 2026-11-10

The user selected www.farhang.io for prod and supplied Squarespace DNS records. Terraform validation and a certificate-only saved plan passed (1 certificate to add). Apply failed on `acm:RequestCertificate` because identity policy `restrict-to-sydney-region` explicitly denies ACM requests in us-east-1. Read-only inspection confirmed that policy's region restriction. No certificate, prod hosting resources, or DNS records were created during this attempt; no IAM policies were modified.

The existing dev resources were checked with a live plan: only the newly added outputs were proposed, with no resource changes. The code and [domain instructions](domain-setup.md) are prepared, but connection remains blocked on the IAM exception and then external DNS validation. Local Terraform validation, workflow linting, and all 13 deployment-script tests passed.

## Test and prod teardown — 2026-11-10

At the user's request, ran `scripts/destroy_environment.sh test` and `scripts/destroy_environment.sh prod`, supplying each script's exact typed confirmation. Both targets had resources; this was not an empty-state cleanup. Each script applied its targeted bucket-deletion preparation and then its saved destroy plan.

| Environment | Resources destroyed | Removed bucket | Removed CloudFront distribution |
| --- | --- | --- | --- |
| Test | 8 | `personal-website-test-210006516097` | `E1W3LEXXE6L1S1` |
| Prod | 8 | `personal-website-prod-210006516097` | `E2E71BZA0MIV8C` |

Both scripts exited successfully. Subsequent Terraform state listings were empty. AWS returned 404 for both website buckets and NoSuchDistribution for both CloudFront IDs. The scripts also deleted their origin access controls and remaining bucket configuration resources. Website object versions were removed as required by bucket deletion; remote state and history remain in the shared backend.

Verified that dev distribution `E2H4XFCUBL35SI` remains enabled and Deployed, the existing shared state bucket is accessible, and `terraform-state-lock` remains ACTIVE. No dev teardown, DNS change, IAM change, or certificate creation was performed.

Before teardown, GitHub showed no queued or in-progress runs and showed completed successful [Terraform](https://github.com/Nima-Farhang/web-site/actions/runs/42775177797) and [Website](https://github.com/Nima-Farhang/web-site/actions/runs/42774546479) workflows. This confirms workflows had run; it does not attribute each environment's resources to a particular run. Test and prod hosting are now absent and must be explicitly redeployed when needed. The previously documented ACM region-policy restriction still needs resolution before setting up www.farhang.io.

## First portfolio draft on dev — 2026-11-10

At the user's request, built the first single-page portfolio and deployed it using `scripts/deploy_website.sh dev` with Codespaces AWS credentials. The local source commit deployed was `3ddf43e8d642177dccad43c22314a24830be83b7`.

- Live URL: https://d3j2k1nh9scjof.cloudfront.net
- Existing website bucket: `personal-website-dev-210006516097`.
- Existing CloudFront distribution: `E2H4XFCUBL35SI`.
- Content: introduction and five public repository summaries, with the navy/teal Lux CSS template from Full-Stack-WebApp-Demo.

The script uploaded assets before HTML, completed CloudFront invalidation, and byte-compared the deployed HTML and release marker against the build. The public release marker returned the source commit above. Live CSS and JavaScript also matched the production build exactly. Local and live browser checks passed at 1440, 768, 390, and 320 pixel widths, with no horizontal overflow or runtime errors; project links and section navigation were checked. TypeScript/production build, workflow linting, workflow target checks, all 13 deployment-script tests, and documentation link checks passed.

No Terraform apply or new infrastructure was needed. Test and prod remain destroyed; domain DNS, ACM restrictions, and www.farhang.io were not changed.

Website automation is configured in the local repository to build and deploy dev on every push to master, while retaining manual target selection. Terraform stays manual-only. The initial draft was deployed directly through the shared scripts, not through an Actions run. The commits have not been pushed by this task, so the new automatic trigger becomes active only when pushed to GitHub; the GitHub dev environment must contain its AWS secrets. See [ADR 0012](adr/0012-first-portfolio-and-automatic-dev-delivery.md).

## Retire test — 2026-11-12

At the user's request, ran `scripts/destroy_environment.sh test` with the exact `DESTROY test` confirmation in account `210006516097` as `arn:aws:iam::210006516097:user/terraform`. The script applied its checked bucket-deletion preparation and saved destroy plan, completing successfully with eight resources destroyed.

Verified the retired environment's remote Terraform state listing is empty. AWS returned 404 for bucket `personal-website-test-210006516097`, NoSuchDistribution for distribution `EUX0KTKJ6VE01`, and NoSuchOriginAccessControl for access control `E1WDFXBNWM2SPK`. Bucket deletion includes all site object versions and delete markers. The shared backend remains preserved; dev and prod were not deployment targets during this task.

Removed the retired target from both workflow dropdowns, Terraform inputs and environment validation, operational scripts, and current guides. Only dev and prod remain supported under [ADR 0013](adr/0013-retire-test-environment.md). Historical deployment entries and superseded ADR text remain as evidence. Workflow changes are local until pushed; no push was performed.
