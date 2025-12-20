/**
 * GitHub Contribution Constellation — FINAL PRODUCTION (LOCKED)
 * ------------------------------------------------------------
 * • Visual-first (not a GitHub clone)
 * • Real data, abstracted
 * • GPU-safe
 * • Scroll-activated
 * • Motion-respectful
 * • Visibility-safe
 * • Lifecycle-safe
 */

(() => {
  "use strict";

  const USERNAME = "alsopranab";
  const HOST_ID = "github-constellation";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let INITIALIZED = false;
  let rafId = null;

  function boot() {
    if (INITIALIZED) return;
    INITIALIZED = true;

    const host = document.getElementById(HOST_ID);
    if (!host) return;

    observe(host);
  }

  /* Primary trigger */
  window.addEventListener("app:ready", boot);

  /* Safety fallback */
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (!INITIALIZED) boot();
    }, 0);
  });

  function observe(el) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          io.unobserve(el);
          init(el);
        });
      },
      { threshold: 0.45 }
    );
    io.observe(el);
  }

  async function init(host) {
    host.innerHTML = `
      <div class="constellation-shell" data-hover>
        <header class="constellation-header">
          <h3>Contribution Constellation</h3>
          <span>Engineering over time</span>
        </header>
        <canvas class="constellation-canvas"></canvas>
      </div>
    `;

    const canvas = host.querySelector("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });

    const rings = await getActiveYears();
    drawConstellation(canvas, ctx, rings);
  }

  async function getActiveYears() {
    try {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), 4000);

      const r = await fetch(
        `https://api.github.com/users/${USERNAME}`,
        { signal: ctrl.signal }
      );

      if (!r.ok) return 3;

      const p = await r.json();
      return Math.max(
        2,
        new Date().getFullYear() -
          new Date(p.created_at).getFullYear()
      );
    } catch {
      return 3;
    }
  }

  function drawConstellation(canvas, ctx, rings) {
    let w = 0, h = 0, t = 0;
    let running = true;
    let scrollY = window.scrollY;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      w = canvas.width = rect.width * dpr;
      h = canvas.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    let resizeRAF = null;
    window.addEventListener("resize", () => {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(() => {
        resize();
        resizeRAF = null;
      });
    });

    window.addEventListener(
      "scroll",
      () => (scrollY = window.scrollY),
      { passive: true }
    );

    function frame() {
      if (!running) return;

      ctx.clearRect(0, 0, w, h);

      const cx = canvas.clientWidth / 2;
      const cy = canvas.clientHeight / 2 + scrollY * 0.02;

      /* Orbits */
      for (let i = rings; i >= 1; i--) {
        const radius = i * 36;
        ctx.beginPath();

        for (let a = 0; a <= Math.PI * 2; a += 0.035) {
          const distortion =
            Math.sin(a * 5 + t * 0.6 + i) * 2.2;

          const x = cx + Math.cos(a) * (radius + distortion);
          const y = cy + Math.sin(a) * (radius + distortion);

          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255,255,255,${0.04 + i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* Core glow */
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 24);
      glow.addColorStop(0, "rgba(255,255,255,.9)");
      glow.addColorStop(0.4, "rgba(255,255,255,.35)");
      glow.addColorStop(1, "rgba(255,255,255,0)");

      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      if (!prefersReducedMotion) {
        t += 0.0035;
        rafId = requestAnimationFrame(frame);
      }
    }

    frame();

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running && !prefersReducedMotion) frame();
      if (!running && rafId) cancelAnimationFrame(rafId);
    });
  }
})();
