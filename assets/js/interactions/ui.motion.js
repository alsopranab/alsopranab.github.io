/**
 * UI Motion Engine — FINAL PRODUCTION BUILD
 * =======================================
 * - Uses app:ready ONLY
 * - Never aborts if header is missing
 * - Hero motion auto-binds when rendered
 * - GPU-only transforms
 * - Mobile + Safari safe
 */

(() => {
  "use strict";

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let header = null;
  let headerIdentity = null;
  let heroWrapper = null;

  let lastScrollY = window.scrollY;
  let ticking = false;

  /* =====================================================
     BOOTSTRAP — SINGLE ENTRY POINT
  ===================================================== */

  window.addEventListener("app:ready", () => {
    header = document.getElementById("site-header");

    if (header) {
      headerIdentity = header.querySelector(".header-identity");

      if (headerIdentity) {
        headerIdentity.style.opacity = "0";
        headerIdentity.style.transform = "scale(0.96)";
        headerIdentity.style.transition =
          "opacity 240ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1)";
      }
    }

    bindHeroWrapper();
  });

  /* =====================================================
     HERO BINDING (SAFE, RETRY)
  ===================================================== */

  function bindHeroWrapper() {
    const heroSection = document.getElementById("hero-section");
    if (!heroSection) return;

    heroWrapper = heroSection.querySelector(".hero-wrapper");

    if (heroWrapper) {
      heroWrapper.style.willChange = "transform";
      return;
    }

    // Retry once renderer finishes
    requestAnimationFrame(bindHeroWrapper);
  }

  /* =====================================================
     SCROLL HANDLER
  ===================================================== */

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

  /* =====================================================
     HEADER MOTION (SAFE OPTIONAL)
  ===================================================== */

  function handleHeader(y) {
    if (!header) return;

    const delta = y - lastScrollY;
    if (Math.abs(delta) < 8) return;

    if (y > lastScrollY && y > 120) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
  }

  /* =====================================================
     HERO MOTION
  ===================================================== */

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
   ACTIVE NAV TRACKER — SAFE & OPTIONAL
====================================================== */

window.addEventListener("app:ready", () => {
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

  const observer = new IntersectionObserver(
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
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.01
    }
  );

  sections.forEach(section => observer.observe(section));
});
