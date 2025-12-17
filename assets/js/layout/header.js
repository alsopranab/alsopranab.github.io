/**
 * Header Layout Controller (FINAL — MINIMAL & STABLE)
 * ==================================================
 * Purpose:
 * - Always render a visible navbar
 * - Depend ONLY on profile.json
 * - Never block page rendering
 * - Resume handled via data-action
 */

window.addEventListener("app:ready", () => {
  renderHeader().catch(err => {
    console.error("[Header] Failed to render", err);
  });
});

async function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  let name = "Pranab Debnath";

  try {
    const profile = await DataService.getProfile();
    if (profile?.identity?.fullName) {
      name = profile.identity.fullName;
    }
  } catch {
    /* silent fallback */
  }

  header.innerHTML = `
    <div class="header-container">

      <div class="header-name">
        ${escapeHTML(name)}
      </div>

      <nav class="header-nav" aria-label="Primary Navigation">
        <a href="index.html">Home</a>
        <a href="stats.html">Stats</a>
        <a href="#" data-action="resume">Resume</a>
      </nav>

    </div>
  `;
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
        "\"": "&quot;",
        "'": "&#39;"
      }[c]))
    : "";
}
