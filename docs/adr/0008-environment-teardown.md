# 0008 — Environment teardown

## Status

Environment selection superseded by [0013](0013-retire-test-environment.md); only dev and prod remain supported. Other decisions below retain their existing status.

Accepted

## Recorded

2026-11-10

## Source

The user requested a reusable Terraform destroy script similar to Data Platform Demo. The implementation follows its targeted bucket-preparation and saved-plan teardown pattern.

## Context

Website buckets are versioned and retain assets. Ordinary Terraform deletion cannot remove non-empty buckets with the existing safe default. The shared state backend belongs to another stack and must remain available.

## Decision

Provide `scripts/destroy_environment.sh` for one explicitly selected dev, test, or prod environment. Require typed `DESTROY <environment>` confirmation, even when deployment auto-approval is set. Keep `force_destroy_buckets=false` by default. For teardown, save and apply a targeted plan enabling deletion on an existing bucket, then save and apply the selected stack's destroy plan. Reject preparation plans that recreate the bucket or alter another managed resource. Reuse environment backend isolation and locking. Do not add backend teardown or automatic CI destruction.

## Consequences

Teardown can permanently delete all site object versions as well as hosting infrastructure. Shared backend resources and other environment states are preserved. If the operation fails after preparation, rerun teardown or redeploy normally to restore the bucket's deletion protection setting. Creating the script does not execute it; the existing dev deployment remains intact.

## Related documents

- [Scripts and teardown recovery](../../scripts/README.md#destroy-an-environment)
- [Terraform commands](../../terraform/commands.md#destroy-one-environment)
- [Security model](../security-model.md)
- [Reference script](https://github.com/Nima-Farhang/Data-Platform-Demo/blob/master/scripts/destroy_environment.sh)
