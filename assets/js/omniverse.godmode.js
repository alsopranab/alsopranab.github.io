/**
 * ==============================================================
 * OMNIVERSE — GODMODE (FINAL • LOCKED • PRODUCTION SAFE)
 * ==============================================================
 * Single background system (Canvas only)
 * No CSS star layers
 * Stable, calm, realistic
 * ==============================================================
 */

(() => {
  "use strict";

  /* ============================================================
     ENVIRONMENT
  ============================================================ */
  const ENV = {
    dpr: Math.min(window.devicePixelRatio || 1, 1.4),
    pointer: matchMedia("(pointer:fine)").matches,
    reduceMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    isMobile: window.innerWidth < 768,
    isLowEnd:
      typeof navigator.hardwareConcurrency === "number"
        ? navigator.hardwareConcurrency <= 4
        : false
  };

  if (ENV.reduceMotion) return;

  /* ============================================================
     VIEWPORT
  ============================================================ */
  const VIEW = {
    w: window.innerWidth,
    h: window.innerHeight
  };

  /* ============================================================
     STATE
  ============================================================ */
  const STATE = {
    time: 0,
    mouse: { x: VIEW.w / 2, y: VIEW.h / 2 },
    cursor: { x: VIEW.w / 2, y: VIEW.h / 2 },
    velocity: { x: 0, y: 0 },
    energy: 0,
    frame: 0
  };

  /* ============================================================
     RAF GOVERNOR
  ============================================================ */
  const TARGET_FPS = ENV.isMobile ? 45 : ENV.isLowEnd ? 40 : 60;
  const FRAME_INTERVAL = 1000 / TARGET_FPS;
  let lastFrame = 0;
  const TASKS = new Set();

  function LOOP(t) {
    if (t - lastFrame < FRAME_INTERVAL) {
      requestAnimationFrame(LOOP);
      return;
    }

    lastFrame = t;
    STATE.time = t;
    STATE.frame++;
    TASKS.forEach(fn => fn(t));
    requestAnimationFrame(LOOP);
  }

  requestAnimationFrame(LOOP);

  /* ============================================================
     INPUT
  ============================================================ */
  if (ENV.pointer) {
    window.addEventListener("mousemove", e => {
      STATE.velocity.x = (e.clientX - STATE.mouse.x) * 0.6;
      STATE.velocity.y = (e.clientY - STATE.mouse.y) * 0.6;
      STATE.mouse.x = e.clientX;
      STATE.mouse.y = e.clientY;
    }, { passive: true });
  }

  /* ============================================================
     CANVAS BACKGROUND (ONLY SYSTEM)
  ============================================================ */
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  `;

  document.body.prepend(canvas);

  function resize() {
    VIEW.w = window.innerWidth;
    VIEW.h = window.innerHeight;

    const scale = ENV.isMobile ? 0.85 : 1;
    canvas.width = VIEW.w * ENV.dpr * scale;
    canvas.height = VIEW.h * ENV.dpr * scale;

    ctx.setTransform(
      ENV.dpr * scale, 0, 0, ENV.dpr * scale, 0, 0
    );
  }

  resize();
  window.addEventListener("resize", resize);

  /* ============================================================
     STAR DUST (STATIC MICRO STARS)
  ============================================================ */
  const DUST_COUNT = ENV.isMobile ? 35 : 70;
  const STAR_DUST = Array.from({ length: DUST_COUNT }, () => ({
    x: Math.random() * VIEW.w,
    y: Math.random() * VIEW.h,
    r: Math.random() * 0.9 + 0.3,
    a: Math.random() * 0.35 + 0.15
  }));

  /* ============================================================
     FLOATING PARTICLES (SUBTLE MOTION)
  ============================================================ */
  const PARTICLE_COUNT = ENV.isMobile ? 40 : 90;
  const PARTICLES = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * VIEW.w,
    y: Math.random() * VIEW.h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.4 + 0.4
  }));

  /* ============================================================
     SHOOTING STAR (RARE • SLOW • REALISTIC)
  ============================================================ */
  let nextMeteor = performance.now() + 12000;
  let meteor = null;

  function spawnMeteor() {
    meteor = {
      x: -200,
      y: Math.random() * VIEW.h * 0.5,
      vx: VIEW.w * 1.5,
      vy: VIEW.h * 0.6,
      life: 0
    };
  }

  /* ============================================================
     RENDER LOOP
  ============================================================ */
  TASKS.add(t => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* ---- STAR DUST ---- */
    for (const s of STAR_DUST) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();
    }

    /* ---- ENERGY MODEL ---- */
    const rawEnergy =
      Math.hypot(STATE.velocity.x, STATE.velocity.y) * 0.01;
    STATE.energy += (Math.min(rawEnergy, 0.8) - STATE.energy) * 0.08;

    /* ---- FLOATING PARTICLES ---- */
    for (const p of PARTICLES) {
      p.x += p.vx * (1 + STATE.energy);
      p.y += p.vy * (1 + STATE.energy);

      if (p.x < 0 || p.x > VIEW.w) p.vx *= -1;
      if (p.y < 0 || p.y > VIEW.h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + STATE.energy * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(167,139,250,0.12)";
      ctx.fill();
    }

    /* ---- METEOR ---- */
    if (t > nextMeteor && !meteor) {
      spawnMeteor();
      nextMeteor = t + 14000;
    }

    if (meteor) {
      meteor.life++;
      meteor.x += meteor.vx * 0.016;
      meteor.y += meteor.vy * 0.016;

      ctx.strokeStyle = "rgba(167,139,250,0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(meteor.x, meteor.y);
      ctx.lineTo(meteor.x - 140, meteor.y - 70);
      ctx.stroke();

      if (meteor.life > 28) meteor = null;
    }
  });

})();
