/**
 * Capability Radar — FINAL PRODUCTION (LOCKED)
 * --------------------------------------------
 * • Pure canvas
 * • Scroll activated
 * • No libraries
 * • GPU safe
 * • Motion-safe
 * • Visibility aware
 * • Lifecycle safe
 */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let INITIALIZED = false;
  let rafId = null;

  function boot() {
    if (INITIALIZED) return;
    INITIALIZED = true;

    const canvas = document.getElementById("capability-radar");
    if (!canvas) return;

    observe(canvas);
  }

  /* Primary trigger */
  window.addEventListener("app:ready", boot);

  /* Safety fallback */
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (!INITIALIZED) boot();
    }, 0);
  });

  function observe(canvas) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          io.unobserve(canvas);
          init(canvas);
        });
      },
      { threshold: 0.45 }
    );
    io.observe(canvas);
  }

  function init(canvas) {
    const ctx = canvas.getContext("2d", { alpha: true });
    let w = 0, h = 0, t = 0;
    let running = true;

    const skills = [
      { label: "Data Analytics", value: 0.9 },
      { label: "Automation", value: 0.8 },
      { label: "Backend Systems", value: 0.7 },
      { label: "Dashboards", value: 0.85 },
      { label: "Optimization", value: 0.75 }
    ];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      w = canvas.width = rect.width * dpr;
      h = canvas.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      if (!running) return;

      ctx.clearRect(0, 0, w, h);

      const cx = canvas.clientWidth / 2;
      const cy = canvas.clientHeight / 2;
      const radius = Math.min(cx, cy) * 0.65;

      /* Grid */
      ctx.strokeStyle = "rgba(255,255,255,.08)";
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      /* Axes */
      skills.forEach((_, i) => {
        const a = (Math.PI * 2 / skills.length) * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + Math.cos(a) * radius,
          cy + Math.sin(a) * radius
        );
        ctx.stroke();
      });

      /* Shape */
      ctx.beginPath();
      skills.forEach((s, i) => {
        const a = (Math.PI * 2 / skills.length) * i - Math.PI / 2;
        const pulse = prefersReducedMotion ? 1 : 0.92 + Math.sin(t) * 0.02;
        const r = radius * s.value * pulse;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });
      ctx.closePath();

      ctx.fillStyle = "rgba(255,255,255,.06)";
      ctx.strokeStyle = "rgba(255,255,255,.85)";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      if (!prefersReducedMotion) {
        t += 0.015;
        rafId = requestAnimationFrame(draw);
      }
    }

    resize();
    draw();

    /* Resize throttling */
    let resizeRAF = null;
    window.addEventListener("resize", () => {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(() => {
        resize();
        resizeRAF = null;
      });
    });

    /* Visibility safety */
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running && !prefersReducedMotion) draw();
      if (!running && rafId) cancelAnimationFrame(rafId);
    });
  }
})();
