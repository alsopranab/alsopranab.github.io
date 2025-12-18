/**
 * ==============================================================
 * OMNIVERSE — GODMODE (CANONICAL)
 * Orchestrator ONLY
 * NO visuals
 * NO canvas
 * CSS owns background
 * ==============================================================
 */

(() => {
  "use strict";

  /* ============================================================
     ENVIRONMENT
  ============================================================ */
  const ENV = {
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

  window.addEventListener("resize", () => {
    VIEW.w = window.innerWidth;
    VIEW.h = window.innerHeight;
  });

  /* ============================================================
     STATE
  ============================================================ */
  const STATE = {
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

  /* ============================================================
     ENERGY MODEL (GLOBAL)
  ============================================================ */
  TASKS.add(() => {
    const raw =
      Math.hypot(STATE.velocity.x, STATE.velocity.y) * 0.01;

    STATE.energy += (Math.min(raw, 0.8) - STATE.energy) * 0.08;
  });

  /* ============================================================
     CURSOR ORB (DESKTOP ONLY)
  ============================================================ */
  if (ENV.pointer && !ENV.isMobile) {
    const orb = document.createElement("div");
    orb.className = "omni-cursor";

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
        Math.hypot(STATE.velocity.x, STATE.velocity.y),
        30
      );

      orb.style.transform =
        `translate3d(${STATE.cursor.x}px, ${STATE.cursor.y}px, 0)
         scale(${1 + speed / 240})`;
    });
  }

  /* ============================================================
     CARD TILT (SAFE)
  ============================================================ */
  if (!ENV.isMobile) {
    const CARDS = document.querySelectorAll(
      ".project-card, .featured-item, .education-item"
    );

    CARDS.forEach(el => (el.style.willChange = "transform"));

    TASKS.add(() => {
      if (STATE.frame % 2) return;

      for (const el of CARDS) {
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
