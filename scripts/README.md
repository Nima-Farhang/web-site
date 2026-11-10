# Scripts

Keep repeatable website and Terraform commands here. Deployment scripts and their workflow callers will be added when those layers are implemented.

Follow the [Data Platform Demo script pattern](https://github.com/Nima-Farhang/Data-Platform-Demo/blob/master/scripts/deploy_environment.sh):

- Use Bash with `set -euo pipefail`.
- Resolve repository paths relative to `${BASH_SOURCE[0]}`, so scripts work from any current directory.
- Accept the first argument as the environment, falling back to `ENVIRONMENT`.
- Validate environment names against `test` and `prod` before any deployment action.
- Keep each entry point focused and reuse the same commands in CI.
- Comment on intent, assumptions, and operational choices; avoid narrating obvious commands.
- Keep deployment approval behavior explicit; interactive local applies should retain Terraform's confirmation.

Planned entry points include website development/build, website deployment, Terraform bootstrap, and environment deployment. Do not add placeholder scripts that appear to deploy successfully without doing any work.
