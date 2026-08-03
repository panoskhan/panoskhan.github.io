# Performance Budget & Optimization

**Version:** 2.0  
**Status:** Active  
**Target:** Lighthouse 95+ (all metrics)  
**Last Updated:** 2026-08-03

This document establishes performance standards and optimization techniques for the Panos Khan platform.

---

## Table of Contents

1. [Performance Targets](#performance-targets)
2. [Metrics Explained](#metrics-explained)
3. [Budget by Area](#budget-by-area)
4. [Optimization Techniques](#optimization-techniques)
5. [Testing & Monitoring](#testing--monitoring)
6. [Common Issues](#common-issues)

---

## Performance Targets

### Lighthouse Scores

**Target:** 95+ on all metrics

| Metric | Target | Status |
|--------|--------|--------|
| **Performance** | 95+ | Primary |
| **Accessibility** | 95+ | See ACCESSIBILITY.md |
| **Best Practices** | 95+ | Security + web standards |
| **SEO** | 95+ | See SEO.md |

### Core Web Vitals

| Metric | Target | Threshold |
|--------|--------|-----------|
| **LCP (Largest Contentful Paint)** | < 2.5s | Good: <2.5s, Poor: >4s |
| **FID (First Input Delay)** | < 100ms | Good: <100ms, Poor: >300ms |
| **CLS (Cumulative Layout Shift)** | < 0.1 | Good: <0.1, Poor: >0.25 |

### Asset Budgets

| Asset | Budget | Technique |
|-------|--------|-----------|
| **Main CSS** | < 50KB | Share `/assets/css/main.css` |
| **Product CSS** | < 10KB each | Extend, don't duplicate |
| **JavaScript** | < 100KB total | Modular, defer non-critical |
| **Images** | < 2MB per page | Lazy-load, optimize formats |
| **Fonts** | 0KB | System font stack (no web fonts) |

---

## Metrics Explained

### LCP (Largest Contentful Paint)

**What:** Time until largest visible element renders.

**Target:** < 2.5 seconds

**How to Optimize:**
1. Preload critical CSS
2. Minimize JavaScript (defer non-critical)
3. Optimize server response time (GitHub Pages is fast)
4. Avoid large images in hero (use WebP + lazy load)

**Test:**
```bash
# Chrome DevTools > Lighthouse > Performance
# Look for "Largest Contentful Paint" metric
```

### FID (First Input Delay)

**What:** Time from user interaction to response.

**Target:** < 100 milliseconds

**How to Optimize:**
1. Minimize JavaScript (less to parse)
2. Break up long JavaScript tasks (use `setTimeout`)
3. Use `defer` or `async` for scripts
4. Avoid blocking operations

**Test:**
```bash
# Real user data: Chrome User Experience Report
# Lab data: Chrome DevTools > Lighthouse > Performance
```

### CLS (Cumulative Layout Shift)

**What:** Unexpected movement of page elements.

**Target:** < 0.1 (imperceptible shift)

**How to Optimize:**
1. Set explicit sizes for images and videos
2. Avoid inserting content above existing content
3. Use `transform` instead of `top`/`left` for animations
4. Avoid font-loading shifts (system fonts)

**Example of CLS:**
```css
/* Bad: Hero height not set, causes shift when image loads */
.hero { padding: 20px; }

/* Good: Hero height is fixed, no shift */
.hero {
  min-height: 200px;
  padding: 20px;
}
```

---

## Budget by Area

### CSS

**Total Budget:** < 50KB for `/assets/css/main.css`

**Breakdown:**
| Section | Size | Technique |
|---------|------|-----------|
| Design tokens (CSS vars) | < 2KB | Reusable values |
| Base styles (resets, typography) | < 5KB | Minimal reset |
| Components | < 20KB | BEM pattern, no duplication |
| Utilities | < 5KB | Spacing, display helpers |
| Responsive queries | < 5KB | Mobile-first |
| Misc (dark mode, etc.) | < 13KB | Optional features |

**Product-Specific CSS:**
- Each product file (e.g., `ai-platform.css`): < 10KB
- Override and extend, never duplicate main.css
- Use CSS custom properties from main.css

### JavaScript

**Total Budget:** < 100KB

**Breakdown:**
| File | Size | Purpose |
|------|------|---------|
| `site.js` | < 20KB | Navigation, header, footer |
| `ai-platform.js` | < 30KB | AI product logic |
| `tools.js` | < 15KB | Tool utilities |
| `capabilities.js` | < 15KB | Capability explorer |
| `3d-app.js` | < 20KB | Optional 3D features |

**Optimization:**
- Minify all JS before shipping
- Defer non-critical scripts (`<script defer>`)
- Lazy-load product JS only on product pages
- Use native JavaScript (no frameworks)

### Images

**Budget:** < 2MB per page

**Optimization:**
1. **Format:** WebP (primary) + JPEG (fallback)
2. **Size:** Max 500KB per image
3. **Lazy-load:** `<img loading="lazy">`
4. **Responsive:** Use `srcset` for mobile/desktop
5. **Compression:** Tinypng, ImageOptim, or online tools

**Example:**
```html
<img 
  src="image.jpg" 
  srcset="image-sm.jpg 600w, image-md.jpg 1200w, image-lg.jpg 1600w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 1200px"
  loading="lazy"
  alt="Description"
/>
```

---

## Optimization Techniques

### 1. Preload Critical Resources

**CSS for above-the-fold content:**

```html
<head>
  <!-- Preload critical CSS only -->
  <link rel="preload" href="/assets/css/main.css" as="style" />
  <link rel="stylesheet" href="/assets/css/main.css" />
  
  <!-- Don't preload product CSS (loaded when needed) -->
  <link rel="stylesheet" href="/assets/css/ai-platform.css" />
</head>
```

### 2. Defer Non-Critical JavaScript

```html
<!-- Deferred (loads after page render) -->
<script defer src="/assets/js/ai-platform.js"></script>

<!-- Async (loads and runs as soon as available) -->
<script async src="/assets/js/3d-app.js"></script>

<!-- Inline critical JS only -->
<script>
  // Minimal initialization code only
  document.querySelectorAll('[data-site-nav]').forEach(el => {
    initNav(el);
  });
</script>
```

### 3. Optimize Images

**Before uploading:**
1. Compress with TinyPNG (https://tinypng.com/) or ImageOptim
2. Convert to WebP (smaller file size)
3. Resize to max 1600px width
4. Keep JPEG fallback

**In HTML:**
```html
<picture>
  <source srcset="/image.webp" type="image/webp">
  <img src="/image.jpg" alt="Description" loading="lazy" />
</picture>
```

### 4. Use System Font Stack

**No web fonts (saves 30-100KB):**

```css
body {
  font-family: Inter, 'Segoe UI', Roboto, Arial, sans-serif;
  /* 
    Inter – excellent on Apple devices
    Segoe UI – Windows default
    Roboto – Android default
    Arial – universal fallback
    No external font files needed
  */
}
```

### 5. Minify CSS & JavaScript

**Before committing production code:**

```bash
# Minify CSS (if manual process)
# Use online tool: https://www.minifycode.com/css-minifier/

# Minify JS (if manual process)
# Use online tool: https://www.minifycode.com/javascript-minifier/

# Or use build tool (when moving beyond static site)
# npm install -g csso-cli terser
# csso input.css -o input.min.css
# terser input.js -o input.min.js -c -m
```

### 6. Set Explicit Image Dimensions

**Prevents layout shift (CLS):**

```html
<!-- Good: dimensions prevent shift -->
<img src="image.jpg" alt="Description" width="600" height="400" loading="lazy" />

<!-- Modern approach: CSS aspect ratio -->
<div style="aspect-ratio: 3/2;">
  <img src="image.jpg" alt="Description" loading="lazy" />
</div>
```

### 7. Optimize Core Web Vitals

**LCP (< 2.5s):**
- Preload critical CSS
- Minimize main thread JavaScript
- Use fast server (GitHub Pages is good)
- Avoid large images

**FID (< 100ms):**
- Minimize JavaScript
- Use `requestIdleCallback` for non-critical work
- Break up long tasks (> 50ms) with `setTimeout`

**CLS (< 0.1):**
- Set explicit sizes for images/videos
- Avoid inserting content above existing
- Use `transform` for animations, not `top`/`left`
- Avoid web fonts (system fonts don't cause CLS)

---

## Testing & Monitoring

### Lighthouse Testing

**Online:**
1. Go to https://pagespeed.web.dev/
2. Enter URL
3. Click "Analyze"
4. Review report (Performance, Accessibility, Best Practices, SEO)

**Chrome DevTools (Local):**
1. Open Chrome
2. Press F12 (DevTools)
3. Click "Lighthouse" tab
4. Click "Analyze page load"
5. Review report

**Command Line (Node.js):**
```bash
# Install
npm install -g lighthouse

# Run audit
lighthouse https://panoskhan.github.io/ --output-path=./report.html

# Open report
open report.html
```

### Real User Monitoring

**Google Search Console:**
1. Go to https://search.google.com/search-console/
2. Click property
3. Go to "Core Web Vitals" report
4. Monitor real user metrics over time

**Google Analytics:**
1. Set up GA4
2. Track page load time, session duration
3. Identify slow pages
4. Monitor trends

### Automated Testing (Future)

When moving beyond GitHub Pages:

```bash
# Continuous performance testing
# lighthouse-ci --config=lighthouserc.json

# Validates every PR meets performance budget
```

---

## Common Issues & Fixes

### Issue: LCP Too High (> 2.5s)

**Possible Causes:**
1. Large hero image
2. Render-blocking CSS/JS
3. Slow server response
4. Heavy fonts

**Fixes:**
1. Optimize image (compress, reduce size, lazy-load)
2. Preload critical CSS only
3. Defer non-critical JS
4. Use system fonts (not web fonts)

### Issue: CLS Too High (> 0.1)

**Possible Causes:**
1. Images without dimensions
2. Fonts loading late (FOUT)
3. Ads or embeds shifting layout
4. Dynamic content insertion

**Fixes:**
1. Set explicit width/height on images
2. Use system fonts (not web fonts)
3. Avoid ads/embeds if possible
4. Use `visibility: hidden` + `height` for dynamic content

### Issue: FID Too High (> 100ms)

**Possible Causes:**
1. Too much JavaScript
2. Long-running tasks
3. Main thread blocked

**Fixes:**
1. Minify and defer JS
2. Break up long tasks with `setTimeout`
3. Use Web Workers for expensive computation

### Issue: Slow on Mobile

**Possible Causes:**
1. Large images not optimized for mobile
2. Unminified CSS/JS
3. Too many HTTP requests
4. No lazy-loading

**Fixes:**
1. Use responsive images (`srcset`)
2. Minify CSS/JS
3. Combine resources where possible
4. Add `loading="lazy"` to images below fold

---

## Performance Checklist

Before shipping:

- [ ] Lighthouse 95+ on all metrics
- [ ] Core Web Vitals in "Good" range
- [ ] Images optimized (WebP + lazy-load)
- [ ] CSS minified and < 50KB
- [ ] JavaScript minified and < 100KB
- [ ] No web fonts (system stack only)
- [ ] Critical CSS preloaded, others deferred
- [ ] Non-critical JS deferred
- [ ] No render-blocking resources
- [ ] Mobile performance tested

---

## Optimization Priority

**High Impact (do first):**
1. Minify CSS/JS
2. Optimize images (compression + lazy-load)
3. Preload critical CSS
4. Set explicit image dimensions

**Medium Impact (if needed):**
1. Defer non-critical JS
2. Use responsive images
3. Optimize fonts (or eliminate)
4. Break up long JS tasks

**Low Impact (nice-to-have):**
1. Add service worker
2. Enable gzip compression
3. Cache strategy optimization
4. CDN optimization

---

## Related Documents

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** – Master architecture
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** – WCAG AA standards
- **[SEO.md](./SEO.md)** – SEO best practices
- **[/assets/components/README.md](/assets/components/README.md)** – Component standards

---

**Last Updated:** 2026-08-03  
**Next Review:** When shipping new major features or after quarterly audits  
**Target:** Maintain Lighthouse 95+ on all metrics
