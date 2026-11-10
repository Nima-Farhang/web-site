# www.farhang.io setup

The public hostname is `www.farhang.io`, attached to prod. Keep registration and DNS at Squarespace. The root `farhang.io` is not part of this change and does not automatically redirect to www.

## Current blocker

On 2026-11-10, Terraform successfully planned the certificate-only change, but AWS denied `acm:RequestCertificate`. IAM user `terraform` is subject to the explicit deny in `restrict-to-sydney-region`. Its current rule denies regional actions outside ap-southeast-2 and does not exempt ACM. CloudFront requires its certificate in us-east-1, so the request cannot succeed under that rule.

An AWS administrator must adjust that deny to permit the required ACM operations in us-east-1, while retaining the Sydney restriction for other regional services, and ensure corresponding IAM allows exist. Adding an Allow statement alone does not override an explicit Deny. No IAM policy changes were made by this repository. After the exception is configured, rerun the certificate-only plan/apply to obtain the real validation record. No certificate or DNS validation record has been created yet, and the existing www record must not be replaced yet.

## Preserve existing services

Keep the Google mail MX record (`@`, priority 1, `smtp.google.com`), root A records, root HTTPS record, and `_domainconnect` record. Replace only the existing `www` CNAME after CloudFront is configured. Add a separate ACM validation CNAME; do not replace the email records to validate HTTPS.

## Two-stage certificate setup

Prod inputs contain `custom_domain = "www.farhang.io"` and initially `enable_custom_domain = false`. Terraform requests the certificate in `us-east-1`, as required for CloudFront. Other environments retain their default CloudFront hostname.

The initial certificate-only operation uses a targeted saved plan to produce the DNS validation record before creating or changing website hosting. Targeting is for this initial setup only; normal deployment must run a full plan.

```bash
source scripts/lib/environment.sh prod
terraform_init
terraform -chdir=terraform plan -var-file=environments/prod.tfvars -target=aws_acm_certificate.website -out="${TF_DATA_DIR}/certificate.tfplan"
# Review the plan before applying:
terraform -chdir=terraform apply "${TF_DATA_DIR}/certificate.tfplan"
terraform -chdir=terraform output -json certificate_dns_records
```

Add the exact CNAME returned by `certificate_dns_records` under Squarespace → Domains → farhang.io → DNS Settings → Custom records. Use the name without the trailing `.farhang.io.` as the Squarespace Host (it will look like `_token.www`), and the returned value as Data. Keep the leading underscores. Keep this record for future automatic certificate renewal. Verify DNS resolves to the expected full name; avoid appending farhang.io twice.

Once ACM reports `ISSUED`, set `enable_custom_domain = true` in prod inputs, commit the change, and deploy Terraform to prod. The validation resource waits up to ten minutes for issuance before CloudFront can attach the certificate. Terraform still owns all hosting resources in the same flat root; no Route 53 zone, NAT gateway, networking, or compute resources are added.

After prod CloudFront is deployed, read `cloudfront_domain_name` from prod outputs. Replace the existing Squarespace `www → ext-sq.squarespace.com` CNAME with `www → <prod CloudFront hostname>`. Do not use the dev distribution's hostname. Publish the website build to prod and verify HTTPS and the release marker. The website deployment script continues to verify through the distribution hostname, which works before and after public DNS cutover.

The initial www record has a four-hour TTL, so cached responses can persist during the transition. Check both authoritative DNS and an external resolver. Do not claim the site connected until certificate, CloudFront, DNS, and website content are all verified.

## Permissions and teardown

The deployment IAM identity also needs ACM request, describe, list-tags, add/remove-tags, and delete-certificate access in us-east-1. The optional certificate is part of the selected environment's Terraform state and is destroyed after dependent CloudFront resources during teardown. External Squarespace records are maintained manually; update the www record if destroying prod, and retain certificate validation records for future reuse if desired.

See [AWS certificate-region requirements](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html) and [ACM DNS validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html).
