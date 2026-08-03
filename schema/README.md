# Schema patterns

Reusable JSON-LD examples for ecosystem pages.

| File | Use |
|------|-----|
| `webpage.json` | WebSite + WebPage + BreadcrumbList graph |

## Rules

- Prefer `@graph` so pages can declare website + webpage + breadcrumb together.
- Keep canonical URLs absolute (`https://panoskhan.github.io/...`).
- Mirror visible breadcrumbs in `BreadcrumbList`.
- Do not invent credentials, reviews, or offers that are not real.
