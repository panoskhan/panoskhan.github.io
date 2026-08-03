# Accessibility Standards (WCAG AA)

**Version:** 2.0  
**Status:** Active  
**Standard:** WCAG 2.1 Level AA  
**Last Updated:** 2026-08-03

This document establishes accessibility standards for the Panos Khan platform. Every page and component must meet WCAG AA criteria for inclusive access.

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [WCAG Levels Explained](#wcag-levels-explained)
3. [Accessibility Checklist](#accessibility-checklist)
4. [Testing Procedures](#testing-procedures)
5. [Tools & Resources](#tools--resources)
6. [Common Patterns](#common-patterns)
7. [Remediation Guide](#remediation-guide)

---

## Core Principles

### WCAG Foundation

WCAG (Web Content Accessibility Guidelines) is built on 4 principles: **POUR**

| Principle | Means | Examples |
|-----------|-------|----------|
| **Perceivable** | Content is detectable by all senses | Text alternatives for images, captions for video, readable color contrast |
| **Operable** | UI works with keyboard, voice, assistive tech | Keyboard navigation, no time traps, no seizure triggers |
| **Understandable** | Text is clear, layout is predictable, help is available | Plain language, consistent navigation, clear error messages |
| **Robust** | Works with current and future assistive tech | Semantic HTML, ARIA labels, valid code |

### Our Commitment

**Every change must maintain or improve accessibility.**

Before shipping:
1. ✅ Test keyboard navigation (Tab, Enter, Escape)
2. ✅ Test with screen reader (NVDA, JAWS, VoiceOver)
3. ✅ Verify color contrast (4.5:1 for text)
4. ✅ Check heading hierarchy (h1 → h2 → h3)
5. ✅ Validate HTML (no errors, proper semantics)
6. ✅ Run automated audit (pa11y or axe)

---

## WCAG Levels Explained

### Level A (Minimum)
- Basic accessibility features
- Minimum legal compliance in most regions

### Level AA (Our Standard)
- **Most important for users**
- Color contrast 4.5:1 for text
- Keyboard accessible
- Headings and labels
- Focus visible
- **Our target for every page**

### Level AAA (Enhanced)
- Additional features beyond AA
- Enhanced color contrast (7:1)
- More detailed alt text
- Sign language interpretation
- Useful for specialized audiences

---

## Accessibility Checklist

### Page Structure (POUR: Perceivable & Understandable)

#### Headings

- ✅ Only one `<h1>` per page
- ✅ Heading hierarchy never skips (h1 → h2 → h3, not h1 → h3)
- ✅ Headings describe the section (not "Click here" or "Info")
- ✅ Headings are not empty or just decorative
- ✅ Nested headings reflect content structure

**Good:**
```html
<h1>Panos Khan AI</h1>
<h2>Workspace</h2>
<h3>Getting Started</h3>
<h3>Advanced Features</h3>
<h2>Tools</h2>
<h3>Website Audit</h3>
```

**Bad:**
```html
<h1>Home</h1>
<h3>Panos Khan AI</h3> <!-- Skips h2! -->
<h2>Feature A</h2>
<h1>Another Heading</h1> <!-- Multiple h1s! -->
```

#### Semantic HTML

- ✅ Use proper HTML elements (`<main>`, `<nav>`, `<article>`, `<section>`)
- ✅ `<main>` wraps primary content (once per page)
- ✅ `<nav>` wraps navigation (with `aria-label` if multiple)
- ✅ `<header>` for site header
- ✅ `<footer>` for site footer
- ✅ `<article>` for self-contained content
- ✅ Don't use `<div>` for headings or buttons

**Good:**
```html
<body>
  <header role="banner">Navigation</header>
  <main>
    <article>
      <h1>Title</h1>
      <p>Content</p>
    </article>
  </main>
  <footer role="contentinfo">Links</footer>
</body>
```

**Bad:**
```html
<body>
  <div id="header">Navigation</div>
  <div id="content">
    <div class="heading">Title</div>
    <p>Content</p>
  </div>
  <div id="footer">Links</div>
</body>
```

### Keyboard Navigation (POUR: Operable)

#### Keyboard Support

- ✅ All interactive elements keyboard accessible
- ✅ Tab order is logical (left-to-right, top-to-bottom)
- ✅ Tab trap doesn't occur (user can always tab away)
- ✅ No keyboard-only access issues (`onclick` only, no `href`)
- ✅ Escaped can close modals/drawers

**Test:**
1. Press `Tab` multiple times
2. Check that focus is visible
3. Check that tab order is logical
4. Verify all interactive elements can be accessed

**Good:**
```html
<a href="/page/">Link</a>
<button onclick="doSomething()">Button</button>
<input type="text" />
```

**Bad:**
```html
<div onclick="doSomething()">Not keyboard accessible</div>
<span class="btn">Fake button</span>
```

#### Focus Management

- ✅ Focus is always visible (at least 2px outline)
- ✅ Focus is high contrast (`--neon` color on `--bg`)
- ✅ Focus order matches visual layout
- ✅ No invisible focus (don't hide with `outline: none`)

**CSS (from main.css):**
```css
a:focus-visible {
  outline: 2px solid var(--neon);
  outline-offset: 3px;
  border-radius: 4px;
}
button:focus-visible {
  outline: 2px solid var(--neon);
  outline-offset: 3px;
}
```

### Color & Contrast (POUR: Perceivable)

#### Color Contrast

- ✅ Text contrast at least 4.5:1 (WCAG AA)
- ✅ Non-text contrast at least 3:1 (buttons, borders, icons)
- ✅ Color is not the only way to distinguish (use text + color)
- ✅ Links distinguished from regular text (underline or icon)

**Test with:** https://webaim.org/resources/contrastchecker/

**Current Design:**

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|-----------|-------|--------|
| Body text | `--text` (#e6edf7) | `--bg` (#070b14) | 11.4:1 | ✅ AA/AAA |
| Links | `--neon` (#00e5ff) | `--bg` (#070b14) | 6.1:1 | ✅ AA/AAA |
| Muted text | `--text-muted` (#9aa9c4) | `--bg` (#070b14) | 6.2:1 | ✅ AA |
| Buttons | Text on `--neon` | See design tokens | 4.5:1+ | ✅ AA |

**Don't:**
```html
<!-- Color-only status: no text, icon, or pattern -->
<div style="color: red;">Error</div> <!-- Bad if this is the only indication -->

<!-- Poor contrast -->
<p style="color: #888;">Muted text on light background</p>
```

**Do:**
```html
<!-- Color + text + icon -->
<div class="error" aria-live="assertive">
  ⚠️ <strong>Error:</strong> Invalid email
</div>

<!-- Good contrast (uses design tokens) -->
<p class="muted">Secondary information</p>
```

### Images & Alt Text (POUR: Perceivable)

#### Alt Text Requirements

- ✅ Decorative images: `alt=""` (empty, with role="presentation" if icon)
- ✅ Content images: Descriptive alt text (not "image of..." or "picture of...")
- ✅ Alt text is concise (< 125 characters)
- ✅ No alt text duplication (don't repeat caption)
- ✅ Icon alt text describes purpose, not appearance

**Good:**
```html
<!-- Decorative -->
<img src="divider.svg" alt="" role="presentation" />

<!-- Content image -->
<img src="website-audit.jpg" alt="Dashboard showing website performance scores" />

<!-- Icon with purpose -->
<button aria-label="Close menu">✕</button>
<span aria-label="Checkmark">✓</span>
```

**Bad:**
```html
<!-- Decorative labeled as content -->
<img src="divider.svg" alt="decorative divider" />

<!-- Content image with poor alt -->
<img src="website-audit.jpg" alt="image" />
<img src="website-audit.jpg" alt="A dashboard showing scores of different metrics" /> <!-- Redundant if caption exists -->

<!-- Icon without label -->
<button>✕</button> <!-- Inaccessible to screen reader users -->
```

### Form Accessibility (POUR: Operable & Understandable)

#### Form Labels

- ✅ Every input has associated `<label>` (with `for` attribute)
- ✅ Labels are descriptive ("Email address" not "Email")
- ✅ Required fields marked with `*` and `required` attribute
- ✅ Error messages tied to fields with `aria-describedby`
- ✅ Input types are specific (`type="email"`, `type="number"`, etc.)

**Good:**
```html
<div class="form-group">
  <label for="email">Email address *</label>
  <input 
    type="email" 
    id="email" 
    name="email" 
    required 
    aria-required="true"
  />
</div>

<div class="form-group">
  <label for="message">Message (optional)</label>
  <textarea id="message" name="message"></textarea>
</div>
```

**Bad:**
```html
<!-- No label -->
<input type="email" placeholder="Email" />

<!-- Label not connected -->
<label>Email</label>
<input type="email" id="email" /> <!-- for attribute missing -->

<!-- Unclear requirement -->
<label for="email">Email *</label> <!-- No aria-required -->
```

### ARIA (Accessible Rich Internet Applications) (POUR: Robust)

#### ARIA Usage Rules

1. **Use semantic HTML first** – Don't override with ARIA
2. **ARIA enhances, doesn't replace** – If you use ARIA, test with screen reader
3. **Minimize ARIA** – Use only when semantics insufficient
4. **ARIA must be correct** – Invalid ARIA is worse than none

**Good ARIA Usage:**

```html
<!-- Navigation with multiple nav elements -->
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Product navigation">...</nav>

<!-- Icon-only button -->
<button aria-label="Close">✕</button>

<!-- Live region for search results -->
<ul id="results" role="region" aria-live="polite" aria-label="Search results">
  <!-- Results injected here -->
</ul>

<!-- Current page indicator -->
<a href="/ai/" aria-current="page">AI Platform</a>

<!-- Modal dialog -->
<div role="dialog" aria-modal="true" aria-label="Sign up form">
  <form>...</form>
</div>

<!-- Required field -->
<input type="email" aria-required="true" required />
```

**Bad ARIA Usage:**

```html
<!-- Don't override semantics -->
<div role="button" onclick="...">Not a button</div> <!-- Use <button> -->

<!-- Incorrect ARIA -->
<div role="dialog">Not modal (use aria-modal="true")</div>

<!-- ARIA on wrong element -->
<div aria-label="Button">Text here</div> <!-- aria-label on non-interactive -->
```

### Lists (POUR: Perceivable & Understandable)

- ✅ Use `<ul>` for unordered lists, `<ol>` for ordered
- ✅ Use `<li>` for list items
- ✅ Don't use lists for layout (use flexbox/grid)
- ✅ Nested lists show hierarchy

**Good:**
```html
<nav>
  <ul aria-label="Products">
    <li><a href="/ai/">AI</a></li>
    <li><a href="/device/">Device</a></li>
  </ul>
</nav>

<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>
```

**Bad:**
```html
<!-- Fake list with divs -->
<div class="nav-item"><a href="/ai/">AI</a></div>
<div class="nav-item"><a href="/device/">Device</a></div>

<!-- Numbered paragraph (not a list) -->
<p>1. First step</p>
<p>2. Second step</p>
```

### Motion & Animation (POUR: Operable)

- ✅ No animation longer than 3 seconds (don't distract)
- ✅ Respect `prefers-reduced-motion` media query
- ✅ No flashing (> 3 times per second) – seizure risk
- ✅ Animations don't prevent focus

**CSS (prefers-reduced-motion):**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Links (POUR: Understandable & Operable)

- ✅ Link text is descriptive ("Learn more about AI" not "Click here")
- ✅ Links don't open in new windows (or warn if they do)
- ✅ Link is distinguishable from text (underline or color)
- ✅ All interactive elements are links or buttons (semantic)

**Good:**
```html
<a href="/ai/">Learn about Panos Khan AI</a>
<a href="/research/">Read the AI Readiness Framework</a>
```

**Bad:**
```html
<a href="/ai/">Click here</a> <!-- Generic -->
<a href="/page/">More info</a> <!-- Where? -->
<a href="external-site" target="_blank">Link</a> <!-- No warning -->
```

---

## Testing Procedures

### Automated Testing

**Browser Extensions:**
- **axe DevTools** (Chrome, Firefox) – Scans for WCAG violations
- **WAVE** (WebAIM) – Identifies errors and alerts

**Command Line:**
```bash
# pa11y (Node.js)
npx pa11y https://panoskhan.github.io/

# axe CLI
npm install -g @axe-core/cli
axe https://panoskhan.github.io/
```

**Process:**
1. Run automated scan
2. Fix errors
3. Re-run to verify
4. Manual test to catch false negatives

### Keyboard Navigation Testing

**Steps:**
1. Unplug mouse
2. Press `Tab` to move forward
3. Press `Shift+Tab` to move backward
4. Press `Enter` to activate buttons/links
5. Press `Escape` to close modals
6. Check that focus is always visible
7. Check that order is logical

### Screen Reader Testing

**Mac (VoiceOver - built-in):**
- `Cmd+F5` to enable
- `VO` (Caps Lock or Ctrl+Opt) + arrow keys to navigate
- `VO+Space` to activate

**Windows (NVDA - free):**
- Download from https://www.nvaccess.org/
- `Insert` is the NVDA modifier key
- Arrow keys to read content
- `Enter` to activate

**Testing Checklist:**
- [ ] Page title is announced
- [ ] Heading hierarchy is clear
- [ ] Links are descriptive (not "click here")
- [ ] Form labels are associated
- [ ] Error messages are announced
- [ ] Images have alt text (or empty if decorative)
- [ ] Live regions update when content changes
- [ ] Navigation is logical

### Visual Testing

**Checklist:**
- [ ] No color-only status indicators (use text + icon)
- [ ] Text is readable (check contrast)
- [ ] Focus indicators are visible
- [ ] Mobile layout is readable (no horizontal scroll)
- [ ] Links are underlined or distinctive

---

## Tools & Resources

### Validators & Scanners

| Tool | Type | Use |
|------|------|-----|
| [axe DevTools](https://www.deque.com/axe/devtools/) | Browser ext | Quick WCAG violations |
| [WAVE](https://wave.webaim.org/) | Browser ext | Errors, alerts, contrast |
| [pa11y](https://pa11y.org/) | CLI | Automated testing |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Web tool | Color contrast |
| [NVDA](https://www.nvaccess.org/) | Screen reader | Windows testing |
| [JAWS](https://www.freedomscientific.com/products/software/jaws/) | Screen reader | Professional testing |
| [VoiceOver](https://www.apple.com/accessibility/voiceover/) | Screen reader | Mac/iOS testing |

### Standards & Guidelines

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) – Official guidelines
- [WebAIM](https://webaim.org/) – Practical accessibility
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) – ARIA patterns
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) – Developer guide

---

## Common Patterns

### Accessible Button

```html
<button class="btn" type="button" aria-label="Close menu">
  ✕
</button>
```

### Accessible Link

```html
<a href="/page/">Descriptive link text</a>
```

### Accessible Form Group

```html
<div class="form-group">
  <label for="name">Name *</label>
  <input type="text" id="name" name="name" required aria-required="true" />
  <span id="name-error" class="error" hidden>
    This field is required
  </span>
</div>
```

### Accessible Navigation

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/ai/" aria-current="page">AI</a></li>
    <li><a href="/device/">Device</a></li>
  </ul>
</nav>
```

### Accessible Modal

```html
<div role="dialog" aria-modal="true" aria-label="Sign up">
  <button aria-label="Close">✕</button>
  <form>...</form>
</div>
```

---

## Remediation Guide

### How to Fix Common Issues

#### Issue: Low Color Contrast

**Problem:** Text is hard to read (ratio < 4.5:1)

**Solution:**
1. Check contrast in WebAIM Contrast Checker
2. Make text darker OR background lighter
3. Use design tokens (`--text`, `--bg`, `--neon`, etc.)
4. Test in axe DevTools
5. Re-verify

**Example:**
```css
/* Bad (low contrast) */
color: #999;  /* Gray on white background */

/* Good (uses design tokens) */
color: var(--text-muted);  /* Design system contrast verified */
```

#### Issue: No Alt Text on Images

**Problem:** Image has no `alt` attribute or empty alt

**Solution:**
1. Decide: decorative or content?
2. If decorative: `alt=""` + `role="presentation"`
3. If content: Describe what's in the image (not "image of...")
4. Test with screen reader
5. Verify in axe DevTools

#### Issue: Form Inputs Without Labels

**Problem:** Input has no associated label (only placeholder)

**Solution:**
1. Add `<label>` element with `for` attribute
2. Match label `for` to input `id`
3. Remove reliance on placeholder
4. Test with screen reader
5. Verify in axe DevTools

```html
<!-- Good -->
<label for="email">Email *</label>
<input type="email" id="email" required />
```

#### Issue: Keyboard Not Working

**Problem:** Interactive element can't be activated with keyboard

**Solution:**
1. Use semantic `<button>` or `<a>` (not `<div>`)
2. If custom element, add `role="button"`, `tabindex="0"`, handle `Enter`/`Space`
3. Test with Tab key
4. Verify in axe DevTools

#### Issue: Bad Heading Hierarchy

**Problem:** Heading order skips levels (h1 → h3)

**Solution:**
1. Audit all headings on page
2. Reorder to follow hierarchy (h1 → h2 → h3)
3. Never skip levels
4. Only one h1 per page
5. Test with screen reader

---

## Governance

### Code Review Checklist

Every PR should be reviewed for:

- [ ] One `<h1>` per page
- [ ] Heading hierarchy (no skips)
- [ ] Keyboard navigation works
- [ ] Focus is visible
- [ ] Color contrast 4.5:1
- [ ] Form labels associated
- [ ] Alt text on images
- [ ] No keyboard traps
- [ ] axe scan passes (0 violations)

### Audit Schedule

- **Per commit:** axe DevTools scan (automated if CI/CD)
- **Per PR:** Manual keyboard + screen reader test
- **Monthly:** Full accessibility audit (all pages)
- **Quarterly:** User testing with people with disabilities

---

## Related Documents

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** – Master architecture
- **[PERFORMANCE.md](./PERFORMANCE.md)** – Lighthouse optimization
- **[SEO.md](./SEO.md)** – SEO best practices
- **[/assets/components/README.md](/assets/components/README.md)** – Component standards

---

**Last Updated:** 2026-08-03  
**Next Review:** When shipping new pages or components  
**Standard:** WCAG 2.1 Level AA
