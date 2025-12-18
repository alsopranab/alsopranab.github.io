/**
 * UI Motion Engine — FINAL (CANONICAL & SAFE)
 */

(() => {
  const header = document.getElementById("site-header");
  const heroSection = document.getElementById("hero"); // ✅ FIXED ID

  if (!header || !heroSection) {
    console.warn("[Motion] header or hero missing");
    return;
  }

  let heroWrapper = null;
  let headerIdentity = null;
  let lastY = window.scrollY;
  let ticking = false;

  /* ================= HEADER READY ================= */
  window.addEventListener("header:ready", () => {
    heroWrapper = heroSection.querySelector(".hero-wrapper");
    headerIdentity = header.querySelector(".header-identity");

    if (!heroWrapper || !headerIdentity) {
      console.warn("[Motion] heroWrapper or headerIdentity missing");
      return;
    }

    headerIdentity.style.opacity = "0";
    headerIdentity.style.transform = "translateY(6px) scale(0.96)";
    headerIdentity.style.transition =
      "opacity 260ms ease, transform 260ms ease";
  });

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

  function handleHeaderAutoHide(y) {
    if (y > lastY && y > 120) header.classList.add("header-hidden");
    else header.classList.remove("header-hidden");
    lastY = y;
  }

  function handleHeroMorph(scrollY) {
    if (!heroWrapper || !headerIdentity) return;

    const heroHeight = heroSection.offsetHeight || 1;
    const progress = Math.min(scrollY / heroHeight, 1);

    document.documentElement.style.setProperty(
      "--hero-progress",
      progress.toFixed(3)
    );

    if (progress > 0.75) {
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
