# Website

Application code is separated into two folders:

- [frontend/](frontend/README.md): the static React and TypeScript site, built for S3 and CloudFront hosting.
- [backend/](backend/README.md): reserved for future AWS Lambda processes.

Only the frontend is in the initial scope. Keep future backend source and dependencies separate from the frontend build. AWS resource definitions belong in the repository's `terraform/` directory, with repeatable operational commands under `scripts/`.
