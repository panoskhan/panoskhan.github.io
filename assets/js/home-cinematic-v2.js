(() => {
  const scene = document.querySelector('.hero3d');
  if (!scene) return;

  // Final demo visual system.
  if (!document.querySelector('link[data-pk-planet-spectrum]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/home-planet-spectrum-v15.css';
    link.dataset.pkPlanetSpectrum = 'true';
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[data-pk-planetary-v18]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/home-planetary-production-v18.css';
    link.dataset.pkPlanetaryV18 = 'true';
    document.head.appendChild(link);
  }

  // Keep the original node labels. They are part of the working visual system;
  // do not hide them or replace them with a second overlay layer.
  const labelData = {
    n1: ['RESEARCH', 'Research & Innovation'],
    n2: ['EVIDENCE OS', 'Evidence Network'],
    n3: ['PROJECTS', 'Real World Impact'],
    n4: ['AI TOOLS', 'Intelligence Layer'],
    n5: ['PLATFORM', 'Scalable Systems']
  };
  Object.entries(labelData).forEach(([name]) => {
    const node = scene.querySelector(`.${name}`);
    if (!node) return;
    node.querySelectorAll(':scope > b, :scope > small').forEach(el => {
      el.style.removeProperty('display');
      el.style.removeProperty('visibility');
      el.style.removeProperty('opacity');
    });
    const fallback = scene.querySelector(`.pk-scene-label[data-node="${name}"]`);
    if (fallback) fallback.style.cssText = 'display:none!important;';
  });

  if (!document.querySelector('link[data-reference-constellation]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/assets/css/home-reference-constellation.css';
    css.dataset.referenceConstellation = 'true';
    document.head.appendChild(css);
  }
  if (!document.querySelector('link[data-pk-final-stabilization]')) {
    const finalCss = document.createElement('link');
    finalCss.rel = 'stylesheet';
    finalCss.href = '/assets/css/home-final-stabilization-v19.css?v=20260908-194';
    finalCss.dataset.pkFinalStabilization = 'true';
    document.head.appendChild(finalCss);
  }
  if (!document.querySelector('link[data-pk-reference-v20]')) {
    const referenceCss = document.createElement('link');
    referenceCss.rel = 'stylesheet';
    referenceCss.href = '/assets/css/home-final-reference-v20.css?v=20260908-201';
    referenceCss.dataset.pkReferenceV20 = 'true';
    document.head.appendChild(referenceCss);
  }
  if (!document.querySelector('link[data-pk-reference-v21]')) {
    const mobileCss = document.createElement('link');
    mobileCss.rel = 'stylesheet';
    mobileCss.href = '/assets/css/home-final-reference-v21.css?v=20260908-210';
    mobileCss.dataset.pkReferenceV21 = 'true';
    document.head.appendChild(mobileCss);
  }
  if (!document.querySelector('link[data-pk-reference-v22]')) {
    const polishCss = document.createElement('link');
    polishCss.rel = 'stylesheet';
    polishCss.href = '/assets/css/home-final-reference-v22.css?v=20260908-220';
    polishCss.dataset.pkReferenceV22 = 'true';
    document.head.appendChild(polishCss);
  }
  if (!document.querySelector('link[data-pk-reference-v23]')) {
    const microPolishCss = document.createElement('link');
    microPolishCss.rel = 'stylesheet';
    microPolishCss.href = '/assets/css/home-final-reference-v23.css?v=20260908-230';
    microPolishCss.dataset.pkReferenceV23 = 'true';
    document.head.appendChild(microPolishCss);
  }
  if (!document.querySelector('link[data-pk-lighting-v24]')) {
    const lightingCss = document.createElement('link');
    lightingCss.rel = 'stylesheet';
    lightingCss.href = '/assets/css/home-final-lighting-v24.css?v=20260908-231';
    lightingCss.dataset.pkLightingV24 = 'true';
    document.head.appendChild(lightingCss);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (!scene.querySelector('.particle-field')) {
    const field = document.createElement('div');
    field.className = 'particle-field';
    const count = window.innerWidth < 601 ? 14 : 24;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('i');
      p.className = 'particle';
      p.style.left = `${8 + Math.random() * 84}%`;
      p.style.top = `${8 + Math.random() * 82}%`;
      p.style.setProperty('--dx', `${-18 + Math.random() * 36}px`);
      p.style.setProperty('--dy', `${-26 + Math.random() * 52}px`);
      p.style.setProperty('--dur', `${4.5 + Math.random() * 5}s`);
      p.style.setProperty('--delay', `${-Math.random() * 6}s`);
      field.appendChild(p);
    }
    scene.appendChild(field);
    const floor = document.createElement('div');
    floor.className = 'scene-floor';
    scene.appendChild(floor);
  }

  const nodeDepths = { n1: 0.16, n2: 0.28, n3: 0.20, n4: 0.24, n5: 0.18 };
  Object.entries(nodeDepths).forEach(([name, depth]) => {
    const node = scene.querySelector(`.${name}`);
    if (node) node.style.setProperty('--depth', depth);
  });

  // Desktop-only pointer parallax. Mobile remains position-locked.
  let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
  const render = () => {
    x += (tx - x) * 0.075;
    y += (ty - y) * 0.075;
    scene.style.setProperty('--mx', `${x}px`);
    scene.style.setProperty('--my', `${y}px`);
    const nx = Math.max(-1, Math.min(1, x / Math.max(1, scene.clientWidth * 0.5)));
    const ny = Math.max(-1, Math.min(1, y / Math.max(1, scene.clientHeight * 0.5)));
    scene.style.setProperty('--core-rx', `${(-ny * 3.2).toFixed(2)}deg`);
    scene.style.setProperty('--core-ry', `${(nx * 3.8).toFixed(2)}deg`);
    scene.style.setProperty('--scene-rx', `${(-ny * 1.8).toFixed(2)}deg`);
    scene.style.setProperty('--scene-ry', `${(nx * 2.2).toFixed(2)}deg`);
    scene.style.setProperty('--scene-depth', `${(Math.abs(nx) + Math.abs(ny)) * 5}px`);
    if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) raf = requestAnimationFrame(render);
    else raf = 0;
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
  const move = e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const r = scene.getBoundingClientRect();
    tx = Math.max(-r.width / 2, Math.min(r.width / 2, e.clientX - (r.left + r.width / 2)));
    ty = Math.max(-r.height / 2, Math.min(r.height / 2, e.clientY - (r.top + r.height / 2)));
    schedule();
  };
  const reset = () => { tx = 0; ty = 0; schedule(); };
  scene.addEventListener('pointermove', move, { passive: true });
  scene.addEventListener('pointerleave', reset, { passive: true });
  scene.addEventListener('pointercancel', reset, { passive: true });
  window.addEventListener('pagehide', () => { if (raf) cancelAnimationFrame(raf); raf = 0; }, { once: true });
})();
