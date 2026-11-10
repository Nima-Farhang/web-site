FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

ARG TERRAFORM_VERSION=1.9.6
ARG TARGETARCH

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl unzip git ripgrep shellcheck \
    && rm -rf /var/lib/apt/lists/*

# Verify Terraform before installing it; keep the version aligned with the reference projects.
RUN set -eu; \
    architecture="${TARGETARCH:-$(dpkg --print-architecture)}"; \
    archive="terraform_${TERRAFORM_VERSION}_linux_${architecture}.zip"; \
    curl -fsSL "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/${archive}" -o "/tmp/${archive}"; \
    curl -fsSL "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_SHA256SUMS" -o /tmp/terraform_SHA256SUMS; \
    cd /tmp; \
    grep " ${archive}$" terraform_SHA256SUMS | sha256sum -c -; \
    unzip "${archive}" -d /usr/local/bin; \
    rm "${archive}" terraform_SHA256SUMS

RUN set -eu; \
    case "${TARGETARCH:-$(dpkg --print-architecture)}" in \
      amd64) aws_architecture=x86_64 ;; \
      arm64) aws_architecture=aarch64 ;; \
      *) echo "Unsupported architecture" >&2; exit 1 ;; \
    esac; \
    curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-${aws_architecture}.zip" -o /tmp/awscliv2.zip; \
    unzip -q /tmp/awscliv2.zip -d /tmp; \
    /tmp/aws/install; \
    rm -rf /tmp/aws /tmp/awscliv2.zip
