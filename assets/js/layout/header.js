/**
 * Header Layout Controller (FINAL — HARD FAIL SAFE)
 * ================================================
 * - Always renders header + navigation
 * - Uses profile.json if available
 * - Never exits early
 * - CSS-compatible with current layout
 * - Resume click works
 */

window.addEventListener("app:ready", async () => {
  const header = document.getElementById("site-header");
  if (!header) return;

  let name = "Pranab Debnath";
  let role = "Data Analyst";

  try {
    const profile = await DataService.getProfile();

    if (profile?.identity) {
      name =
        profile.identity.fullName ||
        profile.identity.preferredName ||
        name;

      role =
        profile.identity.headline ||
        role;
    }
  } catch {
    /* silent fallback */
  }

  header.innerHTML = `
    <div class="header-container">

      <div class="header-identity">
        <div class="header-name">${name}</div>
        <div class="header-role">${role}</div>
      </div>

      <nav class="header-nav" aria-label="Primary Navigation">
        <a href="index.html">Home</a>
        <a href="stats.html">Stats</a>
        <a href="#" data-action="resume">Resume</a>
      </nav>

    </div>
  `;
});
