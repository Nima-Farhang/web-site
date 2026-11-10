#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

bash "${REPO_ROOT}/.devcontainer/aws-configure.sh"

# Install reproducibly once the React application and its lock file are added.
if [[ -f "${REPO_ROOT}/website/frontend/package-lock.json" ]]; then
  npm --prefix "${REPO_ROOT}/website/frontend" ci
else
  echo "Repository scaffold ready. React application dependencies have not been added yet."
fi
