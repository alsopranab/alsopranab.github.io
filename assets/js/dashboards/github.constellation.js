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
  let w, h;
  let t = 0;
  let scrollY = window.scrollY;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.width = canvas.offsetWidth * dpr;
    h = canvas.height = 360 * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener("resize", resize);

  window.addEventListener(
    "scroll",
    () => (scrollY = window.scrollY),
    { passive: true }
  );

  function frame() {
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2 + scrollY * 0.02; // subtle parallax

    // BACK ORBITS (soft, blurred)
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

    // CORE GLOW
    const glow = ctx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      24
    );
    glow.addColorStop(0, "rgba(255,255,255,.9)");
    glow.addColorStop(0.4, "rgba(255,255,255,.35)");
    glow.addColorStop(1, "rgba(255,255,255,0)");

    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t += 0.0035; // slow, calm
      requestAnimationFrame(frame);
    }
  }

  frame();
}

