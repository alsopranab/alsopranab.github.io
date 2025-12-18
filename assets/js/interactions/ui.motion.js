/**
 * UI Motion Engine — FINAL (CANONICAL, STABLE, PRODUCTION)
 * ======================================================
 * - Uses canonical section IDs
 * - Waits for header + home render
 * - Motion-safe (reduced-motion aware)
 * - Smooth, non-jittery behavior
 * - Mobile friendly
 * - Active nav highlighting (race-condition safe)
 */

(() => {
  "use strict";

  /* ================= ENV ================= */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  const header = document.getElementById("site-header");
  const heroSection = document.getElementById("hero-section");

  if (!header || !heroSection) {
    console.warn("[Motion] header or hero-section missing");
    return;
  }

  let heroWrapper = null;
  let headerIdentity = null;

  let lastY = window.scrollY;
  let ticking = false;

  /* ================= READY GATES ================= */

  window.addEventListener("header:ready", bindHeaderIdentity);
  window.addEventListener("home:ready", bindHeroWrapper);

  function bindHeaderIdentity() {
    headerIdentity = header.querySelector(".header-identity");
    if (!headerIdentity) return;

    headerIdentity.style.opacity = "0";
    headerIdentity.style.transform = "translateY(6px) scale(0.96)";
    headerIdentity.style.transition =
      "opacity 260ms ease, transform 260ms ease";
  }

  function bindHeroWrapper() {
    heroWrapper = heroSection.querySelector(".hero-wrapper");
  }

  /* ================= SCROLL LOOP ================= */

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          handleHeaderAutoHide(y);
          handleHeroMorph(y);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  /* ================= HEADER AUTO HIDE ================= */

  function handleHeaderAutoHide(y) {
    const delta = y - lastY;

    // Deadzone prevents jitter
    if (Math.abs(delta) < 6) return;

    if (y > lastY && y > 120) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }

    lastY = y;
  }

  /* ================= HERO MORPH ================= */

  function handleHeroMorph(scrollY) {
    if (!heroWrapper || !headerIdentity || scrollY < 1) return;

    const heroHeight = heroSection.offsetHeight || 1;
    const progress = Math.min(scrollY / heroHeight, 1);

    document.documentElement.style.setProperty(
      "--hero-progress",
      progress.toFixed(3)
    );

    if (progress > 0.72) {
      headerIdentity.style.opacity = "1";
      headerIdentity.style.transform = "translateY(0) scale(1)";
    } else {
      headerIdentity.style.opacity = "0";
      headerIdentity.style.transform = "translateY(6px) scale(0.96)";
    }
  }

  /* ================= SECTION REVEAL ================= */

  const revealObserver = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll("section.omniverse-section")
    .forEach(section => revealObserver.observe(section));
})();

/* ======================================================
   ACTIVE NAV TRACKER — HEADER SAFE
====================================================== */

window.addEventListener("header:ready", () => {
  const links = document.querySelectorAll(".header-nav a[href^='#']");
  if (!links.length) return;

  const sections = [...links]
    .map(link => {
      const id = link.getAttribute("href");
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        links.forEach(a => a.classList.remove("active"));

        const activeLink = document.querySelector(
          `.header-nav a[href="#${entry.target.id}"]`
        );

        if (activeLink) activeLink.classList.add("active");
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.01
    }
  );

  sections.forEach(section => observer.observe(section));
});
