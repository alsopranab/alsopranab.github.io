/**
 * UI Motion Engine — FINAL IMMUTABLE BUILD
 * ======================================
 * - Canonical section IDs
 * - Header fade + scale (no slide)
 * - Zero scroll-up lag
 * - Safari rubber-band safe
 * - Vision Pro easing compatible
 * - Active nav highlighting (fully sanitized)
 */

(() => {
  "use strict";

  /* ================= ENV ================= */

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const header = document.getElementById("site-header");
  const heroSection = document.getElementById("hero-section");

  if (!header || !heroSection) {
    console.warn("[Motion] header or hero-section missing");
    return;
  }

  let heroWrapper = null;
  let headerIdentity = null;

  let lastScrollY = window.scrollY;
  let ticking = false;

  /* ================= READY GATES ================= */

  window.addEventListener("header:ready", () => {
    headerIdentity = header.querySelector(".header-identity");
    if (!headerIdentity) return;

    headerIdentity.style.opacity = "0";
    headerIdentity.style.transform = "scale(0.96)";
    headerIdentity.style.transition =
      "opacity 240ms ease, transform 320ms cubic-bezier(0.25,0.8,0.25,1)";
  });

  window.addEventListener("home:ready", () => {
    heroWrapper = heroSection.querySelector(".hero-wrapper");
  });

  /* ================= SCROLL LOOP ================= */

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        handleHeaderVisibility(y);
        handleHeroProgress(y);

        lastScrollY = y;
        ticking = false;
      });
    },
    { passive: true }
  );

  /* ================= HEADER VISIBILITY ================= */

  function handleHeaderVisibility(y) {
    const delta = y - lastScrollY;

    // Deadzone eliminates rubber-band jitter
    if (Math.abs(delta) < 6) return;

    if (y > lastScrollY && y > 120) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
  }

  /* ================= HERO PROGRESS ================= */

  function handleHeroProgress(scrollY) {
    if (!heroWrapper || scrollY < 1) return;

    const heroHeight = heroSection.offsetHeight || 1;
    const progress = Math.min(scrollY / heroHeight, 1);

    document.documentElement.style.setProperty(
      "--hero-progress",
      progress.toFixed(3)
    );

    if (!headerIdentity) return;

    if (progress > 0.72) {
      headerIdentity.style.opacity = "1";
      headerIdentity.style.transform = "scale(1)";
    } else {
      headerIdentity.style.opacity = "0";
      headerIdentity.style.transform = "scale(0.96)";
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
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  document
    .querySelectorAll("section.omniverse-section")
    .forEach(section => revealObserver.observe(section));
})();

/* ======================================================
   ACTIVE NAV TRACKER — FINAL SAFE VERSION
   (Filters "#" + non-section actions)
====================================================== */

window.addEventListener("header:ready", () => {
  const navLinks = Array.from(
    document.querySelectorAll(".header-nav a[href^='#']")
  ).filter(link => {
    const href = link.getAttribute("href");
    return href && href.length > 1; // excludes "#"
  });

  if (!navLinks.length) return;

  const sections = navLinks
    .map(link => {
      const id = link.getAttribute("href");
      return document.querySelector(id);
    })
    .filter(Boolean);

  if (!sections.length) return;

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => link.classList.remove("active"));

        const activeLink = navLinks.find(
          link => link.getAttribute("href") === `#${entry.target.id}`
        );

        if (activeLink) activeLink.classList.add("active");
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.01
    }
  );

  sections.forEach(section => navObserver.observe(section));
});
