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

Dev is manually deployed and uses its own backend key. It can also be selected in the manual Terraform workflow dropdown.

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

The scripts isolate backend metadata by environment, show a saved plan, and request typed confirmation before applying it. GitHub Actions calls these same scripts with `APPLY_APPROVE=true` for the selected dropdown environment after validation succeeds.

## Destroy one environment

```bash
./scripts/destroy_environment.sh dev
```

Run from the repository root (or use the script's absolute path). Substitute `test` or `prod` as needed. Enter `DESTROY dev` for the example above. This removes the selected website infrastructure and permanently deletes all its versioned site objects, while retaining the shared state bucket and lock table. See [script behavior and failure recovery](../scripts/README.md#destroy-an-environment).
