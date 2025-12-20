/**
 * ============================================================
 * OMNIVERSE — COSMIC BACKGROUND ENGINE (PRODUCTION)
 * ------------------------------------------------------------
 * - GPU safe
 * - Visibility aware
 * - Battery safe
 * - Resize throttled
 * - Memory bounded
 * - Apple-grade subtle motion
 * ============================================================
 */

(() => {
  "use strict";

  /* ============================================================
     SAFETY CHECKS
  ============================================================ */
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

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
     LAYER STYLING (SAFE STACKING)
  ============================================================ */
  Object.assign(starCanvas.style, {
    position: "fixed",
    inset: "0",
    zIndex: "0",
    pointerEvents: "none"
  });

  Object.assign(shootingSVG.style, {
    position: "fixed",
    inset: "0",
    zIndex: "1",
    pointerEvents: "none"
  });

  /* ============================================================
     STARFIELD — CANVAS ENGINE
  ============================================================ */
  const ctx = starCanvas.getContext("2d", { alpha: true });
  let stars = [];
  const STAR_DENSITY = 0.00015;

  function buildStars() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    starCanvas.width = w;
    starCanvas.height = h;

    const total = Math.floor(w * h * STAR_DENSITY);

    stars = Array.from({ length: total }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 0.6 + 0.4,
      t: Math.random() * 0.8 + 0.4
    }));
  }

  let starsRunning = true;

  function renderStars() {
    if (!starsRunning) return;

    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    const time = performance.now() * 0.001;

    for (const s of stars) {
      const o = 0.5 + Math.abs(Math.sin(time / s.t) * 0.5);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${o})`;
      ctx.fill();
    }

    requestAnimationFrame(renderStars);
  }

  buildStars();
  renderStars();

  /* Resize throttling */
  let resizeRAF = null;
  window.addEventListener(
    "resize",
    () => {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(() => {
        buildStars();
        resizeRAF = null;
      });
    },
    { passive: true }
  );

  /* Visibility handling */
  document.addEventListener("visibilitychange", () => {
    starsRunning = !document.hidden;
    if (starsRunning) renderStars();
  });

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

  let shootingActive = true;
  let shootingTimeout = null;

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
    if (!shootingActive) return;

    const { x, y, angle } = getStartPoint();
    const star = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

    const length = 140 + Math.random() * 80;
    const speed = 14 + Math.random() * 8;

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

    let d = 0;
    const rad = (angle * Math.PI) / 180;

    function animate() {
      if (!shootingActive) {
        star.remove();
        return;
      }

      d += speed;
      const nx = x + Math.cos(rad) * d;
      const ny = y + Math.sin(rad) * d;

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

    shootingTimeout = setTimeout(
      spawnShootingStar,
      2200 + Math.random() * 3800
    );
  }

  spawnShootingStar();

  document.addEventListener("visibilitychange", () => {
    shootingActive = !document.hidden;

    if (!shootingActive && shootingTimeout) {
      clearTimeout(shootingTimeout);
      shootingTimeout = null;
    }

    if (shootingActive && !shootingTimeout) {
      spawnShootingStar();
    }
  });

})();
