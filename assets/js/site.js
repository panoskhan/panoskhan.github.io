(function () {
  "use strict";

  const searchIndex = [
    { title: "AI Platform", type: "Platform", url: "/ai/", description: "Consultant-grade strategy, growth, and risk tools." },
    { title: "AI Tools", type: "Tools", url: "/tools.html", description: "Ten practical client-side tools for AI transformation." },
    { title: "Research Center", type: "Research", url: "/research.html", description: "Practical research on AI, automation, SEO, and web engineering." },
    { title: "Projects", type: "Projects", url: "/projects.html", description: "Selected product, automation, and web-engineering work." },
    { title: "AI Website Audit", type: "Tool", url: "/ai/tools/website-audit.html", description: "Audit readiness, speed, SEO, and conversion fundamentals." },
    { title: "AI SEO Brief Generator", type: "Tool", url: "/ai/tools/seo-brief.html", description: "Create a structured SEO content brief." },
    { title: "AI Ad Copy Studio", type: "Tool", url: "/ai/tools/ad-copy-studio.html", description: "Generate structured ad-copy testing angles." },
    { title: "AI Readiness Twin", type: "Tool", url: "/ai/tools/readiness-twin.html", description: "Map quick wins and transformation priorities." },
    { title: "AI Decision Risk Simulator", type: "Tool", url: "/ai/tools/decision-risk.html", description: "Assess legal, bias, security, adoption, and brand risk." },
    { title: "AI Trust Label Generator", type: "Tool", url: "/ai/tools/trust-label.html", description: "Create a responsible-AI transparency statement." },
    { title: "AI Readiness Framework", type: "Research", url: "/research.html#ai-readiness-framework", description: "A practical framework for choosing and governing AI pilots." },
    { title: "Project Phoenix", type: "Project", url: "/projects.html#project-phoenix", description: "The architecture behind the Panos Khan digital ecosystem." }
  ];

  function renderResults(query) {
    const results = document.getElementById("globalSearchResults");
    const normalized = query.trim().toLowerCase();
    const matches = normalized ? searchIndex.filter((item) =>
      `${item.title} ${item.type} ${item.description}`.toLowerCase().includes(normalized)
    ) : searchIndex.slice(0, 6);
    results.innerHTML = matches.length ? matches.map((item) =>
      `<li><a href="${item.url}"><span>${item.title}</span><small>${item.type} · ${item.description}</small></a></li>`
    ).join("") : "<li class=\"search-empty\">No matching tools, research, or projects.</li>";
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
        <label class="sr-only" for="globalSearchInput">Search tools, research, and projects</label>
        <input id="globalSearchInput" type="search" autocomplete="off" placeholder="Search tools, research, and projects…" />
        <ul id="globalSearchResults" class="global-search-results"></ul>
      </dialog>`;
    document.body.appendChild(shell);

    const dialog = document.getElementById("globalSearchDialog");
    const input = document.getElementById("globalSearchInput");
    const open = () => { dialog.showModal(); input.value = ""; renderResults(""); input.focus(); };
    shell.querySelector(".global-search-trigger").addEventListener("click", open);
    shell.querySelector(".global-search-close").addEventListener("click", () => dialog.close());
    input.addEventListener("input", () => renderResults(input.value));
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!dialog.open) open();
      }
    });
  }

  window.PhoenixSite = { mountGlobalSearch };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountGlobalSearch);
  else mountGlobalSearch();
})();
