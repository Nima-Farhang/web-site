#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib/environment.sh"

terraform -chdir="${TERRAFORM_DIR}" fmt -check -recursive
terraform_init
terraform -chdir="${TERRAFORM_DIR}" validate
terraform -chdir="${TERRAFORM_DIR}" plan -input=false -lock-timeout=5m \
  -var-file="${TFVAR_FILE}" -out="${PLAN_FILE}"

# Applying a saved plan skips Terraform's prompt, so confirm explicitly for local runs.
if [[ "${APPLY_APPROVE:-false}" != "true" ]]; then
  read -r -p "Apply this plan to ${ENVIRONMENT_NAME}? Type ${ENVIRONMENT_NAME}: " confirmation
  [[ "${confirmation}" == "${ENVIRONMENT_NAME}" ]] || { echo "Apply cancelled."; exit 1; }
fi
terraform -chdir="${TERRAFORM_DIR}" apply -input=false -lock-timeout=5m "${PLAN_FILE}"
terraform -chdir="${TERRAFORM_DIR}" output
