# Website

This folder will contain the static React and TypeScript application, using Vite to build assets into `dist/` for S3 deployment. Application code and dependencies have not been generated yet.

Keep the application entry point and top-level component in `src/`. Use `src/components/` for reusable UI, `src/content/` for personal copy and project information, `src/styles/` for shared CSS, and `src/assets/` for imported assets. Files in `public/` are copied without processing.

When adding the application:

1. Create the React/TypeScript Vite configuration and commit `package.json` and `package-lock.json`.
2. Provide npm commands for development, type-checking, and production builds.
3. Add root-level shell entry points under `scripts/` that call these commands locally and in CI.
4. Bind the development server to `0.0.0.0:5173` for Codespaces.

Anything embedded in a static build is public. Frontend environment variables must contain only public configuration. Prefer a simple single-page introduction initially; add client-side routing and CloudFront route handling only when needed.
