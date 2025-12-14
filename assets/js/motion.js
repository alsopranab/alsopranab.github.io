/* =====================================================
   MOTION & INTERACTION LAYER
   macOS-STYLE · BUTTERY · SPA-SAFE · CHART-SAFE
===================================================== */

let fadeObserver = null;

/* =====================
   SCROLL CONTROL
   Instant on route change
===================== */
function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

/* =====================
   BUTTON INTERACTION
   Subtle system press
===================== */
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

/* =====================
   CARD INTERACTION
   Trackpad physics
   (Charts are EXCLUDED)
===================== */
function enhanceCards() {
  document.querySelectorAll(".card").forEach(card => {
    if (card.dataset.enhanced) return;
    card.dataset.enhanced = "true";

    // 🚫 HARD EXCLUDE chart cards
    if (card.classList.contains("chart-card")) return;

    card.addEventListener("pointerenter", () => {
      card.classList.add("hovered");
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("hovered");
      card.classList.remove("pressed");
    });

    card.addEventListener("pointerdown", () => {
      card.classList.add("pressed");
    });

    card.addEventListener("pointerup", () => {
      card.classList.remove("pressed");
    });
  });
}

/* =====================
   FADE-IN OBSERVER
   Sections ONLY (no cards, no charts)
===================== */
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

  document.querySelectorAll("section").forEach(el => {
    el.classList.remove("in-view");
    fadeObserver.observe(el);
  });
}

/* =====================
   MASTER RUNNER
   Called ONCE per route
===================== */
function runMotionEnhancements() {
  scrollToTop();
  enhanceButtons();
  enhanceCards();
  setupFadeObserver();
}
