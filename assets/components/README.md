# Component catalog

Phase 2 standardizes reusable UI patterns in `assets/css/main.css` and `assets/js/site.js`.

## Shell

- **Header** — `[data-site-nav]` mounts brand, primary nav, drawer
- **Footer** — `[data-site-footer]` mounts product/resource/connect columns
- **Search** — progressive global dialog; corpus from `/assets/data/search-index.json`
- **Breadcrumbs** — `.breadcrumbs`

## Content

- **Section header** — `.section-header`, left variant `.section-header--start`
- **Cards** — `.card`, tags via `.card-tag`
- **Buttons** — `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-sm`, `.btn-lg`
- **Related products** — `[data-related-products="ai,docs"]`
- **Product subnav** — `.product-subnav`

## Feedback

- **Alerts** — `.alert`, `.alert-info`, `.alert-success`, `.alert-warning`
- **FAQ** — `.faq` > `details.faq-item`
- **Status pills** — `.status-pill.status-live|planned|draft`

## Documentation UI

- **Layout** — `.docs-layout`
- **Sidebar** — `.docs-sidebar`, `.docs-nav`
- **Code** — `.code-block`

## Catalog cards

- `.download-card`, `.tool-card`, `.service-card`
- `.filter-bar`, `.pagination` hooks for large catalogs

## Rules

1. Prefer existing classes over new CSS.
2. No inline CSS/JS on new pages.
3. Enhance with JS; never require it for core reading paths.
4. Keep components framework-free for GitHub Pages.

Human-readable examples: [/docs/guides/components.html](/docs/guides/components.html)


## Platform layouts

- **Platform shell** — `.platform-layout`, `.platform-sidebar`, `.platform-nav-list`
- **Workspace widgets** — `.workspace-stats`, `.workspace-grid`, `.platform-list`
- **Registry catalog header** — `.catalog-head`
- **Favorite control** — `.favorite-toggle`

## Registry-driven rule

Catalog pages must render list content from `assets/data/platform-registry.json` via `assets/js/platform.js` instead of hardcoded repeated cards.
