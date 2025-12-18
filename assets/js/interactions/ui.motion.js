/**
 * UI Motion Engine — FINAL LOCKED SAFE BUILD
 * ========================================
 * - ZERO section layout mutation
 * - ZERO spacing mutation
 * - GPU-only transforms
 * - Safari & mobile safe
 * - Header + hero motion ONLY
 */

(() => {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const header = document.getElementById("site-header");
  const heroSection = document.getElementById("hero-section");

  if (!header || !heroSection) return;

  let heroWrapper = null;
  let headerIdentity = null;

  let lastScrollY = window.scrollY;
  let ticking = false;

  /* ================= READY ================= */

  window.addEventListener("header:ready", () => {
    headerIdentity = header.querySelector(".header-identity");
    if (!headerIdentity) return;

    headerIdentity.style.opacity = "0";
    headerIdentity.style.transform = "scale(0.96)";
    headerIdentity.style.transition =
      "opacity 240ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1)";
  });

  window.addEventListener("home:ready", () => {
    heroWrapper = heroSection.querySelector(".hero-wrapper");
    if (!heroWrapper) return;

    heroWrapper.style.willChange = "transform";
  });

  /* ================= SCROLL ================= */

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

  /* ================= HEADER ================= */

  function handleHeader(y) {
    const delta = y - lastScrollY;
    if (Math.abs(delta) < 8) return;

    if (y > lastScrollY && y > 120) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
  }

  /* ================= HERO ================= */

  function handleHero(y) {
    if (!heroWrapper) return;

    const clamped = Math.min(y / 400, 1);

    heroWrapper.style.transform =
      `translate3d(0, ${clamped * -18}px, 0) scale(${1 - clamped * 0.04})`;

    if (!headerIdentity) return;

    if (clamped > 0.7) {
      headerIdentity.style.opacity = "1";
      headerIdentity.style.transform = "scale(1)";
    } else {
      headerIdentity.style.opacity = "0";
      headerIdentity.style.transform = "scale(0.96)";
    }
  }
})();

/* ======================================================
   ACTIVE NAV TRACKER — FINAL SAFE
====================================================== */

window.addEventListener("header:ready", () => {
  const navLinks = Array.from(
    document.querySelectorAll(".header-nav a[href^='#']")
  ).filter(link => {
    const href = link.getAttribute("href");
    return href && href.length > 1;
  });

  if (!navLinks.length) return;

  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(l => l.classList.remove("active"));

        const active = navLinks.find(
          l => l.getAttribute("href") === `#${entry.target.id}`
        );
        if (active) active.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
  );

  sections.forEach(s => navObserver.observe(s));
});
