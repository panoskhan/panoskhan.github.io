# Platform Intelligence v2 Architecture Specification

**Status:** Approved direction, shared-runtime implementation in progress  
**Updated:** 2026-08-03  
**Mission:** Transform Platform Intelligence into the core runtime powering every Digital Health capability across the Panos Khan ecosystem.

## Architecture summary

The platform is a **static, product-oriented ecosystem** on GitHub Pages, with Platform Intelligence acting as the parent runtime for all health domains:

- One shared design system (`assets/css/main.css`)
- One progressive shell (`assets/js/site.js` header, footer, search)
- Shared engines for health analysis, reporting, recommendations, discovery, and relationships
- Product hubs as first-class folders (`/ai/`, `/intelligence/`, `/device/`, `/downloads/`, `/docs/`, `/labs/`, …)
- Data registries for catalogs that will grow past hand-maintained page scripts
- Documentation and templates that encode how the platform extends without one-off clones

## Non-goals

- Backend/auth work in v2
- AI-first feature expansion without clear user value
- Redesigning unrelated site surfaces
- Breaking existing URLs

## Product map

| Surface | Path | Role |
|---------|------|------|
| Home & consulting | `/`, `/services.html`, `/contact.html`, `/credentials.html` | Brand + commercial entry |
| Platform Intelligence | `/intelligence/` | Parent runtime for website, device, project, and AI workflow health |
| AI | `/ai/` | AI tools, prompts, examples, FAQ, changelog |
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

The flagship product connects four health pillars:

| Pillar | Path | Status |
|--------|------|--------|
| Website Health | `/intelligence/website-health/` | Live |
| Device Health | `/device/` | Live |
| Project Health | `/intelligence/#project-health` | Planned |
| AI Workflow Health | `/intelligence/#ai-workflow-health` | Planned |

### Shared runtime

Platform Intelligence v2 standardizes five reusable engines:

1. **Health Engine** — evaluates pillar-specific input through one shared interface  
2. **Report Engine** — renders the canonical health report contract  
3. **Recommendation Engine** — prioritizes action plans and time-to-improve estimates  
4. **Knowledge Engine** — resolves relationships through the knowledge graph  
5. **Search Engine** — powers discovery from registry and search-index metadata

Every future tool must flow through the shared runtime:

**data collection → Health Engine → Recommendation Engine → Report Engine → shared report**

Tools register in `platform-registry.json` with a standard schema. Each tool feeds results into the Report Engine — adding a new health check requires only a registry entry and a scoring function.

### Canonical Health Report

Every health check produces the same report contract through `assets/js/report-engine.js`:

- Health Score
- Executive Summary
- Critical Issues
- Warnings
- Passed Checks
- Estimated Time to Improve
- Recommended Action Plan
- Learning Resources
- Related Tools
- Download Report
- Share Report
- History
- **Panos Khan Verified** badge when score ≥ 90

No tool should introduce a separate report layout.

### Registry and relationship boundaries

`assets/data/platform-registry.json` is the single metadata source of truth for navigation, search, recommendations, and discovery.

`assets/data/knowledge-graph.json` is responsible only for relationships between registry items.

### Migration rules

1. Legacy paths remain valid through redirects  
2. New canonical health paths live under `/intelligence/`  
3. Duplicated report rendering must be removed as each pillar migrates  
4. New health capabilities must register in the metadata registry and the knowledge graph

### Shared primitive milestone

The next milestone builds shared primitives only. Supported pillars:

- Website Health
- Device Health
- Project Health
- AI Workflow Health

## Shared components

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
- `assets/data/platform-registry.json` — unified registry for products, tools, research, downloads, projects, and services
- `assets/data/knowledge-graph.json` — relationship graph between registry items

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

Roadmap after this milestone:

- **v2.0** Shared runtime foundations + Website Health migration ✅
- **v3.0** Knowledge Platform + AI Tools expansion (22 new tools) ✅
- **v3.5** Downloads library expansion + Labs content
- **v4.0** Device Health + Project Health + AI Workflow Health on the same engine
- **v4.5** Knowledge Center (research, tutorials, case studies)
- **v5.0** Panos Khan Console + Workspace history

## Quality gates

```bash
python3 scripts/validate_static.py
python3 -m http.server 8000
```

Every change should answer yes to: clean, maintainable, documented, architecture-aligned, and improving the project.

## Platform runtime notes

- `/platform/` remains the primary app-style entry (Dashboard, Workspace, Search).
- `assets/data/platform-registry.json` defines pillar, engine, report, input/output, and documentation metadata for health capabilities.
- Catalog pages (`/downloads/`, `/research/`, `/projects/`, `/services.html`) are rendered client-side from the unified registry through `assets/js/platform.js`.
- Workspace state (favorites, recent activity, preferences) is browser-local only to remain GitHub Pages compatible.

## Governance updates

1. New catalog content must be added to `assets/data/platform-registry.json`.
2. Product pages should consume existing components and runtime renderers instead of hardcoded catalog cards.
3. Any new platform surface must update architecture docs and sitemap/validation checks in the same change.
4. New health check tools must follow the report contract and register in the knowledge graph.
5. Every tool with a score output must integrate with the Panos Khan Verified badge system (threshold: 90/100).
6. Use shared engines before creating new page-specific logic.
