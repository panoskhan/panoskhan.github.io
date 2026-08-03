(function () {
  "use strict";

  const PRIORITY_WEIGHT = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3
  };

  function buildPlan(report) {
    const items = Array.isArray(report.recommendations) ? report.recommendations.slice() : [];
    const ranked = items
      .map((item, index) => Object.assign({ order: index + 1 }, item))
      .sort((a, b) => {
        const aWeight = PRIORITY_WEIGHT[String(a.priority || "").toLowerCase()] ?? 9;
        const bWeight = PRIORITY_WEIGHT[String(b.priority || "").toLowerCase()] ?? 9;
        return aWeight - bWeight || a.order - b.order;
      })
      .map((item, index) => Object.assign({}, item, { order: index + 1 }));

    const estimate = ranked.length >= 4 ? "2–4 weeks" : ranked.length >= 2 ? "1–2 weeks" : "2–3 days";

    return {
      estimatedTimeToImprove: report.estimatedTimeToImprove || estimate,
      items: ranked
    };
  }

  window.PlatformRecommendationEngine = {
    buildPlan
  };
})();
