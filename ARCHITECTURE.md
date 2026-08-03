# PROJECT ATLAS — Phase 2 Architecture

**Status:** Active  
**Updated:** 2026-08-03  
**Goal:** Extend the live Panos Khan site into a scalable digital ecosystem without redesigning or removing completed work.

## Architecture summary

The platform is a **static, product-oriented ecosystem** on GitHub Pages:

- One shared design system (`assets/css/main.css`)
- One progressive shell (`assets/js/site.js` header, footer, search)
- Product hubs as first-class folders (`/ai/`, `/intelligence/`, `/device/`, `/downloads/`, `/docs/`, `/labs/`, …)
- Data registries for catalogs that will grow past hand-maintained page scripts
- Knowledge graph connecting research, tools, downloads, projects, and services
- Documentation and templates that encode "how we extend," not one-off page clones

**Non-goals for this phase:** homepage redesign, auth/cloud, removing pages, shipping unfinished AI agents.

## Product map

| Surface | Path | Role |
|---------|------|------|
| Home & consulting | `/`, `/services.html`, `/contact.html`, `/credentials.html` | Brand + commercial entry |
| Platform Intelligence | `/intelligence/` | Flagship health checks: website, device, project, AI workflow |
| AI | `/ai/` | Tools, prompts, examples, FAQ, changelog |
| Device Service | `/device/` | Lawful diagnostics/maintenance guidance |
| Downloads | `/downloads/` | Categorized safe assets |
| Docs | `/docs/` | Architecture, guides, release notes |
| Labs | `/labs/` | Experiments and prototypes |
| Research | `/research/` | Frameworks |
| Open Source | `/open-source/` | Public building blocks |
| Capabilities | `/capabilities/` | Cross-product map |
| Projects | `/projects/` | Selected work |

Future reserved slots: Knowledge Center, Community, Console, API, Cloud.

## Folder structure

```text
/assets
  /css /js /data /downloads /components
/ai /intelligence /device /downloads /docs /labs
/research /projects /open-source /capabilities
/templates /schema /scripts
```

Canonical Device Service URL remains **`/device/`** (product name in UI: Device Service) to avoid breaking live links.

## Platform Intelligence

The flagship product connecting four health pillars:

| Pillar | Path | Status |
|--------|------|--------|
| Website Health | `/ai/tools/website-audit.html` | Live |
| Device Health | `/device/` | Live |
| Project Health | `/intelligence/#project-health` | Planned |
| AI Workflow Health | `/intelligence/#ai-workflow-health` | Planned |

### Report Engine

Every health check produces a consistent report via the Report Engine template (`/templates/report-page.html`):

- Summary and overall score (0–100)
- Category breakdown with star ratings
- Strengths and issues by severity (critical/warning/info)
- Prioritized recommendations with estimated effort
- Resources and related tools
- Export and share options
- **Panos Khan Verified** badge when score ≥ 90

### Plugin Architecture

Tools register in `platform-registry.json` with a standard schema. Each tool feeds results into the Report Engine — adding a new health check requires only a registry entry and a scoring function.

### Knowledge Graph

`assets/data/knowledge-graph.json` connects all platform content:

- **Nodes**: tools, research, downloads, projects, services, products, articles
- **Edges**: informed-by, pairs-with, part-of, supports, produces, contains, connected-to
- Every page can look up related content across the entire platform

## Shared components (created / standardized)

| Component | Implementation |
|---------------------------|
| Header / mobile drawer | `site.js` + `.site-header` |
| Footer | `site.js` + `.site-footer` |
| Breadcrumbs | `.breadcrumbs` |
| Global search | `site.js` + `search-index.json` |
| Cards / ecosystem cards | `.card`, `.ecosystem-card` |
| Hero / section titles | `.section-header`, `.section-header--start` |
| Buttons | `.btn*` |
| FAQ | `.faq`, `.faq-item` |
| Alerts | `.alert-*` |
| Docs layout / sidebar | `.docs-layout`, `.docs-sidebar` |
| Related products | `[data-related-products]` |
| Download / tool / service cards | `.download-card`, `.tool-card`, `.service-card` |
| Filters / pagination hooks | `.filter-bar`, `.pagination` |
| Code blocks | `.code-block` |

Guide: [/docs/guides/components.html](/docs/guides/components.html)

## Data registries

- `assets/data/products.json` — product metadata, nav roles, related products
- `assets/data/search-index.json` — client-side search corpus
- `assets/data/downloads.json` — download catalog + safety policy
- `assets/data/capabilities.json` — capability explorer
- `assets/data/platform-registry.json` — unified registry for tools, research, downloads, projects, services
- `assets/data/knowledge-graph.json` — cross-product knowledge graph (nodes + edges)

## SEO improvements

- New hubs ship with title, description, canonical, Open Graph, Twitter Card, JSON-LD, and breadcrumb schema
- Internal links connect Docs ↔ Labs ↔ AI ↔ Device ↔ Downloads
- Sitemap and validation script include the new public surfaces
- Schema examples live under `/schema/`

## Accessibility improvements

- Semantic landmarks on new hubs
- FAQ via native `<details>` (keyboard accessible without JS)
- Focus-visible styles retained from the design system
- `aria-current` on nav and breadcrumbs
- Alert and status text is not color-only

## Performance impact

- No new frameworks
- Shared CSS/JS remain cacheable single files
- Search corpus loads asynchronously; fallback index keeps search usable if fetch fails
- New pages are lightweight HTML; expected Lighthouse impact is neutral to positive versus duplicated inline shells
- Target remains 95+ on content pages with minimal JS

## Future scalability

Designed so the platform can hold 100+ tools, articles, projects, and downloads by:

1. Adding files under product folders  
2. Appending registry entries (search/products/downloads/capabilities)  
3. Reusing templates under `/templates/`  
4. Avoiding per-page navigation forks  

Roadmap after this PR:

- **v4.0** Platform Intelligence hub + Report Engine ✅
- **v4.5** Website Health tools depth + Device Health interactive trees
- **v5.0** Project Health + AI Workflow Health tools
- **v5.5** Knowledge Center (research, tutorials, case studies)
- **v6.0** Labs + Open Source content + Downloads expansion
- **v7.0** Design system evolution (glass panels, light mode)
- **v8.0** Workspace concept + optional cloud/auth

## Quality gates

```bash
python3 scripts/validate_static.py
python3 -m http.server 8000
```

Every change should answer yes to: clean, maintainable, documented, architecture-aligned, and improving the project.


## Platform v5 migration notes

- `/platform/` is now the primary app-style entry (Dashboard, Workspace, Search).
- `assets/data/platform-registry.json` is the unified registry for tools, research, downloads, projects, and services.
- Catalog pages (`/downloads/`, `/research/`, `/projects/`, `/services.html`) are rendered client-side from the unified registry through `assets/js/platform.js`.
- Workspace state (favorites, recent activity, preferences) is browser-local only to remain GitHub Pages compatible.

## Governance updates

1. New catalog content must be added to `assets/data/platform-registry.json`.
2. Product pages should consume existing components and runtime renderers instead of hardcoded catalog cards.
3. Any new platform surface must update architecture docs and sitemap/validation checks in the same change.
4. New health check tools must follow the report template (`/templates/report-page.html`) and register in the knowledge graph.
5. Every tool with a score output must integrate with the Panos Khan Verified badge system (threshold: 90/100).
