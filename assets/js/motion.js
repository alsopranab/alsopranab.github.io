/* =====================================================
   MOTION & INTERACTION LAYER
   SPA-SAFE · SUBTLE · PROFESSIONAL
===================================================== */

/* =====================
   SCROLL CONTROL
===================== */
function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

/* =====================
   BUTTON INTERACTION LOCK
   Prevents double-trigger in SPA
===================== */
function lockActionButtons() {
  document.querySelectorAll("button").forEach(btn => {
    if (btn.dataset.locked === "true") return;

    btn.dataset.locked = "true";

    btn.addEventListener("click", () => {
      if (btn.dataset.busy === "true") return;

      btn.dataset.busy = "true";
      btn.classList.add("btn-busy");

      setTimeout(() => {
        btn.dataset.busy = "false";
        btn.classList.remove("btn-busy");
      }, 300);
    });
  });
}

/* =====================
   CARD MICRO-INTERACTIONS
===================== */
function enableCardInteraction() {
  document.querySelectorAll(".card").forEach(card => {
    if (card.dataset.interactive === "true") return;

    card.dataset.interactive = "true";

    // Press feedback
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

/* =====================
   FADE-IN ON VIEW (SPA SAFE)
===================== */
function observeFadeIn() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll("section, .card")
    .forEach(el => {
      if (!el.classList.contains("fade-in")) {
        observer.observe(el);
      }
    });
}

/* =====================
   MASTER RUNNER
   Called ONCE per route
===================== */
function runMotionEnhancements() {
  scrollToTop();
  lockActionButtons();
  enableCardInteraction();
  observeFadeIn();
}
