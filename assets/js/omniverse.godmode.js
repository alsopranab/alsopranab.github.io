/**
 * ==============================================================
 * OMNIVERSE — GODMODE (CANONICAL • LOCKED)
 * Orchestrator ONLY
 * NO visual ownership
 * NO canvas
 * NO layout mutation
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

  let resizeRAF = null;
  window.addEventListener("resize", () => {
    if (resizeRAF) return;
    resizeRAF = requestAnimationFrame(() => {
      VIEW.w = window.innerWidth;
      VIEW.h = window.innerHeight;
      resizeRAF = null;
    });
  });

  /* ============================================================
     STATE
  ============================================================ */
  const STATE = {
    mouse: { x: VIEW.w / 2, y: VIEW.h / 2 },
    cursor: { x: VIEW.w / 2, y: VIEW.h / 2 },
    velocity: { x: 0, y: 0 },
    energy: 0,
    frame: 0,
    hovering: false
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

    // Pause Godmode when image viewer is open
    if (!document.getElementById("image-viewer-overlay")) {
      TASKS.forEach(fn => fn(t));
    }

    requestAnimationFrame(LOOP);
  }

  requestAnimationFrame(LOOP);

  /* ============================================================
     INPUT — POINTER
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
     ENERGY MODEL
  ============================================================ */
  TASKS.add(() => {
    const raw =
      Math.hypot(STATE.velocity.x, STATE.velocity.y) * 0.01;

    STATE.energy += (Math.min(raw, 0.8) - STATE.energy) * 0.08;
  });

  /* ============================================================
     CURSOR ORB (DESKTOP ONLY)
  ============================================================ */
  let orb = null;

  if (ENV.pointer && !ENV.isMobile) {
    const ORB_SIZE = 14;
    orb = document.createElement("div");
    orb.className = "omni-cursor";

    orb.style.cssText = `
      position: fixed;
      width: ${ORB_SIZE}px;
      height: ${ORB_SIZE}px;
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
        `translate3d(
          ${STATE.cursor.x - ORB_SIZE / 2}px,
          ${STATE.cursor.y - ORB_SIZE / 2}px,
          0
        )
        scale(${1 + speed / 240})`;
    });
  }

  /* ============================================================
     CURSOR HOVER INTELLIGENCE
  ============================================================ */
  if (ENV.pointer && orb) {
    document.addEventListener("mouseover", e => {
      const target = e.target.closest("[data-omni-hover]");
      if (!target) return;
      STATE.hovering = true;
      orb.classList.add("is-hover");
    });

    document.addEventListener("mouseout", e => {
      const target = e.target.closest("[data-omni-hover]");
      if (!target) return;
      STATE.hovering = false;
      orb.classList.remove("is-hover");
    });

    document.addEventListener("mousedown", () => {
      if (STATE.hovering) orb.classList.add("is-active");
    });

    document.addEventListener("mouseup", () => {
      orb.classList.remove("is-active");
    });
  }

  /* ============================================================
     CARD TILT (SAFE + ANALYTICS AWARE)
  ============================================================ */
  if (!ENV.isMobile) {
    TASKS.add(() => {
      if (STATE.frame % 2) return;

      const CARDS = document.querySelectorAll(
        ".project-card:not(.is-visible), .featured-item, .education-item"
      );

      for (const el of CARDS) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > VIEW.h) {
          el.style.transform = "";
          continue;
        }

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

  /* ============================================================
     SCROLL-LINKED REVEAL (FPS SAFE)
  ============================================================ */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  document
    .querySelectorAll("[data-omni-reveal]")
    .forEach(el => revealObserver.observe(el));

})();
