#!/usr/bin/env bash
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
terraform -chdir="${REPO_ROOT}/terraform" fmt -check -recursive
# Backend-free validation must not reuse deployment backend metadata.
TF_DATA_DIR="$(mktemp -d)"
export TF_DATA_DIR
terraform -chdir="${REPO_ROOT}/terraform" init -backend=false -input=false -lockfile=readonly
terraform -chdir="${REPO_ROOT}/terraform" validate
