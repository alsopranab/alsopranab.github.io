/**
 * UI Motion Engine — PRODUCTION LOCK
 * =================================
 * - Single RAF scroll loop (no jitter)
 * - Apple-grade easing
 * - GPU-only transforms
 * - Motion-safe (prefers-reduced-motion)
 * - Scroll-reveal, parallax, stars, connectors
 * - Zero layout thrashing
 */

(() => {
  "use strict";

  /* ================= ACCESSIBILITY ================= */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let heroWrapper = null;
  let header = null;
  let headerIdentity = null;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const parallaxLayers = [];

  /* ================= APP READY ================= */
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
    collectParallax();
    initStars();
  });

  /* ================= HERO ================= */
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

  /* ================= SCROLL LOOP (SINGLE RAF) ================= */
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        handleHeader(y);
        handleHero(y);
        handleParallax(y);

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

  /* ================= PARALLAX ================= */
  function collectParallax() {
    parallaxLayers.push(
      ...document.querySelectorAll("[data-parallax]")
    );
  }

  function handleParallax(y) {
    parallaxLayers.forEach(el => {
      const d = parseFloat(el.dataset.parallax) || 0.05;
      el.style.transform = `translate3d(0, ${y * d}px, 0)`;
    });
  }

  /* ================= REVEAL ================= */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    items.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translate3d(0,18px,0)";
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

  /* ================= STARFIELD ================= */
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

/* ================= SECTION CONNECTORS ================= */
(() => {
  const sections = [
    "hero-section",
    "analytics-dashboard",
    "experience-section",
    "featured-section",
    "projects-section",
    "education-section",
    "contact-section"
  ]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (sections.length < 2) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "fixed";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.width = "100%";
  svg.style.height = "100vh";
  svg.style.pointerEvents = "none";
  svg.style.zIndex = "0";

  document.body.appendChild(svg);

  function draw() {
    svg.innerHTML = "";
    const w = window.innerWidth;

    sections.forEach((sec, i) => {
      if (!sections[i + 1]) return;

      const a = sec.getBoundingClientRect();
      const b = sections[i + 1].getBoundingClientRect();

      const x1 = w * 0.5;
      const y1 = a.bottom;
      const x2 = w * 0.5;
      const y2 = b.top;

      const path = document.createElementNS(svg.namespaceURI, "path");
      path.setAttribute(
        "d",
        `M ${x1} ${y1}
         C ${x1 + 120} ${(y1 + y2) / 2},
           ${x2 - 120} ${(y1 + y2) / 2},
           ${x2} ${y2}`
      );

      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "rgba(255,255,255,0.22)");
      path.setAttribute("stroke-width", "1.1");
      path.style.filter = "blur(.25px)";

      svg.appendChild(path);
    });
  }

  draw();
  window.addEventListener("resize", draw);
})();

/* ================= MAGNETIC HOVER ================= */
(() => {
  if ("ontouchstart" in window) return;

  document.querySelectorAll("[data-hover]").forEach(el => {
    el.style.transition =
      "transform 500ms cubic-bezier(.22,1,.36,1)";

    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;

      el.style.transform =
        `translate3d(${x * 0.04}px, ${y * 0.04}px, 0)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate3d(0,0,0)";
    });
  });
})();

/* ================= CHART ACTIVATION ================= */
(() => {
  const charts = document.querySelectorAll("[data-chart]");
  if (!charts.length) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.dispatchEvent(new Event("chart:activate"));
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  charts.forEach(c => io.observe(c));
})();
