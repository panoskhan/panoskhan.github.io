(() => {
  const scene = document.querySelector('.hero3d');
  if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
