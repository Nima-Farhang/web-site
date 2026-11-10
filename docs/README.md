# Documentation

The root [README](../README.md) introduces the project and setup. These documents describe the current design and the rules for continuing development.

| Document | Purpose |
| --- | --- |
| [Architecture](architecture.md) | Application layers, AWS components, and ownership |
| [Environment strategy](environment-strategy.md) | Dev/test/prod separation and promotion |
| [Security model](security-model.md) | Credentials, private hosting, and state boundaries |
| [Development standards](standards.md) | Coding, naming, commenting, scripts, and formatting |
| [Development workflow](development-workflow.md) | Recording user decisions, validation, and commits |
| [Portfolio content](portfolio-content.md) | Public README sources, visual provenance, and editing copy |
| [Domain setup](domain-setup.md) | www.farhang.io certificate validation and Squarespace DNS cutover |
| [Verified deployments](deployments.md) | Live AWS deployment results and limitations |
| [Decision records](adr/README.md) | Accepted decisions and why they were made |

Operational instructions stay beside the implementation: [Terraform](../terraform/README.md), [Terraform commands](../terraform/commands.md), [scripts](../scripts/README.md), [frontend](../website/frontend/README.md), and [pipelines](../.github/workflows/README.md).

[AGENTS.md](../AGENTS.md) makes these instructions discoverable for future coding-agent sessions. Update documentation alongside the change, including whenever the user makes a decision or explicitly requests documentation.

The organization follows [Data Platform Demo documentation](https://github.com/Nima-Farhang/Data-Platform-Demo/tree/master/docs), while the simple Terraform layout and colocated commands follow [Data Product Demo](https://github.com/Nima-Farhang/Data-Product-Demo/tree/master/TERRAFORM). This website keeps its own smaller scope; the reference platform's modules and OIDC infrastructure are not adopted by default.
