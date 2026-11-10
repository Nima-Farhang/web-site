#!/usr/bin/env bash
# Sourced by operational entry points; keep test/prod data directories isolated.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENVIRONMENT_NAME="${1:-${ENVIRONMENT:-}}"
case "${ENVIRONMENT_NAME}" in
  test|prod) ;;
  *) echo "Usage: $0 <test|prod> (or set ENVIRONMENT)" >&2; exit 1 ;;
esac
export TF_DATA_DIR="${REPO_ROOT}/terraform/.terraform/${ENVIRONMENT_NAME}"
TERRAFORM_DIR="${REPO_ROOT}/terraform"
TFVAR_FILE="${TERRAFORM_DIR}/environments/${ENVIRONMENT_NAME}.tfvars"
PLAN_FILE="${TF_DATA_DIR}/deploy.tfplan"
export AWS_REGION="${AWS_REGION:-ap-southeast-2}"
export AWS_DEFAULT_REGION="${AWS_REGION}"
export AWS_PAGER=""
mkdir -p "${TF_DATA_DIR}"

terraform_init() {
  terraform -chdir="${TERRAFORM_DIR}" init -input=false -reconfigure -lockfile=readonly \
    -backend-config="${TERRAFORM_DIR}/backend-${ENVIRONMENT_NAME}.hcl"
}
