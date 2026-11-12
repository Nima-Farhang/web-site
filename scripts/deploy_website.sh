#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib/environment.sh"
BUILD_DIR="${REPO_ROOT}/website/frontend/dist"
[[ -s "${BUILD_DIR}/index.html" && -s "${BUILD_DIR}/release.json" ]] || {
  echo "Build artifact must contain index.html and release.json." >&2; exit 1;
}
terraform_init
WEBSITE_BUCKET="$(terraform -chdir="${TERRAFORM_DIR}" output -raw website_bucket_name)"
DISTRIBUTION_ID="$(terraform -chdir="${TERRAFORM_DIR}" output -raw cloudfront_distribution_id)"
WEBSITE_URL="$(terraform -chdir="${TERRAFORM_DIR}" output -raw website_url)"

# Publish immutable assets before HTML. Keep old assets so cached pages still work.
aws s3 sync "${BUILD_DIR}/" "s3://${WEBSITE_BUCKET}/" \
  --exclude index.html --exclude contact.html --exclude release.json --cache-control 'public,max-age=31536000,immutable' --only-show-errors
aws s3 cp "${BUILD_DIR}/index.html" "s3://${WEBSITE_BUCKET}/index.html" \
  --content-type text/html --cache-control 'no-cache,no-store,must-revalidate' --only-show-errors
if [[ -s "${BUILD_DIR}/contact.html" ]]; then
  aws s3 cp "${BUILD_DIR}/contact.html" "s3://${WEBSITE_BUCKET}/contact.html" \
    --content-type text/html --cache-control 'no-cache,no-store,must-revalidate' --only-show-errors
fi
aws s3 cp "${BUILD_DIR}/release.json" "s3://${WEBSITE_BUCKET}/release.json" \
  --content-type application/json --cache-control 'no-cache,no-store,must-revalidate' --only-show-errors
INVALIDATION_ID="$(aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" \
  --paths '/*' --query Invalidation.Id --output text)"
aws cloudfront wait invalidation-completed --distribution-id "${DISTRIBUTION_ID}" --id "${INVALIDATION_ID}"

# Verify both the entry page and the exact release before allowing promotion.
curl --fail --silent --show-error --retry 8 --retry-all-errors --retry-delay 5 \
  --connect-timeout 10 --max-time 30 "${WEBSITE_URL}/" -o "${TF_DATA_DIR}/deployed-index.html"
cmp "${BUILD_DIR}/index.html" "${TF_DATA_DIR}/deployed-index.html"
curl --fail --silent --show-error --retry 8 --retry-all-errors --retry-delay 5 \
  --connect-timeout 10 --max-time 30 "${WEBSITE_URL}/release.json" -o "${TF_DATA_DIR}/deployed-release.json"
cmp "${BUILD_DIR}/release.json" "${TF_DATA_DIR}/deployed-release.json"
echo "Verified ${ENVIRONMENT_NAME}: ${WEBSITE_URL}"
