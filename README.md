# Personal Website

A small personal website introducing Nima Farhang, built as a static React and TypeScript application. This repository will contain the website, AWS infrastructure defined in Terraform, and two GitHub Actions deployment pipelines.

## Scope

This is a small self-promotion and portfolio website for personal introductions and sample work. Keep hosting simple and inexpensive: static S3/CloudFront hosting, with the existing external Terraform backend. Sample projects are presented as public descriptions, screenshots, static examples, or links; the website does not connect to compute resources or handle customer data.

Do not create or connect to a NAT gateway. VPC networking, servers, containers, databases, and live compute integrations are outside this scope. The backend folder remains reserved only; future Lambda work requires an explicit decision to expand the scope. See [ADR 0009](docs/adr/0009-minimal-portfolio-infrastructure.md).

## Current status

The repository includes a minimal React frontend, Terraform hosting using an existing remote backend, deployment scripts, and two GitHub Actions pipelines. The frontend is an under-construction page ready to replace with personal content. Dev infrastructure has been deployed and verified; see the [deployment record](docs/deployments.md). Website content deployment is a separate step.

## Architecture

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
.github/workflows/           Website and Terraform pipeline definitions
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
terraform/                  Shared Terraform root configuration
  environments/
    dev.tfvars              Development inputs
    test.tfvars             Test inputs
    prod.tfvars             Production inputs
  backend.tf                Existing shared S3/DynamoDB backend
  backend-dev.hcl           Development state key
  backend-test.hcl          Test state key
  backend-prod.hcl          Production state key
  main.tf                   Website hosting resources
```

## Start in GitHub Codespaces

1. Create a Codespace for this repository, or run **Codespaces: Rebuild Container** in an existing Codespace.
2. The container provides Node.js 22 with npm, Terraform 1.9.6, AWS CLI v2, Git, ripgrep, and ShellCheck.
3. Initialization configures AWS if credentials are available. Frontend dependencies are installed with `npm ci`.
4. Follow [website/README.md](website/README.md) for the application layout and [website/frontend/README.md](website/frontend/README.md) for frontend commands.

Run `./scripts/dev_website.sh` to start Vite on the forwarded port `5173`. Run `./scripts/build_website.sh` to type-check and build the frontend.

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

Use the existing `master` branch for solo development. No additional branching strategy is required. There are three AWS environments: `dev`, `test`, and `prod`. Deploy `dev` manually for AWS development checks; CI continues to promote `test` then `prod`. The Codespace is the local development environment.

The pipelines are:

| Pipeline | Responsibility | Promotion |
| --- | --- | --- |
| Website | Type-check, build the static site, upload to S3, invalidate CloudFront | Deploy to test, verify it, then deploy the same build artifact to prod |
| Terraform | Format-check, validate, plan and apply AWS infrastructure | Apply test successfully before planning and applying prod |

Both pipelines run on relevant changes to `master` and support manual dispatch. Terraform and website releases remain separate: provision infrastructure first, then deploy website assets. Each environment has its own website bucket, CloudFront distribution, and Terraform state key. The existing shared S3 state bucket and DynamoDB lock table are used by both pipelines; this repository does not provision them.

Both workflows share one concurrency group, preventing infrastructure and website releases from overlapping. GitHub can replace an older pending run with a newer one; this is not a FIFO release queue. Test always completes before prod within a run.

### First deployment

1. Create GitHub environments named `test` and `prod` under repository Settings → Environments. Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment secrets in each. Codespaces secrets are separate and are not available to Actions. `AWS_SESSION_TOKEN` is optional for temporary credentials.
2. Run the **Terraform** workflow manually on `master` and wait for both deployments.
3. Run the **Website** workflow manually on `master` to deploy and verify both sites.

Configuration targets AWS account `210006516097`, region `ap-southeast-2`. These non-secret settings are committed in Terraform environment files and checked by the workflows. Change them consistently if moving accounts or regions. Required AWS permissions and script details are documented in [terraform/README.md](terraform/README.md).

On a first push that changes both layers, the website workflow may run before infrastructure exists. Complete Terraform and rerun Website if that happens. Later deployments also use this order when website changes depend on new infrastructure.

## Teardown

Run `./scripts/destroy_environment.sh dev` (or `test` / `prod`) to remove one website stack. Confirm with `DESTROY <environment>`. This permanently deletes the selected site and all its S3 object versions while preserving the shared backend. See [script instructions](scripts/README.md#destroy-an-environment).

## Development conventions

Use short, focused scripts under `scripts/` for repeatable operations shared by local development and CI. Resolve repository paths from the script location and accept environment names as a first argument with `ENVIRONMENT` as a fallback. Explain intent and non-obvious behavior in comments; use descriptive names for ordinary steps.

See the [documentation index](docs/README.md), [coding and naming standards](docs/standards.md), and [decision records](docs/adr/README.md). Record user decisions and documentation requests during the same task, then validate and locally commit completed changes as described in the [development workflow](docs/development-workflow.md). [AGENTS.md](AGENTS.md) preserves these instructions for future sessions.

Operational details live in [scripts/README.md](scripts/README.md) and [terraform/README.md](terraform/README.md).

## References

The scaffold follows the Codespaces and AWS initialization approach in [Data Product Demo](https://github.com/Nima-Farhang/Data-Product-Demo), with lowercase folders, environment-specific Terraform configuration, and script organization informed by [Data Platform Demo](https://github.com/Nima-Farhang/Data-Platform-Demo). Data-platform-specific tools and resources are intentionally outside this website's scope.
