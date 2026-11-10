#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib/environment.sh"

[[ -f "${TFVAR_FILE}" && -f "${TERRAFORM_DIR}/backend-${ENVIRONMENT_NAME}.hcl" ]] || {
  echo "Terraform configuration is incomplete for ${ENVIRONMENT_NAME}." >&2; exit 1;
}

echo "This permanently destroys the ${ENVIRONMENT_NAME} website stack, including all S3 object versions."
echo "The shared state bucket and DynamoDB lock table are preserved."
read -r -p "Type 'DESTROY ${ENVIRONMENT_NAME}' to continue: " confirmation
[[ "${confirmation}" == "DESTROY ${ENVIRONMENT_NAME}" ]] || {
  echo "Confirmation did not match. Nothing was destroyed." >&2; exit 1;
}

terraform -chdir="${TERRAFORM_DIR}" fmt -check -recursive
terraform_init
terraform -chdir="${TERRAFORM_DIR}" validate
BUCKET_PLAN="${TF_DATA_DIR}/enable-bucket-deletion.tfplan"
DESTROY_PLAN="${TF_DATA_DIR}/destroy.tfplan"
state_resources="$(terraform -chdir="${TERRAFORM_DIR}" state list)"

# Terraform must record force_destroy before destroy mode can empty a versioned bucket.
# Target just the existing bucket so unrelated configuration changes are not applied.
if grep -Fxq 'aws_s3_bucket.website' <<< "${state_resources}"; then
  terraform -chdir="${TERRAFORM_DIR}" plan -input=false -lock-timeout=5m \
    -target=aws_s3_bucket.website -var-file="${TFVAR_FILE}" \
    -var=force_destroy_buckets=true -out="${BUCKET_PLAN}"

  # Stop if drift would recreate the bucket or change any other managed resource.
  terraform -chdir="${TERRAFORM_DIR}" show -json "${BUCKET_PLAN}" | python3 -c '
import json, sys
changes = json.load(sys.stdin).get("resource_changes", [])
for change in changes:
    if change.get("mode") == "data":
        continue
    actions = change["change"]["actions"]
    if actions == ["no-op"]:
        continue
    if change["address"] != "aws_s3_bucket.website" or actions != ["update"]:
        sys.exit("Bucket preparation would create, replace, delete, or change another resource. Reconcile drift before teardown.")
'
  terraform -chdir="${TERRAFORM_DIR}" apply -input=false -lock-timeout=5m "${BUCKET_PLAN}"
fi

terraform -chdir="${TERRAFORM_DIR}" plan -destroy -input=false -lock-timeout=5m \
  -var-file="${TFVAR_FILE}" -var=force_destroy_buckets=true -out="${DESTROY_PLAN}"
terraform -chdir="${TERRAFORM_DIR}" apply -input=false -lock-timeout=5m "${DESTROY_PLAN}"
echo "Environment '${ENVIRONMENT_NAME}' was destroyed successfully. Shared backend preserved."
