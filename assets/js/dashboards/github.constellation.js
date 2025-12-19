/**
 * GitHub Contribution Constellation — PRODUCTION
 * ----------------------------------------------
 * • Visual-first (not a clone of GitHub)
 * • Real data, abstracted
 * • GPU-safe
 * • Scroll-activated
 * • Motion-respectful
 */

(() => {
  "use strict";

  const USERNAME = "alsopranab";
  const HOST_ID = "github-constellation";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("app:ready", () => {
    const host = document.getElementById(HOST_ID);
    if (!host) return;
    observe(host);
  });

  function observe(el) {
    const io = new IntersectionObserver(
      e => {
        if (!e[0].isIntersecting) return;
        io.disconnect();
        init(el);
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
    const ctx = canvas.getContext("2d");

    const years = await getActiveYears();
    drawConstellation(canvas, ctx, years);
  }

  async function getActiveYears() {
    try {
      const r = await fetch(
        `https://api.github.com/users/${USERNAME}`
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
    let w, h, t = 0;

    function resize() {
      const dpr = devicePixelRatio || 1;
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = 360 * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function frame() {
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (let i = 1; i <= rings; i++) {
        const r = i * 34;
        ctx.beginPath();

        for (let a = 0; a < Math.PI * 2; a += 0.03) {
          const noise = Math.sin(a * 6 + t + i) * 2;
          const x = cx + Math.cos(a) * (r + noise);
          const y = cy + Math.sin(a) * (r + noise);
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255,255,255,${0.08 + i * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Core glow
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,.9)";
      ctx.fill();

      if (!prefersReducedMotion) {
        t += 0.004;
        requestAnimationFrame(frame);
      }
    }

    frame();
  }
})();
