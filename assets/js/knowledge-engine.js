(function () {
  "use strict";

  const REGISTRY_URL = "/assets/data/platform-registry.json";
  const GRAPH_URL = "/assets/data/knowledge-graph.json";
  let registryCache = null;
  let graphCache = null;

  async function loadJSON(url) {
    const response = await fetch(url, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async function loadRegistry() {
    if (registryCache) return registryCache;
    const payload = await loadJSON(REGISTRY_URL);
    const items = Array.isArray(payload.items) ? payload.items : [];
    registryCache = new Map(items.filter((item) => item && item.id).map((item) => [item.id, item]));
    return registryCache;
  }

  async function loadGraph() {
    if (graphCache) return graphCache;
    const payload = await loadJSON(GRAPH_URL);
    const nodes = Array.isArray(payload.nodes) ? payload.nodes : [];
    const edges = Array.isArray(payload.edges) ? payload.edges : [];
    graphCache = {
      nodes: new Map(nodes.filter((node) => node && node.id).map((node) => [node.id, node])),
      edges
    };
    return graphCache;
  }

  async function getRelated(id, options) {
    const opts = options || {};
    const limit = Number(opts.limit) || 6;
    const relations = Array.isArray(opts.relations) ? opts.relations : [];
    const [registry, graph] = await Promise.all([loadRegistry(), loadGraph()]);

    return graph.edges
      .filter((edge) => edge && edge.from === id && (!relations.length || relations.includes(edge.relation)))
      .map((edge) => {
        const node = graph.nodes.get(edge.to);
        const registryId = node && node.registryId ? node.registryId : edge.to;
        const item = registry.get(registryId);
        if (!item) return null;
        return Object.assign({ relation: edge.relation }, item);
      })
      .filter(Boolean)
      .slice(0, limit);
  }

  window.PlatformKnowledgeEngine = {
    loadGraph,
    loadRegistry,
    getRelated
  };
})();
