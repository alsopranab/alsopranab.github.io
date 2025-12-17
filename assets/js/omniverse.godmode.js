/**
 * ==============================================================
 * OMNIVERSE — GODMODE (PRODUCTION SAFE)
 * ==============================================================
 * Smooth > Loud
 * Stable > Flashy
 * Intentional > Excessive
 * ==============================================================
 */

(() => {
  "use strict";

  /* ============================================================
     ENVIRONMENT
  ============================================================ */
  const ENV = {
    dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    pointer: matchMedia("(pointer:fine)").matches,
    reduceMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    isMobile: innerWidth < 768
  };

  if (ENV.reduceMotion) return;

  /* ============================================================
     STATE
  ============================================================ */
  const STATE = {
    time: 0,
    mouse: { x: innerWidth / 2, y: innerHeight / 2 },
    cursor: { x: innerWidth / 2, y: innerHeight / 2 },
    velocity: { x: 0, y: 0 },
    scroll: { y: scrollY, speed: 0 },
    energy: 0,
    frame: 0
  };

  /* ============================================================
     RAF GOVERNOR (FPS CAP)
  ============================================================ */
  const TARGET_FPS = ENV.isMobile ? 60 : 45;
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
    addEventListener("mousemove", e => {
      STATE.velocity.x = e.clientX - STATE.mouse.x;
      STATE.velocity.y = e.clientY - STATE.mouse.y;
      STATE.mouse.x = e.clientX;
      STATE.mouse.y = e.clientY;
    }, { passive: true });
  }

  addEventListener("scroll", () => {
    const y = scrollY;
    STATE.scroll.speed = y - STATE.scroll.y;
    STATE.scroll.y = y;
  }, { passive: true });

  /* ============================================================
     CANVAS (GENERATIVE BACKGROUND)
  ============================================================ */
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  `;
  document.body.appendChild(canvas);

  function resize() {
    canvas.width = innerWidth * ENV.dpr;
    canvas.height = innerHeight * ENV.dpr;
    ctx.setTransform(ENV.dpr, 0, 0, ENV.dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  /* ============================================================
     PARTICLES (LOD CONTROLLED)
  ============================================================ */
  const PARTICLE_COUNT = ENV.isMobile ? 80 : 120;
  const PARTICLES = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.8 + 0.4,
    phase: Math.random() * Math.PI * 2
  }));

  TASKS.add(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    const energy = Math.min(
      Math.abs(STATE.scroll.speed) * 0.03 +
      Math.hypot(STATE.velocity.x, STATE.velocity.y) * 0.015,
      2
    );

    for (const p of PARTICLES) {
      p.phase += 0.008;
      p.x += p.vx * (1 + energy);
      p.y += p.vy * (1 + energy);

      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + energy * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167,139,250,0.18)`;
      ctx.fill();
    }
  });

  /* ============================================================
     CURSOR ORB (SMOOTHED)
  ============================================================ */
  if (ENV.pointer) {
    const orb = document.createElement("div");
    orb.style.cssText = `
      position: fixed;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      background: radial-gradient(circle,
        rgba(255,255,255,0.85),
        rgba(167,139,250,0.6),
        transparent);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(orb);

    TASKS.add(() => {
      STATE.cursor.x += (STATE.mouse.x - STATE.cursor.x) * 0.12;
      STATE.cursor.y += (STATE.mouse.y - STATE.cursor.y) * 0.12;

      const speed = Math.min(
        Math.hypot(STATE.velocity.x, STATE.velocity.y),
        60
      );

      orb.style.transform =
        `translate(${STATE.cursor.x}px, ${STATE.cursor.y}px)
         scale(${1 + speed / 180})`;
    });
  }

  /* ============================================================
     DOM INTERACTION (SMART CULLING)
  ============================================================ */
  if (!ENV.isMobile) {
    const REACTIVE = [
      ...document.querySelectorAll(
        "section, .project-card, .featured-item"
      )
    ];

    TASKS.add(() => {
      if (STATE.frame % 2 !== 0) return; // half-rate updates

      for (const el of REACTIVE) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;

        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;

        const dx = STATE.cursor.x - cx;
        const dy = STATE.cursor.y - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < 360) {
          const f = (1 - dist / 360);
          el.style.transform =
            `perspective(1200px)
             rotateX(${(dy / dist) * f * 4}deg)
             rotateY(${(-dx / dist) * f * 4}deg)
             translateY(${-f * 8}px)`;
        } else {
          el.style.transform = "";
        }
      }
    });
  }

  /* ============================================================
     SCROLL WARP (SUBTLE & THROTTLED)
  ============================================================ */
  let blurTimeout;
  TASKS.add(() => {
    if (Math.abs(STATE.scroll.speed) < 2) return;

    const warp = Math.min(Math.abs(STATE.scroll.speed) * 0.02, 4);
    document.body.style.filter =
      `blur(${warp}px) saturate(${1 + warp / 18})`;

    clearTimeout(blurTimeout);
    blurTimeout = setTimeout(() => {
      document.body.style.filter = "";
    }, 80);
  });

})();
