# Panos Khan — Technology Ecosystem

Official site for the **Panos Khan** product ecosystem: AI tools, Device Service guidance, Research, Open Source, Downloads, and consulting.

## Products

| Product | Path |
|---------|------|
| AI Platform | `/ai/` |
| Device Service | `/device/` |
| Research | `/research/` |
| Open Source | `/open-source/` |
| Downloads | `/downloads/` |
| Capability Explorer | `/capabilities/` |
| Projects | `/projects/` |

Consulting, credentials, and contact remain first-class supporting surfaces.

## Stack

- HTML5 / CSS3 design system (`assets/css/main.css`)
- Progressive JavaScript (`assets/js/site.js`, `ai-platform.js`, `capabilities.js`)
- Static JSON capability catalog (`assets/data/capabilities.json`)
- GitHub Pages (no build step required)

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

- Product-driven IA with one shared brand/design system
- Curated excellence over thin page volume
- Safe-by-default downloads (no privileged opaque binaries)
- Client-side tools by default; Workspace auth is future-only
