/**
 * Header Layout Controller (FINAL — SPA SAFE)
 * ==========================================
 * - Always renders header + navigation
 * - Enhances with profile.json when available
 * - No hard page reloads
 * - Resume opens external profile
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
  let resumeUrl = null;

  /* -------------------------
     TRY PROFILE ENRICHMENT
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

    if (profile?.resume?.externalProfile) {
      resumeUrl = profile.resume.externalProfile;
    }
  } catch (e) {
    console.warn("[Header] Using fallback identity");
  }

  /* -------------------------
     RENDER (ALWAYS)
  ------------------------- */
  headerEl.innerHTML = `
    <div class="header-container">

      <div class="header-identity">
        <div class="header-name">${escapeHTML(name)}</div>
        <div class="header-role">${escapeHTML(role)}</div>
      </div>

      <nav class="header-nav" aria-label="Primary Navigation">
        <a href="#hero-section">Home</a>
        <a href="#projects-section">Projects</a>
        <a href="#contact-section">Contact</a>
        ${
          resumeUrl
            ? `<a href="${resumeUrl}" target="_blank" rel="noopener">Resume</a>`
            : ""
        }
      </nav>

    </div>
  `;

  /* -------------------------
     LIFECYCLE EVENT
  ------------------------- */
  window.dispatchEvent(
    new CustomEvent("header:ready", {
      detail: { timestamp: Date.now() }
    })
  );
});

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
