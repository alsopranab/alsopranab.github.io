
(() => {
  "use strict";

  /* =======================
     ACCESSIBILITY
  ======================= */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let heroWrapper = null;
  let header = null;
  let headerIdentity = null;

  let lastScrollY = window.scrollY;
  let ticking = false;

  /* =======================
     APP READY
  ======================= */
  window.addEventListener("app:ready", () => {
    header = document.getElementById("site-header");
    if (header) {
      headerIdentity = header.querySelector(".header-identity");
      if (headerIdentity) {
        headerIdentity.style.opacity = "0";
        headerIdentity.style.transform = "scale(0.96)";
        headerIdentity.style.transition =
          "opacity 240ms ease, transform 320ms cubic-bezier(.22,1,.36,1)";
      }
    }

    bindHero();
    initReveal();
    initParallax();
    initStars();
  });

  /* =======================
     HERO MOTION
  ======================= */
  function bindHero() {
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    heroWrapper = hero.querySelector(".hero-wrapper");
    if (!heroWrapper) {
      requestAnimationFrame(bindHero);
      return;
    }

    heroWrapper.style.willChange = "transform";
  }

  /* =======================
     SCROLL LOOP (SAFE)
  ======================= */
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        handleHeader(y);
        handleHero(y);

        lastScrollY = y;
        ticking = false;
      });
    },
    { passive: true }
  );

  function handleHeader(y) {
    if (!header) return;

    if (y > lastScrollY && y > 140) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
  }

  function handleHero(y) {
    if (!heroWrapper) return;

    const p = Math.min(y / 420, 1);
    heroWrapper.style.transform =
      `translate3d(0, ${-18 * p}px, 0) scale(${1 - p * 0.04})`;

    if (!headerIdentity) return;

    if (p > 0.7) {
      headerIdentity.style.opacity = "1";
      headerIdentity.style.transform = "scale(1)";
    } else {
      headerIdentity.style.opacity = "0";
      headerIdentity.style.transform = "scale(0.96)";
    }
  }

  /* =======================
     REVEAL ENGINE
  ======================= */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    items.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translate3d(0, 18px, 0)";
      el.style.transition =
        "opacity 900ms cubic-bezier(.22,1,.36,1), transform 900ms cubic-bezier(.22,1,.36,1)";
    });

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translate3d(0,0,0)";
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(el => io.observe(el));
  }

  /* =======================
     PARALLAX (LIGHT)
  ======================= */
  function initParallax() {
    const layers = [...document.querySelectorAll("[data-parallax]")];
    if (!layers.length) return;

    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        layers.forEach(el => {
          const d = parseFloat(el.dataset.parallax) || 0.05;
          el.style.transform = `translate3d(0, ${y * d}px, 0)`;
        });
      },
      { passive: true }
    );
  }

  /* =======================
     STARFIELD (DEPTH SAFE)
  ======================= */
  function initStars() {
    const canvas = document.getElementById("stars");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w, h;

    const layers = [
      { count: 100, speed: 0.03, size: 1 },
      { count: 60, speed: 0.06, size: 1.4 },
      { count: 30, speed: 0.1, size: 2 }
    ];

    let stars = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      stars = layers.flatMap(l =>
        Array.from({ length: l.count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: l.size,
          s: l.speed
        }))
      );
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const scrollY = window.scrollY;

      stars.forEach(star => {
        const y = (star.y + scrollY * star.s) % h;
        ctx.beginPath();
        ctx.arc(star.x, y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,.55)";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
  }
})();
