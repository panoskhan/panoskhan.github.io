/* PANOS KHAN — MOBILE PLANET STABILITY
   V18 locks the five planets to their approved contact positions.
   Desktop keeps its 3D/parallax motion; mobile uses only a subtle optical pulse
   so the planets never drift away from their anchors. */
(() => {
  const scene = document.querySelector('.hero3d');
  if (!scene || !window.matchMedia('(max-width: 600px)').matches) return;

  const nodes = [...scene.querySelectorAll('.node')];
  if (nodes.length !== 5) return;

  // Position is controlled exclusively by V18's left/top/bottom anchors.
  // Do not inject x/y translation variables on mobile.
  nodes.forEach(node => {
    node.style.setProperty('--orbit-x', '0px');
    node.style.setProperty('--orbit-y', '0px');
    node.style.setProperty('--orbit-scale', '1');
    node.style.setProperty('--orbit-opacity', '1');
  });
})();
