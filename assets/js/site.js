(function () {
  "use strict";

  const PRODUCTS = [
    { id: "ai", label: "AI", href: "/ai/" },
    { id: "device", label: "Device", href: "/device/" },
    { id: "research", label: "Research", href: "/research/" },
    { id: "capabilities", label: "Explore", href: "/capabilities/" },
    { id: "downloads", label: "Downloads", href: "/downloads/" },
    { id: "open-source", label: "Open Source", href: "/open-source/" },
    { id: "projects", label: "Projects", href: "/projects/" }
  ];

  const searchIndex = [
    { title: "Panos Khan AI", type: "Product", url: "/ai/", description: "AI workspace, tools, prompts, and documentation." },
    { title: "Device Service", type: "Product", url: "/device/", description: "Repair, diagnostics, and support guidance." },
    { title: "Research", type: "Product", url: "/research/", description: "Frameworks for AI, SEO, and digital transformation." },
    { title: "Capability Explorer", type: "Platform", url: "/capabilities/", description: "Browse platform capabilities across AI, SEO, Device, Developer, and Business." },
    { title: "Downloads", type: "Product", url: "/downloads/", description: "Safe checklists, templates, and browser utilities." },
    { title: "Open Source", type: "Product", url: "/open-source/", description: "Repos, samples, and transparent utilities." },
    { title: "Projects", type: "Projects", url: "/projects/", description: "Selected product and web-engineering work." },
    { title: "Services", type: "Consulting", url: "/services.html", description: "AI strategy, web engineering, SEO, and growth services." },
    { title: "AI Website Audit", type: "Tool", url: "/ai/tools/website-audit.html", description: "Audit readiness, speed, SEO, and conversion fundamentals." },
    { title: "AI SEO Brief Generator", type: "Tool", url: "/ai/tools/seo-brief.html", description: "Create a structured SEO content brief." },
    { title: "AI Ad Copy Studio", type: "Tool", url: "/ai/tools/ad-copy-studio.html", description: "Generate structured ad-copy testing angles." },
    { title: "AI Readiness Twin", type: "Tool", url: "/ai/tools/readiness-twin.html", description: "Map quick wins and transformation priorities." },
    { title: "AI Decision Risk Simulator", type: "Tool", url: "/ai/tools/decision-risk.html", description: "Assess legal, bias, security, adoption, and brand risk." },
    { title: "AI Trust Label Generator", type: "Tool", url: "/ai/tools/trust-label.html", description: "Create a responsible-AI transparency statement." },
    { title: "AI Readiness Framework", type: "Research", url: "/research/#ai-readiness-framework", description: "A practical framework for choosing and governing AI pilots." },
    { title: "Project Phoenix", type: "Project", url: "/projects/#project-phoenix", description: "The architecture behind the Panos Khan digital ecosystem." }
  ];

  function currentPath() {
    const path = window.location.pathname || "/";
    if (path.endsWith("/index.html")) return path.slice(0, -10) || "/";
    return path;
  }

  function isActive(href) {
    const path = currentPath();
    if (href === "/") return path === "/" || path === "";
    return path === href || path === href.replace(/\/$/, "") || path.startsWith(href);
  }

  function navLink(item) {
    const active = isActive(item.href);
    return `<a href="${item.href}"${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
  }

  function headerHTML() {
    const links = PRODUCTS.map(navLink).join("");
    const drawerLinks = PRODUCTS.map(navLink).join("") +
      `<a href="/services.html">Services</a>` +
      `<a href="/credentials.html">Credentials</a>` +
      `<a href="/contact.html" class="nav-cta">Consultation</a>`;

    return `
      <div class="nav-inner">
        <a href="/" class="brand" aria-label="Panos Khan — Home">Panos <span>Khan</span></a>
        <nav class="nav-links" aria-label="Main navigation">
          ${links}
          <a href="/contact.html" class="nav-cta">Consultation</a>
        </nav>
        <button class="nav-hamburger" id="navHamburger" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navDrawer">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-drawer" id="navDrawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div class="nav-drawer-overlay" id="navOverlay"></div>
        <div class="nav-drawer-panel">
          <div class="nav-drawer-close">
            <button id="navClose" type="button" aria-label="Close navigation menu">✕</button>
          </div>
          <nav class="nav-drawer-links" aria-label="Mobile navigation">
            ${drawerLinks}
          </nav>
        </div>
      </div>
    `;
  }

  function footerHTML() {
    const year = new Date().getFullYear();
    return `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <span class="brand">Panos <span>Khan</span></span>
            <p>Technology ecosystem for AI tools, device guidance, research, open source, and safe downloads — plus consulting when you need a partner.</p>
          </div>
          <div class="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="/ai/">AI Platform</a></li>
              <li><a href="/device/">Device Service</a></li>
              <li><a href="/research/">Research</a></li>
              <li><a href="/capabilities/">Capability Explorer</a></li>
              <li><a href="/downloads/">Downloads</a></li>
              <li><a href="/open-source/">Open Source</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/projects/">Projects</a></li>
              <li><a href="/services.html">Services</a></li>
              <li><a href="/ai/#documentation">AI Docs</a></li>
              <li><a href="/quality-dashboard.html">Quality Dashboard</a></li>
              <li><a href="/credentials.html">Credentials</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="/contact.html">Contact</a></li>
              <li><a href="https://www.linkedin.com/in/panos-khan-pk" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="https://medium.com/@panoskhan40" target="_blank" rel="noopener">Medium</a></li>
              <li><a href="https://github.com/panoskhan/panoskhan.github.io" target="_blank" rel="noopener">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© <span class="current-year">${year}</span> Panos Khan. All rights reserved.</p>
          <div class="footer-social">
            <a href="https://www.linkedin.com/in/panos-khan-pk" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            <a href="https://medium.com/@panoskhan40" target="_blank" rel="noopener" aria-label="Medium">M</a>
            <a href="https://github.com/panoskhan/panoskhan.github.io" target="_blank" rel="noopener" aria-label="GitHub">GH</a>
            <a href="/capabilities/" aria-label="Capability Explorer">◎</a>
          </div>
        </div>
      </div>
    `;
  }

  function bindNav(root) {
    const hamburger = root.querySelector("#navHamburger") || document.getElementById("navHamburger");
    const drawer = root.querySelector("#navDrawer") || document.getElementById("navDrawer");
    const overlay = root.querySelector("#navOverlay") || document.getElementById("navOverlay");
    const closeBtn = root.querySelector("#navClose") || document.getElementById("navClose");
    if (!hamburger || !drawer || hamburger.dataset.navBound === "1") return;
    hamburger.dataset.navBound = "1";

    const open = () => {
      drawer.classList.add("open");
      hamburger.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      drawer.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    hamburger.addEventListener("click", () => {
      if (drawer.classList.contains("open")) close();
      else open();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (overlay) overlay.addEventListener("click", close);
    drawer.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  function mountShell() {
    document.querySelectorAll("[data-site-nav]").forEach((node) => {
      node.innerHTML = headerHTML();
      bindNav(node);
    });
    document.querySelectorAll("[data-site-footer]").forEach((node) => {
      node.innerHTML = footerHTML();
    });
    document.querySelectorAll(".current-year").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });

    if (!document.querySelector("[data-site-nav]")) {
      bindNav(document);
    }
  }

  function renderResults(query) {
    const results = document.getElementById("globalSearchResults");
    if (!results) return;
    const normalized = query.trim().toLowerCase();
    const matches = normalized
      ? searchIndex.filter((item) =>
          `${item.title} ${item.type} ${item.description}`.toLowerCase().includes(normalized)
        )
      : searchIndex.slice(0, 8);
    results.innerHTML = matches.length
      ? matches.map((item) =>
          `<li><a href="${item.url}"><span>${item.title}</span><small>${item.type} · ${item.description}</small></a></li>`
        ).join("")
      : "<li class=\"search-empty\">No matching products, tools, or research.</li>";
  }

  function mountGlobalSearch() {
    if (document.getElementById("globalSearchDialog")) return;
    const shell = document.createElement("div");
    shell.innerHTML = `
      <button class="global-search-trigger" type="button" aria-label="Search the site" aria-haspopup="dialog">Search <kbd>⌘K</kbd></button>
      <dialog class="global-search-dialog" id="globalSearchDialog" aria-labelledby="globalSearchTitle">
        <div class="global-search-head">
          <h2 id="globalSearchTitle">Search Panos Khan</h2>
          <button type="button" class="global-search-close" aria-label="Close search">×</button>
        </div>
        <label class="sr-only" for="globalSearchInput">Search products, tools, and research</label>
        <input id="globalSearchInput" type="search" autocomplete="off" placeholder="Search products, tools, and research…" />
        <ul id="globalSearchResults" class="global-search-results"></ul>
      </dialog>`;
    document.body.appendChild(shell);

    const dialog = document.getElementById("globalSearchDialog");
    const input = document.getElementById("globalSearchInput");
    const open = () => {
      dialog.showModal();
      input.value = "";
      renderResults("");
      input.focus();
    };
    shell.querySelector(".global-search-trigger").addEventListener("click", open);
    shell.querySelector(".global-search-close").addEventListener("click", () => dialog.close());
    input.addEventListener("input", () => renderResults(input.value));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!dialog.open) open();
      }
    });
  }

  function trackRecent(toolId) {
    if (!toolId || !window.localStorage) return;
    try {
      const key = "pk_recent_tools";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      const next = [toolId].concat(existing.filter((id) => id !== toolId)).slice(0, 12);
      localStorage.setItem(key, JSON.stringify(next));
    } catch (_) {
      /* ignore quota / private mode */
    }
  }

  window.PhoenixSite = {
    products: PRODUCTS,
    searchIndex,
    mountShell,
    mountGlobalSearch,
    trackRecent
  };

  function boot() {
    mountShell();
    mountGlobalSearch();
    const toolId = document.body && document.body.dataset.toolId;
    if (toolId) trackRecent(toolId);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
