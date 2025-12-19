/**
 * ============================================================
 * OMNIVERSE — COSMIC BACKGROUND ENGINE
 * ------------------------------------------------------------
 * Single-file controller for:
 * - Twinkling starfield (Canvas)
 * - Shooting stars (SVG)
 *
 * Design goals:
 * - GPU safe
 * - Zero layout impact
 * - Resize aware
 * - Apple-grade subtle motion
 * - No external dependencies
 *
 * Drop-in replacement for:
 * - stars.background.js
 * - shooting-stars.js
 * ============================================================
 */

(() => {
  "use strict";

  /* ============================================================
     SAFETY CHECKS
  ============================================================ */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* ============================================================
     DOM SETUP
  ============================================================ */

  const starCanvas = document.createElement("canvas");
  const shootingSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  starCanvas.id = "cosmic-stars";
  shootingSVG.id = "cosmic-shooting-stars";

  document.body.prepend(starCanvas, shootingSVG);

  /* ============================================================
     LAYER STYLING (INLINE = ZERO CSS DEPENDENCY)
  ============================================================ */

  Object.assign(starCanvas.style, {
    position: "fixed",
    inset: "0",
    zIndex: "-3",
    pointerEvents: "none"
  });

  Object.assign(shootingSVG.style, {
    position: "fixed",
    inset: "0",
    zIndex: "-2",
    pointerEvents: "none"
  });

  /* ============================================================
     STARFIELD — CANVAS ENGINE
  ============================================================ */

  const ctx = starCanvas.getContext("2d");
  let stars = [];
  const STAR_DENSITY = 0.00015;

  function resizeStars() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;

    const total = Math.floor(
      window.innerWidth * window.innerHeight * STAR_DENSITY
    );

    stars = Array.from({ length: total }, () => ({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 0.6 + 0.4,
      o: Math.random() * 0.5 + 0.4,
      t: Math.random() * 0.8 + 0.4
    }));
  }

  function renderStars() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);

    const time = Date.now() * 0.001;

    for (const s of stars) {
      const opacity =
        0.5 + Math.abs(Math.sin(time / s.t) * 0.5);

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fill();
    }

    requestAnimationFrame(renderStars);
  }

  resizeStars();
  renderStars();

  window.addEventListener("resize", resizeStars, { passive: true });

  /* ============================================================
     SHOOTING STARS — SVG ENGINE
  ============================================================ */

  shootingSVG.innerHTML = `
    <defs>
      <linearGradient id="cosmic-trail" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(96,165,250,0)" />
        <stop offset="100%" stop-color="#a78bfa" />
      </linearGradient>
    </defs>
  `;

  function getStartPoint() {
    const side = Math.floor(Math.random() * 4);
    const w = window.innerWidth;
    const h = window.innerHeight;

    switch (side) {
      case 0: return { x: Math.random() * w, y: -80, angle: 45 };
      case 1: return { x: w + 80, y: Math.random() * h, angle: 135 };
      case 2: return { x: Math.random() * w, y: h + 80, angle: 225 };
      case 3: return { x: -80, y: Math.random() * h, angle: 315 };
      default: return { x: 0, y: 0, angle: 45 };
    }
  }

  function spawnShootingStar() {
    const { x, y, angle } = getStartPoint();

    const star = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

    const length = 140 + Math.random() * 80;
    const speed = 16 + Math.random() * 10;

    star.setAttribute("x", x);
    star.setAttribute("y", y);
    star.setAttribute("width", length);
    star.setAttribute("height", 1.4);
    star.setAttribute("fill", "url(#cosmic-trail)");
    star.setAttribute(
      "transform",
      `rotate(${angle} ${x} ${y})`
    );

    shootingSVG.appendChild(star);

    let distance = 0;
    const rad = (angle * Math.PI) / 180;

    function animate() {
      distance += speed;

      const nx = x + Math.cos(rad) * distance;
      const ny = y + Math.sin(rad) * distance;

      star.setAttribute("x", nx);
      star.setAttribute("y", ny);

      if (
        nx < -200 || nx > window.innerWidth + 200 ||
        ny < -200 || ny > window.innerHeight + 200
      ) {
        star.remove();
        return;
      }

      requestAnimationFrame(animate);
    }

    animate();

    const delay = 2000 + Math.random() * 4000;
    setTimeout(spawnShootingStar, delay);
  }

  spawnShootingStar();

})();
