/* Panos Khan — lightweight interactive 3D hero controller. */
(function () {
  const scene = document.querySelector('.home-3d-scene');
  if (!scene) return;

  const core = scene.querySelector('.home-3d-core');
  const nodes = [...scene.querySelectorAll('.home-3d-node')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const routes = {
    'Evidence OS': '/evidence-os/',
    Research: '/research/',
    Intelligence: '/intelligence/',
    Projects: '/projects/'
  };

  /* Turn visual nodes into real navigation targets without requiring
     another framework or changing the site's existing routing. */
  nodes.forEach((node) => {
    const label = node.textContent.trim();
    const href = routes[label];
    node.dataset.node = label;
    node.classList.add('pk-3d-node');
    if (href && !node.querySelector('a')) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      link.setAttribute('aria-label', `Open ${label}`);
      node.textContent = '';
      node.appendChild(link);
    }
  });

  scene.removeAttribute('aria-hidden');
  scene.classList.add('is-interactive');
  scene.setAttribute('role', 'region');
  scene.setAttribute('aria-label', 'Interactive Panos Khan technology ecosystem');

  if (reduced || !window.matchMedia('(pointer: fine)').matches) return;

  let raf = 0;
  let tx = 0;
  let ty = 0;
  let x = 0;
  let y = 0;

  function render() {
    raf = 0;
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    scene.style.setProperty('--mx', `${x.toFixed(2)}deg`);
    scene.style.setProperty('--my', `${y.toFixed(2)}deg`);
    if (core) {
      core.style.transform = `translate(-50%,-50%) rotateY(${(x * 0.55).toFixed(2)}deg) rotateX(${(-y * 0.45).toFixed(2)}deg)`;
    }
    nodes.forEach((node, i) => {
      const direction = i % 2 ? 1 : -1;
      node.style.transform = `translate(${(x * direction * 0.7).toFixed(1)}px,${(y * -direction * 0.7).toFixed(1)}px)`;
    });
  }

  function move(event) {
    const rect = scene.getBoundingClientRect();
    tx = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    ty = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    if (!raf) raf = requestAnimationFrame(render);
  }

  function reset() {
    tx = 0;
    ty = 0;
    if (!raf) raf = requestAnimationFrame(render);
  }

  scene.addEventListener('pointermove', move, { passive: true });
  scene.addEventListener('pointerleave', reset, { passive: true });

  /* A restrained particle field gives depth without WebGL or a large runtime. */
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 18; i += 1) {
    const particle = document.createElement('i');
    particle.className = 'home-3d-particle';
    particle.style.left = `${18 + Math.random() * 64}%`;
    particle.style.top = `${55 + Math.random() * 35}%`;
    particle.style.setProperty('--px', `${-80 + Math.random() * 160}px`);
    particle.style.animationDuration = `${4 + Math.random() * 5}s`;
    particle.style.animationDelay = `${-Math.random() * 7}s`;
    fragment.appendChild(particle);
  }
  scene.appendChild(fragment);
})();
