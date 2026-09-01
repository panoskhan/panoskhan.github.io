/* Lightweight pointer motion; no external library and disabled for reduced motion/touch-heavy devices. */
(() => {
  const core = document.querySelector('.home3d-core');
  if (!core || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const finePointer = window.matchMedia('(pointer: fine)');
  if (!finePointer.matches) return;
  let raf = 0;
  let tx = 0, ty = 0, cx = 0, cy = 0;
  const render = () => {
    cx += (tx - cx) * .08;
    cy += (ty - cy) * .08;
    core.style.transform = `rotateX(${cy * -7}deg) rotateY(${cx * 9}deg)`;
    raf = requestAnimationFrame(render);
  };
  window.addEventListener('pointermove', e => {
    tx = (e.clientX / window.innerWidth - .5) * 2;
    ty = (e.clientY / window.innerHeight - .5) * 2;
    if (!raf) raf = requestAnimationFrame(render);
  }, {passive:true});
  window.addEventListener('pointerleave', () => { tx = 0; ty = 0; }, {passive:true});
})();