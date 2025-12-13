/* =========================
   MOTION & INTERACTION LAYER
   (SPA SAFE)
========================= */

/* ---------- SCROLL ---------- */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- BUTTON LOCK (SAFE) ---------- */
function lockActionButtons() {
  document.querySelectorAll("button").forEach(btn => {
    if (btn.dataset.locked) return;

    btn.dataset.locked = "true";

    btn.addEventListener("click", () => {
      if (btn.dataset.busy === "true") return;

      btn.dataset.busy = "true";
      setTimeout(() => {
        btn.dataset.busy = "false";
      }, 300);
    });
  });
}

/* ---------- CARD PRESS FEEDBACK ---------- */
function enableCardInteraction() {
  document.querySelectorAll(".card").forEach(card => {
    if (card.dataset.interactive) return;

    card.dataset.interactive = "true";

    card.addEventListener("mousedown", () => {
      card.classList.add("pressed");
    });

    card.addEventListener("mouseup", () => {
      card.classList.remove("pressed");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("pressed");
    });
  });
}

/* ---------- MASTER RUNNER ---------- */
function runMotionEnhancements() {
  scrollToTop();
  lockActionButtons();
  enableCardInteraction();
}
