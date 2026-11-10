# Frontend

A minimal React and TypeScript application built with Vite. The current page is an under-construction placeholder for Nima Farhang.

From the repository root:

```bash
./scripts/build_website.sh
./scripts/dev_website.sh
```

The build script installs locked dependencies, checks TypeScript, produces `website/frontend/dist/`, and writes a public `release.json` containing the commit SHA. CI builds once and deploys the same artifact to test and prod. The development script binds to `0.0.0.0:5173` for Codespaces; run the build script or `npm ci` first to install dependencies.

From this directory you can also use `npm run dev`, `npm run typecheck`, `npm run build`, and `npm run preview`.

Use `src/components/` for reusable UI, `src/content/` for personal information, `src/styles/` for shared CSS, and `src/assets/` for imported assets. Files in `public/` are copied without processing. Everything in the static build is public, including frontend configuration.

There is no client-side router or SPA error fallback. Add routing behavior explicitly if additional routes are introduced. Backend Lambda code remains separate under `website/backend/`.
