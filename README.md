# Panos Khan — Technology Ecosystem

Official site for the **Panos Khan** product ecosystem: AI tools, Device Service guidance, Research, Open Source, Downloads, and consulting.

**Status:** Phase 2 – Digital Ecosystem Architecture (v3.x)

## Products

| Product | Path | Status |
|---------|------|--------|
| AI Platform | `/ai/` | Active |
| Device Service | `/device/` | Active |
| Research | `/research/` | Active |
| Open Source | `/open-source/` | Active |
| Downloads | `/downloads/` | Active |
| Capability Explorer | `/capabilities/` | Active |
| Projects | `/projects/` | Active |

**Future Products:**
- Panos Khan Docs (`/docs/`) – v4.0
- Panos Khan Labs (`/labs/`) – v4.5
- Panos Khan Academy (`/academy/`) – v5.0
- Panos Khan Community (`/community/`) – v6.0
- Panos Khan Console (`/console/`) – v6.0
- Panos Khan Cloud (`/cloud/`) – v7.0

Consulting, credentials, and contact remain first-class supporting surfaces.

## Stack

- **HTML5 / CSS3** – Semantic, accessible markup + design system (`assets/css/main.css`)
- **Progressive JavaScript** – No frameworks, vanilla JS (`assets/js/site.js`)
- **Static JSON** – Product metadata (`assets/data/products.json`, `capabilities.json`)
- **GitHub Pages** – No build step, pure static site

## Architecture & Documentation

**Master Architecture:**
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** – System design, folder structure, scalability
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** – WCAG AA standards and testing
- **[PERFORMANCE.md](./PERFORMANCE.md)** – Lighthouse targets and optimization
- **[SEO.md](./SEO.md)** – Internal linking and structured data strategy
- **[QA.md](./QA.md)** – Quality assurance and testing procedures
- **[/assets/components/README.md](/assets/components/README.md)** – Component library

**Product Guides:**
- **[/ai/_PRODUCT_GUIDE.md](/ai/_PRODUCT_GUIDE.md)** – AI Platform documentation (template for other products)

**Product Registry:**
- **[/assets/data/products.json](/assets/data/products.json)** – Authoritative product metadata

## Quick Start

### Local Preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

### Validation

```bash
# Check links (if script available)
python3 scripts/validate_static.py

# Or use online tools:
# - Lighthouse: https://pagespeed.web.dev/
# - Accessibility: https://wave.webaim.org/
```

### Performance Testing

```bash
# Use Google PageSpeed Insights
https://pagespeed.web.dev/?url=https://panoskhan.github.io/

# Target: 95+ on all metrics (Performance, Accessibility, Best Practices, SEO)
```

## Principles

- **Product-First IA** – Products are first-class citizens, not nested
- **Shared Design System** – One source of truth for CSS, components, tokens
- **No Duplication** – Design and code live in one place
- **Scalable Architecture** – Supports 100+ tools without restructuring
- **Accessibility by Default** – WCAG AA on every page
- **Performance-Obsessed** – Lighthouse 95+ target
- **SEO-Driven** – Internal linking strategy, structured data
- **Curated Excellence** – Quality over volume
- **Safe Defaults** – No privileged opaque binaries, ethical AI practices
- **Client-Side First** – Tools run in browser, private by default
- **Static & Portable** – GitHub Pages compatible, no vendor lock-in

## Development Workflow

### Adding a New Product

1. Create `/product-name/` folder
2. Create `/product-name/index.html` (use existing product as template)
3. Add entry to `/assets/data/products.json`
4. Create `/product-name/_PRODUCT_GUIDE.md`
5. Update navigation (reads from products.json automatically)
6. Test: Lighthouse 95+, accessibility scan, links

### Adding a Tool Within a Product

1. Create `/product/tools/tool-name.html`
2. Add to `site.js` `searchIndex` array
3. Link from product page
4. Test all the usual checks

### Code Review Standards

Every change must pass:
- ✅ **Architecture** – Follows existing patterns, no duplication
- ✅ **Accessibility** – WCAG AA, keyboard nav, screen reader
- ✅ **Performance** – Lighthouse 95+ on all metrics
- ✅ **SEO** – Proper meta tags, schema, internal links
- ✅ **Quality** – Clean code, semantic HTML, self-documenting

See [QA.md](./QA.md) for detailed checklist.

## Tools & Resources

### Performance Testing
- **Lighthouse:** https://pagespeed.web.dev/
- **WebAIM Contrast:** https://webaim.org/resources/contrastchecker/
- **JSON-LD Validator:** https://validator.schema.org/

### Accessibility Testing
- **axe DevTools:** Chrome/Firefox extension
- **WAVE:** https://wave.webaim.org/
- **NVDA:** https://www.nvaccess.org/ (free screen reader)
- **VoiceOver:** Built-in to Mac/iOS

### SEO Tools
- **Google Search Console:** https://search.google.com/search-console/
- **Google Analytics:** https://analytics.google.com/
- **Bing Webmaster:** https://www.bing.com/webmaster/

## Deployment

No build step required. Deploy directly to GitHub Pages:

```bash
git add .
git commit -m "feat: add new product/page"
git push origin main
```

Site updates automatically at https://panoskhan.github.io/

## Support & Feedback

- **Questions?** See relevant documentation files above
- **Report a bug?** Create an issue on GitHub
- **Suggest a feature?** Email contact@panoskhan.github.io

## Roadmap

| Phase | Version | Focus | Timeline |
|-------|---------|-------|----------|
| **Foundation** | v3.x | Architecture docs, component library | Current |
| **Docs Product** | v4.0 | Consolidated documentation hub | Next |
| **Labs Product** | v4.5 | Beta tools, experiments, prototypes | Q4 2026 |
| **Product Versions** | v5.0 | Versioning, changelogs, release notes | Q1 2027 |
| **Workspace** | v6.0 | Unified dashboard, personalization | Q2 2027 |
| **Cloud & APIs** | v7.0 | Accounts, sync, REST API (optional) | Q3 2027+ |

---

**Last Updated:** 2026-08-03  
**License:** MIT (see LICENSE file)  
**Maintainer:** Panos Khan (@panoskhan)
