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
