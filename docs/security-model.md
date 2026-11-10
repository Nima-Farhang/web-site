# Security model

## Credentials

The current setup follows Data Product Demo's key-based AWS authentication. Codespaces uses `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`; temporary credentials also need `AWS_SESSION_TOKEN`. Initialization writes the default AWS profile under the user's home with file permissions `0600` and does not print values. Frontend work can proceed without credentials.

GitHub Actions has separate credentials in the `test` and `prod` environment secrets. Codespaces secrets are not available to Actions. Credentials, state, plans, and secret values must never be committed, logged, embedded in images, or copied into frontend configuration. A static build and its `release.json` are public.

The provider, backend, and workflows check the intended account. Authentication success does not establish that an identity has all deployment permissions. Read the [Terraform permissions](../terraform/README.md) before deployment. Switching to OIDC or adding IAM resources is a separate decision.

## Hosting

Website buckets block public access, enforce bucket ownership, enable encryption and versioning, and deny insecure transport. Bucket policies permit reads through their specific CloudFront distribution. CloudFront signs origin requests and redirects viewers to HTTPS.

Website deployment retains old assets and object versions; buckets are not force-emptied on deletion. Retention cleanup and automatic rollback are not currently implemented. A failed verification prevents promotion but does not undo already uploaded objects.

## Shared state boundary

The backend bucket and lock table are existing shared resources managed outside this repository. Use only the website's separate state keys and locking protocol; never overwrite another project's state or provision/destroy the shared backend here. Terraform provider lock files belong in Git; state and saved plans do not.

See [ADR 0003](adr/0003-flat-terraform-and-existing-backend.md) and [ADR 0005](adr/0005-codespaces-and-aws-authentication.md).
