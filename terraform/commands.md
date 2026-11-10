# Terraform commands

## Validate without AWS access

From the repository root:

```bash
./scripts/validate_terraform.sh
```

## Dev deployment

From the repository root:

```bash
./scripts/deploy_environment.sh dev
```

Dev is manually deployed and uses its own backend key. It does not change the test → prod CI sequence.

## Test init / plan

```bash
cd terraform
terraform init -reconfigure -backend-config=backend-test.hcl
terraform plan -var-file=environments/test.tfvars
```

## Prod init / plan

```bash
cd terraform
terraform init -reconfigure -backend-config=backend-prod.hcl
terraform plan -var-file=environments/prod.tfvars
```

Always initialize the desired environment before planning or applying when using these direct commands. State lives in the existing shared S3 bucket and locks use the existing DynamoDB table.

## Deploy with saved plans

From the repository root, deploy test before prod:

```bash
./scripts/deploy_environment.sh test
./scripts/deploy_environment.sh prod
```

The scripts isolate backend metadata by environment, show a saved plan, and request typed confirmation before applying it. GitHub Actions calls these same scripts with `APPLY_APPROVE=true` after the preceding stage succeeds.
