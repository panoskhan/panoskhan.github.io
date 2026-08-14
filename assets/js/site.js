(function () {
  "use strict";

  const PRIMARY_NAV = [
    { id: "about", label: "About", href: "/about/" },
    { id: "platform", label: "Dashboard", href: "/platform/" },
    { id: "ai", label: "AI", href: "/ai/" },
    { id: "device", label: "Device", href: "/device/" },
    { id: "intelligence", label: "Intelligence", href: "/intelligence/" },
    { id: "research", label: "Research", href: "/research/" },
    { id: "downloads", label: "Downloads", href: "/downloads/" },
    { id: "projects", label: "Projects", href: "/projects/" },
    { id: "docs", label: "Docs", href: "/docs/" },
    { id: "services", label: "Services", href: "/services.html" }
  ];

  const DRAWER_EXTRA = [
    { id: "digital-health", label: "Digital Health", href: "/digital-health/" },
    { id: "capabilities", label: "Explore", href: "/capabilities/" },
    { id: "labs", label: "Labs", href: "/labs/" },
    { id: "open-source", label: "Open Source", href: "/open-source/" },
    { id: "workspace", label: "Workspace", href: "/platform/#workspace" },
    { id: "credentials", label: "Credentials", href: "/credentials.html" },
    { id: "contact", label: "Contact", href: "/contact.html" }
  ];

  const FALLBACK_SEARCH = [
    { title: "About Panos Khan", type: "Profile", url: "/about/", description: "Official professional profile and areas of focus." },
    { title: "Platform Dashboard", type: "Platform", url: "/platform/", description: "Workspace dashboard for global discovery and saved activity." },
    { title: "Digital Health", type: "Product", url: "/digital-health/", description: "Understand and improve the health of websites, devices, projects, and AI workflows." },
    { title: "Website Health", type: "Tool", url: "/digital-health/website-health/", description: "Generate a health report for your website." },
    { title: "Platform Intelligence", type: "Product", url: "/intelligence/", description: "Health checks, diagnostics, and reports." },
    { title: "Panos Khan AI", type: "Product", url: "/ai/", description: "AI workspace, tools, prompts, and documentation." },
    { title: "Device Service", type: "Product", url: "/device/", description: "Repair, diagnostics, and support guidance." },
    { title: "Docs", type: "Product", url: "/docs/", description: "Architecture, guides, tutorials, and release notes." },
    { title: "Labs", type: "Product", url: "/labs/", description: "Experiments, prototypes, and future concepts." },
    { title: "Downloads", type: "Product", url: "/downloads/", description: "Safe checklists, templates, and browser utilities." },
    { title: "Research", type: "Product", url: "/research/", description: "Frameworks for AI, SEO, and digital transformation." },
    { title: "Capability Explorer", type: "Platform", url: "/capabilities/", description: "Browse platform capabilities across products." },
    { title: "Projects", type: "Projects", url: "/projects/", description: "Selected product and web-engineering work." },
    { title: "Services", type: "Consulting", url: "/services.html", description: "AI strategy, web engineering, SEO, and growth services." },
    { title: "Credentials", type: "Profile", url: "/credentials.html", description: "Professional certifications and credential records." },
    { title: "Open Source", type: "Product", url: "/open-source/", description: "Open-source projects and resources." },
    { title: "Architecture Overview", type: "Documentation", url: "/docs/architecture/", description: "System design and scalability principles." }
  ];

  let searchIndex = FALLBACK_SEARCH.slice();
  let productsCatalog = null;

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
    const cls = item.cta ? ' class="nav-cta"' : "";
    return `<a href="${item.href}"${cls}${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
  }

  function headerHTML() {
    const links = PRIMARY_NAV.map(navLink).join("");
    const drawerLinks = PRIMARY_NAV.concat(DRAWER_EXTRA)
      .filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index)
      .map(navLink)
      .join("");

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
            <a href="/contact.html" class="nav-cta">Book Consultation</a>
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
            <p>Technology ecosystem for AI tools, device guidance, research, documentation, labs, open source, and safe downloads — plus consulting when you need a partner.</p>
          </div>
          <div class="footer-col"><h4>Products</h4><ul>
            <li><a href="/ai/">AI Platform</a></li><li><a href="/intelligence/">Platform Intelligence</a></li><li><a href="/device/">Device Service</a></li><li><a href="/digital-health/">Digital Health</a></li><li><a href="/downloads/">Downloads</a></li><li><a href="/docs/">Docs</a></li><li><a href="/labs/">Labs</a></li><li><a href="/research/">Research</a></li>
          </ul></div>
          <div class="footer-col"><h4>Resources</h4><ul>
            <li><a href="/about/">About</a></li><li><a href="/capabilities/">Capability Explorer</a></li><li><a href="/projects/">Projects</a></li><li><a href="/open-source/">Open Source</a></li><li><a href="/docs/architecture/">Architecture</a></li><li><a href="/services.html">Services</a></li><li><a href="/quality-dashboard.html">Quality Dashboard</a></li>
          </ul></div>
          <div class="footer-col"><h4>Connect</h4><ul>
            <li><a href="/contact.html">Contact</a></li><li><a href="/credentials.html">Credentials</a></li><li><a href="https://www.linkedin.com/in/panos-khan-pk" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="https://medium.com/@panoskhan40" target="_blank" rel="noopener">Medium</a></li><li><a href="https://github.com/panoskhan/panoskhan.github.io" target="_blank" rel="noopener">GitHub</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom"><p>© <span class="current-year">${year}</span> Panos Khan. All rights reserved.</p><div class="footer-social"><a href="https://www.linkedin.com/in/panos-khan-pk" target="_blank" rel="noopener" aria-label="LinkedIn">in</a><a href="https://medium.com/@panoskhan40" target="_blank" rel="noopener" aria-label="Medium">M</a><a href="https://github.com/panoskhan/panoskhan.github.io" target="_blank" rel="noopener" aria-label="GitHub">GH</a><a href="/capabilities/" aria-label="Capability Explorer">◎</a></div></div>
      </div>`;
  }

  function injectNavStyles() {
    if (document.getElementById("pk-nav-runtime-styles")) return;
    const style = document.createElement("style");
    style.id = "pk-nav-runtime-styles";
    style.textContent = `
      .site-header{position:relative;z-index:1000}
      .nav-hamburger{display:none;margin-left:auto;width:44px;height:44px;border:1px solid var(--border,#1e2d4d);border-radius:12px;background:rgba(0,0,0,.22);color:var(--text,#e6edf7);cursor:pointer;align-items:center;justify-content:center;flex-direction:column;gap:5px}
      .nav-hamburger span{display:block;width:20px;height:2px;background:currentColor;border-radius:2px;transition:transform .2s ease,opacity .2s ease}
      .nav-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.nav-hamburger.open span:nth-child(2){opacity:0}.nav-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
      .nav-drawer{display:none;position:fixed;inset:0;z-index:10000}.nav-drawer.open{display:block!important}
      .nav-drawer-overlay{position:absolute;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}
      .nav-drawer-panel{position:absolute;right:0;top:0;height:100%;width:min(390px,92vw);padding:20px;background:var(--bg,#070b14);border-left:1px solid var(--border,#1e2d4d);box-shadow:-30px 0 80px rgba(0,0,0,.55);overflow:auto}
      .nav-drawer-close{display:flex;justify-content:flex-end}.nav-drawer-close button{width:42px;height:42px;border:1px solid var(--border,#1e2d4d);border-radius:12px;background:transparent;color:var(--text,#e6edf7);cursor:pointer;font-size:20px}
      .nav-drawer-links{display:flex;flex-direction:column;gap:4px;margin-top:18px}.nav-drawer-links a{display:block;padding:13px 14px;border-radius:12px;color:var(--text,#e6edf7);text-decoration:none}.nav-drawer-links a:hover,.nav-drawer-links a[aria-current="page"]{background:rgba(0,229,255,.09);color:var(--neon,#00e5ff);text-shadow:none}.nav-drawer-links .nav-cta{margin-top:12px;text-align:center;border:1px solid rgba(0,229,255,.3)}
      @media(max-width:1050px){.nav-links{display:none!important}.nav-hamburger{display:flex!important}}
      @media(min-width:1051px){.nav-drawer{display:none!important}}
      @media(max-width:600px){.nav-drawer-panel{width:100%;padding:16px}.nav-drawer-links a{padding:14px 12px}}
    `;
    document.head.appendChild(style);
  }

  function bindNav(root) {
    const hamburger = root.querySelector("#navHamburger");
    const drawer = root.querySelector("#navDrawer");
    const overlay = root.querySelector("#navOverlay");
    const closeBtn = root.querySelector("#navClose");
    if (!hamburger || !drawer || hamburger.dataset.navBound === "1") return;
    hamburger.dataset.navBound = "1";
    const close = () => { drawer.classList.remove("open"); hamburger.classList.remove("open"); hamburger.setAttribute("aria-expanded","false"); document.body.style.overflow=""; };
    const open = () => { drawer.classList.add("open"); hamburger.classList.add("open"); hamburger.setAttribute("aria-expanded","true"); document.body.style.overflow="hidden"; };
    hamburger.addEventListener("click", () => drawer.classList.contains("open") ? close() : open());
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (overlay) overlay.addEventListener("click", close);
    drawer.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));

    // Use an explicit same-origin navigation for header links so other page-level
    // click handlers cannot accidentally cancel the browser's normal navigation.
    root.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link || !root.contains(link) || link.target === "_blank") return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      event.preventDefault();
      event.stopPropagation();
      close();
      window.location.assign(new URL(href, window.location.origin).href);
    }, true);

    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  }

  function mountShell() {
    document.querySelectorAll(".langbar").forEach((node) => node.remove());
    document.querySelectorAll("body > .nav-drawer").forEach((node) => node.remove());
    document.querySelectorAll(".site-header").forEach((node) => { node.setAttribute("data-site-nav",""); node.style.top="0"; node.innerHTML=headerHTML(); bindNav(node); });
    document.querySelectorAll("[data-site-footer]").forEach((node) => { node.innerHTML=footerHTML(); });
    document.querySelectorAll(".current-year").forEach((node) => { node.textContent=String(new Date().getFullYear()); });
  }

  function renderResults(query) {
    const results=document.getElementById("globalSearchResults"); if(!results)return;
    const normalized=query.trim().toLowerCase();
    const matches=normalized?searchIndex.filter((item)=>`${item.title} ${item.type} ${item.description} ${(item.keywords||[]).join(" ")}`.toLowerCase().includes(normalized)):searchIndex.slice(0,8);
    results.innerHTML=matches.length?matches.map((item)=>`<li><a href="${item.url}"><span>${item.title}</span><small>${item.type} · ${item.description}</small></a></li>`).join(""): '<li class="search-empty">No matching products, tools, docs, or downloads.</li>';
  }

  function mountGlobalSearch() {
    if(document.getElementById("globalSearchDialog"))return;
    const shell=document.createElement("div");
    shell.innerHTML=`<button class="global-search-trigger" type="button" aria-label="Search the site" aria-haspopup="dialog">Search <kbd>⌘K</kbd></button><dialog class="global-search-dialog" id="globalSearchDialog" aria-labelledby="globalSearchTitle"><div class="global-search-head"><h2 id="globalSearchTitle">Search Panos Khan</h2><button type="button" class="global-search-close" aria-label="Close search">×</button></div><label class="sr-only" for="globalSearchInput">Search products, tools, docs, and downloads</label><input id="globalSearchInput" type="search" autocomplete="off" placeholder="Search products, tools, docs, and downloads…" /><ul id="globalSearchResults" class="global-search-results"></ul></dialog>`;
    document.body.appendChild(shell);
    const dialog=document.getElementById("globalSearchDialog"), input=document.getElementById("globalSearchInput");
    const open=()=>{dialog.showModal();input.value="";renderResults("");input.focus();};
    shell.querySelector(".global-search-trigger").addEventListener("click",open); shell.querySelector(".global-search-close").addEventListener("click",()=>dialog.close()); input.addEventListener("input",()=>renderResults(input.value)); dialog.addEventListener("click",(event)=>{if(event.target===dialog)dialog.close();});
    document.addEventListener("keydown",(event)=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();if(!dialog.open)open();}});
  }

  function trackRecent(itemId){if(!itemId||!window.localStorage)return;try{const key="pk_workspace_recent";const existing=JSON.parse(localStorage.getItem(key)||"[]");localStorage.setItem(key,JSON.stringify([itemId].concat(existing.filter((id)=>id!==itemId)).slice(0,20)));}catch(_){} }
  function mapPlatformItemsToSearch(items){if(!Array.isArray(items))return[];return items.filter((item)=>item&&item.title&&item.path).map((item)=>({title:item.title,type:(item.type||"Item").replace(/^./,(ch)=>ch.toUpperCase()),url:item.links&&item.links.primary?item.links.primary:item.path,description:item.summary||`${item.type||"item"} from platform registry`,keywords:Array.isArray(item.tags)?item.tags:[]}));}
  function productById(id){if(!productsCatalog||!Array.isArray(productsCatalog.products))return null;return productsCatalog.products.find((item)=>item.id===id)||null;}
  function renderRelatedProducts(){document.querySelectorAll("[data-related-products]").forEach((node)=>{const ids=(node.getAttribute("data-related-products")||"").split(",").map((value)=>value.trim()).filter(Boolean);const cards=ids.map((id)=>{const product=productById(id);if(product)return `<a class="card related-product-card" href="${product.path}"><span class="card-tag">${product.category||"Product"}</span><h3>${product.name}</h3><p class="muted">${product.description}</p><span class="ecosystem-meta">Open ${product.shortName||product.name} →</span></a>`;const fallback=PRIMARY_NAV.concat(DRAWER_EXTRA).find((item)=>item.id===id);if(!fallback)return"";return `<a class="card related-product-card" href="${fallback.href}"><span class="card-tag">Product</span><h3>${fallback.label}</h3><p class="muted">Open this ecosystem surface.</p><span class="ecosystem-meta">Open →</span></a>`;}).filter(Boolean);node.innerHTML=cards.join("")||'<p class="muted">Related products will appear here.</p>';});}
  async function loadJSON(url){try{const response=await fetch(url,{credentials:"same-origin"});return response.ok?await response.json():null;}catch(_){return null;}}
  async function loadRegistries(){const [searchData,productData,platformData]=await Promise.all([loadJSON("/assets/data/search-index.json"),loadJSON("/assets/data/products.json"),loadJSON("/assets/data/platform-registry.json")]);const staticSearch=searchData&&Array.isArray(searchData.items)?searchData.items:[];const platformSearch=platformData&&Array.isArray(platformData.items)?mapPlatformItemsToSearch(platformData.items):[];if(staticSearch.length||platformSearch.length){const dedupe=new Map();staticSearch.concat(platformSearch).forEach((item)=>{if(item&&item.url&&!dedupe.has(item.url))dedupe.set(item.url,item);});searchIndex=Array.from(dedupe.values());}if(productData&&Array.isArray(productData.products))productsCatalog=productData;renderRelatedProducts();}

  window.PhoenixSite={products:PRIMARY_NAV,get searchIndex(){return searchIndex;},get productsCatalog(){return productsCatalog;},mountShell,mountGlobalSearch,trackRecent,renderRelatedProducts};
  function boot(){injectNavStyles();mountShell();mountGlobalSearch();renderRelatedProducts();loadRegistries();const toolId=document.body&&document.body.dataset.toolId;if(toolId)trackRecent(toolId);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
