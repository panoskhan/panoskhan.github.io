# SEO Architecture & Internal Linking Strategy

**Version:** 2.0  
**Status:** Active  
**Last Updated:** 2026-08-03

This document establishes SEO best practices for the Panos Khan ecosystem, emphasizing internal linking, structured data, and content discovery across products.

---

## Table of Contents

1. [SEO Fundamentals](#seo-fundamentals)
2. [Page-Level SEO Checklist](#page-level-seo-checklist)
3. [Structured Data (JSON-LD)](#structured-data-json-ld)
4. [Internal Linking Strategy](#internal-linking-strategy)
5. [Cross-Product Discovery](#cross-product-discovery)
6. [Technical SEO](#technical-seo)
7. [Verification](#verification)

---

## SEO Fundamentals

### Core Principle

**Internal linking is our primary SEO strategy.**

Since we use static GitHub Pages (no blogging algorithm), we focus on:
1. Clear information architecture
2. Strategic internal links
3. Comprehensive structured data
4. Fast page loads
5. Mobile-first design

### Target Metrics

- **Organic Search Traffic:** Primary acquisition channel
- **Time on Site:** Content depth and engagement
- **Pages per Session:** Internal linking success
- **Return Visitors:** Trusted authority signal
- **Search Rankings:** Target positions for key phrases

---

## Page-Level SEO Checklist

### Every Page Must Have

#### 1. Title Tag (50-60 characters)

```html
<title>Page Title | Panos Khan</title>
```

**Best Practices:**
- Primary keyword first
- Include brand name (Panos Khan)
- Unique per page
- 50-60 characters (shown fully in search results)
- Action-oriented if possible

**Examples:**
```html
<title>AI Platform | Panos Khan</title>
<title>Website Audit Tool | Panos Khan AI</title>
<title>Device Service | Repair & Diagnostics</title>
```

#### 2. Meta Description (150-160 characters)

```html
<meta name="description" content="Description here. Make it compelling and action-oriented." />
```

**Best Practices:**
- Natural language (not keyword stuffing)
- Include primary + secondary keywords
- 150-160 characters (shown in search results)
- Action-oriented ("Learn," "Discover," "Get")
- Unique per page

**Examples:**
```html
<meta name="description" content="Explore Panos Khan AI: workspace tools, prompt library, workflows, and documentation for strategy, SEO, and responsible AI." />

<meta name="description" content="Professional device repair and support center. Diagnostics, maintenance, and guidance for Windows, macOS, Android, iPhone, and networks." />
```

#### 3. Canonical URL

```html
<link rel="canonical" href="https://panoskhan.github.io/page/" />
```

**Best Practices:**
- Absolute URL (not relative)
- Point to primary version if duplicates exist
- Self-referential on primary version
- Prevents duplicate content issues

**Examples:**
```html
<link rel="canonical" href="https://panoskhan.github.io/" />
<link rel="canonical" href="https://panoskhan.github.io/ai/" />
<link rel="canonical" href="https://panoskhan.github.io/ai/tools/website-audit.html" />
```

#### 4. Open Graph Meta Tags (Social Sharing)

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description for social preview" />
<meta property="og:url" content="https://panoskhan.github.io/page/" />
<meta property="og:site_name" content="Panos Khan" />
<meta property="og:image" content="https://panoskhan.github.io/assets/og-preview.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Image description" />
```

**Best Practices:**
- Use consistent image (og-preview.svg or product-specific)
- Image dimensions: 1200x630px
- Keep descriptions concise (< 160 chars)
- Include alt text

#### 5. Twitter Card Meta Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Tweet preview text" />
<meta name="twitter:image" content="https://panoskhan.github.io/assets/og-preview.svg" />
<meta name="twitter:image:alt" content="Image description" />
```

**Best Practices:**
- `summary_large_image` for most pages
- Same image as OG tags
- Concise description (< 200 chars)
- Include alt text

#### 6. Robots Meta Tag

```html
<meta name="robots" content="index,follow,max-image-preview:large" />
```

**Best Practices:**
- Standard: `index,follow`
- Add `max-image-preview:large` for image search
- Only use `noindex` for duplicate/low-value pages (none currently)

#### 7. Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**Required:** Always include (mobile-first design signal)

---

## Structured Data (JSON-LD)

### JSON-LD Implementation

All structured data uses JSON-LD format (not Schema.org microdata):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Page description",
  "url": "https://panoskhan.github.io/page/",
  "publisher": {
    "@type": "Person",
    "name": "Panos Khan",
    "url": "https://panoskhan.github.io/"
  }
}
</script>
```

### Schema Types by Page

#### Homepage

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://panoskhan.github.io/#person",
      "name": "Panos Khan",
      "url": "https://panoskhan.github.io/",
      "jobTitle": "AI & Digital Transformation Consultant",
      "description": "Web Developer, Sales & Marketing Specialist, and Digital Transformation Consultant based in Greece.",
      "image": "https://panoskhan.github.io/assets/profile.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/panos-khan-pk",
        "https://medium.com/@panoskhan40"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://panoskhan.github.io/#website",
      "url": "https://panoskhan.github.io/",
      "name": "Panos Khan",
      "publisher": { "@id": "https://panoskhan.github.io/#person" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://panoskhan.github.io/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

#### Product Pages

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://panoskhan.github.io/ai/#webpage",
      "url": "https://panoskhan.github.io/ai/",
      "name": "Panos Khan AI Platform",
      "description": "Professional AI workspace with tools and documentation.",
      "isPartOf": { "@id": "https://panoskhan.github.io/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://panoskhan.github.io/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI Platform",
            "item": "https://panoskhan.github.io/ai/"
          }
        ]
      }
    }
  ]
}
```

#### Tool Pages

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Website Audit Tool",
  "description": "Audit readiness, speed, SEO, and conversion fundamentals.",
  "url": "https://panoskhan.github.io/ai/tools/website-audit.html",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Person",
    "name": "Panos Khan",
    "url": "https://panoskhan.github.io/"
  }
}
```

### Breadcrumb Schema

**Every non-homepage page should have breadcrumb schema:**

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://panoskhan.github.io/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI Platform",
      "item": "https://panoskhan.github.io/ai/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Tools",
      "item": "https://panoskhan.github.io/ai/tools/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Website Audit",
      "item": "https://panoskhan.github.io/ai/tools/website-audit.html"
    }
  ]
}
```

### Validation

Use Google's JSON-LD Schema Validator:
https://validator.schema.org/

---

## Internal Linking Strategy

### Link Hierarchy

**All links follow this priority:**

1. **Primary Navigation** – Products, main pages (header, footer)
2. **Contextual Links** – Related content within sections
3. **Related Content** – Discovery links at end of pages
4. **Footer Links** – Product index, company info, legal

### Linking Best Practices

#### 1. Link Text Matters

**Good:**
```html
<a href="/ai/">Learn about Panos Khan AI</a>
<a href="/ai/tools/website-audit.html">Try the Website Audit tool</a>
<a href="/research/#ai-framework">Read AI Readiness Framework</a>
```

**Bad:**
```html
<a href="/ai/">Click here</a>
<a href="/ai/tools/website-audit.html">link</a>
<a href="/research/#ai-framework">More info</a>
```

**Best Practices:**
- Descriptive, not generic
- Include target action (verb)
- Natural language (reads in context)
- 2-5 words typically

#### 2. Link Placement

**Best places for internal links:**

| Location | Type | Example |
|----------|------|---------|
| Navigation | Primary products | Header nav |
| Breadcrumb | Path context | AI > Tools > Website Audit |
| Body text | Contextual related | "See AI Readiness Framework" |
| Related section | Discovery | "Explore device service" |
| Footer | Index | Product list |

**Avoid:**
- Too many links per section (>5 per 500 words)
- Links that distract from main topic
- Links to pages with no new value

#### 3. Anchor Text Variation

Use natural variation:
```
- "AI Platform"
- "Explore Panos Khan AI"
- "Professional AI tools"
- "Try AI tools"
```

Not:
```
- "AI Platform"
- "AI Platform"
- "AI Platform" (same anchor every time)
```

### Cross-Product Linking Template

Every product page should link to:

```html
<!-- Related products -->
<section class="related-products">
  <h3>Related Products</h3>
  <ul>
    <li><a href="/research/">Research & Frameworks</a></li>
    <li><a href="/downloads/">Templates & Resources</a></li>
    <li><a href="/capabilities/">Explore all capabilities</a></li>
  </ul>
</section>

<!-- Suggested next steps -->
<section class="next-steps">
  <h3>Next Steps</h3>
  <ol>
    <li><a href="/[related-product]/">Learn about [related product]</a></li>
    <li><a href="/services.html">Explore consulting services</a></li>
    <li><a href="/contact.html">Get in touch</a></li>
  </ol>
</section>
```

---

## Cross-Product Discovery

### Capability Explorer

**Purpose:** Help users discover relevant tools across products.

**Link every tool to Capability Explorer:**
```html
<a href="/capabilities/">Browse all capabilities →</a>
```

### Search Index Enhancement

Every tool must be in `site.js` `searchIndex`:

```javascript
const searchIndex = [
  { 
    title: "Website Audit", 
    type: "Tool", 
    url: "/ai/tools/website-audit.html", 
    description: "Audit readiness, speed, SEO, and conversion fundamentals" 
  },
  // ... more entries
];
```

### Product Metadata (products.json)

Each product has searchable metadata:

```json
{
  "id": "ai",
  "name": "Panos Khan AI",
  "description": "Professional AI workspace with tools and prompts",
  "tools": [
    { "name": "Website Audit", "url": "/ai/tools/website-audit.html" }
  ]
}
```

This enables:
- Faceted search
- Product-based filtering
- Future API discovery

---

## Technical SEO

### Site Speed

**Target:** Lighthouse 95+ for SEO

**Techniques:**
- Preload critical CSS only
- Defer non-critical JavaScript
- Lazy-load images
- Minify CSS/JS
- No render-blocking resources

**Check:** https://pagespeed.web.dev/

### Mobile-First Design

**Requirements:**
- Responsive design (tested on mobile)
- Touch targets 44px minimum
- Readable font sizes
- No horizontal scrolling
- Viewport meta tag

### XML Sitemap

**Location:** `/sitemap.xml`

**Include all:**
- Product index pages
- Product subpages
- Tool pages
- Documentation pages

**Update:** After adding new pages

### Robots.txt

**Location:** `/robots.txt`

**Standard:**
```
User-agent: *
Allow: /

Sitemap: https://panoskhan.github.io/sitemap.xml
```

**Purpose:** Guide search engines, define sitemap location

---

## Verification

### Google Search Console

**Setup:**
1. Add property: https://search.google.com/search-console/
2. Choose domain: panoskhan.github.io
3. Add HTML verification file or DNS record
4. Verify ownership

**Monitor:**
- Search traffic
- Clicks, impressions, CTR
- Top search queries
- Mobile usability
- Coverage issues

### Google Analytics

**Track:**
- Organic search traffic
- Top landing pages
- Conversion paths
- User engagement (time on page, pages/session)
- Device breakdown

**Goal:** Understand which content drives value

### Bing Webmaster Tools

**Setup:**
1. Add https://www.bing.com/webmaster/
2. Verify ownership
3. Submit sitemap

**Monitor:**
- Bing search impressions
- Crawl issues
- Indexing status

### Manual Audits

**Quarterly:**
- Search Console: Fix any index coverage issues
- Analytics: Review top performing pages
- Site structure: Verify all internal links work
- Speed: Re-check Lighthouse scores
- Mobile: Test on actual mobile devices

---

## Common Issues & Fixes

### Issue: Low Search Traffic

**Possible Causes:**
1. Pages not indexed (check Search Console)
2. Poor title/description (not compelling in results)
3. Weak internal linking (pages are isolated)
4. No structured data (no rich snippets)
5. Slow page speed (mobile-first ranking)

**Fixes:**
1. Request indexing in Search Console
2. Improve title/description per checklist
3. Add internal links from high-authority pages
4. Add JSON-LD structured data
5. Optimize images, defer JS, preload CSS

### Issue: Poor Click-Through Rate (CTR)

**Possible Causes:**
1. Title not compelling
2. Description doesn't match query
3. Competing results have better snippets
4. Wrong keyword targeting

**Fixes:**
1. A/B test title variations in Search Console
2. Rewrite meta description with clear value proposition
3. Add unique angle or feature
4. Target different keywords if appropriate

### Issue: High Bounce Rate

**Possible Causes:**
1. Page doesn't match search intent
2. Poor content quality
3. Slow page load
4. Poor mobile experience

**Fixes:**
1. Verify keyword-to-content match
2. Improve content depth and clarity
3. Optimize performance (Lighthouse)
4. Test mobile experience

---

## Related Documents

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** – Master architecture
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** – WCAG AA standards
- **[PERFORMANCE.md](./PERFORMANCE.md)** – Lighthouse optimization
- **[/assets/components/README.md](/assets/components/README.md)** – Component standards

---

**Last Updated:** 2026-08-03  
**Next Review:** Quarterly or when adding new products
