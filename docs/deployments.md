# Verified deployments

Deployment results are recorded after live verification. Infrastructure creation and website content deployment are separate operations.

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
