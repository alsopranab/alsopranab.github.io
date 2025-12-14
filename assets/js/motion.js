/* =====================================================
   MOTION & INTERACTION LAYER
   macOS Dynamic Island · Buttery · SPA Safe
===================================================== */

/* =====================================================
   1. STATE
===================================================== */

let fadeObserver = null;
let lastScrollY = window.scrollY;
let headerVisible = true;

/* =====================================================
   2. SCROLL CONTROL
   (Instant on route change)
===================================================== */
function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

/* =====================================================
   3. DYNAMIC ISLAND HEADER BEHAVIOR
   Hide on scroll down, show on scroll up
===================================================== */
function setupDynamicHeader() {
  const header = document.querySelector(".dynamic-header");
  if (!header) return;

  // Prevent duplicate listeners (SPA safe)
  if (header.dataset.bound) return;
  header.dataset.bound = "true";

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;

    // Always show near top
    if (currentY < 40) {
      showHeader(header);
      lastScrollY = currentY;
      return;
    }

    if (currentY > lastScrollY + 8 && headerVisible) {
      hideHeader(header);
    } else if (currentY < lastScrollY - 8 && !headerVisible) {
      showHeader(header);
    }

    lastScrollY = currentY;
  });
}

function hideHeader(header) {
  header.style.transform = "translateX(-50%) translateY(-120%)";
  header.style.opacity = "0";
  headerVisible = false;
}

function showHeader(header) {
  header.style.transform = "translateX(-50%) translateY(0)";
  header.style.opacity = "1";
  headerVisible = true;
}

/* =====================================================
   4. BUTTON INTERACTION
   macOS system press feel
===================================================== */
function enhanceButtons() {
  document.querySelectorAll("button").forEach(btn => {
    if (btn.dataset.enhanced) return;
    btn.dataset.enhanced = "true";

    btn.addEventListener("pointerdown", () => {
      btn.classList.add("pressed");
    });

    btn.addEventListener("pointerup", () => {
      btn.classList.remove("pressed");
    });

    btn.addEventListener("pointerleave", () => {
      btn.classList.remove("pressed");
    });
  });
}

/* =====================================================
   5. CARD INTERACTION
   Trackpad-like physics
   (Charts EXCLUDED)
===================================================== */
function enhanceCards() {
  document.querySelectorAll(".card").forEach(card => {
    if (card.dataset.enhanced) return;
    card.dataset.enhanced = "true";

    // HARD EXCLUDE chart containers
    if (card.classList.contains("chart-card")) return;

    card.addEventListener("pointerdown", () => {
      card.classList.add("pressed");
    });

    card.addEventListener("pointerup", () => {
      card.classList.remove("pressed");
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("pressed");
    });
  });
}

/* =====================================================
   6. FADE-IN OBSERVER
   Sections ONLY (no cards, no charts)
===================================================== */
function setupFadeObserver() {
  if (fadeObserver) {
    fadeObserver.disconnect();
    fadeObserver = null;
  }

  fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  document.querySelectorAll("section").forEach(section => {
    section.classList.remove("in-view");
    fadeObserver.observe(section);
  });
}

/* =====================================================
   7. MASTER RUNNER
   Call ONCE per route
===================================================== */
function runMotionEnhancements() {
  scrollToTop();
  setupDynamicHeader();
  enhanceButtons();
  enhanceCards();
  setupFadeObserver();
}
