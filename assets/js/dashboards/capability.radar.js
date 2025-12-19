/**
 * Capability Radar — FINAL PRODUCTION
 * ----------------------------------
 * • Pure canvas
 * • Scroll activated
 * • No libraries
 * • GPU safe
 * • Motion-safe
 */

(() => {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("app:ready", () => {
    const canvas = document.getElementById("capability-radar");
    if (!canvas) return;

    observe(canvas);
  });

  function observe(canvas) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          io.disconnect();
          init(canvas);
        });
      },
      { threshold: 0.45 }
    );
    io.observe(canvas);
  }

  function init(canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, t = 0;

    const skills = [
      { label: "Data Analytics", value: 0.9 },
      { label: "Automation", value: 0.8 },
      { label: "Backend Systems", value: 0.7 },
      { label: "Dashboards", value: 0.85 },
      { label: "Optimization", value: 0.75 }
    ];

    function resize() {
      const dpr = devicePixelRatio || 1;
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      const cx = canvas.offsetWidth / 2;
      const cy = canvas.offsetHeight / 2;
      const radius = Math.min(cx, cy) * 0.65;

      // grid
      ctx.strokeStyle = "rgba(255,255,255,.08)";
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // axes
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

      // animated shape
      ctx.beginPath();
      skills.forEach((s, i) => {
        const a = (Math.PI * 2 / skills.length) * i - Math.PI / 2;
        const r = radius * s.value * (0.92 + Math.sin(t) * 0.02);
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
        requestAnimationFrame(draw);
      }
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
  }
})();
