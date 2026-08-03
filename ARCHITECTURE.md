# PROJECT ATLAS – Architecture Guide

**Version:** 2.0  
**Phase:** 2 – Digital Ecosystem Foundation  
**Status:** Active  
**Last Updated:** 2026-08-03

---

## Executive Summary

This document establishes the architectural foundation for evolving the Panos Khan website into a scalable digital ecosystem supporting multiple products, hundreds of tools, and future SaaS capabilities—all while maintaining clean code, accessibility, and performance standards.

**Core Principle:** Extend, don't redesign. Every future product must feel part of one ecosystem while maintaining independent identity.

---

## Table of Contents

1. [Product Architecture](#product-architecture)
2. [Folder Organization](#folder-organization)
3. [Design System](#design-system)
4. [Component Patterns](#component-patterns)
5. [Scalability Strategy](#scalability-strategy)
6. [SEO & Accessibility](#seo--accessibility)
7. [Performance Budget](#performance-budget)
8. [Roadmap](#roadmap)

---

## Product Architecture

### What Defines a Product?

A **Product** is a standalone offering with:
- Dedicated root folder: `/product-name/`
- Landing page: `/product-name/index.html`
- Owned feature set (tools, guides, documentation)
- Entry in `/assets/data/products.json`
- Product guide: `/product-name/_PRODUCT_GUIDE.md`
- Consistent navigation and branding within the ecosystem

**Current Products:**
| Product | Path | Status | Features |
|---------|------|--------|----------|
| AI Platform | `/ai/` | Active | Workspace, tools, prompts, documentation |
| Device Service | `/device/` | Active | Repair guides, diagnostics, maintenance |
| Research | `/research/` | Active | Frameworks, case studies, white papers |
| Open Source | `/open-source/` | Active | Repos, examples, transparent tools |
| Downloads | `/downloads/` | Active | Checklists, templates, resources |
| Capability Explorer | `/capabilities/` | Active | Cross-product capability browser |
| Projects | `/projects/` | Active | Portfolio and work samples |

**Future Products (Roadmap):**
- **Panos Khan Docs** (v4.0) – Consolidated documentation hub
- **Panos Khan Labs** (v4.5) – Prototypes, experiments, beta tools
- **Panos Khan Academy** (v5.0) – Learning resources and certification paths
- **Panos Khan Community** (v6.0) – Forums and user discussions
- **Panos Khan Console** (v7.0) – Workspace dashboard (requires auth)
- **Panos Khan Cloud** (v8.0) – Sync and APIs (optional, beyond GitHub Pages)

### Product Structure Template

Every product should follow this structure:

```
/product-name/
├── index.html                 # Product landing page
├── _PRODUCT_GUIDE.md         # Product documentation
├── section/
│   ├── index.html            # Section landing
│   └── item.html             # Specific item
└── tools/                     # If applicable
    └── tool-name.html
```

---

## Folder Organization

### Primary Structure

```
panoskhan.github.io/
├── index.html                 # Homepage
├── services.html              # Services
├── credentials.html           # Credentials
├── contact.html               # Contact
├── projects.html              # Quick reference
│
├── ai/                         ← Product: AI Platform
├── device/                     ← Product: Device Service
├── downloads/                  ← Product: Downloads
├── research/                   ← Product: Research
├── open-source/                ← Product: Open Source
├── projects/                   ← Product: Projects
├── capabilities/               ← Product: Capability Explorer
│
├── assets/
│   ├── css/
│   │   ├── main.css           # Design system (all products inherit)
│   │   ├── ai-platform.css    # AI product overrides/enhancements
│   │   └── tools.css          # Tool-specific styles
│   │
│   ├── js/
│   │   ├── site.js            # Global navigation, headers, footers
│   │   ├── ai-platform.js     # AI product behavior
│   │   ├── tools.js           # Tool utilities
│   │   ├── capabilities.js    # Capability browser logic
│   │   └── 3d-app.js          # Optional 3D features
│   │
│   ├── data/
│   │   ├── products.json      # Authoritative product registry ⭐
│   │   └── capabilities.json  # Capability catalog
│   │
│   ├── components/             ← Component documentation
│   │   ├── README.md          # Component library guide
│   │   └── examples/          # Example HTML patterns
│   │
│   ├── downloads/              # User-facing downloadable resources
│   │   ├── *.html             # Standalone tools (checklists, etc.)
│   │   └── templates/
│   │
│   ├── images/                 # Product images, icons
│   ├── icons/                  # SVG icon library
│   └── profile.jpg            # Primary profile image
│
├── scripts/                     # Validation & build utilities
│   └── validate_static.py     # Link checking, accessibility
│
├── ARCHITECTURE.md            # This file
├── ACCESSIBILITY.md           # WCAG AA standards & checklist
├── PERFORMANCE.md             # Lighthouse benchmarks & budget
├── SEO.md                      # Internal linking & schema strategy
├── QA.md                       # Quality assurance procedures
├── README.md                   # Project overview (updated)
├── sitemap.xml                # SEO
├── robots.txt                 # SEO
└── .nojekyll                  # GitHub Pages config
```

### Key Principles

1. **Product-First Organization**: Products are first-class citizens, not nested under `/content/` or `/pages/`
2. **Shared Assets**: All design, JavaScript, and data are centralized in `/assets/`
3. **No Duplication**: Every design token, CSS rule, and component pattern lives in one place
4. **Future-Proof Naming**: Folder names are descriptive but can scale (e.g., product names, not "product-1")
5. **Clear Ownership**: Each product owns its HTML pages; assets are shared

---

## Design System

### CSS Architecture

**Single Source of Truth:** `/assets/css/main.css`

- **Design Tokens** (CSS custom properties): Colors, spacing, typography, animations
- **Base Styles**: HTML element resets, typography hierarchy, spacing
- **Components**: Reusable patterns (buttons, cards, hero sections, etc.)
- **Utilities**: Helpers for spacing, display, visibility

**Product-Specific Files** (e.g., `ai-platform.css`):
- Extend, never duplicate
- Use CSS custom properties from main.css
- Add product-specific component variants only
- Example: AI product might have custom card styling for tools

**Design Tokens** (from main.css):

```css
:root {
  /* Colors */
  --bg:           #070b14;          /* Primary background */
  --surface:      #0f172a;          /* Card/elevated surface */
  --text:         #e6edf7;          /* Primary text */
  --text-muted:   #9aa9c4;          /* Secondary text */
  --neon:         #00e5ff;          /* Brand accent (cyan) */
  --purple:       #7c3aed;          /* Brand accent (purple) */

  /* Layout */
  --max-w:        1200px;           /* Container max-width */
  --radius-sm:    8px;              /* Small border-radius */
  --radius:       14px;             /* Standard border-radius */
  --radius-lg:    22px;             /* Large border-radius */

  /* Timing */
  --t:            0.3s ease;        /* Standard transition */
  --t-slow:       0.6s ease;        /* Slow transition */
}
```

### Typography System

```
h1  – clamp(2rem, 5vw, 3.4rem)    Primary page heading
h2  – clamp(1.4rem, 3vw, 2.1rem)  Section heading
h3  – 1.1rem                        Subsection
p   – 1rem / 1.65 line-height      Body text
.lead – 1.1rem (tinted)            Lead paragraph
.muted – text-muted color          Secondary text
.kicker – 0.78rem, uppercase       Label/badge
```

### Color System

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #070b14 | Primary page background |
| `--surface` | #0f172a | Cards, elevated sections |
| `--text` | #e6edf7 | Primary text |
| `--text-muted` | #9aa9c4 | Secondary text, labels |
| `--neon` | #00e5ff | Links, interactive highlights |
| `--purple` | #7c3aed | Brand accent, CTAs |
| `--border` | #1e2d4d | Borders |

---

## Component Patterns

### Core Components (Formalized)

See `/assets/components/README.md` for detailed specifications.

| Component | Purpose | Accessibility |
|-----------|---------|----------------|
| **Header** | Global navigation, brand | `<header>` with nav landmarks |
| **Hero** | Section introductions | Proper heading hierarchy |
| **Card** | Content containers | Semantic structure, focus visible |
| **Button** | Interactive actions | Keyboard accessible, ARIA labels |
| **Breadcrumb** | Navigation trail | `<nav>` with `aria-label` |
| **Sidebar** | Section navigation | Keyboard nav, focus management |
| **FAQ** | Q&A sections | Details/summary or ARIA |
| **Form** | User input | Labels, error states, validation |
| **Search** | Global search | Live region for results |
| **Footer** | Site footer | Link grouping, brand info |

### CSS Class Naming Convention

Components use **BEM-inspired** naming (modified for simplicity):

```css
.component              /* Block */
.component--variant    /* Variant/modifier */
.component__element    /* Element within component */
```

**Examples:**
```html
<div class="card">
  <h3 class="card__title">Title</h3>
  <p class="card__content">Content</p>
</div>

<button class="btn btn--primary">Click me</button>
<button class="btn btn--secondary">Cancel</button>
```

### Progressive Enhancement

All interactive features work without JavaScript. JS enhances:
- Mobile navigation drawer
- Tool interactions
- Search functionality
- Dynamic filtering

Use `data-*` attributes for JS hooks:
```html
<button data-toggle="modal" data-target="search-modal">Search</button>
```

---

## Scalability Strategy

### Adding a New Product (Checklist)

1. **Create folder**: `/new-product/`
2. **Create landing page**: `/new-product/index.html`
3. **Add to products.json**: Entry in `/assets/data/products.json`
4. **Create product guide**: `/new-product/_PRODUCT_GUIDE.md`
5. **Update navigation**: `site.js` reads from products.json (automatic)
6. **Test**: Links, accessibility, performance

### Adding a New Tool (Within a Product)

1. **Create file**: `/product-name/tools/tool-name.html`
2. **Use existing design system**: Link to `/assets/css/main.css`
3. **Add to search index**: Update `site.js` searchIndex array (or products.json catalog)
4. **Test**: Accessibility, performance, SEO

### How to Support 100+ Tools

1. **Product Grouping**: Tools are organized by product, not flat
2. **Navigation**: Sidebar/category lists scale with static HTML
3. **Search**: Client-side JSON search in `searchIndex` or dynamic products.json lookup
4. **Pagination/Filtering**: Implement via HTML + JavaScript (GitHub Pages compatible)
5. **Catalog Data**: Store in JSON, render dynamically if needed

**Example:** AI product has 20 tools. Add each tool HTML file to `/ai/tools/`, add entries to `site.js` searchIndex, navigation updates automatically.

---

## SEO & Accessibility

### SEO Requirements (Every Page)

Every page must include:

```html
<!-- Basic metadata -->
<title>Page Title | Panos Khan</title>
<meta name="description" content="..." />
<link rel="canonical" href="https://panoskhan.github.io/page/" />

<!-- Open Graph (social sharing) -->
<meta property="og:type" content="website" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:image" content="/assets/og-preview.svg" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:image" content="/assets/og-preview.svg" />

<!-- JSON-LD (structured data) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "...",
  "description": "...",
  "url": "https://panoskhan.github.io/page/",
  "breadcrumb": { ... }
}
</script>

<!-- Breadcrumb Navigation -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="/">Home</a> / <span aria-current="page">Current Page</span>
</nav>
```

See `SEO.md` for detailed guidelines.

### Accessibility Requirements (WCAG AA)

- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ All interactive elements keyboard-accessible
- ✅ Focus visible on all buttons/links
- ✅ Form labels associated with inputs
- ✅ ARIA labels for icon-only buttons
- ✅ Semantic HTML (`<main>`, `<nav>`, `<article>`, etc.)
- ✅ Color contrast 4.5:1 for text, 3:1 for graphics
- ✅ Alt text for images

See `ACCESSIBILITY.md` for detailed checklist.

---

## Performance Budget

### Lighthouse Targets (95+)

- **Performance:** 95+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 95+

### Budget per Area

| Area | Target | Technique |
|------|--------|-----------|
| **First Contentful Paint** | <1.5s | Preload critical CSS |
| **Cumulative Layout Shift** | <0.1 | Fixed hero heights |
| **CSS Size** | <50KB | Shared main.css |
| **JavaScript Size** | <100KB | Product-specific bundles |
| **Image Optimization** | WebP + JPG | Lazy loading |
| **Preload Hints** | Critical CSS only | Avoid over-preloading |

See `PERFORMANCE.md` for optimization techniques.

---

## Roadmap

### v3.x – Architecture Foundation (Current)
- ✅ Formalize product architecture
- ✅ Create component library reference
- ✅ Document SEO & accessibility standards
- ✅ Establish performance baselines

### v4.0 – Panos Khan Docs
- Create `/docs/` product
- Consolidate all documentation
- Architecture guides, tutorials, API references
- Unified search across docs

### v4.5 – Panos Khan Labs
- Create `/labs/` product
- Host beta tools, experiments, prototypes
- Open-source project hosting
- Innovation area for testing new ideas

### v5.0 – Product Versioning
- Track versions across products
- Changelogs per product
- Release notes automation
- Deprecation warnings

### v6.0 – Panos Khan Workspace
- Unified dashboard (requires light auth)
- Personalized tool recommendations
- Saved preferences (client-side storage)
- Unified search across ecosystem

### v7.0 – Cloud & APIs (Optional)
- User accounts (GitHub login optional)
- Cloud sync for preferences
- REST API for ecosystem data
- Requires migration beyond GitHub Pages

---

## Governance

### Code Review Standards

Every change must be reviewed for:

1. **Architecture Adherence**
   - Uses existing design system
   - Follows component patterns
   - No code duplication

2. **Accessibility**
   - WCAG AA compliant
   - Keyboard accessible
   - Semantic HTML

3. **Performance**
   - No performance regression
   - Follows optimization guidelines
   - Asset sizes within budget

4. **SEO**
   - Title, description, canonical
   - JSON-LD schema included
   - Internal links strategy

5. **Documentation**
   - Code is self-documenting
   - Comments explain "why," not "what"
   - Product guide updated if needed

### Commit Message Standards

```
<type>: <scope> – <description>

<body (optional)>

<footer (optional)>
```

**Types:**
- `feat:` New product, page, or feature
- `refactor:` Extract component, improve pattern
- `fix:` Bug fix
- `perf:` Optimize performance
- `a11y:` Accessibility improvement
- `docs:` Documentation update
- `chore:` Build config, maintenance

**Examples:**
```
feat: add AI Platform architecture documentation
docs: add ACCESSIBILITY.md with WCAG AA checklist
perf: lazy-load product images
a11y: improve button contrast and focus states
```

---

## FAQ

**Q: How do I add a new product?**  
A: Create `/product-name/index.html`, add entry to `products.json`, update navigation via site.js.

**Q: Can I customize CSS per product?**  
A: Yes, create `/assets/css/product-name.css` and link in your product pages. Extend, never duplicate.

**Q: How do I handle product-specific JavaScript?**  
A: Create `/assets/js/product-name.js` and load it conditionally in your product pages. Share utilities via `site.js`.

**Q: What if I need more than 100 tools?**  
A: Organize by product/category, implement pagination/filtering, use JSON catalogs for dynamic rendering.

**Q: Can this scale beyond GitHub Pages?**  
A: Yes. This architecture is build-step agnostic. Future migration to Node/API is straightforward.

**Q: How do I ensure SEO across products?**  
A: See `SEO.md`. Every page gets title, meta, canonical, OG tags, JSON-LD. Internal linking strategy included.

---

## Related Documents

- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** – WCAG AA standards and checklist
- **[PERFORMANCE.md](./PERFORMANCE.md)** – Lighthouse benchmarks and optimization
- **[SEO.md](./SEO.md)** – Internal linking strategy and schema guidelines
- **[QA.md](./QA.md)** – Validation procedures and testing
- **[/assets/components/README.md](/assets/components/README.md)** – Component library
- **[/assets/data/products.json](/assets/data/products.json)** – Product registry

---

## Version History

| Version | Date | Summary |
|---------|------|---------|
| 2.0 | 2026-08-03 | Phase 2 architecture foundation |
| 1.0 | 2026-07-15 | Initial product ecosystem |

---

**Last Reviewed:** 2026-08-03  
**Next Review:** When adding major new products or architectural changes
