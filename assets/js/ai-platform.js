/* ============================================================
   Panos Khan AI Platform — ai-platform.js
   Dynamic Layout Wrapping, Tools Registry, and Interactive UI
   ============================================================ */

const AIPlatform = (function() {
  // ── 1. Tools Registry (The Heart of the Platform) ─────────
  const toolsRegistry = {
    "website-audit": {
      id: "website-audit",
      name: "AI Website Audit",
      category: "Strategy",
      description: "Audit any website for AI readiness, mobile speed, SEO structural alignment, and UX conversions.",
      featured: true,
      url: "/ai/tools/website-audit.html",
      icon: "🌐",
      docs: {
        overview: "The AI Website Audit Assistant conducts a comprehensive client-side review of any digital interface. It evaluates website messaging, structured schema, core technical alignment, and trust indicators to prepare the site for high conversion rates and crawlability by next-generation AI agents.",
        how_it_works: "Input your business details, target URL, and primary digital growth objective. The tool applies standard B2B/B2C diagnostic heuristics and alignment parameters to generate a prioritized, consultant-grade optimization plan.",
        best_practices: "For high-fidelity recommendations, ensure that the target audience is described with specific attributes (e.g., 'Enterprise CTOs' rather than just 'business people') and specify concrete commercial objectives."
      },
      faqs: [
        { q: "Does this tool actually scan my live website?", a: "No, this is a diagnostic model that uses client-side heuristics. It analyzes the specific business parameters, positioning gaps, and industry characteristics you provide to produce an optimization plan matching actual consultant outputs." },
        { q: "What is AI-agent crawlability?", a: "It refers to how easily LLM-based crawlers (like GPTBot, ClaudeBot, or Perplexity) can parse, index, and reference your site content when answering user prompts. Our audit highlights gaps such as missing schema or lack of AI agent directives." }
      ],
      changelog: [
        { version: "v1.2.0", date: "2026-07-20", changes: ["Added explicit schema markup checks", "Enriched conversion optimization priority outputs"] },
        { version: "v1.0.0", date: "2026-05-15", changes: ["Initial launch of the AI Website Audit Assistant"] }
      ],
      related: ["seo-brief", "readiness-twin"]
    },
    "seo-brief": {
      id: "seo-brief",
      name: "AI SEO Brief Generator",
      category: "Growth",
      description: "Generates deterministic, client-ready SEO content briefs with strategic consultant framing.",
      featured: false,
      url: "/ai/tools/seo-brief.html",
      icon: "✍️",
      docs: {
        overview: "The SEO Brief Generator streamlines content marketing workflows by transforming raw target keywords into comprehensive, search-optimized publishing blueprints. It designs optimal article structures, semantic headings, and search-intent angles that rank.",
        how_it_works: "Provide a primary focus keyword, target audience, business type, and geographic market. The tool models intent signals and search engine optimization patterns to generate a fully structured brief containing title options, headers, and outline guidelines.",
        best_practices: "Always input a specific primary keyword (e.g., 'AI customer support automation') instead of a broad topic (e.g., 'customer service') to get a highly precise content outline."
      },
      faqs: [
        { q: "Is the brief layout compatible with standard writing teams?", a: "Yes. The generated brief matches the standard format used by premium marketing agencies worldwide, including primary keyword placement, outline headers, search intent framing, and content-length suggestions." },
        { q: "Can this be used for localized SEO?", a: "Absolutely. By entering a specific location / market (such as 'Greece' or 'Athens, Greece'), the generator shapes title angles and search intent points tailored for regional audiences." }
      ],
      changelog: [
        { version: "v1.1.0", date: "2026-07-10", changes: ["Added local market optimization factors", "Refined search intent categorization"] },
        { version: "v1.0.0", date: "2026-06-01", changes: ["Initial release of the SEO Brief Generator tool"] }
      ],
      related: ["website-audit", "ad-copy-studio"]
    },
    "ad-copy-studio": {
      id: "ad-copy-studio",
      name: "AI Ad Copy Studio",
      category: "Growth",
      description: "Generates deterministic ad headlines, descriptions, CTA ideas, and testing angles.",
      featured: false,
      url: "/ai/tools/ad-copy-studio.html",
      icon: "📢",
      docs: {
        overview: "The AI Ad Copy Studio generates multi-angle paid media assets for Google, LinkedIn, and Meta campaigns. It translates product benefits and core offers into structured copy variations designed to capture attention and lower customer acquisition costs.",
        how_it_works: "Input your core offer, primary customer pain points, target audience, and brand tone. The tool maps these parameters to high-performance ad-copy architectures (e.g., benefit-driven, pain-point, social proof, direct-action) to generate structured testing sets.",
        best_practices: "Test at least two different brand tones (e.g., 'Professional' vs 'Direct & Bold') to see how the conversion angles shift."
      },
      faqs: [
        { q: "What copy architectures does the tool support?", a: "It utilizes several proven copy frameworks, including direct-response benefits, pain-point mitigation, social proof reinforcement, and curiosity-driven hooks." },
        { q: "Are the generated lengths compliant with ad platform constraints?", a: "Yes, headlines and descriptions are structured to align with standard platform specifications (e.g., Google's 30-character headline / 90-character description boundaries)." }
      ],
      changelog: [
        { version: "v1.0.5", date: "2026-07-15", changes: ["Added social-proof copy frameworks", "Updated character limit guardrails"] },
        { version: "v1.0.0", date: "2026-06-12", changes: ["Initial launch of the Ad Copy Studio"] }
      ],
      related: ["seo-brief", "website-audit"]
    },
    "readiness-twin": {
      id: "readiness-twin",
      name: "AI Readiness Twin",
      category: "Strategy",
      description: "Builds dual tracks: immediate 30-day quick wins and strategic 12-month transformation priorities.",
      featured: true,
      url: "/ai/tools/readiness-twin.html",
      icon: "🧠",
      docs: {
        overview: "The AI Readiness Twin helps organizations transition from experimental AI usage to structured, high-value capabilities. It creates dual-track roadmaps consisting of low-barrier 30-day proof-of-value wins and long-term 12-month strategic priorities.",
        how_it_works: "Specify your industry and top operational challenge. The system models industry-specific baseline workflows to structure instant quick wins and build robust governance, pilot testing, and scalability frameworks.",
        best_practices: "Focus on a narrow, high-friction operational challenge (e.g., 'slow response to RFPs' or 'high customer-service triage load') to get highly contextual and practical steps."
      },
      faqs: [
        { q: "What are 'dual tracks'?", a: "To succeed in AI, companies must show immediate traction while planning durable infrastructure. Track 1 (Quick Wins) delivers speed and team momentum; Track 2 (Strategic Transformation) outlines the governance, data integration, and systems architecture needed to sustain growth." },
        { q: "Do I need technical expertise to use this?", a: "Not at all. The recommendations are designed for team leads, directors, and executives who need to plan digital transformation initiatives with clear KPIs and roles." }
      ],
      changelog: [
        { version: "v1.1.2", date: "2026-07-28", changes: ["Added industry-specific baseline KPIs", "Enriched governance checklists"] },
        { version: "v1.0.0", date: "2026-04-20", changes: ["Initial release of the AI Readiness Twin"] }
      ],
      related: ["website-audit", "decision-risk"]
    },
    "decision-risk": {
      id: "decision-risk",
      name: "AI Decision Risk Simulator",
      category: "Risk",
      description: "Simulates legal, bias, security, adoption, and brand risk levels for any planned AI initiative.",
      featured: false,
      url: "/ai/tools/decision-risk.html",
      icon: "⚖️",
      docs: {
        overview: "The AI Decision Risk Simulator evaluates critical risk dimensions (Legal, Security, Bias, Adoption, Reputation) before deploying AI initiatives. It provides risk mitigation strategies to ensure governance and alignment.",
        how_it_works: "Submit your planned use-case and the sensitivity level of the underlying customer or company data. The simulator models risk distribution scores and outlines crucial human-in-the-loop review steps and audit gates.",
        best_practices: "When reviewing high-sensitivity initiatives, combine this simulation with the AI Trust Label Generator to create a dual-front transparency and risk management protocol."
      },
      faqs: [
        { q: "How is the risk index calculated?", a: "It uses data sensitivity levels and use-case parameters to estimate baseline operational vulnerabilities across five separate risk dimensions based on current global regulatory standards." },
        { q: "How do I mitigate high security/privacy risks?", a: "The simulator generates customized rules, such as establishing human approval gates, scrubbing personal data, and logging all automated decisions for transparency." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-06-25", changes: ["Initial launch of the Decision Risk Simulator"] }
      ],
      related: ["trust-label", "readiness-twin"]
    },
    "trust-label": {
      id: "trust-label",
      name: "AI Trust Label Generator",
      category: "Risk",
      description: "Creates a publishable transparency statement on responsible AI usage for your clients and visitors.",
      featured: false,
      url: "/ai/tools/trust-label.html",
      icon: "🛡️",
      docs: {
        overview: "The AI Trust Label Generator helps modern businesses establish client credibility by generating clear, publishable statements of responsible AI stewardship. This helps address consumer concern over data usage and model boundaries.",
        how_it_works: "Provide your business name and detail how you utilize AI in your workflows. The tool constructs a structured, five-part transparency declaration confirming human oversight, data privacy, and model validation.",
        best_practices: "Publish the generated text directly on your privacy policy page, about section, or custom footer trust-link to build maximum brand credibility."
      },
      faqs: [
        { q: "Why do I need an AI Trust Label?", a: "In an era of rising concern over data scraping and black-box automation, establishing transparency about where AI is (and is not) used builds durable competitive trust with customers." },
        { q: "Can I customize the generated label?", a: "Yes. The generated output serves as a high-quality consultant-drafted baseline that you can copy, edit, and expand as your organization's specific policies grow." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-07-02", changes: ["Initial release of the AI Trust Label Generator"] }
      ],
      related: ["decision-risk", "website-audit"]
    }
  };

  // ── 2. Common Layout Markup Blocks ───────────────────────
  const navigationMarkup = `
    <header class="site-header" data-site-nav role="banner"></header>
  `;

  const footerMarkup = `
    <footer class="site-footer" data-site-footer role="contentinfo"></footer>
  `;

  // ── 3. Page Building Orchestration ──────────────────────
  function init() {
    const toolId = document.body.getAttribute('data-tool-id');
    if (toolId && toolsRegistry[toolId]) {
      wrapToolPage(toolId);
    }
    setupMobileNav();
  }

  function wrapToolPage(toolId) {
    const tool = toolsRegistry[toolId];
    const originalContent = document.getElementById('ai-tool-content');
    
    if (!originalContent) return;

    // Preserve the original unique form and contents
    const formHtml = originalContent.innerHTML;

    // Create the full template wrapper
    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'ai-page-wrapper';
    
    pageWrapper.innerHTML = `
      ${navigationMarkup}
      
      <div class="container" style="margin-top: 40px; padding-top: 10px;">
        <nav class="ai-breadcrumbs" aria-label="Breadcrumbs">
          <a href="/">Home</a>
          <span class="separator">/</span>
          <a href="/ai/">AI Platform</a>
          <span class="separator">/</span>
          <span class="current">${tool.name}</span>
        </nav>
      </div>

      <main class="container">
        <div class="ai-layout-grid">
          <!-- Left Column: Tool Form and Results -->
          <div class="ai-tool-column">
            <div class="ai-card ${tool.featured ? 'featured-card' : ''}">
              <div class="ai-tool-header" style="margin-bottom: 24px;">
                <span class="kicker">${tool.category}</span>
                <h1 style="margin: 4px 0 8px; font-size: clamp(1.8rem, 3.2vw, 2.3rem); line-height: 1.2;">${tool.name}</h1>
                <p class="muted" style="margin-bottom: 0; font-size: 1rem;">${tool.description}</p>
              </div>
              
              <!-- Injected original unique tool input interface -->
              <div id="ai-injected-container">
                ${formHtml}
              </div>

              <!-- Made by Panos Khan Badge -->
              <div style="display:flex; justify-content:center; margin-top: 24px; padding-top: 16px; border-top: 1px dashed var(--border-soft);">
                <a href="/" class="made-by-badge" style="display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:rgba(7, 11, 20, 0.4); border:1px solid rgba(0, 229, 255, 0.15); border-radius:50px; text-decoration:none; transition:all var(--t);">
                  <span style="width:6px; height:6px; background:var(--neon); border-radius:50%; display:inline-block; box-shadow: 0 0 6px var(--neon);"></span>
                  <span style="color:var(--text); font-size:0.82rem; font-weight:600;">Made by Panos Khan</span>
                </a>
              </div>
              
              <!-- Shared output area -->
              <div class="ai-output-wrap" id="ai-platform-output-wrap">
                <div class="ai-output-header">
                  <h3>Generated Diagnostic Output</h3>
                  <button class="ai-btn" id="ai-platform-copy-btn" type="button" style="padding: 6px 12px; font-size: 0.85rem;">Copy Result</button>
                </div>
                <div id="ai-platform-output-target"></div>
              </div>
            </div>
          </div>
          
          <!-- Right Column: Documentation, FAQs, Changelog -->
          <div class="ai-info-column">
            <!-- Documentation Tabs -->
            <div class="ai-card ai-docs-card">
              <div class="ai-tabs" role="tablist">
                <button class="ai-tab-btn active" data-tab="overview" role="tab" aria-selected="true" aria-controls="pane-overview">Overview</button>
                <button class="ai-tab-btn" data-tab="how" role="tab" aria-selected="false" aria-controls="pane-how">How It Works</button>
                <button class="ai-tab-btn" data-tab="practices" role="tab" aria-selected="false" aria-controls="pane-practices">Best Practices</button>
              </div>
              <div class="ai-tab-pane active" id="pane-overview" role="tabpanel">${tool.docs.overview}</div>
              <div class="ai-tab-pane" id="pane-how" role="tabpanel">${tool.docs.how_it_works}</div>
              <div class="ai-tab-pane" id="pane-practices" role="tabpanel">${tool.docs.best_practices}</div>
            </div>

            <div class="ai-card ai-example-card">
              <h3 style="margin-bottom: 10px; color: var(--text);">Example</h3>
              <p class="muted">Use a specific business context and desired outcome. Review the deterministic draft before applying it to a live decision or publication.</p>
            </div>
            
            <!-- FAQ Accordion -->
            <div class="ai-card ai-faq-card">
              <h3 style="margin-bottom: 18px; color: var(--text);">Frequently Asked Questions</h3>
              <div class="ai-faq-list">
                ${tool.faqs.map((faq, i) => `
                  <div class="ai-faq-item">
                    <button class="ai-faq-trigger" aria-expanded="false">
                      <span>${faq.q}</span>
                      <span class="ai-faq-icon">▼</span>
                    </button>
                    <div class="ai-faq-body" style="max-height: 0px;">
                      <div class="ai-faq-content">${faq.a}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <!-- Changelog/Version History -->
            <div class="ai-card ai-changelog-card">
              <h3 style="margin-bottom: 18px; color: var(--text);">Tool Version History</h3>
              <div class="ai-changelog-list">
                ${tool.changelog.map(item => `
                  <div class="ai-changelog-item">
                    <div class="ai-changelog-header">
                      <span class="ai-changelog-version">${item.version}</span>
                      <span class="ai-changelog-date">${item.date}</span>
                    </div>
                    <ul class="ai-changelog-changes">
                      ${item.changes.map(ch => `<li>${ch}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Tools Section -->
        <div class="ai-related-section">
          <h2>Related AI Core Tools</h2>
          <div class="ai-related-grid" id="ai-related-target"></div>
          <p class="ai-share-links"><strong>Share this tool:</strong> <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener">LinkedIn</a> · <a href="mailto:?subject=${encodeURIComponent(tool.name)}&body=${encodeURIComponent(location.href)}">Email</a></p>
        </div>
      </main>
      
      ${footerMarkup}
    `;

    // Replace body contents while preserving attributes like data-tool-id
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    document.body.appendChild(pageWrapper);

    const mountShellAndSearch = () => {
      if (!window.PhoenixSite) return false;
      window.PhoenixSite.mountShell();
      window.PhoenixSite.mountGlobalSearch();
      window.PhoenixSite.trackRecent(toolId);
      return true;
    };

    if (!mountShellAndSearch()) {
      const existing = document.querySelector('script[src="/assets/js/site.js"]');
      if (existing) {
        existing.addEventListener('load', mountShellAndSearch);
        // If the script already executed, try on next tick.
        setTimeout(mountShellAndSearch, 0);
      } else {
        const searchScript = document.createElement('script');
        searchScript.src = '/assets/js/site.js';
        searchScript.onload = mountShellAndSearch;
        document.body.appendChild(searchScript);
      }
    }

    // Automatically inject a beautiful, glassmorphic, floating "Made by Panos Khan" badge
    const floatingBadge = document.createElement('a');
    floatingBadge.href = "/";
    floatingBadge.className = "floating-made-by-badge";
    floatingBadge.setAttribute('aria-label', 'Made by Panos Khan');
    floatingBadge.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      background: rgba(10, 15, 30, 0.6);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid rgba(0, 229, 255, 0.3);
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 8px 32px rgba(0, 229, 255, 0.15);
      transition: all 0.3s ease;
      cursor: pointer;
    `;
    floatingBadge.innerHTML = `
      <span style="width: 8px; height: 8px; background: var(--neon, #00e5ff); border-radius: 50%; display: inline-block; box-shadow: 0 0 8px var(--neon, #00e5ff);"></span>
      <span style="color: var(--text, #ffffff); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">Made by Panos Khan</span>
    `;
    
    floatingBadge.addEventListener('mouseenter', () => {
      floatingBadge.style.transform = 'translateY(-4px) scale(1.05)';
      floatingBadge.style.borderColor = 'var(--purple, #9d4edd)';
      floatingBadge.style.boxShadow = '0 12px 40px rgba(157, 78, 221, 0.3)';
    });
    floatingBadge.addEventListener('mouseleave', () => {
      floatingBadge.style.transform = 'none';
      floatingBadge.style.borderColor = 'rgba(0, 229, 255, 0.3)';
      floatingBadge.style.boxShadow = '0 8px 32px rgba(0, 229, 255, 0.15)';
    });

    document.body.appendChild(floatingBadge);

    // Render related tools
    renderRelatedTools(tool.related);

    // Initialize interactive event listeners
    setupTabListeners();
    setupFaqListeners();
    setupCopyButton();
    
    // Set footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ── 4. UI Components Handlers ────────────────────────────
  function setupTabListeners() {
    const tabButtons = document.querySelectorAll('.ai-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabContainer = btn.closest('.ai-docs-card');
        if (!tabContainer) return;
        
        // Deactivate other tabs
        tabContainer.querySelectorAll('.ai-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabContainer.querySelectorAll('.ai-tab-pane').forEach(p => p.classList.remove('active'));
        
        // Activate current tab
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetId = `pane-${btn.getAttribute('data-tab')}`;
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  function setupFaqListeners() {
    const faqTriggers = document.querySelectorAll('.ai-faq-trigger');
    faqTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.ai-faq-item');
        const body = item.querySelector('.ai-faq-body');
        const isActive = item.classList.contains('active');
        
        // Close others
        document.querySelectorAll('.ai-faq-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.ai-faq-trigger').setAttribute('aria-expanded', 'false');
            otherItem.querySelector('.ai-faq-body').style.maxHeight = '0px';
          }
        });
        
        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = '0px';
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  function setupCopyButton() {
    const copyBtn = document.getElementById('ai-platform-copy-btn');
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', async () => {
      const target = document.getElementById('ai-platform-output-target');
      if (!target) return;
      
      const textToCopy = target.innerText.trim();
      try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.textContent = 'Copied!';
      } catch {
        copyBtn.textContent = 'Copy failed';
      }
      setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 1800);
    });
  }

  function renderRelatedTools(relatedIds) {
    const target = document.getElementById('ai-related-target');
    if (!target) return;
    
    let html = '';
    relatedIds.forEach(id => {
      const relatedTool = toolsRegistry[id];
      if (relatedTool) {
        html += `
          <a href="${relatedTool.url}" class="ai-hub-card ${relatedTool.featured ? 'featured-hub-card' : ''}">
            <div class="ai-hub-card-header">
              <span class="ai-hub-card-icon">${relatedTool.icon}</span>
              <span class="ai-hub-card-tag">${relatedTool.category}</span>
            </div>
            <h3>${relatedTool.name}</h3>
            <p>${relatedTool.description}</p>
            <div class="ai-hub-card-footer">
              Open Tool <span>→</span>
            </div>
          </a>
        `;
      }
    });
    
    target.innerHTML = html;
  }

  // ── 5. Standard Helper methods for Tools ────────────────
  function showFormattedOutput(data) {
    const wrap = document.getElementById('ai-platform-output-wrap');
    const target = document.getElementById('ai-platform-output-target');
    if (!wrap || !target) return;
    
    if (typeof data === 'string') {
      target.innerHTML = `<pre class="ai-output-box">${data}</pre>`;
    } else if (data && data.sections) {
      // Build a beautiful formatted output
      let sectionsHtml = `<div class="ai-output-formatted">`;
      if (data.title) {
        sectionsHtml += `<h3 style="margin-top:0; margin-bottom: 20px; color: var(--neon); font-size:1.3rem; border-bottom: 1px solid var(--border); padding-bottom:12px;">${data.title}</h3>`;
      }
      data.sections.forEach(sec => {
        sectionsHtml += `
          <section>
            <h4>${sec.title}</h4>
            <div>${formatMarkdownStyle(sec.content)}</div>
          </section>
        `;
      });
      sectionsHtml += `</div>`;
      target.innerHTML = sectionsHtml;
    }
    
    wrap.classList.add('visible');
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function formatMarkdownStyle(text) {
    // Simple markdown client-side formatter (bold lists, bullets, links)
    let formatted = String(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="mono" style="background:var(--surface-3); padding:2px 6px; border-radius:4px; font-size:0.9em; border:1px solid var(--border); color:#cde6ff;">$1</code>');
    
    // Bullet lists
    if (formatted.includes('\n* ')) {
      const lines = formatted.split('\n');
      let inList = false;
      let newText = '';
      lines.forEach(line => {
        if (line.trim().startsWith('* ')) {
          if (!inList) {
            newText += '<ul style="margin: 8px 0; padding-left: 20px;">';
            inList = true;
          }
          newText += `<li>${line.trim().substring(2)}</li>`;
        } else {
          if (inList) {
            newText += '</ul>';
            inList = false;
          }
          newText += line + '\n';
        }
      });
      if (inList) newText += '</ul>';
      formatted = newText;
    }
    
    // Ordered lists
    if (formatted.match(/\n\d+\.\s/)) {
      const lines = formatted.split('\n');
      let inList = false;
      let newText = '';
      lines.forEach(line => {
        const match = line.trim().match(/^(\d+)\.\s(.*)/);
        if (match) {
          if (!inList) {
            newText += '<ol style="margin: 8px 0; padding-left: 20px;">';
            inList = true;
          }
          newText += `<li>${match[2]}</li>`;
        } else {
          if (inList) {
            newText += '</ol>';
            inList = false;
          }
          newText += line + '\n';
        }
      });
      if (inList) newText += '</ol>';
      formatted = newText;
    }
    
    return formatted.replace(/\n/g, '<br>');
  }

  function setupMobileNav() {
    const hamburger = document.getElementById('navHamburger');
    const drawer    = document.getElementById('navDrawer');
    const overlay   = document.getElementById('navOverlay');
    const closeBtn  = document.getElementById('navClose');

    if (!hamburger || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  // ── 6. Public API ────────────────────────────────────────
  return {
    registry: toolsRegistry,
    init: init,
    showFormattedOutput: showFormattedOutput,
    escapeHtml: function(text) {
      return String(text).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
    },
    safeText: function(text) {
      return this.escapeHtml(String(text || '').trim().replace(/\s+/g, ' '));
    }
  };
})();

// Auto-run on DOM content loaded
document.addEventListener('DOMContentLoaded', AIPlatform.init);
