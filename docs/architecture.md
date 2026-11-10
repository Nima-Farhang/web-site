# Architecture

This repository owns one personal website introducing Nima Farhang, its hosting infrastructure, and its deployment automation. The frontend currently contains an under-construction page. Terraform and workflows are implemented. See the [deployment record](deployments.md) for verified AWS deployments.

## Scope boundary

The site is for personal self-promotion and showcasing sample work. Keep infrastructure limited to what the static website requires. Present projects using public text, screenshots, static examples, and links; do not connect the website to compute resources to run demonstrations. No customer data is collected, stored, or processed.

Do not create, attach, or depend on NAT gateways. VPCs, subnets, private networking, servers, containers, databases, and live compute integrations are outside the current scope. Reference repositories provide coding and documentation patterns, not a reason to adopt platform infrastructure.

`website/backend/` remains a folder reservation, not a planned active service. The earlier Lambda idea requires an explicit future scope decision before implementation. See [ADR 0009](adr/0009-minimal-portfolio-infrastructure.md).

## Application and hosting

```text
Browser → HTTPS CloudFront distribution → private S3 bucket

website/frontend/ → React + TypeScript + Vite → static dist/ artifact
website/backend/  → reserved for future AWS Lambda processes
```

The initial site has no backend application or database. S3 is a regular private origin accessed through CloudFront origin access control. CloudFront redirects HTTP to HTTPS and uses its default hostname and certificate. Custom DNS, custom certificates, routing rewrites, and Lambda services require future implementation decisions.

## Ownership

| Location | Responsibility |
| --- | --- |
| `website/frontend/` | UI, personal content, static assets, frontend dependencies |
| `website/backend/` | Future Lambda source and dependencies |
| `terraform/main.tf` | Website S3, CloudFront, and access policies |
| `terraform/backend.tf` | Connection to the externally managed state backend |
| `terraform/environments/*.tfvars` | Dev/test/prod input values |
| `scripts/` | Shared local and CI operational commands |
| `.github/workflows/` | Separate website and infrastructure delivery |

Terraform owns hosting resources; the website pipeline owns uploaded site objects. The shared state bucket and DynamoDB lock table are managed elsewhere. Do not add their lifecycle to this repository.

## Delivery

The website pipeline checks types, builds once, deploys to test, checks the deployed HTML and release marker, then promotes the same artifact to prod. Terraform validates and applies a saved plan to test before planning and applying prod. Both workflows share a concurrency group but do not establish ordering between one another; deploy infrastructure first when content depends on it.

See [environment strategy](environment-strategy.md), [pipeline operations](../.github/workflows/README.md), and the [accepted decisions](adr/README.md).
