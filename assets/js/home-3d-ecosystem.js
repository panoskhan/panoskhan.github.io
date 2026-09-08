(function () {
  "use strict";

  function initHomeMotion() {
    const heroVisual = document.querySelector(".hero-visual");
    const heroBackdrop = document.querySelector(".hero-backdrop");
    if (!heroVisual || !heroBackdrop) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const finePointer = window.matchMedia("(pointer:fine)").matches;
    if (finePointer) {
      heroVisual.addEventListener(
        "pointermove",
        (event) => {
          const rect = heroVisual.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          heroVisual.style.setProperty("--hero-ry", `${(x * 8).toFixed(2)}deg`);
          heroVisual.style.setProperty("--hero-rx", `${(y * -6).toFixed(2)}deg`);
        },
        { passive: true }
      );

      heroVisual.addEventListener(
        "pointerleave",
        () => {
          heroVisual.style.setProperty("--hero-ry", "0deg");
          heroVisual.style.setProperty("--hero-rx", "0deg");
        },
        { passive: true }
      );
    }

    const updateDepth = () => {
      const progress = Math.min(window.scrollY / 600, 1);
      heroBackdrop.style.opacity = String(1 - progress * 0.32);
    };

    updateDepth();
    window.addEventListener("scroll", updateDepth, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeMotion, { once: true });
  } else {
    initHomeMotion();
  }
})();
