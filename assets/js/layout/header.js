/**
 * Header Layout Controller (FINAL — LOCKED & STABLE)
 * =================================================
 * - Renders header with NAME ONLY (no role, no subtitle)
 * - Navigation ALWAYS uppercase (desktop + mobile)
 * - Fixed DOM structure (no layout shift)
 * - SPA-safe smooth scrolling
 * - Compatible with Omniverse + motion engines
 */

window.addEventListener("app:ready", async () => {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  /* -------------------------
     NAME ONLY (NO ROLE)
  ------------------------- */
  let name = "Pranab Debnath";

  try {
    const profile = await DataService.getProfile();
    if (profile?.identity) {
      name =
        profile.identity.preferredName ||
        profile.identity.fullName ||
        name;
    }
  } catch {
    // silent fallback — no console noise
  }

  /* -------------------------
     RENDER (LOCKED STRUCTURE)
  ------------------------- */
  headerEl.innerHTML = `
    <div class="header-container">

      <div class="header-identity">
        <span class="header-name">${escapeHTML(name)}</span>
      </div>

      <nav class="header-nav" aria-label="Primary Navigation">
        <a href="#hero-section" data-nav>HOME</a>
        <a href="#projects-section" data-nav>PROJECTS</a>
        <a href="#contact-section" data-nav>CONTACT</a>
        <a href="#" data-action="resume">RESUME</a>
      </nav>

    </div>
  `;

  initNavBehavior();

  window.dispatchEvent(
    new CustomEvent("header:ready", {
      detail: { timestamp: Date.now() }
    })
  );
});

/* =====================================================
   NAV BEHAVIOR — SPA SAFE
===================================================== */
function initNavBehavior() {
  document.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

/* =========================
   UTIL
========================= */
function escapeHTML(str) {
  return typeof str === "string"
    ? str.replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[c])
    : "";
}
