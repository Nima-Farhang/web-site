# Personal Website

A small personal website introducing Nima Farhang, built as a static React and TypeScript application. This repository will contain the website, AWS infrastructure defined in Terraform, and two GitHub Actions deployment pipelines.

## Current status

This is the initial repository scaffold. The Codespaces configuration, AWS credential setup, folder structure, and working conventions are in place. React application code, Terraform resources, remote state bootstrap, and executable CI/CD workflows are the next implementation steps. Nothing in this scaffold deploys resources.

## Planned architecture

```text
Browser → HTTPS / CloudFront → private S3 website bucket

GitHub Actions
├── Website pipeline: build once → deploy test → deploy prod
└── Terraform pipeline: validate → plan/apply test → plan/apply prod
```

The initial website is frontend-only. `website/backend/` is reserved for future AWS Lambda processes; no backend is implemented yet. CloudFront will provide HTTPS in front of a private S3 bucket using origin access control. A custom domain, Route 53 records, and an ACM certificate can be added when the domain is decided; CloudFront's default hostname is sufficient to start.

## Repository structure

```text
.devcontainer/               Codespaces image, initialization, AWS setup
.github/workflows/           Website and Terraform pipeline definitions (planned)
docs/                       Architecture and development conventions
scripts/                    Repeatable local and CI commands
website/                    Website application code
  frontend/                 Static React and TypeScript application
    public/                 Files copied directly into the site build
    src/
      assets/               Imported images and other assets
      components/           Reusable React components
      content/              Personal introduction and project content
      styles/               Shared styles
  backend/                  Reserved for future AWS Lambda processes
terraform/                  Shared Terraform root configuration (planned)
  bootstrap/                Remote-state foundation
  environments/
    test/                   Test backend configuration and inputs
    prod/                   Production backend configuration and inputs
  modules/website/           Reusable S3 and CloudFront resources
```

## Start in GitHub Codespaces

1. Create a Codespace for this repository, or run **Codespaces: Rebuild Container** in an existing Codespace.
2. The container provides Node.js 22 with npm, Terraform 1.9.6, AWS CLI v2, Git, ripgrep, and ShellCheck.
3. Initialization configures AWS if credentials are available. Frontend dependencies will be installed with `npm ci` once `website/frontend/package-lock.json` exists.
4. Follow [website/README.md](website/README.md) for the application layout and [website/frontend/README.md](website/frontend/README.md) for the frontend implementation plan.

Port `5173` is forwarded for the future Vite development server. Run that server with `--host 0.0.0.0` so the Codespaces forwarded port can reach it.

## AWS setup

The setup follows the environment-variable approach used in [Data Product Demo](https://github.com/Nima-Farhang/Data-Product-Demo/blob/master/.devcontainer/init.sh).

Add these **Codespaces secrets** and grant this repository access:

| Variable | Purpose |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | AWS access key for local infrastructure work |
| `AWS_SECRET_ACCESS_KEY` | Matching secret access key |
| `AWS_SESSION_TOKEN` | Required when using temporary credentials |

Optionally set `AWS_REGION`; the default is `ap-southeast-2`. Codespaces secrets are separate from GitHub Actions secrets.

`.devcontainer/aws-configure.sh` writes the default AWS profile to `~/.aws/credentials` and `~/.aws/config` with file permissions `0600`. It runs during creation and startup, supports temporary session tokens, and never prints credential values. If no credentials are supplied, frontend development can continue; partially supplied credentials cause an error. When supplied, these values replace the default profile files in the container.

After adding or changing secrets, restart the Codespace and verify access:

```bash
bash .devcontainer/aws-configure.sh
aws sts get-caller-identity
```

Do not commit credentials or put them in the Docker image. A separate AWS account ID variable is not needed for this scaffold; the authenticated identity can provide it when infrastructure is implemented.

## Environments and delivery

Use the existing `master` branch for solo development. No additional branching strategy is required. There are exactly two deployed environments: `test` and `prod`; the Codespace is the local development environment.

The planned pipelines are:

| Pipeline | Responsibility | Promotion |
| --- | --- | --- |
| Website | Type-check, build the static site, upload to S3, invalidate CloudFront | Deploy to test, verify it, then deploy the same build artifact to prod |
| Terraform | Format-check, validate, plan and apply AWS infrastructure | Apply test successfully before planning and applying prod |

Both pipelines will run on relevant changes to `master` and support manual dispatch. Terraform and website releases remain separate: provision infrastructure first, then deploy website assets. Each environment needs its own website bucket, CloudFront distribution, and Terraform state key. Bootstrap must establish remote state before the infrastructure pipeline can initialize it.

Configure GitHub environments named `test` and `prod` when implementing CI/CD. Keep AWS region, backend settings, and website deployment targets environment-specific. AWS credentials belong in environment secrets. The workflow implementation should serialize deployments per environment to avoid overlapping releases.

## Development conventions

Use short, focused scripts under `scripts/` for repeatable operations shared by local development and CI. Resolve repository paths from the script location and accept environment names as a first argument with `ENVIRONMENT` as a fallback. Explain intent and non-obvious behavior in comments; use descriptive names for ordinary steps.

See [docs/standards.md](docs/standards.md), [scripts/README.md](scripts/README.md), and [terraform/README.md](terraform/README.md) for details.

## References

The scaffold follows the Codespaces and AWS initialization approach in [Data Product Demo](https://github.com/Nima-Farhang/Data-Product-Demo), with lowercase folders, environment-specific Terraform configuration, and script organization informed by [Data Platform Demo](https://github.com/Nima-Farhang/Data-Platform-Demo). Data-platform-specific tools and resources are intentionally outside this website's scope.
