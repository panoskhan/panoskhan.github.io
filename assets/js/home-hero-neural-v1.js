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
