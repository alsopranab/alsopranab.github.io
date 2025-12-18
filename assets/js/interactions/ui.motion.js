/**
 * UI Motion Engine — FINAL (APPLE CANONICAL)
 * =========================================
 * Handles:
 * - Header auto-hide
 * - Hero → Header morph (one-time)
 * - Section reveal animation
 *
 * Single scroll loop
 * Single source of truth
 * Safari-safe
 */

(() => {
  const header = document.getElementById("site-header");
  const heroSection = document.getElementById("hero-section");

  if (!header || !heroSection) return;

  let heroWrapper;
  let headerIdentity;
  let lastY = window.scrollY;
  let ticking = false;
  let hasMorphed = false;

  /* =============================
     INIT AFTER HEADER READY
  ============================= */
  window.addEventListener("header:ready", () => {
    heroWrapper = heroSection.querySelector(".hero-wrapper");
    headerIdentity = header.querySelector(".header-identity");

    if (!heroWrapper || !headerIdentity) return;

    // Hide header identity initially
    headerIdentity.style.opacity = "0";
    headerIdentity.style.transform = "translateY(6px)";
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
          handleHeroMorph();
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
     HERO → HEADER MORPH (ONCE)
  ============================= */
  function handleHeroMorph() {
    if (hasMorphed || !heroWrapper || !headerIdentity) return;

    const rect = heroWrapper.getBoundingClientRect();

    if (rect.bottom < window.innerHeight * 0.55) {
      morphHeroToHeader();
      hasMorphed = true;
    }
  }

  function morphHeroToHeader() {
    const heroTitle = heroWrapper.querySelector("h1");
    const heroTagline = heroWrapper.querySelector(".hero-tagline");

    if (!heroTitle) return;

    const clone = document.createElement("div");
    clone.className = "hero-morph-clone";
    clone.innerHTML = `
      <div class="hero-morph-name">${heroTitle.textContent}</div>
      ${
        heroTagline
          ? `<div class="hero-morph-role">${heroTagline.textContent}</div>`
          : ""
      }
    `;

    document.body.appendChild(clone);

    const from = heroTitle.getBoundingClientRect();
    const to = headerIdentity.getBoundingClientRect();

    clone.style.position = "fixed";
    clone.style.left = `${from.left}px`;
    clone.style.top = `${from.top}px`;
    clone.style.width = `${from.width}px`;
    clone.style.zIndex = "999";
    clone.style.pointerEvents = "none";
    clone.style.transition =
      "transform 520ms cubic-bezier(0.22,1,0.36,1), opacity 260ms ease";

    const scale =
      headerIdentity.offsetHeight / heroTitle.offsetHeight;

    const dx = to.left - from.left;
    const dy = to.top - from.top;

    requestAnimationFrame(() => {
      clone.style.transform = `
        translate(${dx}px, ${dy}px)
        scale(${scale})
      `;
      clone.style.opacity = "0";
    });

    setTimeout(() => {
      clone.remove();
      headerIdentity.style.opacity = "1";
      headerIdentity.style.transform = "translateY(0)";
    }, 520);
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
