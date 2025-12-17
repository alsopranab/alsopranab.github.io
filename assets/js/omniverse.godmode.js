/**
 * ==============================================================
 * OMNIVERSE — GODMODE
 * ==============================================================
 * Single-file creative engine
 * No libraries
 * No frameworks
 * No limits
 *
 * This is not UI.
 * This is a living system.
 * ==============================================================
 */

(() => {
  "use strict";

  /* ============================================================
     ENVIRONMENT & SAFETY
  ============================================================ */
  const ENV = {
    dpr: Math.min(devicePixelRatio || 1, 2),
    pointer: matchMedia("(pointer:fine)").matches,
    reduceMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    audio: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  };

  if (ENV.reduceMotion) return;

  /* ============================================================
     GLOBAL STATE (TIME IS A DIMENSION)
  ============================================================ */
  const STATE = {
    time: 0,
    mouse: { x: innerWidth / 2, y: innerHeight / 2 },
    cursor: { x: innerWidth / 2, y: innerHeight / 2 },
    velocity: { x: 0, y: 0 },
    scroll: { y: scrollY, speed: 0 },
    energy: 0,
    audioEnergy: 0
  };

  /* ============================================================
     RAF CORE (THE HEART)
  ============================================================ */
  const TASKS = new Set();

  function LOOP(t) {
    STATE.time = t;
    TASKS.forEach(fn => fn(t));
    requestAnimationFrame(LOOP);
  }
  requestAnimationFrame(LOOP);

  /* ============================================================
     INPUT SYSTEM
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
     CANVAS LAYER (GENERATIVE UNIVERSE)
  ============================================================ */
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
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
    ctx.scale(ENV.dpr, ENV.dpr);
  }
  resize();
  addEventListener("resize", resize);

  /* ============================================================
     PARTICLE FIELD (GENERATION)
  ============================================================ */
  const PARTICLES = Array.from({ length: 220 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 2 + 0.5,
    phase: Math.random() * Math.PI * 2
  }));

  TASKS.add(t => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    const energy =
      Math.min(
        Math.abs(STATE.scroll.speed) * 0.04 +
        Math.hypot(STATE.velocity.x, STATE.velocity.y) * 0.02 +
        STATE.audioEnergy * 2,
        4
      );

    PARTICLES.forEach(p => {
      p.phase += 0.01;
      p.x += p.vx * (1 + energy);
      p.y += p.vy * (1 + energy);

      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

      const glow = 10 + Math.sin(p.phase + t / 1000) * 6;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + energy, 0, Math.PI * 2);
      ctx.fillStyle =
        `rgba(167,139,250,${0.15 + energy * 0.05})`;
      ctx.shadowBlur = glow * energy;
      ctx.shadowColor = "rgba(167,139,250,0.6)";
      ctx.fill();
    });
  });

  /* ============================================================
     AUDIO REACTIVE SYSTEM
  ============================================================ */
  if (ENV.audio) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);

        TASKS.add(() => {
          analyser.getByteFrequencyData(data);
          const avg =
            data.reduce((a, b) => a + b, 0) / data.length;
          STATE.audioEnergy = avg / 255;
        });
      })
      .catch(() => {});
  }

  /* ============================================================
     CURSOR ENTITY (ENERGY ORB)
  ============================================================ */
  if (ENV.pointer) {
    const orb = document.createElement("div");
    orb.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      background:
        radial-gradient(circle,
          rgba(255,255,255,0.9),
          rgba(167,139,250,0.7),
          transparent);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(orb);

    TASKS.add(() => {
      STATE.cursor.x += (STATE.mouse.x - STATE.cursor.x) * 0.15;
      STATE.cursor.y += (STATE.mouse.y - STATE.cursor.y) * 0.15;

      const speed =
        Math.min(
          Math.hypot(STATE.velocity.x, STATE.velocity.y),
          80
        );

      orb.style.transform =
        `translate(${STATE.cursor.x}px, ${STATE.cursor.y}px)
         scale(${1 + speed / 120 + STATE.audioEnergy})`;
    });
  }

  /* ============================================================
     DOM DISTORTION FIELD
  ============================================================ */
  const REACTIVE = [
    ...document.querySelectorAll(
      "section, .project-card, .featured-item, img, h1, h2"
    )
  ];

  TASKS.add(() => {
    REACTIVE.forEach(el => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const dx = STATE.cursor.x - cx;
      const dy = STATE.cursor.y - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < 420) {
        const f = (1 - dist / 420);
        el.style.transform =
          `perspective(1400px)
           rotateX(${(dy / dist) * f * 6}deg)
           rotateY(${(-dx / dist) * f * 6}deg)
           translateY(${-f * 12}px)
           scale(${1 + f * 0.03})`;
      } else {
        el.style.transform = "";
      }
    });
  });

  /* ============================================================
     SCROLL-SPACE WARP
  ============================================================ */
  let blurTimeout;
  TASKS.add(() => {
    const warp =
      Math.min(Math.abs(STATE.scroll.speed) * 0.05, 10);

    document.body.style.filter =
      `blur(${warp}px) saturate(${1 + warp / 12})`;

    clearTimeout(blurTimeout);
    blurTimeout = setTimeout(() => {
      document.body.style.filter = "";
    }, 90);
  });

})();
