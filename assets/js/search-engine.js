(function () {
  "use strict";

  const SEARCH_INDEX_URL = "/assets/data/search-index.json";
  const REGISTRY_URL = "/assets/data/platform-registry.json";
  let cache = null;

  function normalizeSearchItem(item) {
    if (!item || typeof item !== "object") return null;
    const url = String(item.url || item.path || item.links?.primary || "").trim();
    if (!url) return null;
    return {
      title: String(item.title || "").trim(),
      type: String(item.type || "Item").trim(),
      url,
      description: String(item.description || item.summary || "").trim(),
      keywords: Array.isArray(item.keywords) ? item.keywords.map(String) : Array.isArray(item.tags) ? item.tags.map(String) : []
    };
  }

  async function loadJSON(url) {
    const response = await fetch(url, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async function load() {
    if (cache) return cache;

    const [searchIndex, registry] = await Promise.allSettled([
      loadJSON(SEARCH_INDEX_URL),
      loadJSON(REGISTRY_URL)
    ]);

    const merged = [];
    const seen = new Set();

    if (searchIndex.status === "fulfilled") {
      const items = Array.isArray(searchIndex.value?.items) ? searchIndex.value.items : [];
      items.map(normalizeSearchItem).filter(Boolean).forEach((item) => {
        if (seen.has(item.url)) return;
        seen.add(item.url);
        merged.push(item);
      });
    }

    if (registry.status === "fulfilled") {
      const items = Array.isArray(registry.value?.items) ? registry.value.items : [];
      items.map(normalizeSearchItem).filter(Boolean).forEach((item) => {
        if (seen.has(item.url)) return;
        seen.add(item.url);
        merged.push(item);
      });
    }

    cache = merged;
    return cache;
  }

  async function search(query, limit) {
    const items = await load();
    const needle = String(query || "").trim().toLowerCase();
    if (!needle) return [];

    return items
      .map((item) => {
        const haystack = [item.title, item.type, item.description].concat(item.keywords || []).join(" ").toLowerCase();
        let score = 0;
        if (item.title.toLowerCase().includes(needle)) score += 3;
        if (haystack.includes(needle)) score += 2;
        (item.keywords || []).forEach((keyword) => {
          if (String(keyword).toLowerCase().includes(needle)) score += 1;
        });
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, Number(limit) || 8)
      .map((entry) => entry.item);
  }

  window.PlatformSearchEngine = {
    load,
    search
  };
})();
