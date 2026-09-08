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

  // Independent label layer. This removes the remaining dependency on the
  // legacy node text box/overflow rules while keeping the approved geometry.
  const labelData = {
    n1: ['RESEARCH', 'Research & Innovation', 'below'],
    n2: ['EVIDENCE OS', 'Evidence Network', 'right'],
    n3: ['PROJECTS', 'Real World Impact', 'left'],
    n4: ['AI TOOLS', 'Intelligence Layer', 'right'],
    n5: ['PLATFORM', 'Scalable Systems', 'left']
  };
  const ensureLabels = () => {
    Object.entries(labelData).forEach(([name, data]) => {
      const node = scene.querySelector(`.${name}`);
      if (!node) return;
      node.querySelectorAll(':scope > b, :scope > small').forEach(el => el.style.setProperty('display', 'none', 'important'));
      let label = scene.querySelector(`.pk-scene-label[data-node="${name}"]`);
      if (!label) {
        label = document.createElement('div');
        label.className = 'pk-scene-label';
        label.dataset.node = name;
        label.innerHTML = '<b></b><small></small>';
        scene.appendChild(label);
      }
      label.querySelector('b').textContent = data[0];
      label.querySelector('small').textContent = data[1];
      label.style.cssText = 'position:absolute!important;display:block!important;visibility:visible!important;opacity:1!important;z-index:100!important;pointer-events:none!important;font-family:inherit!important;line-height:1.2!important;';
      label.querySelector('b').style.cssText = 'display:block!important;color:#f4fbff!important;font-size:8px!important;font-weight:700!important;letter-spacing:.12em!important;white-space:nowrap!important;text-shadow:0 0 10px rgba(100,230,255,.8),0 2px 8px rgba(0,0,0,.9)!important;';
      label.querySelector('small').style.cssText = 'display:block!important;color:#b9cbe2!important;font-size:6px!important;font-weight:500!important;letter-spacing:.04em!important;white-space:nowrap!important;margin-top:5px!important;text-shadow:0 1px 7px rgba(0,0,0,.95)!important;';
    });
  };
  const positionLabels = () => {
    const sr = scene.getBoundingClientRect();
    Object.entries(labelData).forEach(([name, data]) => {
      const node = scene.querySelector(`.${name}`);
      const label = scene.querySelector(`.pk-scene-label[data-node="${name}"]`);
      if (!node || !label) return;
      const nr = node.getBoundingClientRect();
      if (data[2] === 'below') {
        label.style.left = `${nr.left - sr.left + nr.width / 2}px`;
        label.style.top = `${nr.bottom - sr.top + 9}px`;
        label.style.transform = 'translateX(-50%)';
        label.style.textAlign = 'center';
      } else if (data[2] === 'right') {
        label.style.left = `${nr.right - sr.left + 10}px`;
        label.style.top = `${nr.top - sr.top + nr.height * .34}px`;
        label.style.transform = 'none';
        label.style.textAlign = 'left';
      } else {
        label.style.left = `${nr.left - sr.left - 10}px`;
        label.style.top = `${nr.top - sr.top + nr.height * .34}px`;
        label.style.transform = 'translateX(-100%)';
        label.style.textAlign = 'right';
      }
    });
  };
  ensureLabels();
  requestAnimationFrame(() => requestAnimationFrame(positionLabels));
  window.addEventListener('resize', () => requestAnimationFrame(positionLabels), { passive: true });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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