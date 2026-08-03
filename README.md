# Panos Khan — Technology Ecosystem

Official site for the **Panos Khan** product ecosystem: AI tools, Device Service guidance, Research, Open Source, Downloads, Docs, Labs, and consulting.

**Phase:** Platform Intelligence v2 — Shared Runtime Architecture

## Products

| Product | Path | Status |
|---------|------|--------|
| AI Platform | `/ai/` | Live |
| Device Service | `/device/` | Live |
| Downloads | `/downloads/` | Live |
| Docs | `/docs/` | Live |
| Labs | `/labs/` | Live |
| Research | `/research/` | Live |
| Open Source | `/open-source/` | Live |
| Capability Explorer | `/capabilities/` | Live |
| Projects | `/projects/` | Live |
| Platform Dashboard | `/platform/` | Live |

Consulting, credentials, and contact remain first-class supporting surfaces.

## Stack

- HTML5 / CSS3 design system (`assets/css/main.css`)
- Progressive JavaScript (`assets/js/site.js`, `platform.js`, `health-engine.js`, `report-engine.js`)
- Static JSON registries (`assets/data/*.json`, with `platform-registry.json` as metadata source of truth and `knowledge-graph.json` for relationships)
- GitHub Pages (no build step required)

## Architecture

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Platform Intelligence v2 spec, runtime boundaries, migration rules, SEO/a11y/perf notes
- [Project Phoenix Charter](./docs/PROJECT_CHARTER.md) — mission, releases, and product quality standards
- [Docs hub](https://panoskhan.github.io/docs/) — guides and release notes
- [Component catalog](./assets/components/README.md) — reusable UI patterns
- [Templates](./templates/) — product hub / doc / tool starters
- [Schema examples](./schema/) — JSON-LD patterns

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Validation

```bash
python3 scripts/validate_static.py
```

## Principles

- Extend the platform; do not redesign the homepage or remove completed work
- Product-driven IA with one shared brand/design system
- Shared engines before one-off logic
- Registries over duplicated catalogs; knowledge graph over hardcoded relationships
- Curated excellence over thin page volume
- Safe-by-default downloads and lawful device guidance only
- Client-side tools by default; Workspace auth is future-only
