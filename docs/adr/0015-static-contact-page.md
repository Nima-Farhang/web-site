# 0015 — Separate static Contact page

## Status

Accepted

## Recorded

2026-11-13

## Source

User decision: move contact content off the home page, add a header Contact me
button to a Contact page, and replace the hero contact button with an architecture
section button matching Explore my work.

## Context

The portfolio previously placed contact details on the home page. Visitors need
a dedicated destination without expanding the static hosting scope.

## Decision

Keep contact details and the email action on a separate Contact page. Link to it
from the shared header. Link the hero architecture action to the home page’s
existing architecture section using the primary button style.

Implementation choice: build `/contact.html` as a second Vite HTML entry, sharing
the React shell. Use explicit static URLs without routing rewrites or new
infrastructure. Upload both HTML pages with revalidation cache headers.

## Consequences

Direct contact links work on S3/CloudFront. Navigation from Contact returns to
home page anchors. Contact details remain public links with no message storage.

## Related documents

- [Architecture](../architecture.md)
- [Portfolio content](../portfolio-content.md)
- [Frontend guide](../../website/frontend/README.md)
