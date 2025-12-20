(function () {
  "use strict";

  /* ================= BOOT ================= */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  async function init() {
    try {
      if (!window.DataService) {
        console.error("[Renderer] DataService missing");
        return;
      }

      await DataService.preloadAll();
      renderHome();

      console.log("[Renderer] Home rendered");
    } catch (e) {
      console.error("[Renderer] Fatal render error", e);
    }
  }

  /* ================= HOME ================= */

  function renderHome() {
    renderHero();
    renderExperience();
    renderFeatured();
    renderProjects();
    renderEducation();
    renderContact();
    bindImageViewer();
  }

  /* ================= HERO ================= */

  async function renderHero() {
    const section = document.getElementById("hero-section");
    if (!section) return;

    const d = await DataService.getProfile();
    if (!d?.identity) return;

    const box = section.querySelector(".glass-box");
    if (!box) return;

    box.innerHTML = `
      <div class="hero-wrapper" data-omni-reveal>
        <h1>${escapeHTML(d.identity.fullName)}</h1>
        <p class="hero-tagline">${escapeHTML(d.identity.headline || "")}</p>
        <p class="hero-summary">${escapeHTML(d.identity.summary || "")}</p>
      </div>
    `;
  }

  /* ================= EXPERIENCE ================= */

  async function renderExperience() {
    const section = document.getElementById("experience-section");
    if (!section) return;

    const d = await DataService.getExperience();
    if (!Array.isArray(d?.timeline)) return;

    section.innerHTML = `
      <div class="glass-box">
        <h2>${escapeHTML(d.section?.title || "Experience")}</h2>
        ${d.timeline.flatMap(org =>
          (org.roles || []).map(role => renderRole(role, org.organization))
        ).join("")}
      </div>
    `;
  }

  function renderRole(role, org) {
    return `
      <div class="experience-role" data-omni-reveal>
        <strong>${escapeHTML(role.title)}</strong>
        <div class="experience-meta">
          ${escapeHTML(org?.name || "")}
        </div>
        <ul>
          ${(role.responsibilities || []).map(r =>
            `<li>${escapeHTML(r)}</li>`
          ).join("")}
        </ul>
      </div>
    `;
  }

  /* ================= FEATURED ================= */

  async function renderFeatured() {
    const section = document.getElementById("featured-section");
    if (!section) return;

    const d = await DataService.getFeatured();
    if (!Array.isArray(d?.items)) return;

    section.innerHTML = `
      <div class="glass-box">
        <h2>${escapeHTML(d.section?.title || "Featured")}</h2>
        ${d.items.map(item => `
          <div class="featured-item" data-omni-reveal>
            <h3>${escapeHTML(item.project?.name)}</h3>
            <p>${escapeHTML(item.project?.description)}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  /* ================= PROJECTS ================= */

  async function renderProjects() {
    const section = document.getElementById("projects-section");
    if (!section) return;

    const d = await DataService.getProjects();
    if (!Array.isArray(d?.categories)) return;

    section.innerHTML = `
      <div class="glass-box">
        <h2>${escapeHTML(d.section?.title || "Projects")}</h2>
        ${d.categories.map(cat => `
          <h3>${escapeHTML(cat.label)}</h3>
          ${cat.projects.map(p => `
            <div class="project-card" data-omni-reveal>
              <strong>${escapeHTML(p.project?.name)}</strong>
              <p>${escapeHTML(p.project?.summary)}</p>
            </div>
          `).join("")}
        `).join("")}
      </div>
    `;
  }

  /* ================= EDUCATION ================= */

  async function renderEducation() {
    const section = document.getElementById("education-section");
    if (!section) return;

    const d = await DataService.getEducation();
    if (!Array.isArray(d?.records)) return;

    section.innerHTML = `
      <div class="glass-box">
        <h2>${escapeHTML(d.section?.title || "Education")}</h2>
        ${d.records.map(r => `
          <div data-omni-reveal>
            <strong>${escapeHTML(r.institution)}</strong>
            <p>${escapeHTML(r.degree)} — ${escapeHTML(r.field)}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  /* ================= CONTACT ================= */

  async function renderContact() {
    const section = document.getElementById("contact-section");
    if (!section) return;

    const d = await DataService.getContact();
    if (!d?.section) return;

    section.innerHTML = `
      <div class="glass-box" data-omni-reveal>
        <h2>${escapeHTML(d.section.title)}</h2>
        <p>${escapeHTML(d.section.description)}</p>
        <a href="mailto:${d.primary.email.value}">
          ${escapeHTML(d.primary.email.value)}
        </a>
      </div>
    `;
  }

  /* ================= UTIL ================= */

  function bindImageViewer() {}

  function escapeHTML(str) {
    return typeof str === "string"
      ? str.replace(/[&<>"']/g, c =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
        )
      : "";
  }

})();
