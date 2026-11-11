# 0003 — Flat Terraform and existing backend

## Status

Environment selection superseded by [0013](0013-retire-test-environment.md); only dev and prod remain supported. Other decisions below retain their existing status.

Accepted

## Recorded

2026-11-10

## Source

Explicit user correction to follow Data Product Demo and reuse state infrastructure managed elsewhere.

## Context

The initial implementation introduced modules and backend bootstrap, which were more structure and ownership than this simple website needed.

## Decision

Use a flat Terraform root matching Data Product Demo: resources in `main.tf`, `provider.tf`, `versions.tf`, `variables.tf`, and `outputs.tf`; common S3 backend settings in `backend.tf`; root-level `backend-test.hcl` and `backend-prod.hcl`; inputs in `environments/test.tfvars` and `prod.tfvars`. Reuse bucket `nima-terraform-state-210006516097` and DynamoDB table `terraform-state-lock` in Sydney. Keep website state under `test/website/terraform.tfstate` and `prod/website/terraform.tfstate`. Remove bootstrap and hosting modules.

## Consequences

This repository manages website hosting only. It must not create or destroy the shared state bucket or lock table, or reuse another product's state keys. New modules or a different backend ownership model require another decision. Terraform remains pinned to 1.9.6 in the current implementation.

## Related documents

- [Terraform guide](../../terraform/README.md)
- [Terraform commands](../../terraform/commands.md)
