/**
 * Header Layout Controller (FINAL — NAV ONLY)
 * ==========================================
 * - NO name
 * - NO role
 * - ONLY uppercase navigation
 * - Zero layout shift
 * - SPA-safe
 */

window.addEventListener("app:ready", () => {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

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

  window.dispatchEvent(
    new CustomEvent("header:ready", {
      detail: { timestamp: Date.now() }
    })
  );
});

/* =========================
   NAV BEHAVIOR
========================= */
function initNavBehavior() {
  document.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      if (!targetId?.startsWith("#")) return;

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
