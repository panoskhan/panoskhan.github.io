(function () {
  "use strict";

  const REGISTRY_URL = "/assets/data/platform-registry.json";
  const FAVORITES_KEY = "pk_workspace_favorites";
  const RECENT_KEY = "pk_workspace_recent";
  const PREFS_KEY = "pk_workspace_prefs";

  let registryCache = [];

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      if (!value) return fallback;
      const parsed = JSON.parse(value);
      return parsed ?? fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      /* ignore storage errors */
    }
  }

  function normalizeItem(item) {
    if (!item || typeof item !== "object") return null;
    return {
      id: String(item.id || "").trim(),
      type: String(item.type || "").trim(),
      title: String(item.title || "").trim(),
      summary: String(item.summary || "").trim(),
      status: String(item.status || "draft").trim() || "draft",
      updated: String(item.updated || "").trim(),
      path: String(item.path || item.links?.primary || "").trim(),
      featured: Boolean(item.featured),
      tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
      domain: String(item.domain || "").trim(),
      category: String(item.category || "").trim(),
      product: String(item.product || "").trim(),
      links: item.links && typeof item.links === "object" ? item.links : {},
      readingTime: String(item.readingTime || "").trim()
    };
  }

  async function loadRegistry() {
    if (registryCache.length) return registryCache;
    try {
      const response = await fetch(REGISTRY_URL, { credentials: "same-origin" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const items = Array.isArray(payload.items) ? payload.items : [];
      registryCache = items.map(normalizeItem).filter((item) => item && item.id && item.type && item.title && item.path);
      return registryCache;
    } catch (_) {
      registryCache = [];
      return registryCache;
    }
  }

  function getFavorites() {
    return readJSON(FAVORITES_KEY, []);
  }

  function isFavorite(id) {
    return getFavorites().includes(id);
  }

  function toggleFavorite(id) {
    const existing = getFavorites();
    const next = existing.includes(id)
      ? existing.filter((value) => value !== id)
      : [id].concat(existing).slice(0, 50);
    writeJSON(FAVORITES_KEY, next);
    return next.includes(id);
  }

  function trackRecent(id) {
    if (!id) return;
    const existing = readJSON(RECENT_KEY, []);
    const next = [id].concat(existing.filter((value) => value !== id)).slice(0, 20);
    writeJSON(RECENT_KEY, next);
  }

  function getRecent() {
    return readJSON(RECENT_KEY, []);
  }

  function getPreferences() {
    return readJSON(PREFS_KEY, { compactCards: false, showFeaturedFirst: true });
  }

  function setPreference(key, value) {
    const prefs = getPreferences();
    prefs[key] = value;
    writeJSON(PREFS_KEY, prefs);
  }

  function filterItems(items, opts) {
    const type = opts.type || "all";
    const domain = opts.domain || "all";
    const query = (opts.query || "").trim().toLowerCase();

    return items.filter((item) => {
      const typeOk = type === "all" || item.type === type;
      const domainOk = domain === "all" || item.domain === domain;
      if (!typeOk || !domainOk) return false;
      if (!query) return true;
      const haystack = [
        item.title,
        item.summary,
        item.status,
        item.domain,
        item.category,
        item.product,
        ...(item.tags || [])
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }

  function sortItems(items, featuredFirst) {
    return items.slice().sort((a, b) => {
      if (featuredFirst) {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      return a.title.localeCompare(b.title);
    });
  }

  function cardActions(item) {
    const actions = [];
    actions.push(`<a href="${escapeHTML(item.links.primary || item.path)}">Open →</a>`);
    if (item.links.capability) actions.push(`<a href="${escapeHTML(item.links.capability)}">Capability</a>`);
    if (item.links.tool) actions.push(`<a href="${escapeHTML(item.links.tool)}">Tool</a>`);
    if (item.links.docs) actions.push(`<a href="${escapeHTML(item.links.docs)}">Docs</a>`);
    if (item.links.related) actions.push(`<a href="${escapeHTML(item.links.related)}">Related</a>`);
    return actions.join(" · ");
  }

  function itemCard(item, cardClass) {
    return `
      <article id="${escapeHTML(item.id)}" class="card ${escapeHTML(cardClass || "")}" data-platform-item="${escapeHTML(item.id)}">
        <div class="platform-card-top">
          <span class="card-tag">${escapeHTML(item.type)}${item.domain ? ` · ${escapeHTML(item.domain)}` : ""}</span>
          <button type="button" class="favorite-toggle" data-favorite-id="${escapeHTML(item.id)}" aria-label="Toggle favorite">
            ${isFavorite(item.id) ? "★" : "☆"}
          </button>
        </div>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="muted">${escapeHTML(item.summary)}</p>
        <dl class="content-meta">
          <div><dt>Status</dt><dd>${escapeHTML(item.status)}</dd></div>
          <div><dt>Updated</dt><dd>${escapeHTML(item.updated || "-")}</dd></div>
          ${item.category ? `<div><dt>Category</dt><dd>${escapeHTML(item.category)}</dd></div>` : ""}
          ${item.readingTime ? `<div><dt>Reading</dt><dd>${escapeHTML(item.readingTime)}</dd></div>` : ""}
        </dl>
        <p class="platform-card-actions">${cardActions(item)}</p>
      </article>
    `;
  }

  function attachItemInteractions(root) {
    root.querySelectorAll("[data-favorite-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-favorite-id") || "";
        const active = toggleFavorite(id);
        button.textContent = active ? "★" : "☆";
      });
    });

    root.querySelectorAll("[data-platform-item] a[href]").forEach((link) => {
      link.addEventListener("click", () => {
        const parent = link.closest("[data-platform-item]");
        const id = parent && parent.getAttribute("data-platform-item");
        if (id) trackRecent(id);
      });
    });
  }

  async function mountCatalog(config) {
    const grid = document.getElementById(config.gridId);
    if (!grid) return;

    const items = await loadRegistry();
    const prefs = getPreferences();
    const search = config.searchId ? document.getElementById(config.searchId) : null;
    const filters = config.filtersId ? document.getElementById(config.filtersId) : null;
    const count = config.countId ? document.getElementById(config.countId) : null;
    const empty = config.emptyId ? document.getElementById(config.emptyId) : null;

    let currentDomain = "all";
    let currentQuery = "";

    function render() {
      const filtered = sortItems(
        filterItems(items, { type: config.type, domain: currentDomain, query: currentQuery }),
        prefs.showFeaturedFirst
      );

      grid.innerHTML = filtered.map((item) => itemCard(item, config.cardClass)).join("");
      attachItemInteractions(grid);

      if (count) count.textContent = filtered.length === 1 ? "1 item" : `${filtered.length} items`;
      if (empty) empty.hidden = filtered.length > 0;
    }

    if (filters) {
      const domains = ["all"].concat(
        Array.from(new Set(items.filter((item) => item.type === config.type).map((item) => item.domain).filter(Boolean))).sort()
      );
      filters.innerHTML = domains
        .map((domain, index) => `<button type="button" class="ai-category-pill ${index === 0 ? "active" : ""}" data-domain="${escapeHTML(domain)}">${escapeHTML(domain === "all" ? "All" : domain)}</button>`)
        .join("");

      filters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-domain]");
        if (!button) return;
        currentDomain = button.getAttribute("data-domain") || "all";
        filters.querySelectorAll(".ai-category-pill").forEach((pill) => {
          pill.classList.toggle("active", pill === button);
        });
        render();
      });
    }

    if (search) {
      search.addEventListener("input", () => {
        currentQuery = search.value.trim().toLowerCase();
        render();
      });
    }

    render();
  }

  function itemLinkList(items) {
    if (!items.length) return '<p class="muted">No items yet.</p>';
    return `<ul class="platform-list">${items.map((item) => `<li><a href="${escapeHTML(item.links.primary || item.path)}">${escapeHTML(item.title)}</a><small>${escapeHTML(item.type)} · ${escapeHTML(item.status)}</small></li>`).join("")}</ul>`;
  }

  async function mountDashboard(config) {
    const items = await loadRegistry();
    const stats = document.getElementById(config.statsId);
    const featured = document.getElementById(config.featuredId);
    const favorites = document.getElementById(config.favoritesId);
    const recent = document.getElementById(config.recentId);
    const searchInput = document.getElementById(config.searchInputId);
    const searchResults = document.getElementById(config.searchResultsId);
    const compactToggle = document.getElementById(config.compactToggleId);
    const featuredToggle = document.getElementById(config.featuredToggleId);

    const favoritesSet = new Set(getFavorites());
    const recentSet = getRecent();
    const byId = new Map(items.map((item) => [item.id, item]));

    const typeCounts = items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    if (stats) {
      stats.innerHTML = `
        <article class="card workspace-stat"><h3>${items.length}</h3><p class="muted">Unified catalog items</p></article>
        <article class="card workspace-stat"><h3>${typeCounts.tool || 0}</h3><p class="muted">Tools</p></article>
        <article class="card workspace-stat"><h3>${typeCounts.download || 0}</h3><p class="muted">Downloads</p></article>
        <article class="card workspace-stat"><h3>${favoritesSet.size}</h3><p class="muted">Favorites</p></article>
      `;
    }

    if (featured) {
      const featuredItems = sortItems(items.filter((item) => item.featured), true).slice(0, 8);
      featured.innerHTML = itemLinkList(featuredItems);
    }

    if (favorites) {
      const favoriteItems = sortItems(items.filter((item) => favoritesSet.has(item.id)), true);
      favorites.innerHTML = itemLinkList(favoriteItems);
    }

    if (recent) {
      const recentItems = recentSet.map((id) => byId.get(id)).filter(Boolean).slice(0, 8);
      recent.innerHTML = itemLinkList(recentItems);
    }

    if (searchInput && searchResults) {
      const renderSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        const filtered = sortItems(filterItems(items, { type: "all", domain: "all", query }), true).slice(0, 12);
        searchResults.innerHTML = filtered.length
          ? `<ul class="platform-list">${filtered.map((item) => `<li><a href="${escapeHTML(item.links.primary || item.path)}">${escapeHTML(item.title)}</a><small>${escapeHTML(item.type)} · ${escapeHTML(item.domain || item.category || "general")}</small></li>`).join("")}</ul>`
          : '<p class="muted">No matching items found.</p>';
      };
      searchInput.addEventListener("input", renderSearch);
      renderSearch();
    }

    const prefs = getPreferences();
    if (compactToggle) {
      compactToggle.checked = Boolean(prefs.compactCards);
      compactToggle.addEventListener("change", () => setPreference("compactCards", compactToggle.checked));
    }
    if (featuredToggle) {
      featuredToggle.checked = Boolean(prefs.showFeaturedFirst);
      featuredToggle.addEventListener("change", () => setPreference("showFeaturedFirst", featuredToggle.checked));
    }
  }

  async function mountFromDOM() {
    const catalogNodes = document.querySelectorAll("[data-platform-catalog]");
    for (const node of catalogNodes) {
      await mountCatalog({
        type: node.getAttribute("data-type") || "all",
        gridId: node.getAttribute("data-grid-id") || "",
        searchId: node.getAttribute("data-search-id") || "",
        filtersId: node.getAttribute("data-filters-id") || "",
        countId: node.getAttribute("data-count-id") || "",
        emptyId: node.getAttribute("data-empty-id") || "",
        cardClass: node.getAttribute("data-card-class") || ""
      });
    }

    const dashboardNode = document.querySelector("[data-platform-dashboard]");
    if (dashboardNode) {
      await mountDashboard({
        statsId: dashboardNode.getAttribute("data-stats-id") || "",
        featuredId: dashboardNode.getAttribute("data-featured-id") || "",
        favoritesId: dashboardNode.getAttribute("data-favorites-id") || "",
        recentId: dashboardNode.getAttribute("data-recent-id") || "",
        searchInputId: dashboardNode.getAttribute("data-search-input-id") || "",
        searchResultsId: dashboardNode.getAttribute("data-search-results-id") || "",
        compactToggleId: dashboardNode.getAttribute("data-compact-toggle-id") || "",
        featuredToggleId: dashboardNode.getAttribute("data-featured-toggle-id") || ""
      });
    }
  }

  window.PKPlatform = {
    loadRegistry,
    mountCatalog,
    mountDashboard,
    mountFromDOM,
    getFavorites,
    toggleFavorite,
    getRecent,
    trackRecent,
    getPreferences,
    setPreference
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountFromDOM);
  } else {
    mountFromDOM();
  }
})();
