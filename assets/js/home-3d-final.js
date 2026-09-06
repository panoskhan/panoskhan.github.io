/* Panos Khan — lightweight interactive 3D hero controller. */
(function () {
  const scene = document.querySelector('.home-3d-scene');
  if (!scene) return;

  /* V20 mobile composition correction: keep the complete ecosystem visible
     as one compact orbital unit, matching the approved reference layout. */
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = `
    @media (max-width:700px){
      .hero{position:relative;overflow:visible!important}
      .hero-inner{display:flex!important;flex-direction:column!important;min-height:0!important}
      .home-3d-scene{position:relative!important;order:-1!important;inset:auto!important;width:100%!important;height:520px!important;min-height:520px!important;margin:0!important;border-radius:0 0 30px 30px!important;overflow:hidden!important}
      .home-3d-orbit{left:50%!important;top:49%!important;width:92%!important;height:42%!important;margin:-21% 0 0 -46%!important}
      .home-3d-orbit:nth-child(2){width:72%!important;height:34%!important;margin:-17% 0 0 -36%!important}
      .home-3d-orbit:nth-child(3){width:58%!important;height:27%!important;margin:-13.5% 0 0 -29%!important}
      .home-3d-core{left:50%!important;top:51%!important;width:128px!important;height:128px!important;z-index:4!important}
      .home-3d-monogram{font-size:2.85rem!important}
      .home-3d-label{left:50%!important;top:calc(51% + 91px)!important;font-size:.52rem!important;letter-spacing:.16em!important;z-index:6!important}
      .home-3d-node{width:98px!important;height:98px!important;min-height:98px!important;padding:8px!important;gap:4px!important;font-size:.62rem!important;line-height:1.05!important;letter-spacing:.10em!important;z-index:7!important}
      .home-3d-node:before{width:24px!important;height:24px!important;font-size:.78rem!important;margin:0!important}
      .home-3d-node:after{font-size:.45rem!important;line-height:1.15!important;max-width:82px!important}
      .home-3d-node:nth-of-type(5){left:50%!important;top:12%!important}
      .home-3d-node:nth-of-type(6){left:14%!important;top:41%!important}
      .home-3d-node:nth-of-type(7){left:86%!important;top:41%!important}
      .home-3d-node:nth-of-type(8){left:22%!important;top:74%!important}
      .home-3d-node:nth-of-type(9){left:78%!important;top:74%!important}
      .home-3d-copy{display:none!important}
      .home-3d-particle{display:none!important}
      .hero-content{position:relative!important;z-index:10!important;padding-top:32px!important}
      .hero .kicker{margin-top:0!important}
      .hero h1{font-size:clamp(2.35rem,11vw,3.35rem)!important;line-height:1.04!important}
    }
    @media (max-width:390px){
      .home-3d-scene{height:500px!important;min-height:500px!important}
      .home-3d-node{width:92px!important;height:92px!important;min-height:92px!important}
      .home-3d-core{width:120px!important;height:120px!important}
      .home-3d-label{top:calc(51% + 86px)!important}
      .home-3d-node:nth-of-type(6){left:13%!important}.home-3d-node:nth-of-type(7){left:87%!important}
      .home-3d-node:nth-of-type(8){left:21%!important}.home-3d-node:nth-of-type(9){left:79%!important}
    }
  `;
  document.head.appendChild(mobileStyle);

  const core = scene.querySelector('.home-3d-core');
  const nodes = [...scene.querySelectorAll('.home-3d-node')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const routes = {
    'Evidence OS': '/evidence-os/',
    Research: '/research/',
    Intelligence: '/intelligence/',
    Projects: '/projects/'
  };

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
