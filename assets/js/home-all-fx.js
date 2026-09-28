/* ═══════════════════════════════════════════════════════
   Panos Khan — Home All FX (merged bundle)
   home-hero-neural-v1 + home-page-fx + home-section-fx
   3 HTTP requests merged into 1 for speed
   ═══════════════════════════════════════════════════════ */

/* ── PART 1: HERO NEURAL NETWORK ──────────────────────── */
/* Panos Khan — Neural Nexus hero visualisation v1 */
(function () {
  'use strict';

  function init() {
    const scene = document.querySelector('.hero3d');
    if (!scene) return;

    /* ── hide legacy orbital elements ──────────────────────────── */
    scene.querySelectorAll('.orb,.core,.corelabel,.energy-ring,.core-grid,.core-glint,.particle-field,.scene-floor')
      .forEach(el => { el.style.cssText += 'display:none!important'; });

    /* ── canvas setup ───────────────────────────────────────────── */
    const dpr = window.devicePixelRatio || 1;
    const W   = scene.offsetWidth  || 560;
    const H   = scene.offsetHeight || 570;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none';
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    scene.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const CX = W / 2, CY = H / 2;

    /* ── neural network geometry ────────────────────────────────── */
    // layers: [count, z-depth, ring-radius]
    const LAYERS = [
      { n: 4,  z: -190, r: 68  },
      { n: 7,  z: -60,  r: 100 },
      { n: 7,  z:  60,  r: 100 },
      { n: 4,  z:  190, r: 68  }
    ];

    const nodes = [];
    LAYERS.forEach((L, li) => {
      for (let i = 0; i < L.n; i++) {
        const angle = (i / L.n) * Math.PI * 2 + li * 0.42;
        nodes.push({
          id: nodes.length,
          li,
          x: Math.cos(angle) * L.r,
          y: Math.sin(angle) * L.r,
          z: L.z,
          phase: Math.random() * Math.PI * 2,
          freq:  0.6 + Math.random() * 0.8
        });
      }
    });

    /* full connectivity between adjacent layers */
    const edges = [];
    for (let li = 0; li < LAYERS.length - 1; li++) {
      const A = nodes.filter(n => n.li === li);
      const B = nodes.filter(n => n.li === li + 1);
      A.forEach(a => B.forEach(b => {
        edges.push({
          a, b,
          pkts: Math.random() < 0.55
            ? [{ t: Math.random(), spd: 0.0025 + Math.random() * 0.004, rev: Math.random() < 0.3 }]
            : []
        });
      }));
    }

    /* ── 3-D helpers ────────────────────────────────────────────── */
    const D = 520; // perspective distance

    function rotY(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    }
    function rotX(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }
    function proj(p) {
      const sc = D / (D + p.z + 400);
      return { px: CX + p.x * sc, py: CY + p.y * sc, z: p.z, sc };
    }

    /* ── animation state ────────────────────────────────────────── */
    let ry = 0, rx = 0.18, t = 0;
    let last = 0;
    let rafId;

    /* ── colour helpers ─────────────────────────────────────────── */
    function nodeColor(li, alpha) {
      return li === 0 || li === 3
        ? `rgba(0,229,255,${alpha})`
        : `rgba(139,100,255,${alpha})`;
    }
    function pktColor(li) {
      return li < 2 ? 'rgba(0,255,220,1)' : 'rgba(200,150,255,1)';
    }

    /* ── main draw loop ─────────────────────────────────────────── */
    function draw(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      ry += dt * 0.28;
      rx = 0.18 + Math.sin(t * 0.18) * 0.08;

      ctx.clearRect(0, 0, W, H);

      /* project all nodes */
      const pn = nodes.map(n => {
        let p = rotX(rotY(n, ry), rx);
        const out = proj(p);
        return { ...n, ...out };
      });

      /* sort edges back→front */
      const sortedEdges = edges.slice().sort((e1, e2) => {
        const za = pn[e1.a.id].z + pn[e1.b.id].z;
        const zb = pn[e2.a.id].z + pn[e2.b.id].z;
        return za - zb;
      });

      /* ── draw edges ─────────────────────────────────────────── */
      ctx.save();
      sortedEdges.forEach(edge => {
        const pa = pn[edge.a.id], pb = pn[edge.b.id];
        const depth = ((pa.z + pb.z) / 2 + 400) / 800; // 0…1
        const alpha = 0.05 + depth * 0.18;

        const g = ctx.createLinearGradient(pa.px, pa.py, pb.px, pb.py);
        g.addColorStop(0,   `rgba(0,180,255,${alpha})`);
        g.addColorStop(0.5, `rgba(100,80,255,${alpha * 1.4})`);
        g.addColorStop(1,   `rgba(0,220,255,${alpha})`);
        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.lineTo(pb.px, pb.py);
        ctx.strokeStyle = g;
        ctx.lineWidth = 0.9 + depth * 0.6;
        ctx.shadowBlur = 0;
        ctx.stroke();

        /* data packets */
        edge.pkts.forEach(pkt => {
          pkt.t = (pkt.t + pkt.spd) % 1;
          const tt = pkt.rev ? 1 - pkt.t : pkt.t;
          const x  = pa.px + (pb.px - pa.px) * tt;
          const y  = pa.py + (pb.py - pa.py) * tt;
          const pz = pa.z  + (pb.z  - pa.z)  * tt;
          const d2 = (pz + 400) / 800;
          ctx.beginPath();
          ctx.arc(x, y, 2.2 * (0.5 + d2), 0, Math.PI * 2);
          ctx.fillStyle = pktColor(edge.a.li);
          ctx.shadowColor = pktColor(edge.a.li);
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });
      ctx.restore();

      /* ── draw nodes (back→front) ────────────────────────────── */
      pn.slice().sort((a, b) => a.z - b.z).forEach(n => {
        const depth = (n.z + 400) / 800;
        const pulse = (Math.sin(t * n.freq + n.phase) * 0.5 + 0.5);
        const baseR = (n.li === 0 || n.li === 3 ? 5.5 : 4.5) * n.sc;
        const r     = baseR * (0.85 + pulse * 0.3);
        const alpha = 0.35 + depth * 0.65;

        /* outer glow */
        const glow = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, r * 5);
        glow.addColorStop(0, nodeColor(n.li, alpha * 0.35));
        glow.addColorStop(1, nodeColor(n.li, 0));
        ctx.beginPath();
        ctx.arc(n.px, n.py, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        /* core */
        ctx.beginPath();
        ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor(n.li, alpha);
        ctx.shadowColor = nodeColor(n.li, 0.9);
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      /* ── "PK" monogram ──────────────────────────────────────── */
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fs = Math.max(56, Math.min(W * 0.14, 80));
      ctx.font = `900 ${fs}px Inter, -apple-system, sans-serif`;
      ctx.shadowColor = 'rgba(0,229,255,0.9)';
      ctx.shadowBlur = 50;
      ctx.fillStyle = 'rgba(230,250,255,0.96)';
      ctx.fillText('PK', CX, CY);
      ctx.shadowBlur = 22;
      ctx.fillText('PK', CX, CY);
      ctx.restore();

      /* ── background star particles ──────────────────────────── */
      // drawn once if not already done via CSS
      rafId = requestAnimationFrame(draw);
    }

    /* reduced-motion guard */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      /* static snapshot at t=0 */
      last = 0; draw(0);
      cancelAnimationFrame(rafId);
      return;
    }

    last = performance.now();
    rafId = requestAnimationFrame(draw);

    /* responsive resize */
    const ro = new ResizeObserver(() => {
      const nW = scene.offsetWidth, nH = scene.offsetHeight;
      canvas.width  = nW * dpr;
      canvas.height = nH * dpr;
      ctx.scale(dpr, dpr);
    });
    ro.observe(scene);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();
})();


/* ── PART 2: PAGE-WIDE EFFECTS ────────────────────────── */
/* Panos Khan — Homepage FX v1
   9 layered effects: cursor glow · scroll progress · reveal animations ·
   counter roll-up · card 3-D tilt · magnetic buttons · ambient particles ·
   heading shimmer · CTA pulse ring                                          */
(function () {
  'use strict';

  /* ── reduced-motion guard ─────────────────────────────────────────── */
  const NO_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── util: run after DOM is ready ────────────────────────────────── */
  function ready(fn) {
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn, { once: true })
      : fn();
  }

  /* ═══════════════════════════════════════════════════════════════════
     1. SCROLL PROGRESS BAR — thin cyan line across the very top
  ═══════════════════════════════════════════════════════════════════ */
  function initScrollBar() {
    const bar = document.createElement('div');
    bar.id = 'pk-scroll-bar';
    bar.style.cssText = `
      position:fixed;top:0;left:0;height:2px;width:0%;
      background:linear-gradient(90deg,#00e5ff,#8b64ff,#00e5ff);
      background-size:200% 100%;
      z-index:9999;pointer-events:none;
      transition:width .1s linear;
      animation: pk-bar-flow 3s linear infinite;
    `;
    document.head.insertAdjacentHTML('beforeend',
      `<style>@keyframes pk-bar-flow{0%{background-position:0% 50%}100%{background-position:200% 50%}}</style>`
    );
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════════════════════
     2. CURSOR GLOW — soft radial halo that follows mouse
  ═══════════════════════════════════════════════════════════════════ */
  function initCursorGlow() {
    if (window.matchMedia('(pointer:coarse)').matches) return; // skip on touch
    const glow = document.createElement('div');
    glow.id = 'pk-cursor-glow';
    glow.style.cssText = `
      position:fixed;width:340px;height:340px;
      border-radius:50%;pointer-events:none;z-index:9998;
      background:radial-gradient(circle,rgba(0,229,255,.07) 0%,transparent 70%);
      transform:translate(-50%,-50%);
      transition:opacity .4s;opacity:0;
    `;
    document.body.appendChild(glow);
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      glow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    (function raf() {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glow.style.left = gx + 'px';
      glow.style.top  = gy + 'px';
      requestAnimationFrame(raf);
    })();
  }

  /* ═══════════════════════════════════════════════════════════════════
     3. SCROLL REVEAL — elements slide+fade in on first sight
  ═══════════════════════════════════════════════════════════════════ */
  function initScrollReveal() {
    const style = `
      .pk-reveal{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
      .pk-reveal.pk-left{transform:translateX(-50px);}
      .pk-reveal.pk-right{transform:translateX(50px);}
      .pk-reveal.pk-scale{transform:scale(.92);}
      .pk-reveal.pk-visible{opacity:1!important;transform:none!important;}
    `;
    document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);

    /* Tag elements */
    document.querySelectorAll(
      '.section h2, .section h3, .section p.muted, .card, .mapnode, .press-card, .proof-card, .bio-section, .eco'
    ).forEach((el, i) => {
      if (el.closest('.cin-hero')) return; // skip hero
      el.classList.add('pk-reveal');
      if (i % 3 === 1) el.classList.add('pk-left');
      if (i % 3 === 2) el.classList.add('pk-right');
      el.style.transitionDelay = ((i % 4) * 80) + 'ms';
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('pk-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.pk-reveal').forEach(el => io.observe(el));
  }

  /* ═══════════════════════════════════════════════════════════════════
     4. COUNTER ROLL-UP — stats count from 0 to their target value
  ═══════════════════════════════════════════════════════════════════ */
  function initCounters() {
    const statEls = document.querySelectorAll('.stat b, .stat strong');
    if (!statEls.length) return;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function animateCounter(el) {
      const raw = el.textContent.trim();
      const num = parseInt(raw, 10);
      if (isNaN(num)) return;
      const suffix = raw.replace(/[\d]/g, ''); // "+", "%", etc.
      const dur = 1800;
      const start = performance.now();
      function tick(now) {
        const pct = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(easeOut(pct) * num) + suffix;
        if (pct < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => io.observe(el));
  }

  /* ═══════════════════════════════════════════════════════════════════
     5. CARD 3-D TILT — cards tilt on mouse move (desktop only)
  ═══════════════════════════════════════════════════════════════════ */
  function initCardTilt() {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    const CARDS = document.querySelectorAll('.card, .press-card, .proof-card');
    CARDS.forEach(card => {
      card.style.transition = 'transform .15s ease, box-shadow .15s ease';
      card.style.willChange = 'transform';
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`;
        card.style.boxShadow = `${-x * 12}px ${-y * 12}px 32px rgba(0,229,255,.14)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     6. MAGNETIC BUTTONS — CTAs drift slightly toward cursor
  ═══════════════════════════════════════════════════════════════════ */
  function initMagneticButtons() {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    document.querySelectorAll('.cta-btn, .btn-primary, .btn, a[class*="btn"]').forEach(btn => {
      btn.style.transition = 'transform .3s cubic-bezier(.22,1,.36,1)';
      btn.style.display = btn.style.display || 'inline-block';
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2))  * 0.35;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.35;
        btn.style.transform = `translate(${dx}px,${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     7. AMBIENT PARTICLES — subtle floating dots on dark sections
  ═══════════════════════════════════════════════════════════════════ */
  function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'pk-particles';
    canvas.style.cssText = `
      position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.35;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let W, H, pts = [];

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const N = 55;
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .18,
        r: Math.random() * 1.4 + .4,
        alpha: Math.random() * .5 + .15,
        color: Math.random() < .5 ? '0,229,255' : '139,100,255'
      });
    }

    (function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      /* draw connection lines between nearby particles */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,180,255,${.06 * (1 - d/110)})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    })();
  }

  /* ═══════════════════════════════════════════════════════════════════
     8. HEADING SHIMMER — cyan shimmer sweeps across h2 on reveal
  ═══════════════════════════════════════════════════════════════════ */
  function initHeadingShimmer() {
    document.head.insertAdjacentHTML('beforeend', `<style>
      @keyframes pk-shimmer {
        0%   { background-position: -200% center }
        100% { background-position:  200% center }
      }
      .pk-shimmer-active {
        background: linear-gradient(90deg,
          currentColor 20%,
          rgba(0,229,255,.9) 50%,
          currentColor 80%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: pk-shimmer .9s linear 1 forwards;
      }
    </style>`);

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('pk-shimmer-active');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section h2, .section h3').forEach(h => {
      if (!h.closest('.cin-hero')) io.observe(h);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     9. CTA PULSE RING — expanding rings behind the CTA section
  ═══════════════════════════════════════════════════════════════════ */
  function initCtaPulse() {
    const cta = document.querySelector('.section.cta, #contact');
    if (!cta) return;
    cta.style.position = 'relative';
    cta.style.overflow = 'hidden';

    document.head.insertAdjacentHTML('beforeend', `<style>
      @keyframes pk-ring {
        0%  { transform:scale(0);  opacity:.5; }
        100%{ transform:scale(3.5);opacity:0; }
      }
      .pk-ring {
        position:absolute;left:50%;top:50%;
        width:200px;height:200px;
        margin:-100px 0 0 -100px;
        border-radius:50%;
        border:1px solid rgba(0,229,255,.25);
        animation: pk-ring 3.5s cubic-bezier(.2,.8,.3,1) infinite;
        pointer-events:none;
      }
      .pk-ring:nth-child(2){ animation-delay:1.1s; }
      .pk-ring:nth-child(3){ animation-delay:2.2s; }
    </style>`);

    [1,2,3].forEach(() => {
      const ring = document.createElement('div');
      ring.className = 'pk-ring';
      cta.insertBefore(ring, cta.firstChild);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     10. TYPEWRITER GLITCH on hero headline — occasional glitch flicker
  ═══════════════════════════════════════════════════════════════════ */
  function initHeroGlitch() {
    document.head.insertAdjacentHTML('beforeend', `<style>
      @keyframes pk-glitch-clip {
        0%,100%{ clip-path:none; transform:none; }
        92%{ clip-path:polygon(0 15%,100% 15%,100% 30%,0 30%); transform:translate(-3px,0); }
        94%{ clip-path:polygon(0 55%,100% 55%,100% 70%,0 70%); transform:translate(3px,0); color:rgba(0,229,255,.9); }
        96%{ clip-path:none; transform:none; }
      }
      .pk-glitch { animation: pk-glitch-clip 8s step-end infinite; }
    </style>`);
    const h1 = document.querySelector('.cin-hero h1');
    if (h1) h1.classList.add('pk-glitch');
  }

  /* ═══════════════════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════════════════ */
  ready(function () {
    initScrollBar();
    initCursorGlow();
    if (!NO_MOTION) {
      initScrollReveal();
      initCounters();
      initCardTilt();
      initMagneticButtons();
      initParticles();
      initHeadingShimmer();
      initCtaPulse();
      initHeroGlitch();
    }
  });
})();


/* ── PART 3: PER-SECTION EFFECTS ──────────────────────── */
/* Panos Khan — Per-Section FX v1
   Each section gets its own signature surprise:
   Bio → holographic orbital ring + matrix rain
   Ecosystem → live electricity arcs + breathing core
   Capabilities → colored scanline sweep per card
   Projects → terminal-boot character reveal
   Press → levitation float + mouse spotlight
   Proof → laser-scan VERIFIED animation
   Contact → warp-speed star field                    */
(function () {
  'use strict';
  const NO_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOUCH = window.matchMedia('(pointer:coarse)').matches;

  function ready(fn) {
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn, { once: true })
      : fn();
  }

  function onVisible(el, fn, threshold) {
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } });
    }, { threshold: threshold || 0.2 });
    io.observe(el);
  }

  /* ═══════════════════════════════════════════════════════════════════
     BIO — holographic orbital ring + matrix digital rain on avatar
  ═══════════════════════════════════════════════════════════════════ */
  function initBio() {
    const photo = document.querySelector('.bio-photo');
    if (!photo) return;

    /* Spinning holographic border ring */
    photo.style.position = 'relative';
    const css = `
      @keyframes pk-orbit-ring { to { transform: rotate(360deg); } }
      @keyframes pk-orbit-ring2 { to { transform: rotate(-360deg); } }
      .pk-holo-ring {
        position:absolute; inset:-6px; border-radius:50%;
        background: conic-gradient(
          rgba(0,229,255,0) 0deg,
          rgba(0,229,255,.9) 60deg,
          rgba(139,100,255,.9) 120deg,
          rgba(0,229,255,0) 180deg,
          rgba(139,100,255,0) 240deg,
          rgba(0,229,255,.6) 300deg,
          rgba(0,229,255,0) 360deg
        );
        animation: pk-orbit-ring 3s linear infinite;
        mask: radial-gradient(transparent 82%, black 84%);
        -webkit-mask: radial-gradient(transparent 82%, black 84%);
        pointer-events:none; z-index:5;
      }
      .pk-holo-ring2 {
        position:absolute; inset:-14px; border-radius:50%;
        background: conic-gradient(
          rgba(139,100,255,0) 0deg,
          rgba(139,100,255,.5) 90deg,
          rgba(0,229,255,.3) 180deg,
          rgba(139,100,255,0) 270deg
        );
        animation: pk-orbit-ring2 5s linear infinite;
        mask: radial-gradient(transparent 87%, black 89%);
        -webkit-mask: radial-gradient(transparent 87%, black 89%);
        pointer-events:none; z-index:4;
      }
      .pk-avatar-glow {
        position:absolute; inset:0; border-radius:50%;
        background: radial-gradient(circle at center,
          rgba(0,229,255,.15) 0%, transparent 70%);
        pointer-events:none; z-index:3;
        animation: pk-avatar-pulse 2.8s ease-in-out infinite;
      }
      @keyframes pk-avatar-pulse {
        0%,100%{opacity:.5} 50%{opacity:1}
      }
    `;
    document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
    ['pk-holo-ring','pk-holo-ring2','pk-avatar-glow'].forEach(cls => {
      const d = document.createElement('div');
      d.className = cls;
      photo.appendChild(d);
    });

    /* Matrix rain canvas over avatar */
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position:absolute;inset:0;border-radius:50%;z-index:2;
      opacity:0;transition:opacity 1s;pointer-events:none;overflow:hidden;
    `;
    photo.appendChild(canvas);

    onVisible(photo, () => {
      const W = photo.offsetWidth, H = photo.offsetHeight;
      canvas.width = W * 2; canvas.height = H * 2;
      const ctx = canvas.getContext('2d');
      ctx.scale(2, 2);
      canvas.style.opacity = '.45';

      const cols = Math.floor(W / 14);
      const drops = Array.from({ length: cols }, () => -Math.floor(Math.random() * H / 14));
      const CHARS = '01アイウエオカキクケコABCDEFGHIJK';
      let frame = 0;

      (function rain() {
        frame++;
        if (frame % 2 !== 0) { requestAnimationFrame(rain); return; }
        ctx.fillStyle = 'rgba(0,0,0,.05)';
        ctx.fillRect(0, 0, W, H);
        ctx.font = '11px monospace';
        drops.forEach((y, i) => {
          const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
          const x = i * 14;
          ctx.fillStyle = y < 2 ? 'rgba(255,255,255,.9)' : `rgba(0,229,255,${.3 + Math.random() * .4})`;
          ctx.fillText(ch, x, y * 14);
          if (y * 14 > H && Math.random() > 0.975) drops[i] = 0;
          else drops[i]++;
        });
        requestAnimationFrame(rain);
      })();
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     ECOSYSTEM — live electricity arcs along map lines + core pulse
  ═══════════════════════════════════════════════════════════════════ */
  function initEcosystem() {
    const map = document.querySelector('.map');
    const core = document.querySelector('.mapcore');
    if (!map || !core) return;

    /* Core breathing glow */
    const coreGlow = document.createElement('div');
    coreGlow.style.cssText = `
      position:absolute;inset:-20px;border-radius:50%;pointer-events:none;z-index:0;
      background:radial-gradient(circle,rgba(0,229,255,.2) 0%,transparent 70%);
    `;
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes pk-core-breath {
          0%,100%{transform:scale(1);opacity:.6}
          50%{transform:scale(1.35);opacity:1}
        }
        .mapcore{position:relative;z-index:2;}
        .pk-core-glow{animation:pk-core-breath 2.5s ease-in-out infinite;}
        @keyframes pk-arc-dash {
          to { stroke-dashoffset: -200; }
        }
        .pk-arc-svg{position:absolute;inset:0;pointer-events:none;z-index:1;overflow:visible;}
      </style>
    `);
    coreGlow.className = 'pk-core-glow';
    core.style.position = 'relative';
    core.appendChild(coreGlow);

    /* Electricity arcs overlaid on the map SVG */
    onVisible(map, () => {
      const mapRect = map.getBoundingClientRect();
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'pk-arc-svg');
      svg.setAttribute('width', map.offsetWidth);
      svg.setAttribute('height', map.offsetHeight);
      map.style.position = 'relative';
      map.appendChild(svg);

      const nodes = [...map.querySelectorAll('.mapnode')];
      const coreEl = map.querySelector('.mapcore');
      const coreR = coreEl ? coreEl.getBoundingClientRect() : null;
      if (!coreR) return;

      const cx = coreR.left - mapRect.left + coreR.width / 2;
      const cy = coreR.top  - mapRect.top  + coreR.height / 2;

      nodes.forEach((node, i) => {
        const nr = node.getBoundingClientRect();
        const nx = nr.left - mapRect.left + nr.width / 2;
        const ny = nr.top  - mapRect.top  + nr.height / 2;

        /* zigzag lightning path */
        const pts = [];
        const steps = 6;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const bx = cx + (nx - cx) * t;
          const by = cy + (ny - cy) * t;
          const jitter = (s === 0 || s === steps) ? 0 : (Math.random() - .5) * 18;
          const angle = Math.atan2(ny - cy, nx - cx) + Math.PI / 2;
          pts.push([bx + Math.cos(angle) * jitter, by + Math.sin(angle) * jitter]);
        }
        const d = 'M ' + pts.map(p => p.join(',')).join(' L ');

        const color = i % 2 === 0 ? '0,229,255' : '139,100,255';
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('stroke', `rgba(${color},.7)`);
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '8 4');
        path.setAttribute('stroke-dashoffset', '0');
        path.style.animation = `pk-arc-dash ${1.2 + i * .3}s linear infinite`;
        path.style.filter = `drop-shadow(0 0 4px rgba(${color},1))`;
        svg.appendChild(path);

        /* Occasional flash */
        setInterval(() => {
          path.style.opacity = Math.random() > .85 ? '0' : '1';
        }, 150 + i * 80);
      });
    }, 0.1);
  }

  /* ═══════════════════════════════════════════════════════════════════
     CAPABILITIES — colored scanline sweep on each card
  ═══════════════════════════════════════════════════════════════════ */
  function initCapabilities() {
    const COLORS = [
      'rgba(0,229,255,1)', 'rgba(139,100,255,1)', 'rgba(0,255,180,1)',
      'rgba(255,100,200,1)', 'rgba(255,200,0,1)'
    ];
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes pk-scan { 0%{top:-10%} 100%{top:110%} }
        .pk-scancard { position:relative; overflow:hidden; }
        .pk-scanline {
          position:absolute;left:0;right:0;height:3px;z-index:10;
          pointer-events:none;opacity:0;
          filter:blur(1px);
        }
        .pk-scancard:hover .pk-scanline { animation:pk-scan .7s linear 1; opacity:1; }
        .pk-scancard::before {
          content:'';position:absolute;inset:0;border-radius:inherit;
          background:linear-gradient(135deg,transparent 0%,rgba(255,255,255,.03) 100%);
          transition:opacity .3s;opacity:0;z-index:1;
        }
        .pk-scancard:hover::before { opacity:1; }
      </style>
    `);

    document.querySelectorAll('.card').forEach((card, i) => {
      card.classList.add('pk-scancard');
      const line = document.createElement('div');
      line.className = 'pk-scanline';
      const color = COLORS[i % COLORS.length];
      line.style.background = `linear-gradient(90deg,transparent,${color},transparent)`;
      line.style.boxShadow = `0 0 12px ${color}, 0 0 24px ${color}`;
      card.appendChild(line);

      /* Corner accent */
      const corner = document.createElement('div');
      corner.style.cssText = `
        position:absolute;top:0;right:0;width:40px;height:40px;
        background:linear-gradient(225deg,${color.replace('1)','0.15)')},transparent 60%);
        border-radius:0 inherit 0 0;pointer-events:none;z-index:2;
        transition:opacity .3s;
      `;
      card.appendChild(corner);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     PROJECTS — terminal boot-up character reveal
  ═══════════════════════════════════════════════════════════════════ */
  function initProjects() {
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes pk-cursor-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .pk-terminal-cursor {
          display:inline-block;width:8px;height:1em;
          background:rgba(0,229,255,.9);
          animation:pk-cursor-blink .6s step-end infinite;
          vertical-align:text-bottom;margin-left:2px;
        }
        .article.project, article.project {
          position:relative;overflow:hidden;
        }
        .pk-proj-boot::before {
          content:'> LOADING...';
          position:absolute;inset:0;z-index:20;
          background: rgba(0,5,15,.95);
          color:rgba(0,229,255,.9);
          font-family:monospace;font-size:12px;
          display:flex;align-items:center;justify-content:center;
          letter-spacing:.08em;
          transition:opacity .6s;
        }
        .pk-proj-boot.pk-proj-done::before { opacity:0; pointer-events:none; }
      </style>
    `);

    document.querySelectorAll('article.project, .project-card').forEach((proj, idx) => {
      proj.style.position = 'relative';
      proj.style.overflow = 'hidden';

      /* Boot overlay */
      const boot = document.createElement('div');
      boot.style.cssText = `
        position:absolute;inset:0;z-index:20;
        background:rgba(0,5,15,.96);
        display:flex;flex-direction:column;align-items:flex-start;
        justify-content:center;padding:20px;
        font-family:monospace;font-size:11px;color:rgba(0,229,255,.85);
        letter-spacing:.06em;line-height:1.8;
        transition:opacity .8s .3s;
      `;
      const lines = [
        `> INIT PROJECT_${String(idx + 1).padStart(2,'0')}`,
        `> CHECKING DEPENDENCIES...`,
        `> STATUS: DEPLOYED ✓`,
        `> RENDERING...`
      ];
      boot.innerHTML = lines.map(l => `<div>${l}</div>`).join('');
      proj.appendChild(boot);

      onVisible(proj, el => {
        let delay = idx * 180;
        lines.forEach((_, li) => {
          setTimeout(() => {
            if (boot.children[li]) {
              boot.children[li].style.color = li === lines.length - 1
                ? 'rgba(0,255,180,.9)' : 'rgba(0,229,255,.85)';
            }
          }, delay + li * 220);
        });
        setTimeout(() => {
          boot.style.opacity = '0';
          setTimeout(() => boot.remove(), 900);
        }, delay + lines.length * 220 + 400);
      }, 0.15);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     PRESS — levitation float + mouse-tracked spotlight
  ═══════════════════════════════════════════════════════════════════ */
  function initPress() {
    const section = document.querySelector('#press, .press-section');
    if (!section) return;

    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes pk-float-0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pk-float-1 { 0%,100%{transform:translateY(-4px)} 50%{transform:translateY(6px)} }
        @keyframes pk-float-2 { 0%,100%{transform:translateY(-6px)} 50%{transform:translateY(2px)} }
        @keyframes pk-float-3 { 0%,100%{transform:translateY(2px)} 50%{transform:translateY(-10px)} }
        .pk-float-card { will-change:transform; }
      </style>
    `);

    const cards = [...section.querySelectorAll('.press-card')];
    cards.forEach((card, i) => {
      card.classList.add('pk-float-card');
      card.style.animation = `pk-float-${i % 4} ${2.8 + i * .4}s ease-in-out infinite`;
    });

    /* Spotlight beam */
    if (!TOUCH) {
      const spot = document.createElement('div');
      spot.style.cssText = `
        position:absolute;width:300px;height:300px;border-radius:50%;
        background:radial-gradient(circle,rgba(0,229,255,.08) 0%,transparent 70%);
        pointer-events:none;z-index:0;
        transform:translate(-50%,-50%);transition:left .12s,top .12s;
        mix-blend-mode:screen;
      `;
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      section.appendChild(spot);

      section.addEventListener('mousemove', e => {
        const r = section.getBoundingClientRect();
        spot.style.left = (e.clientX - r.left) + 'px';
        spot.style.top  = (e.clientY - r.top)  + 'px';
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════════
     PROOF — horizontal laser scan + VERIFIED badge per item
  ═══════════════════════════════════════════════════════════════════ */
  function initProof() {
    const section = document.querySelector('#proof, .proof');
    if (!section) return;

    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes pk-laser-sweep {
          0%  { top:-2px; opacity:1; }
          85% { opacity:1; }
          100%{ top:102%; opacity:0; }
        }
        .pk-proof-wrap { position:relative; overflow:hidden; }
        .pk-laser {
          position:absolute;left:0;right:0;height:2px;z-index:10;
          background:linear-gradient(90deg,transparent,rgba(0,255,120,.9),rgba(0,255,200,1),rgba(0,255,120,.9),transparent);
          box-shadow:0 0 8px rgba(0,255,180,.8),0 0 20px rgba(0,255,180,.4);
          pointer-events:none;opacity:0;
        }
        .pk-laser.pk-scanning { animation:pk-laser-sweep .7s linear 1; }
        .pk-verified {
          position:absolute;top:8px;right:8px;
          font-size:9px;font-family:monospace;letter-spacing:.12em;
          color:rgba(0,255,150,.9);
          border:1px solid rgba(0,255,150,.4);
          padding:2px 6px;border-radius:3px;
          background:rgba(0,255,150,.07);
          opacity:0;transform:scale(.8);
          transition:opacity .3s,transform .3s;
          pointer-events:none;
        }
        .pk-verified.pk-show { opacity:1;transform:scale(1); }
      </style>
    `);

    section.querySelectorAll('.proofitem, .proof-card').forEach((item, i) => {
      item.classList.add('pk-proof-wrap');
      const laser = document.createElement('div');
      laser.className = 'pk-laser';
      const badge = document.createElement('div');
      badge.className = 'pk-verified';
      badge.textContent = '✓ VERIFIED';
      item.appendChild(laser);
      item.appendChild(badge);

      onVisible(item, el => {
        setTimeout(() => {
          laser.classList.add('pk-scanning');
          setTimeout(() => {
            badge.classList.add('pk-show');
            laser.classList.remove('pk-scanning');
          }, 750);
        }, i * 220);
      }, 0.3);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     CONTACT — warp-speed star field streaking from center
  ═══════════════════════════════════════════════════════════════════ */
  function initContact() {
    const section = document.querySelector('#contact, .section.cta');
    if (!section) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position:absolute;inset:0;pointer-events:none;z-index:0;opacity:0;
      transition:opacity 1.2s;
    `;
    section.style.position = 'relative';
    section.style.overflow = 'hidden';
    section.insertBefore(canvas, section.firstChild);

    onVisible(section, () => {
      canvas.style.opacity = '1';
      const W = section.offsetWidth, H = section.offsetHeight;
      canvas.width  = W * 2; canvas.height = H * 2;
      const ctx = canvas.getContext('2d');
      ctx.scale(2, 2);

      const CX = W / 2, CY = H / 2;
      const N = 120;
      const stars = Array.from({ length: N }, () => ({
        x: (Math.random() - .5) * W,
        y: (Math.random() - .5) * H,
        z: Math.random() * W,
        pz: 0
      }));

      let speed = 1;
      let t = 0;

      onVisible(section, () => { speed = 8; }, 0.5);

      (function warp() {
        t++;
        speed = Math.min(speed + .04, 12);
        ctx.fillStyle = 'rgba(0,5,18,.22)';
        ctx.fillRect(0, 0, W, H);

        stars.forEach(s => {
          s.pz = s.z;
          s.z -= speed;
          if (s.z <= 0) {
            s.x  = (Math.random() - .5) * W;
            s.y  = (Math.random() - .5) * H;
            s.z  = W;
            s.pz = s.z;
          }
          const sx  = (s.x / s.z)  * W + CX;
          const sy  = (s.y / s.z)  * H + CY;
          const spx = (s.x / s.pz) * W + CX;
          const spy = (s.y / s.pz) * H + CY;
          const size = Math.max(.3, (1 - s.z / W) * 2.5);
          const alpha = Math.min(1, (1 - s.z / W) * 1.5);
          const hue = s.x > 0 ? '0,200,255' : '139,100,255';
          ctx.beginPath();
          ctx.moveTo(spx, spy);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(${hue},${alpha})`;
          ctx.lineWidth = size;
          ctx.stroke();
        });
        requestAnimationFrame(warp);
      })();
    }, 0.1);
  }

  /* ═══════════════════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════════════════ */
  ready(function () {
    if (NO_MOTION) return;
    initBio();
    initEcosystem();
    initCapabilities();
    initProjects();
    initPress();
    initProof();
    initContact();
  });
})();
