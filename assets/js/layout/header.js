/**
 * Header Layout Controller (FINAL — FAIL SAFE)
 * ===========================================
 * Always renders navigation
 * Uses profile data when available
 * Never exits early
 */

window.addEventListener("app:ready", async () => {
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
        ${name}
      </div>

      <nav class="header-nav">
        <a href="index.html">Home</a>
        <a href="stats.html">Stats</a>
        <a href="#" data-action="resume">Resume</a>
      </nav>

    </div>
  `;
});
