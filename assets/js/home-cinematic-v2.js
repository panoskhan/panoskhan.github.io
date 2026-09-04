(() => {
  const scene = document.querySelector('.hero3d');
  if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Ambient particles give the intelligence core a real spatial volume without a library.
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

  // Each planet receives its own depth channel for subtle parallax.
  const nodeDepths = { n1: 0.16, n2: 0.28, n3: 0.20, n4: 0.24, n5: 0.18 };
  Object.entries(nodeDepths).forEach(([name, depth]) => {
    const node = scene.querySelector(`.${name}`);
    if (node) node.style.setProperty('--depth', depth);
  });

  // V15 is the approved planetary reference layer.
  if (!document.querySelector('link[data-pk-planet-spectrum]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/home-planet-spectrum-v15.css';
    link.dataset.pkPlanetSpectrum = 'true';
    document.head.appendChild(link);
  }

  let raf = 0;
  let tx = 0, ty = 0, x = 0, y = 0;

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
    raf = requestAnimationFrame(render);
  };

  const move = (e) => {
    const r = scene.getBoundingClientRect();
    tx = Math.max(-r.width / 2, Math.min(r.width / 2, e.clientX - (r.left + r.width / 2)));
    ty = Math.max(-r.height / 2, Math.min(r.height / 2, e.clientY - (r.top + r.height / 2)));
  };
  const reset = () => { tx = 0; ty = 0; };

  scene.addEventListener('pointermove', move, { passive: true });
  scene.addEventListener('pointerleave', reset, { passive: true });
  scene.addEventListener('pointercancel', reset, { passive: true });

  render();
  window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
})();
