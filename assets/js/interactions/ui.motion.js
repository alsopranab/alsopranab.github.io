/**
 * UI Motion Engine — PRODUCTION LOCK
 * =================================
 * - Single RAF scroll loop
 * - Apple-grade easing
 * - GPU-only transforms
 * - Motion-safe
 * - Reveal, parallax, connectors, hover
 * - NO background rendering
 */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  let INITIALIZED = false;

  function boot() {
    if (INITIALIZED) return;
    INITIALIZED = true;

    initMotion();
  }

  window.addEventListener("app:ready", boot);
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (!INITIALIZED) boot();
    }, 0);
  });

  /* ================= CORE STATE ================= */
  let header = null;
  let heroWrapper = null;
  let lastScrollY = window.scrollY;
  let ticking = false;
  const parallaxLayers = [];

  function initMotion() {
    header = document.getElementById("site-header");

    bindHero();
    collectParallax();
    initReveal();
    initScrollLoop();
    initConnectors();
    initMagneticHover();
    initChartActivation();
  }

  /* ================= HERO ================= */
  function bindHero() {
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    heroWrapper = hero.querySelector(".hero-wrapper");
    if (!heroWrapper) return;

    heroWrapper.style.willChange = "transform";
  }

  /* ================= SCROLL LOOP ================= */
  function initScrollLoop() {
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
  }

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
    const items = document.querySelectorAll("[data-omni-reveal]");
    if (!items.length) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    items.forEach(el => io.observe(el));
  }

  /* ================= CONNECTORS ================= */
  function initConnectors() {
    const ids = [
      "hero-section",
      "analytics-dashboard",
      "experience-section",
      "featured-section",
      "projects-section",
      "education-section",
      "contact-section"
    ];

    const sections = ids
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (sections.length < 2) return;

    const svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    Object.assign(svg.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "0"
    });

    document.body.appendChild(svg);

    let resizeRAF = null;

    function draw() {
      svg.innerHTML = "";
      const w = window.innerWidth;

      sections.forEach((sec, i) => {
        if (!sections[i + 1]) return;

        const a = sec.getBoundingClientRect();
        const b = sections[i + 1].getBoundingClientRect();

        const path = document.createElementNS(svg.namespaceURI, "path");
        path.setAttribute(
          "d",
          `M ${w / 2} ${a.bottom}
           C ${w / 2 + 120} ${(a.bottom + b.top) / 2},
             ${w / 2 - 120} ${(a.bottom + b.top) / 2},
             ${w / 2} ${b.top}`
        );

        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "rgba(255,255,255,0.22)");
        path.setAttribute("stroke-width", "1.1");

        svg.appendChild(path);
      });
    }

    draw();

    window.addEventListener("resize", () => {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(() => {
        draw();
        resizeRAF = null;
      });
    });
  }

  /* ================= MAGNETIC HOVER ================= */
  function initMagneticHover() {
    if ("ontouchstart" in window) return;

    document.body.addEventListener("mousemove", e => {
      const el = e.target.closest("[data-hover]");
      if (!el) return;

      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;

      el.style.transform =
        `translate3d(${x * 0.04}px, ${y * 0.04}px, 0)`;
    });

    document.body.addEventListener("mouseleave", e => {
      const el = e.target.closest("[data-hover]");
      if (!el) return;
      el.style.transform = "translate3d(0,0,0)";
    });
  }

  /* ================= CHART ACTIVATION ================= */
  function initChartActivation() {
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
  }
})();
