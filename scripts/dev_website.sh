#!/usr/bin/env bash
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
npm --prefix "${REPO_ROOT}/website/frontend" run dev -- --host 0.0.0.0
