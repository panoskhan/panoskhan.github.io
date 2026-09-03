(() => {
  const scene = document.querySelector('.hero3d');
  if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  let tx = 0, ty = 0, x = 0, y = 0;
  const render = () => {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    scene.style.setProperty('--mx', `${x}px`);
    scene.style.setProperty('--my', `${y}px`);
    scene.style.transform = `rotateX(${y * -0.018}deg) rotateY(${x * 0.018}deg)`;
    raf = requestAnimationFrame(render);
  };
  scene.addEventListener('pointermove', e => {
    const r = scene.getBoundingClientRect();
    tx = e.clientX - (r.left + r.width / 2);
    ty = e.clientY - (r.top + r.height / 2);
  }, {passive:true});
  scene.addEventListener('pointerleave', () => { tx = 0; ty = 0; }, {passive:true});
  render();
  window.addEventListener('pagehide', () => cancelAnimationFrame(raf), {once:true});
})();