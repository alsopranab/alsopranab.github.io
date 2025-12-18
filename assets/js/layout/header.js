/**
 * Header Layout Controller (FINAL — SPA & CONTROLLER SAFE)
 * =======================================================
 * - Always renders header + navigation
 * - Enhances with profile.json when available
 * - Uses canonical section IDs
 * - Resume handled by Resume Controller
 * - Smooth scroll (SPA-safe)
 * - Fully compatible with omniverse layout
 */

window.addEventListener("app:ready", async () => {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  /* -------------------------
     DEFAULT FALLBACK CONTENT
  ------------------------- */
  let name = "Pranab Debnath";
  let role = "Data Analyst";

  /* -------------------------
     PROFILE ENRICHMENT
  ------------------------- */
  try {
    const profile = await DataService.getProfile();

    if (profile?.identity) {
      name =
        profile.identity.preferredName ||
        profile.identity.fullName ||
        name;

      role =
        profile.identity.headline ||
        role;
    }
  } catch {
    console.warn("[Header] Using fallback identity");
  }

  /* -------------------------
     RENDER (CANONICAL IDS)
  ------------------------- */
  headerEl.innerHTML = `
    <div class="header-container">

      <div class="header-identity">
        <div class="header-name">${escapeHTML(name)}</div>
        <div class="header-role">${escapeHTML(role)}</div>
      </div>

      <nav class="header-nav" aria-label="Primary Navigation">
        <a href="#hero-section" data-nav>Home</a>
        <a href="#projects-section" data-nav>Projects</a>
        <a href="#contact-section" data-nav>Contact</a>
        <a href="#" data-action="resume">Resume</a>
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
