(function () {
  "use strict";

  const DATA_URL = "/assets/data/capabilities.json";
  const statusLabel = {
    live: "Live",
    planned: "Planned",
    draft: "Draft"
  };

  function el(id) {
    return document.getElementById(id);
  }

  function resourceList(items, emptyText) {
    if (!items || !items.length) {
      return `<p class="muted capability-empty">${emptyText}</p>`;
    }
    return `<ul class="capability-resource-list">${items.map((item) =>
      `<li><a href="${item.url}">${item.title}</a></li>`
    ).join("")}</ul>`;
  }

  function matchesQuery(cap, query) {
    if (!query) return true;
    const haystack = [
      cap.name,
      cap.domain,
      cap.description,
      cap.status,
      ...(cap.keywords || [])
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  }

  function render(capabilities, domain, query) {
    const grid = el("capabilityGrid");
    const empty = el("capabilityEmpty");
    const count = el("capabilityCount");
    if (!grid) return;

    const filtered = capabilities.filter((cap) => {
      const domainOk = domain === "all" || cap.domain === domain;
      return domainOk && matchesQuery(cap, query);
    });

    if (count) {
      count.textContent = filtered.length === 1
        ? "1 capability"
        : `${filtered.length} capabilities`;
    }

    if (!filtered.length) {
      grid.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    grid.innerHTML = filtered.map((cap) => `
      <article class="card capability-card" id="${cap.id}" data-domain="${cap.domain}" data-status="${cap.status}">
        <div class="capability-card-top">
          <span class="card-tag">${cap.domain}</span>
          <span class="capability-status status-${cap.status}">${statusLabel[cap.status] || cap.status}</span>
        </div>
        <h2>${cap.name}</h2>
        <p class="muted">${cap.description}</p>
        <div class="capability-sections">
          <section>
            <h3>Tools</h3>
            ${resourceList(cap.tools, cap.status === "planned" ? "No live tools yet — guide linked below." : "No tools linked yet.")}
          </section>
          <section>
            <h3>Docs &amp; guides</h3>
            ${resourceList(cap.docs, "Documentation coming soon.")}
          </section>
          <section>
            <h3>Downloads</h3>
            ${resourceList(cap.downloads, "No downloads yet.")}
          </section>
          <section>
            <h3>Projects</h3>
            ${resourceList(cap.projects, "No related projects yet.")}
          </section>
        </div>
        ${(cap.keywords && cap.keywords.length) ? `<p class="capability-keywords">${cap.keywords.map((k) => `<span class="pill">${k}</span>`).join("")}</p>` : ""}
      </article>
    `).join("");

    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const target = document.getElementById(hash);
      if (target) target.scrollIntoView({ block: "start" });
    }
  }

  async function init() {
    const grid = el("capabilityGrid");
    if (!grid) return;

    let payload;
    try {
      const response = await fetch(DATA_URL, { credentials: "same-origin" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      payload = await response.json();
    } catch (error) {
      grid.innerHTML = `<div class="ai-no-results card">Could not load capability data. ${String(error.message || error)}</div>`;
      return;
    }

    const capabilities = payload.capabilities || [];
    const domains = payload.domains || ["AI", "SEO", "Device", "Developer", "Business"];
    const filters = el("capabilityFilters");
    const search = el("capabilitySearch");
    let currentDomain = "all";
    let currentQuery = "";

    if (filters) {
      filters.innerHTML = [`<button type="button" class="ai-category-pill active" data-domain="all">All</button>`]
        .concat(domains.map((domain) =>
          `<button type="button" class="ai-category-pill" data-domain="${domain}">${domain}</button>`
        )).join("");

      filters.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-domain]");
        if (!btn) return;
        currentDomain = btn.getAttribute("data-domain");
        filters.querySelectorAll(".ai-category-pill").forEach((node) => {
          node.classList.toggle("active", node === btn);
        });
        render(capabilities, currentDomain, currentQuery);
      });
    }

    if (search) {
      search.addEventListener("input", () => {
        currentQuery = search.value.trim().toLowerCase();
        render(capabilities, currentDomain, currentQuery);
      });
    }

    render(capabilities, currentDomain, currentQuery);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
