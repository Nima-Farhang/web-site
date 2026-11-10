# 0011 — www.farhang.io on prod

## Status

Accepted

## Recorded

2026-11-10

## Source

The user selected `www.farhang.io`, supplied the existing Squarespace DNS records, and explicitly selected prod as its target environment.

## Context

The site needs its own public hostname and HTTPS without expanding beyond static hosting. Existing Google mail and root-domain DNS must remain intact.

## Decision

Attach www.farhang.io to prod CloudFront using an ACM DNS-validated certificate in us-east-1. Keep the existing Squarespace DNS provider; supply manual validation and www CNAME changes rather than add Route 53 or transfer registration. Preserve root records, Domain Connect, and the Google mail MX record. Do not configure a root-domain redirect as part of this change.

Prepare the certificate first with the alias disabled. After the user publishes its validation CNAME and AWS issues it, enable the alias and certificate in a full prod Terraform deployment, then change the www CNAME to the prod distribution. The two-stage switch is an implementation choice to allow external DNS validation without a blocked initial deployment.

## Consequences

Domain setup requires manual DNS changes outside the repository. The shared backend, simple flat Terraform structure, and no-NAT/no-compute scope remain unchanged. Certificate validation records stay in DNS for renewal. Dev and test keep their existing CloudFront hostnames. The domain is not connected until certificate issuance, CloudFront, public DNS, and site content are verified.

## Related documents

- [Domain setup](../domain-setup.md)
- [Terraform guide](../../terraform/README.md)
- [Minimal infrastructure scope](0009-minimal-portfolio-infrastructure.md)
