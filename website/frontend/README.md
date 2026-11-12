# Frontend

The initial portfolio is a static React and TypeScript home page and Contact page built with Vite. It introduces Nima Farhang and showcases five public repositories with summaries grounded in their READMEs.

```bash
./scripts/build_website.sh
./scripts/dev_website.sh
```

Run these from the repository root. The build installs locked dependencies, checks TypeScript, generates `website/frontend/dist/`, and writes a public `release.json` containing the commit SHA. The development server binds to `0.0.0.0:5173` for Codespaces.

## Editing

- `index.html` and `contact.html`: static entry pages, built together by `vite.config.ts`.
- `src/App.tsx`: selects the Contact content for `/contact.html`; page shell and skip link, composing the header, main content, and footer.
- `src/components/layout/`: header, footer, and `MainContent.tsx`, which lists the page sections in display order.
- `src/components/sections/`: hero, focus band, work, architecture, closing, and contact sections, plus the project card used by the work section.
- `src/components/shared/`: icons reused across sections and layout components.
- `src/content/portfolio.ts`: project summaries, technologies, and public repository links.
- `src/styles/reference-bootstrap.css`: adapted Lux template from the supplied reference; retain license attribution.
- `src/styles/site.css`: local palette, responsive layout, and accessibility styles.

See [content sources](../../docs/portfolio-content.md) and [third-party notices](THIRD_PARTY_NOTICES.md). The site uses system-font fallbacks and inline graphics rather than remote fonts or imagery.

The user requested separate page sections and component subfolders to make the page easier to understand. Keep each section’s markup and imports together, format nested JSX across lines, and keep `MainContent.tsx` as the page outline.

## Delivery

Website and infrastructure workflows run only through manual dispatch with dev or prod selection. Push commits to GitHub before manually running Actions for the desired revision; direct AWS deployments use `./scripts/deploy_website.sh dev` after building.

No router, dynamic repository API, backend, or customer-data collection is added. All bundled content is public. The www.farhang.io production-domain setup is independent of dev's CloudFront URL.
