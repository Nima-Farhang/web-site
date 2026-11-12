# Portfolio content and visual source

The home page is static content: a personal introduction, a visual summary of the project themes, five public repository introductions, and GitHub links. Anchor links navigate within the page. A separate static `/contact.html` page holds the contact details. There is no router, contact form, analytics integration, repository API call, or backend.

## Content ownership

Edit project names, summaries, tags, and public repository slugs in `website/frontend/src/content/portfolio.ts`. Edit the introduction in `src/components/sections/HeroSection.tsx`. Summaries were paraphrased from the public READMEs on 2026-11-10; planned features are not presented as completed functionality. Only repositories confirmed public are featured. Do not add private repository details to the deployed bundle.

Sources:

- [Data Product Demo](https://github.com/Nima-Farhang/Data-Product-Demo/blob/master/README.md)
- [Data Platform Demo](https://github.com/Nima-Farhang/Data-Platform-Demo/blob/master/README.md)
- [Full-Stack WebApp Demo](https://github.com/Nima-Farhang/Full-Stack-WebApp-Demo/blob/master/README.md)
- [dbt Platform Framework](https://github.com/Nima-Farhang/dbt-Platform-Framework/blob/master/README.md)
- [EngineerOS Demo](https://github.com/Nima-Farhang/EngineerOS-Demo/blob/master/README.md)

Keep personal claims grounded in user-provided details and public work. Job titles, employers, years of experience, testimonials, and contact information have not been invented.

The user supplied and approved publishing `nima@farhang.io` and `0064211229743` when requesting a Contact me button. The header’s Contact me button links to `/contact.html`, which contains the email button and email and telephone links; the phone is displayed as `+64 21 122 9743` and uses `tel:+64211229743`. Contact links open the visitor's email or calling application; the website has no contact form or message storage. Edit these details in `website/frontend/src/components/sections/ContactSection.tsx`.

## Website architecture section

The user requested a public explanation of the custom website and approved placing
“How this website is built” after Selected work, before the closing
section. `ArchitectureSection.tsx` presents React, TypeScript, Vite, Terraform,
and manual GitHub Actions deployments to dev or prod. An ordered request diagram
shows Visitor → CloudFront → private S3, stacking vertically on small screens.
The hero’s “How this website is built” button uses the same primary style as
“Explore my work” and links to this section. Contact content appears only on the
Contact page, as requested by the user. Links lead to the website repository and its architecture guide. This is static
portfolio content describing the existing system; it introduces no infrastructure.

## Visual source

The supplied Full-Stack-WebApp-Demo uses a customized Bootswatch Lux stylesheet with navy `#1A3356`, teal `#5DB7A8`, gray `#9D9E9F`, and white. The local copy retains the CSS template and license headers. `site.css` supplies the portfolio-specific layout, responsive behavior, contrast adjustments, keyboard focus states, and reduced-motion behavior. The original external font import is removed; system fallbacks avoid runtime font-service dependencies. See [third-party notices](../website/frontend/THIRD_PARTY_NOTICES.md).

The technical illustration uses inline SVG and CSS rather than a remote image. Project links open their source repository in a new tab with protective rel attributes. Update public project summaries deliberately when READMEs change; the site does not fetch content at runtime.
