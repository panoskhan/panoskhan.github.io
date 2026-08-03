(function () {
  "use strict";

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function stars(score) {
    const filled = Math.max(1, Math.min(5, Math.round(Number(score || 0) / 20)));
    return "★".repeat(filled) + "☆".repeat(5 - filled);
  }

  function list(items, className) {
    if (!Array.isArray(items) || !items.length) return '<p class="muted">No items recorded.</p>';
    return `<ul class="${className}">${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
  }

  function recommendationCards(items) {
    if (!Array.isArray(items) || !items.length) return '<p class="muted">No recommendations yet.</p>';
    return items.map((item) => `
      <article class="report-recommendation">
        <span class="report-recommendation-priority">${escapeHTML(`Priority ${item.order || ""}`.trim())} · ${escapeHTML(item.priority || "planned")}</span>
        <p><strong>${escapeHTML(item.title)}</strong> ${escapeHTML(item.summary || "")}</p>
        <p class="report-effort">Estimated effort: ${escapeHTML(item.effort || "TBD")}</p>
      </article>
    `).join("");
  }

  function resourceCards(items) {
    if (!Array.isArray(items) || !items.length) return '<p class="muted">No related resources yet.</p>';
    return `<div class="content-grid">${items.map((item) => `
      <article class="card">
        <h3>${escapeHTML(item.title)}</h3>
        <p class="muted">${escapeHTML(item.summary || item.description || "")}</p>
        <p><a href="${escapeHTML(item.links?.primary || item.path || item.href || "#")}">Open →</a></p>
      </article>
    `).join("")}</div>`;
  }

  function createTextReport(report) {
    const sections = [
      `${report.title}`,
      `Health Score: ${report.score}/100`,
      ``,
      `Executive Summary`,
      `${report.executiveSummary || report.summary || ""}`,
      ``,
      `Critical Issues`,
      ...(report.criticalIssues || []).map((item) => `- ${item}`),
      ``,
      `Warnings`,
      ...(report.warnings || []).map((item) => `- ${item}`),
      ``,
      `Passed Checks`,
      ...(report.passedChecks || []).map((item) => `- ${item}`),
      ``,
      `Recommended Action Plan`,
      ...(report.recommendedActionPlan || []).map((item) => `${item.order}. ${item.title} — ${item.summary} (${item.effort})`)
    ];
    return sections.join("\n").trim();
  }

  function downloadReport(report) {
    const blob = new Blob([createTextReport(report)], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${String(report.subject || report.title || "website-health").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  async function shareReport(report) {
    const text = createTextReport(report);
    if (navigator.share) {
      await navigator.share({ title: report.title, text });
      return;
    }
    await navigator.clipboard.writeText(text);
  }

  function render(container, report) {
    if (!container || !report) return;

    container.innerHTML = `
      <div class="report-container">
        <div class="report-header">
          <p class="kicker">Canonical Health Report</p>
          <h2>${escapeHTML(report.title)}</h2>
          <p class="muted">${escapeHTML(report.summary || "")}</p>
          <div class="report-score-circle" aria-label="Health score: ${escapeHTML(report.score)} out of 100">${escapeHTML(report.score)}<small>/100</small></div>
          ${Number(report.score || 0) >= 90 ? '<div><span class="certified-badge">Panos Khan Verified</span></div>' : ""}
        </div>

        <section class="report-section">
          <h3>Health Score</h3>
          <div class="report-dimensions">
            ${(report.categories || []).map((category) => `
              <div class="report-dim">
                <p class="report-dim-label">${escapeHTML(category.label)}</p>
                <p class="report-dim-stars" aria-label="${escapeHTML(Math.round((category.score || 0) / 20))} out of 5 stars">${stars(category.score)}</p>
                <p class="muted">${escapeHTML(category.score)}/100</p>
              </div>
            `).join("")}
          </div>
        </section>

        <section class="report-section">
          <h3>Executive Summary</h3>
          <p>${escapeHTML(report.executiveSummary || report.summary || "")}</p>
        </section>

        <section class="report-section">
          <h3>Critical Issues</h3>
          ${list(report.criticalIssues, "report-list")}
        </section>

        <section class="report-section">
          <h3>Warnings</h3>
          ${list(report.warnings, "report-list")}
        </section>

        <section class="report-section">
          <h3>Passed Checks</h3>
          ${list(report.passedChecks, "report-list report-list--success")}
        </section>

        <section class="report-section">
          <h3>Estimated Time to Improve</h3>
          <p>${escapeHTML(report.estimatedTimeToImprove || "TBD")}</p>
        </section>

        <section class="report-section">
          <h3>Recommended Action Plan</h3>
          ${recommendationCards(report.recommendedActionPlan)}
        </section>

        <section class="report-section">
          <h3>Learning Resources</h3>
          ${resourceCards(report.learningResources)}
        </section>

        <section class="report-section">
          <h3>Related Tools</h3>
          ${resourceCards(report.relatedTools)}
        </section>

        <section class="report-section">
          <h3>Download Report</h3>
          <div class="report-actions">
            <button type="button" class="btn btn-primary btn-sm" data-report-action="download">Download report</button>
          </div>
        </section>

        <section class="report-section">
          <h3>Share Report</h3>
          <div class="report-actions">
            <button type="button" class="btn btn-sm" data-report-action="share">Share report</button>
          </div>
        </section>

        <section class="report-section">
          <h3>History</h3>
          <p class="muted">History is reserved for a future workspace milestone. Current reports remain browser-local and can be re-generated at any time.</p>
        </section>
      </div>
    `;

    container.querySelector('[data-report-action="download"]').addEventListener("click", function () {
      downloadReport(report);
    });

    container.querySelector('[data-report-action="share"]').addEventListener("click", async function (event) {
      const button = event.currentTarget;
      const defaultLabel = button.textContent;
      try {
        await shareReport(report);
        button.textContent = navigator.share ? "Shared" : "Copied";
      } catch (_) {
        button.textContent = "Share failed";
      }
      setTimeout(function () {
        button.textContent = defaultLabel;
      }, 1800);
    });
  }

  window.PlatformReportEngine = {
    render,
    createTextReport
  };
})();
