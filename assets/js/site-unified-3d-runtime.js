/* Panos Khan — shared cinematic visual runtime */
(function () {
  "use strict";

  const HREF = "/assets/css/site-unified-3d.css";

  function mount() {
    if (!document.head || document.querySelector('link[data-pk-unified-3d="1"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = HREF;
    link.dataset.pkUnified3d = "1";
    document.head.appendChild(link);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }

  window.PanosKhanVisualSystem = {
    version: "unified-3d-1",
    mount
  };
})();
