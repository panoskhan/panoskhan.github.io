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
    raf = requestAnimationFrame(render);
  };

  const move = (e) => {
    const r = scene.getBoundingClientRect();
    tx = Math.max(-r.width / 2, Math.min(r.width / 2, e.clientX - (r.left + r.width / 2)));
    ty = Math.max(-r.height / 2, Math.min(r.height / 2, e.clientY - (r.top + r.height / 2)));
  };

  scene.addEventListener('pointermove', move, { passive: true });
  scene.addEventListener('pointerleave', () => { tx = 0; ty = 0; }, { passive: true });

  render();
  window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
})();