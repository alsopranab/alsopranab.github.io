/* =====================================================
   MOTION & INTERACTION LAYER
   macOS-STYLE · BUTTERY · SPA-SAFE
===================================================== */

let fadeObserver = null;

/* =====================
   SCROLL CONTROL (SAFE)
===================== */
function scrollToTop() {
  // instant on route change to avoid motion sickness
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

/* =====================
   BUTTON INTERACTION
   No locks, just physics
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
   macOS trackpad feel
===================== */
function enhanceCards() {
  document.querySelectorAll(".card").forEach(card => {
    if (card.dataset.enhanced) return;
    card.dataset.enhanced = "true";

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
   SINGLE INSTANCE ONLY
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
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  document.querySelectorAll("section, .card").forEach(el => {
    el.classList.remove("in-view"); // reset on route change
    fadeObserver.observe(el);
  });
}

/* =====================
   MASTER RUNNER
   CALL ON EVERY ROUTE
===================== */
function runMotionEnhancements() {
  scrollToTop();
  enhanceButtons();
  enhanceCards();
  setupFadeObserver();
}
