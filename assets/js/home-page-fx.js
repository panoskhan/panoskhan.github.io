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
