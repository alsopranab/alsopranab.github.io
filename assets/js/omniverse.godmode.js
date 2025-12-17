/**
 * ==============================================================
 * OMNIVERSE — GODMODE (FINAL, MOBILE-SAFE)
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
    dpr: Math.min(window.devicePixelRatio || 1, 1.4),
    pointer: matchMedia("(pointer:fine)").matches,
    reduceMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    isMobile: innerWidth < 768,
    isLowEnd: navigator.hardwareConcurrency <= 4
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
     RAF GOVERNOR (ADAPTIVE FPS)
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
     INPUT (SMOOTHED)
  ============================================================ */
  if (ENV.pointer) {
    addEventListener("mousemove", e => {
      STATE.velocity.x = (e.clientX - STATE.mouse.x) * 0.6;
      STATE.velocity.y = (e.clientY - STATE.mouse.y) * 0.6;
      STATE.mouse.x = e.clientX;
      STATE.mouse.y = e.clientY;
    }, { passive: true });
  }

  addEventListener("scroll", () => {
    const y = scrollY;
    STATE.scroll.speed = (y - STATE.scroll.y) * 0.7;
    STATE.scroll.y = y;
  }, { passive: true });

  /* ============================================================
     CANVAS (ADAPTIVE QUALITY)
  ============================================================ */
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    contain: strict;
  `;
  document.body.appendChild(canvas);

  function resize() {
    const scale = ENV.isMobile ? 0.85 : 1;
    canvas.width = innerWidth * ENV.dpr * scale;
    canvas.height = innerHeight * ENV.dpr * scale;
    ctx.setTransform(
      ENV.dpr * scale, 0, 0, ENV.dpr * scale, 0, 0
    );
  }
  resize();
  addEventListener("resize", resize);

  /* ============================================================
     PARTICLES (MOBILE FRIENDLY)
  ============================================================ */
  const PARTICLE_COUNT = ENV.isMobile ? 50 : 110;
  const PARTICLES = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.6 + 0.4
  }));

  TASKS.add(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    const rawEnergy =
      Math.abs(STATE.scroll.speed) * 0.02 +
      Math.hypot(STATE.velocity.x, STATE.velocity.y) * 0.01;

    STATE.energy += (Math.min(rawEnergy, 1.5) - STATE.energy) * 0.08;

    for (const p of PARTICLES) {
      p.x += p.vx * (1 + STATE.energy);
      p.y += p.vy * (1 + STATE.energy);

      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + STATE.energy * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(167,139,250,0.16)";
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
      width: 16px;
      height: 16px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      background: radial-gradient(circle,
        rgba(255,255,255,0.9),
        rgba(167,139,250,0.5),
        transparent);
      mix-blend-mode: screen;
      will-change: transform;
    `;
    document.body.appendChild(orb);

    TASKS.add(() => {
      STATE.cursor.x += (STATE.mouse.x - STATE.cursor.x) * 0.15;
      STATE.cursor.y += (STATE.mouse.y - STATE.cursor.y) * 0.15;

      const speed = Math.min(
        Math.hypot(STATE.velocity.x, STATE.velocity.y), 40
      );

      orb.style.transform =
        `translate3d(${STATE.cursor.x}px, ${STATE.cursor.y}px, 0)
         scale(${1 + speed / 220})`;
    });
  }

  /* ============================================================
     DOM INTERACTION (STABLE TILT)
  ============================================================ */
  if (!ENV.isMobile) {
    const REACTIVE = document.querySelectorAll(
      "section, .project-card, .featured-item"
    );

    REACTIVE.forEach(el =>
      el.style.willChange = "transform"
    );

    TASKS.add(() => {
      if (STATE.frame % 2) return;

      for (const el of REACTIVE) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;

        const dx = STATE.cursor.x - (r.left + r.width / 2);
        const dy = STATE.cursor.y - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < 320) {
          const f = (1 - dist / 320);
          el.style.transform =
            `perspective(1200px)
             rotateX(${dy * f * 0.012}deg)
             rotateY(${-dx * f * 0.012}deg)
             translateY(${-f * 6}px)`;
        } else {
          el.style.transform = "";
        }
      }
    });
  }

  /* ============================================================
     SCROLL FEEDBACK (DESKTOP ONLY)
  ============================================================ */
  if (!ENV.isMobile) {
    let rafBlur = 0;

    TASKS.add(() => {
      if (Math.abs(STATE.scroll.speed) < 3) return;
      if (rafBlur) return;

      rafBlur = requestAnimationFrame(() => {
        const warp = Math.min(Math.abs(STATE.scroll.speed) * 0.015, 3);
        document.documentElement.style.filter =
          `saturate(${1 + warp / 16})`;

        setTimeout(() => {
          document.documentElement.style.filter = "";
          rafBlur = 0;
        }, 60);
      });
    });
  }

})();
