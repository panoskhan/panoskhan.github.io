# Component Library

**Version:** 2.0  
**Status:** Active  
**Last Updated:** 2026-08-03

This document defines the reusable component patterns used across the Panos Khan platform. Every component is built with semantic HTML, accessibility-first design, and minimal CSS/JavaScript overhead.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Component Inventory](#component-inventory)
3. [Component Specifications](#component-specifications)
4. [Naming Conventions](#naming-conventions)
5. [Examples](#examples)

---

## Core Principles

### 1. Semantic HTML First

Every component uses proper semantic HTML:
- `<header>` for top navigation
- `<main>` for page content
- `<article>`, `<section>`, `<nav>` for structure
- `<button>` for interactive actions
- `<form>` for user input
- `<footer>` for site footer

### 2. Accessibility Built-In

- ARIA labels for icon-only buttons
- Keyboard navigation support
- Focus visible states
- Proper heading hierarchy (h1 → h2 → h3)
- Color contrast 4.5:1 for text, 3:1 for graphics (WCAG AA)
- No cognitive burden (clear, plain language)

### 3. CSS Design System

All components inherit from `/assets/css/main.css`:
```css
/* Design tokens always used, never duplicated */
color: var(--text);
background: var(--bg);
border-radius: var(--radius);
transition: all var(--t) ease;
```

### 4. Progressive Enhancement

All components function without JavaScript. JavaScript enhances, not requires:
- Mobile navigation works with CSS `:checked` + labels
- Forms work without validation JS
- Modals can be pure CSS (with `<details>` or `:target`)
- Search works client-side with static JSON

### 5. Performance Conscious

- No external font loads (system font stack)
- Minimal CSS per component
- No unused classes
- Lazy-load images and non-critical JS
- Target: No single component > 5KB

---

## Component Inventory

| Component | Purpose | Status | Link |
|-----------|---------|--------|------|
| **Header** | Global navigation, brand | Active | [Spec](#header) |
| **Hero** | Large introductory section | Active | [Spec](#hero) |
| **Card** | Content container | Active | [Spec](#card) |
| **Button** | Interactive action | Active | [Spec](#button) |
| **Breadcrumb** | Navigation trail | Active | [Spec](#breadcrumb) |
| **Sidebar** | Product-level navigation | Active | [Spec](#sidebar) |
| **FAQ** | Q&A section | Active | [Spec](#faq) |
| **Form** | User input | Active | [Spec](#form) |
| **Search** | Global search | Active | [Spec](#search) |
| **Footer** | Site footer | Active | [Spec](#footer) |
| **Kicker** | Label/badge | Active | [Spec](#kicker) |
| **Callout** | Highlighted message | Active | [Spec](#callout) |

---

## Component Specifications

### Header

**Purpose:** Global navigation, brand identity, mobile drawer.

**HTML:**
```html
<header class="site-header" role="banner" data-site-nav>
  <div class="nav-inner">
    <a href="/" class="brand" aria-label="Panos Khan — Home">
      Panos <span>Khan</span>
    </a>
    <nav class="nav-links" aria-label="Main navigation">
      <a href="/ai/">AI</a>
      <a href="/device/">Device</a>
      <a href="/research/">Research</a>
      <a href="/contact.html" class="nav-cta">Consultation</a>
    </nav>
    <button class="nav-hamburger" id="navHamburger" 
            type="button" 
            aria-label="Open navigation menu" 
            aria-expanded="false" 
            aria-controls="navDrawer">
      <span></span><span></span><span></span>
    </button>
  </div>
  <!-- Mobile drawer (shown on small screens) -->
  <div class="nav-drawer" id="navDrawer" role="dialog" 
       aria-modal="true" aria-label="Navigation menu">
    <div class="nav-drawer-overlay"></div>
    <div class="nav-drawer-panel">
      <div class="nav-drawer-close">
        <button id="navClose" type="button" aria-label="Close navigation">✕</button>
      </div>
      <nav class="nav-drawer-links" aria-label="Mobile navigation">
        <!-- Same links as above -->
      </nav>
    </div>
  </div>
</header>
```

**CSS Tokens Used:**
```css
--bg, --surface, --text, --neon, --border, --radius
```

**Accessibility Checklist:**
- ✅ Logo is a link with aria-label
- ✅ Navigation has aria-label
- ✅ Hamburger button has aria-label and aria-expanded
- ✅ Mobile drawer is `role="dialog"` with aria-modal
- ✅ All keyboard navigation works
- ✅ Focus visible on all links

**JavaScript Behavior (site.js):**
- Toggle hamburger menu on click
- Close drawer when overlay clicked
- Trap focus in drawer on mobile
- Render from `PRODUCTS` array (dynamic)

### Hero

**Purpose:** Large introductory section with headline and CTA.

**HTML:**
```html
<section class="hero">
  <div class="container">
    <span class="kicker">Product · Version</span>
    <h1 class="gradient-text">Headline</h1>
    <p class="lead">Subheading or description goes here.</p>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <a href="#" class="btn btn-primary">Primary CTA</a>
      <a href="#" class="btn">Secondary CTA</a>
    </div>
  </div>
</section>
```

**CSS Classes:**
- `.hero` – Container
- `.gradient-text` – Animated gradient text (applies `--grad-brand`)
- `.kicker` – Small label above headline
- `.lead` – Large introductory text
- `.btn, .btn-primary` – Button styles

**Accessibility Checklist:**
- ✅ Single h1 per page
- ✅ Buttons keyboard accessible (auto)
- ✅ No motion that distracts (gentle animation)
- ✅ Sufficient color contrast

### Card

**Purpose:** Reusable content container for tools, projects, resources.

**HTML:**
```html
<div class="card">
  <h3 class="card__title">Card Title</h3>
  <p class="card__content">Card description or content goes here.</p>
  <div class="card__meta">
    <span class="tag">Tag</span>
    <span class="tag">Another tag</span>
  </div>
  <a href="#" class="card__link">Learn more →</a>
</div>
```

**CSS Classes:**
- `.card` – Container
- `.card--highlight` – Variant with emphasis
- `.card__title` – Card heading
- `.card__content` – Body text
- `.card__meta` – Metadata area
- `.card__link` – CTA link

**Accessibility Checklist:**
- ✅ Use h3 or h4 (never skip heading levels)
- ✅ Card link is keyboard accessible
- ✅ No color-only status indication (use text + icon)

**Example:** `/assets/components/examples/card.html`

### Button

**Purpose:** Interactive action element.

**HTML:**
```html
<!-- Text button -->
<button class="btn">Click me</button>

<!-- Primary button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Small button -->
<button class="btn btn-sm">Small</button>

<!-- Icon button (requires aria-label) -->
<button class="btn btn-icon" aria-label="Close">✕</button>

<!-- Disabled state -->
<button class="btn" disabled>Disabled</button>
```

**CSS Classes:**
- `.btn` – Base button style
- `.btn-primary` – Primary action (neon/purple gradient)
- `.btn-secondary` – Secondary action
- `.btn-sm` – Small size
- `.btn-icon` – Icon-only button
- `.btn[disabled]` – Disabled state

**Accessibility Checklist:**
- ✅ `aria-label` on icon-only buttons
- ✅ Disabled state clearly visible
- ✅ Focus visible (2px solid var(--neon) outline)
- ✅ Keyboard accessible (native `<button>` element)
- ✅ Sufficient touch target (min 44px)

### Breadcrumb

**Purpose:** Navigation trail showing current location.

**HTML:**
```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span>/</span>
  <a href="/ai/">AI Platform</a>
  <span>/</span>
  <span aria-current="page">Tools</span>
</nav>
```

**CSS Classes:**
- `.breadcrumbs` – Container
- Last item gets `aria-current="page"`

**Accessibility Checklist:**
- ✅ Uses `<nav>` with aria-label
- ✅ Current page marked with `aria-current`
- ✅ Keyboard accessible links

**SEO:** Include breadcrumb schema in JSON-LD (see SEO.md)

### Sidebar

**Purpose:** Product-level navigation within a section.

**HTML:**
```html
<nav class="product-subnav" aria-label="Product sections">
  <a href="#workspace" aria-current="page">Workspace</a>
  <a href="#tools">Tools</a>
  <a href="#prompt-library">Prompt Library</a>
  <a href="#documentation">Documentation</a>
</nav>
```

**CSS Classes:**
- `.product-subnav` – Horizontal nav bar
- `.sidebar` – Vertical sidebar variant (if used)
- Link with `aria-current="page"` is highlighted

**Accessibility Checklist:**
- ✅ Semantic `<nav>` with aria-label
- ✅ Current page marked with aria-current
- ✅ All links keyboard accessible

### FAQ

**Purpose:** Frequently asked questions section.

**HTML (using `<details>`):**
```html
<section class="faq">
  <h2>Frequently Asked Questions</h2>
  <details class="faq-item">
    <summary class="faq-question">Question goes here?</summary>
    <div class="faq-answer">
      <p>Answer goes here. Can include multiple paragraphs, lists, etc.</p>
    </div>
  </details>
  <details class="faq-item">
    <summary class="faq-question">Another question?</summary>
    <div class="faq-answer">
      <p>Answer here.</p>
    </div>
  </details>
</section>
```

**Alternative (ARIA disclosure pattern):**
```html
<section class="faq" role="region" aria-label="FAQ">
  <div class="faq-item">
    <button class="faq-question" 
            aria-expanded="false" 
            aria-controls="faq-1">
      Question goes here?
    </button>
    <div class="faq-answer" id="faq-1" hidden>
      <p>Answer goes here.</p>
    </div>
  </div>
</section>
```

**Accessibility Checklist:**
- ✅ `<details>/<summary>` is native and accessible
- ✅ If using ARIA pattern: aria-expanded, aria-controls, hidden attribute
- ✅ Keyboard accessible (native or JavaScript)

### Form

**Purpose:** User input (contact forms, tool inputs, etc.).

**HTML:**
```html
<form class="form">
  <div class="form-group">
    <label for="name">Name *</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      required 
      aria-required="true"
    />
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required 
      aria-required="true"
    />
  </div>

  <div class="form-group">
    <label for="message">Message *</label>
    <textarea 
      id="message" 
      name="message" 
      rows="6" 
      required 
      aria-required="true"
    ></textarea>
  </div>

  <div class="form-actions">
    <button type="submit" class="btn btn-primary">Send Message</button>
    <button type="reset" class="btn">Clear</button>
  </div>
</form>
```

**CSS Classes:**
- `.form` – Container
- `.form-group` – Field wrapper
- `.form-actions` – Button group
- `.form-error` – Error state (if needed)

**Accessibility Checklist:**
- ✅ Every input has associated `<label>`
- ✅ Required fields marked with `*` and `required` + `aria-required="true"`
- ✅ Error messages tied to fields with `aria-describedby`
- ✅ Keyboard navigation works
- ✅ Focus visible on all inputs
- ✅ Form validation is clear and helpful

### Search

**Purpose:** Global search across products and tools.

**HTML:**
```html
<div class="search-container">
  <input 
    type="search" 
    id="search-input" 
    class="search-input" 
    placeholder="Search tools, projects, docs..." 
    aria-label="Search"
    data-search
  />
  <ul class="search-results" id="search-results" role="region" aria-live="polite">
    <!-- Results injected here by search.js -->
  </ul>
</div>
```

**JavaScript Behavior:**
- Client-side only (no server calls)
- Searches `/assets/data/searchIndex` JSON or `site.js` array
- Highlights matching terms
- Keyboard navigation (arrow keys)
- Enter to select result

**Accessibility Checklist:**
- ✅ Input has aria-label
- ✅ Results region has `aria-live="polite"` and `role="region"`
- ✅ Keyboard navigation (arrow keys, enter)
- ✅ Results keyboard selectable

### Footer

**Purpose:** Site footer with links, brand, meta info.

**HTML:**
```html
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="brand">Panos <span>Khan</span></span>
        <p>Technology ecosystem for AI tools, device guidance, research, open source, and safe downloads.</p>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <ul>
          <li><a href="/ai/">AI Platform</a></li>
          <li><a href="/device/">Device Service</a></li>
          <li><a href="/research/">Research</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/services.html">Services</a></li>
          <li><a href="/credentials.html">Credentials</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-meta">
      <p>&copy; 2026 Panos Khan. All rights reserved.</p>
    </div>
  </div>
</footer>
```

**CSS Classes:**
- `.site-footer` – Container
- `.footer-grid` – Link columns
- `.footer-col` – Single column
- `.footer-meta` – Footer metadata

**Accessibility Checklist:**
- ✅ Uses `<footer>` with `role="contentinfo"`
- ✅ All links keyboard accessible
- ✅ Proper heading hierarchy (h4 for column headings)
- ✅ Copyright info clearly visible

### Kicker

**Purpose:** Label or badge for categorization/status.

**HTML:**
```html
<span class="kicker">Product · Version</span>
<span class="kicker">New Feature</span>
<span class="kicker">Beta</span>
```

**CSS:**
```css
.kicker {
  display: inline-block;
  color: var(--neon);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 12px;
  padding: 4px 10px;
  border: 1px solid rgba(0,229,255,.25);
  border-radius: 999px;
  background: rgba(0,229,255,.05);
}
```

**Variants:**
- `.kicker--purple` – Purple variant
- `.kicker--success` – Green/success state
- `.kicker--warning` – Orange/warning state

### Callout

**Purpose:** Highlighted message (note, tip, warning, error).

**HTML:**
```html
<div class="callout">
  <strong>Note:</strong> Important information here.
</div>

<div class="callout callout--warning">
  <strong>⚠️ Warning:</strong> Be careful with this.
</div>

<div class="callout callout--info">
  <strong>ℹ️ Info:</strong> Helpful information.
</div>
```

**Accessibility Checklist:**
- ✅ Color + icon for status (not color-only)
- ✅ Proper contrast

---

## Naming Conventions

### CSS Class Naming (BEM-inspired)

```
.component              /* Block: Main component */
.component--variant    /* Modifier: Variation */
.component__element    /* Element: Child element */
.component__element--variant
```

**Examples:**
```css
.card                   /* Block: The card component */
.card--highlight       /* Modifier: Highlighted card variant */
.card__title           /* Element: Title inside card */
.card__title--large    /* Element variant: Large title */
```

### HTML ID Naming

Use kebab-case, prefixed with component:

```html
id="search-input"       /* searchInput as ID */
id="faq-1"              /* faq-1 for FAQ item 1 */
id="navDrawer"          /* camelCase for state */
```

### Data Attributes (JS Hooks)

Use `data-*` attributes instead of classes for JavaScript:

```html
<button data-toggle="drawer" data-target="nav-drawer">Menu</button>
<div id="nav-drawer" data-drawer>Content</div>
```

### ARIA Attributes

Always include relevant ARIA:

```html
<button aria-label="Close menu">✕</button>
<div role="dialog" aria-modal="true" aria-label="Modal title">
<span aria-current="page">Current</span>
<input aria-required="true" />
```

---

## Examples

See `/assets/components/examples/` for full working examples:

- `card.html` – Card component usage
- `button.html` – Button variants
- `form.html` – Form with validation
- `hero.html` – Hero section
- `faq.html` – FAQ section with details
- `breadcrumb.html` – Breadcrumb navigation
- `footer.html` – Site footer

---

## Performance Checklist

Every component must meet:

- ✅ No external dependencies (CSS/JS)
- ✅ No unused classes or styles
- ✅ Minimal component CSS (< 5KB unminified)
- ✅ Images are lazy-loaded where applicable
- ✅ No render-blocking resources
- ✅ Works in all major browsers (Chrome, Firefox, Safari, Edge)

---

## Testing Checklist

Before shipping a component:

- ✅ Tested on desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tested on mobile (iOS Safari, Chrome Mobile)
- ✅ Keyboard navigation works (Tab, Enter, Escape)
- ✅ Screen reader tested (NVDA, JAWS, or VoiceOver)
- ✅ Lighthouse audit 95+ on all metrics
- ✅ No console errors or warnings
- ✅ Works without JavaScript enabled

---

## Adding a New Component

1. **Design in HTML first** (no CSS tricks)
2. **Make it accessible** (ARIA, keyboard nav)
3. **Write minimal CSS** (use design tokens)
4. **Test keyboard navigation** (Tab, Enter, Escape)
5. **Test with screen reader** (or aria-label it)
6. **Document in this file** (spec + example)
7. **Add to examples/** folder
8. **Get code review** (accessibility + performance)

---

## Related Documents

- **[ARCHITECTURE.md](../../../ARCHITECTURE.md)** – Master architecture
- **[ACCESSIBILITY.md](../../../ACCESSIBILITY.md)** – WCAG AA checklist
- **[PERFORMANCE.md](../../../PERFORMANCE.md)** – Lighthouse targets
- **[main.css](/assets/css/main.css)** – Design system source
- **[site.js](/assets/js/site.js)** – Navigation and utilities

---

**Last Reviewed:** 2026-08-03  
**Next Review:** When adding major new components
