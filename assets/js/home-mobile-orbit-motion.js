/* PANOS KHAN — MOBILE ORBIT MOTION
   Lightweight CSS-variable animation for the five existing 3D nodes.
   Keeps the scene responsive and leaves reduced-motion users static.
*/
(() => {
  const scene = document.querySelector('.hero3d');
  if (!scene || !window.matchMedia('(max-width: 600px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const nodes = [...scene.querySelectorAll('.node')];
  if (nodes.length !== 5) return;

  const tracks = [
    { node:nodes[0], radius:7, duration:18000, phase:0 },
    { node:nodes[1], radius:5, duration:22000, phase:0.2 },
    { node:nodes[2], radius:6, duration:20000, phase:0.42 },
    { node:nodes[3], radius:5, duration:24000, phase:0.64 },
    { node:nodes[4], radius:7, duration:21000, phase:0.82 }
  ];
  const start = performance.now();

  const frame = now => {
    const t = now - start;
    tracks.forEach((item, i) => {
      const a = t / item.duration * Math.PI * 2 + item.phase * Math.PI * 2;
      const x = Math.cos(a) * item.radius;
      const y = Math.sin(a) * item.radius * 0.42;
      const z = Math.sin(a) * 0.5 + 0.5;
      item.node.style.setProperty('--orbit-x', `${x.toFixed(2)}px`);
      item.node.style.setProperty('--orbit-y', `${y.toFixed(2)}px`);
      item.node.style.setProperty('--orbit-scale', (0.985 + z * 0.03).toFixed(3));
      item.node.style.setProperty('--orbit-opacity', (0.92 + z * 0.08).toFixed(2));
    });
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
})();
