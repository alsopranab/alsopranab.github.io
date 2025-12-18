/**
 * UI Motion Engine — FINAL (APPLE CANONICAL)
 * =========================================
 * Handles:
 * - Header auto-hide
 * - Hero → Header morph (continuous)
 * - Section reveal animation
 *
 * No clones
 * No DOM mutation
 * Safari-safe
 */

(() => {
  const header = document.getElementById("site-header");
  const heroSection = document.getElementById("hero-section");

  if (!header || !heroSection) return;

  let heroWrapper = null;
  let headerIdentity = null;

  let lastY = window.scrollY;
  let ticking = false;

  /* =============================
     INIT AFTER HEADER READY
  ============================= */
  window.addEventListener("header:ready", () => {
    heroWrapper = heroSection.querySelector(".hero-wrapper");
    headerIdentity = header.querySelector(".header-identity");

    if (!heroWrapper || !headerIdentity) return;

    // Header identity hidden initially
    headerIdentity.style.opacity = "0";
    headerIdentity.style.transform = "translateY(6px) scale(0.96)";
    headerIdentity.style.transition =
      "opacity 260ms ease, transform 260ms ease";
  });

  /* =============================
     SCROLL LOOP (SINGLE SOURCE)
  ============================= */
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

  /* =============================
     HEADER AUTO-HIDE
  ============================= */
  function handleHeaderAutoHide(y) {
    if (y > lastY && y > 120) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
    lastY = y;
  }

  /* =============================
     HERO → HEADER MORPH (CONTINUOUS)
  ============================= */
  function handleHeroMorph(scrollY) {
    if (!heroWrapper || !headerIdentity) return;

    const heroHeight = heroSection.offsetHeight || 1;

    // Progress: 0 → 1
    const progress = Math.min(scrollY / heroHeight, 1);

    // Drive CSS variables
    document.documentElement.style.setProperty(
      "--hero-progress",
      progress.toFixed(3)
    );

    // Reveal header identity late (handoff moment)
    if (progress > 0.75) {
      headerIdentity.style.opacity = "1";
      headerIdentity.style.transform = "translateY(0) scale(1)";
    } else {
      headerIdentity.style.opacity = "0";
      headerIdentity.style.transform = "translateY(6px) scale(0.96)";
    }
  }

  /* =============================
     SECTION REVEAL
  ============================= */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll("section.omniverse-section")
    .forEach(section => revealObserver.observe(section));
})();
