/* PANOS KHAN — MOBILE PLANET STABILITY
   Mobile planets use fixed contact positions. No X/Y orbit drift is applied.
   Desktop keeps its independent 3D/parallax system through CSS and the main scene script.
*/
(() => {
  const scene = document.querySelector('.hero3d');
  if (!scene || !window.matchMedia('(max-width: 600px)').matches) return;
  scene.querySelectorAll('.node').forEach(node => {
    node.style.removeProperty('--orbit-x');
    node.style.removeProperty('--orbit-y');
    node.style.removeProperty('--orbit-scale');
    node.style.removeProperty('--orbit-opacity');
  });
})();
