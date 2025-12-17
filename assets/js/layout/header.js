/**
 * Header Layout Controller
 * ------------------------
 * Renders:
 * - Name
 * - Current role + company
 * - Primary navigation
 * - Social links
 *
 * No hardcoded data.
 */

(async function renderHeader() {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  const profile = await DataService.getProfile();
  const socials = await DataService.getSocials();

  if (!profile) return;

  const socialLinks = socials?.socials
    ?.map(
      (s) => `
      <a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">
        <span class="icon icon-${s.icon}"></span>
      </a>
    `
    )
    .join("");

  headerEl.innerHTML = `
    <div class="header-container">

      <div class="header-identity">
        <span class="header-name">${profile.name}</span>
        <span class="header-role">
          ${profile.currentRole.designation} @ ${profile.currentRole.company}
        </span>
      </div>

      <nav class="header-nav">
        <a href="index.html">Home</a>
        <a href="stats.html">Stats</a>
        <a href="resume.html">Resume</a>
        <a href="about.html">About</a>
      </nav>

      <div class="header-socials">
        ${socialLinks || ""}
      </div>

    </div>
  `;
})();
