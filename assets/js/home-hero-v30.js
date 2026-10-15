/* Hero v30.2 — 3D orbiting nodes + electric storm connections */
(() => {
  const vis = document.querySelector('.pkh-vis');
  if (!vis) return;
  const stage = vis.querySelector('.pkh-stage');
  const svg = vis.querySelector('.pkh-bolts');
  const core = vis.querySelector('.pkh-core');
  const flash = vis.querySelector('.pkh-flash');
  const nodes = [...vis.querySelectorAll('.pkh-node')];
  const colors = nodes.map(n => n.style.getPropertyValue('--c').trim() || '#38bdf8');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const C = { x: 50, y: 50 };
  const TILT = Math.cos(66 * Math.PI / 180); // matches ring rotateX(66deg)
  const RX = 44, RY = 44 * TILT * 1.15;      // orbit radii in %
  const pts = nodes.map(() => ({ x: 50, y: 50, front: true }));
  const base = nodes.map((_, i) => -Math.PI / 2 + i * (2 * Math.PI / nodes.length));
  let angle = 0, hovering = false;

  // sparks
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('i');
    s.className = 'pkh-spark';
    s.style.left = (15 + Math.random() * 70) + '%';
    s.style.setProperty('--d', (3.5 + Math.random() * 4) + 's');
    s.style.setProperty('--dl', (-Math.random() * 7) + 's');
    stage.appendChild(s);
  }

  function place() {
    nodes.forEach((n, i) => {
      const a = base[i] + angle;
      const depth = Math.sin(a); // -1 back … +1 front
      const p = pts[i];
      p.x = C.x + Math.cos(a) * RX;
      p.y = C.y + depth * RY;
      p.front = depth > -0.15;
      n.style.left = p.x + '%';
      n.style.top = p.y + '%';
      n.style.setProperty('--s', (0.78 + (depth + 1) * 0.17).toFixed(3));
      n.style.setProperty('--o', (0.55 + (depth + 1) * 0.225).toFixed(3));
      n.style.zIndex = p.front ? 6 : 2;
    });
  }
  place();
  if (reduce) return;

  let last = performance.now();
  (function loop(t) {
    const dt = Math.min(50, t - last); last = t;
    if (!hovering) angle += dt * 0.00012;
    place();
    requestAnimationFrame(loop);
  })(last);

  function bolt(a, b, rough = 14, depth = 6) {
    let seg = [[a.x, a.y], [b.x, b.y]], off = rough;
    for (let d = 0; d < depth; d++) {
      const next = [seg[0]];
      for (let i = 0; i < seg.length - 1; i++) {
        const [x1, y1] = seg[i], [x2, y2] = seg[i + 1];
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1, o = (Math.random() - .5) * off;
        next.push([(x1 + x2) / 2 - dy / len * o, (y1 + y2) / 2 + dx / len * o], seg[i + 1]);
      }
      seg = next; off /= 2;
    }
    return 'M' + seg.map(p => p[0].toFixed(2) + ' ' + p[1].toFixed(2)).join('L');
  }
  function mk(cls, color) { const p = document.createElementNS(NS, 'path'); p.setAttribute('class', cls); color && p.setAttribute('stroke', color); return p; }
  function strike(getA, getB, color, nodeEl) {
    const g = document.createElementNS(NS, 'g');
    const glow = mk('b-glow', color), cr = mk('b-core'), br = mk('b-glow', color);
    br.style.opacity = .35;
    g.append(glow, cr, br); svg.appendChild(g);
    nodeEl && nodeEl.classList.add('pkh-hit');
    let n = 0;
    const draw = () => {
      const a = getA(), b = getB(), d = bolt(a, b);
      glow.setAttribute('d', d); cr.setAttribute('d', d);
      const t = .3 + Math.random() * .4, m = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      br.setAttribute('d', Math.random() < .6 ? bolt(m, { x: m.x + (Math.random() - .5) * 20, y: m.y + (Math.random() - .5) * 20 }, 5, 4) : '');
      g.style.opacity = Math.random() < .3 ? .3 : 1;
    };
    draw();
    const iv = setInterval(() => { draw(); if (++n > 5) { clearInterval(iv); g.remove(); nodeEl && nodeEl.classList.remove('pkh-hit'); } }, 55);
  }
  const ring = [0, 1, 2, 3, 4];
  function hit(i) { strike(() => C, () => pts[i], colors[i], nodes[i]); }
  function storm() {
    const front = ring.filter(i => pts[i].front);
    const pool = front.length ? front : ring;
    const i = pool[Math.floor(Math.random() * pool.length)];
    hit(i);
    if (Math.random() < .5) { const j = (i + (Math.random() < .5 ? 1 : 4)) % 5; setTimeout(() => strike(() => pts[i], () => pts[j], colors[j], nodes[j]), 120); }
    if (Math.random() < .35) { const k = pool[Math.floor(Math.random() * pool.length)]; setTimeout(() => hit(k), 90); }
    core.classList.add('zap'); flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on');
    setTimeout(() => core.classList.remove('zap'), 180);
    setTimeout(storm, 500 + Math.random() * 1100);
  }
  let running = false;
  new IntersectionObserver(es => { if (es[0].isIntersecting && !running) { running = true; storm(); } }).observe(vis);
  nodes.forEach((n, i) => {
    n.addEventListener('mouseenter', () => { hovering = true; hit(i); });
    n.addEventListener('mouseleave', () => { hovering = false; });
  });

  if (matchMedia('(pointer:fine)').matches) {
    const hero = vis.closest('.pkh') || vis;
    hero.addEventListener('pointermove', e => {
      const r = vis.getBoundingClientRect();
      const x = Math.max(-.6, Math.min(.6, (e.clientX - r.left) / r.width - .5));
      const y = Math.max(-.6, Math.min(.6, (e.clientY - r.top) / r.height - .5));
      stage.style.setProperty('--ry', (x * 18).toFixed(2) + 'deg');
      stage.style.setProperty('--rx', (-y * 14).toFixed(2) + 'deg');
    });
    hero.addEventListener('pointerleave', () => { stage.style.removeProperty('--ry'); stage.style.removeProperty('--rx'); });
  }
})();
