/* =========================
   MOTION & INTERACTION LAYER
   ========================= */

/* Smooth scroll on route change */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Disable double clicks on buttons */
function lockButtons() {
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.disabled = true;
      setTimeout(() => (btn.disabled = false), 500);
    });
  });
}

/* Card press feedback */
function enableCardInteraction() {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousedown", () => {
      card.style.transform += " scale(0.98)";
    });

    card.addEventListener("mouseup", () => {
      card.style.transform = card.style.transform.replace(" scale(0.98)", "");
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = card.style.transform.replace(" scale(0.98)", "");
    });
  });
}

/* Run after each SPA render */
function runMotionEnhancements() {
  scrollToTop();
  lockButtons();
  enableCardInteraction();
}
