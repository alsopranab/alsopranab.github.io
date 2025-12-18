/**
 * Header Layout Controller (FINAL — LOCKED & STABLE)
 * =================================================
 * - Renders header with NAME ONLY (no role)
 * - Uppercase navigation (desktop + mobile)
 * - Fixed structure to prevent layout shift
 * - SPA-safe smooth scrolling
 * - Omniverse & motion compatible
 */

window.addEventListener("app:ready", async () => {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  /* -------------------------
     DEFAULT IDENTITY
  ------------------------- */
  let name = "Pranab Debnath";

  /* -------------------------
     PROFILE ENRICHMENT (NAME ONLY)
  ------------------------- */
  try {
    const profile = await DataService.getProfile();

    if (profile?.identity) {
      name =
        profile.identity.preferredName ||
        profile.identity.fullName ||
        name;
    }
  } catch {
    console.warn("[Header] Using fallback name");
  }

  /* -------------------------
     RENDER (LOCKED STRUCTURE)
  ------------------------- */
  headerEl.innerHTML = `
    <div class="header-container">

      <div class="header-identity">
        <div class="header-name">${escapeHTML(name)}</div>
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
   NAV BEHAVIOR (SPA SAFE, NO LAYOUT SHIFT)
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
