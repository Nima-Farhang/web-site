# Backend

Reserved for future AWS Lambda processes. There is no backend implementation, runtime selection, dependency setup, or deployment automation yet.

Add function source and its dependencies here when backend behavior is introduced. Define Lambda resources and supporting AWS infrastructure under the repository's `terraform/` directory. Document runtime, configuration, local development, and deployment commands alongside the implementation at that time.

The current scope is a static personal promotion and sample-work site with no compute integrations or customer data. This folder remains a reservation only; the earlier Lambda idea requires an explicit user decision to expand the scope before implementation. Do not add NAT gateways or networking dependencies. See [ADR 0009](../../docs/adr/0009-minimal-portfolio-infrastructure.md).
