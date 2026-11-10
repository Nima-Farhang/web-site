#!/usr/bin/env bash
set -euo pipefail

# Allow frontend work without AWS secrets, but reject incomplete credentials.
if [[ -z "${AWS_ACCESS_KEY_ID:-}" && -z "${AWS_SECRET_ACCESS_KEY:-}" && -z "${AWS_SESSION_TOKEN:-}" ]]; then
  echo "AWS secrets are not set; skipping AWS configuration."
  exit 0
fi

for variable_name in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY; do
  if [[ -z "${!variable_name:-}" ]]; then
    echo "Error: required environment variable '${variable_name}' is not set." >&2
    exit 1
  fi
done

AWS_DIRECTORY="${HOME}/.aws"
umask 077
mkdir -p "${AWS_DIRECTORY}"

cat > "${AWS_DIRECTORY}/credentials" <<EOF
[default]
aws_access_key_id=${AWS_ACCESS_KEY_ID}
aws_secret_access_key=${AWS_SECRET_ACCESS_KEY}
EOF

if [[ -n "${AWS_SESSION_TOKEN:-}" ]]; then
  printf 'aws_session_token=%s\n' "${AWS_SESSION_TOKEN}" >> "${AWS_DIRECTORY}/credentials"
fi

cat > "${AWS_DIRECTORY}/config" <<EOF
[default]
region = ${AWS_REGION:-ap-southeast-2}
output = json
EOF

chmod 0600 "${AWS_DIRECTORY}/credentials" "${AWS_DIRECTORY}/config"
echo "AWS default profile configured in ${AWS_DIRECTORY}."
