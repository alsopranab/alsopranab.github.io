/**
 * ==============================================================
 * OMNIVERSE — GODMODE (FINAL, LOCKED, PRODUCTION SAFE)
 * ==============================================================
 * Stable > Flashy
 * Isolated > Coupled
 * Ambient > Reactive
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
    scroll: { y: window.scrollY, speed: 0 },
    energy: 0,
    frame: 0
  };

  /* ============================================================
     RAF GOVERNOR
  ============================================================ */
  const TARGET_FPS = ENV.isMobile
    ? 45
    : ENV.isLowEnd
    ? 40
    : 60;

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
    window.addEventListener(
      "mousemove",
      e => {
        STATE.velocity.x = (e.clientX - STATE.mouse.x) * 0.6;
        STATE.velocity.y = (e.clientY - STATE.mouse.y) * 0.6;
        STATE.mouse.x = e.clientX;
        STATE.mouse.y = e.clientY;
      },
      { passive: true }
    );
  }

  // SAFE scroll listener — NO energy injection
  window.addEventListener(
    "scroll",
    () => {
      STATE.scroll.y = window.scrollY;
      STATE.scroll.speed *= 0.9; // decay only
    },
    { passive: true }
  );

  /* ============================================================
     CANVAS BACKGROUND (AMBIENT ONLY)
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
     PARTICLES (STABLE)
  ============================================================ */
  const PARTICLE_COUNT = ENV.isMobile ? 40 : 90;

  const PARTICLES = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * VIEW.w,
    y: Math.random() * VIEW.h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.4 + 0.4
  }));

  TASKS.add(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rawEnergy =
      Math.hypot(STATE.velocity.x, STATE.velocity.y) * 0.01;

    STATE.energy += (Math.min(rawEnergy, 0.8) - STATE.energy) * 0.08;

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
  });

  /* ============================================================
     CURSOR ORB (DESKTOP ONLY)
  ============================================================ */
  if (ENV.pointer && !ENV.isMobile) {
    const orb = document.createElement("div");
    orb.style.cssText = `
      position: fixed;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      background: radial-gradient(circle,
        rgba(255,255,255,0.9),
        rgba(167,139,250,0.45),
        transparent);
      mix-blend-mode: screen;
      will-change: transform;
    `;
    document.body.appendChild(orb);

    TASKS.add(() => {
      STATE.cursor.x += (STATE.mouse.x - STATE.cursor.x) * 0.15;
      STATE.cursor.y += (STATE.mouse.y - STATE.cursor.y) * 0.15;

      const speed = Math.min(
        Math.hypot(STATE.velocity.x, STATE.velocity.y), 30
      );

      orb.style.transform =
        `translate3d(${STATE.cursor.x}px, ${STATE.cursor.y}px, 0)
         scale(${1 + speed / 240})`;
    });
  }

  /* ============================================================
     CARD TILT (TRANSFORM-SAFE)
  ============================================================ */
  if (!ENV.isMobile) {
    const REACTIVE = document.querySelectorAll(
      ".project-card, .featured-item, .education-item"
    );

    REACTIVE.forEach(el => (el.style.willChange = "transform"));

    TASKS.add(() => {
      if (STATE.frame % 2) return;

      for (const el of REACTIVE) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > VIEW.h) continue;

        const dx = STATE.cursor.x - (r.left + r.width / 2);
        const dy = STATE.cursor.y - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < 280) {
          const f = 1 - dist / 280;
          el.style.transform =
            `perspective(1000px)
             rotateX(${dy * f * 0.008}deg)
             rotateY(${-dx * f * 0.008}deg)`;
        } else {
          el.style.transform = "";
        }
      }
    });
  }

})();
