# Frontend

The initial portfolio is one static React and TypeScript page built with Vite. It introduces Nima Farhang and showcases five public repositories with summaries grounded in their READMEs.

```bash
./scripts/build_website.sh
./scripts/dev_website.sh
```

Run these from the repository root. The build installs locked dependencies, checks TypeScript, generates `website/frontend/dist/`, and writes a public `release.json` containing the commit SHA. The development server binds to `0.0.0.0:5173` for Codespaces.

## Editing

- `src/App.tsx`: page shell, header navigation, and footer.
- `src/components/MainContent.tsx`: introduction, portfolio sections, and contact details. The main content is kept separate from `App.tsx` at the user’s request.
- `src/content/portfolio.ts`: project summaries, technologies, and public repository links.
- `src/components/`: shared project cards and icons.
- `src/styles/reference-bootstrap.css`: adapted Lux template from the supplied reference; retain license attribution.
- `src/styles/site.css`: local palette, responsive layout, and accessibility styles.

See [content sources](../../docs/portfolio-content.md) and [third-party notices](THIRD_PARTY_NOTICES.md). The site uses system-font fallbacks and inline graphics rather than remote fonts or imagery.

## Delivery

Website and infrastructure workflows run only through manual dispatch with dev or prod selection. Push commits to GitHub before manually running Actions for the desired revision; direct AWS deployments use `./scripts/deploy_website.sh dev` after building.

No router, dynamic repository API, backend, or customer-data collection is added. All bundled content is public. The www.farhang.io production-domain setup is independent of dev's CloudFront URL.
