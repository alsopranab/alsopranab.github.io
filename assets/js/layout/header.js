/**
 * Header Layout Controller (FINAL — NAV ONLY, LOCKED)
 * ==================================================
 * - NO name
 * - NO designation
 * - NAVIGATION ONLY
 * - Uppercase links
 * - SPA-safe smooth scroll
 * - Zero duplication
 * - Omniverse & motion compatible
 */

window.addEventListener("app:ready", () => {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  /* -------------------------
     RENDER — NAV ONLY
  ------------------------- */
  headerEl.innerHTML = `
    <div class="header-container">

      <nav class="header-nav" aria-label="Primary Navigation">
        <a href="#hero-section" data-nav>HOME</a>
        <a href="#projects-section" data-nav>PROJECTS</a>
        <a href="#contact-section" data-nav>CONTACT</a>
        <a href="#" data-action="resume">RESUME</a>
      </nav>

    </div>
  `;

  initNavBehavior();

  /* -------------------------
     LIFECYCLE EVENT
  ------------------------- */
  window.dispatchEvent(
    new CustomEvent("header:ready", {
      detail: { timestamp: Date.now() }
    })
  );
});

/* =====================================================
   NAV BEHAVIOR (SPA SAFE)
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
