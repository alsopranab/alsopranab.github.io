(function () {
  "use strict";

  /* ================= BOOTSTRAP ================= */

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

    const box = section.querySelector(".glass-box") || section;

    box.innerHTML = `
      <div class="hero-wrapper" data-omni-reveal>
        <h1>${escapeHTML(d.identity.fullName || "")}</h1>
        ${d.identity.headline ? `<p class="hero-tagline">${escapeHTML(d.identity.headline)}</p>` : ""}
        ${d.identity.summary ? `<p class="hero-summary">${escapeHTML(d.identity.summary)}</p>` : ""}
      </div>
    `;
  }

  /* ================= EXPERIENCE ================= */

  async function renderExperience() {
    const section = document.getElementById("experience-section");
    if (!section) return;

    const d = await DataService.getExperience();
    if (!Array.isArray(d?.timeline)) return;

    const box = section.querySelector(".glass-box") || section;

    box.innerHTML = `
      <h2>${escapeHTML(d.section?.title || "Experience")}</h2>
      ${d.timeline.flatMap(org =>
        (org.roles || []).map(role => renderRole(role, org.organization))
      ).join("")}
    `;
  }

  function renderRole(role, org) {
    const start = role.duration?.start?.year || "";
    const end =
      role.duration?.end?.status === "present"
        ? "Present"
        : role.duration?.end?.year || "";

    return `
      <div class="experience-role" data-omni-reveal>
        <strong>${escapeHTML(role.title || "")}</strong>
        <div class="experience-meta">
          ${org?.name ? escapeHTML(org.name) + " · " : ""}${start}${end ? " – " + end : ""}
        </div>
        ${
          Array.isArray(role.responsibilities)
            ? `<ul>${role.responsibilities.map(r => `<li>${escapeHTML(r)}</li>`).join("")}</ul>`
            : ""
        }
      </div>
    `;
  }

  /* ================= FEATURED ================= */

  async function renderFeatured() {
    const section = document.getElementById("featured-section");
    if (!section) return;

    const d = await DataService.getFeatured();
    if (!Array.isArray(d?.items)) return;

    const box = section.querySelector(".glass-box") || section;

    box.innerHTML = `
      <h2>${escapeHTML(d.section?.title || "Featured")}</h2>
      <div class="featured-list">
        ${d.items.map(renderFeaturedItem).join("")}
      </div>
    `;
  }

  function renderFeaturedItem(item) {
    return `
      <div class="featured-item" data-omni-reveal>
        ${
          item.media?.coverImage
            ? `<img src="${item.media.coverImage}" alt="${escapeHTML(item.media.alt || "")}" data-expandable>`
            : ""
        }
        <h3>${escapeHTML(item.project?.name || "")}</h3>
        <p>${escapeHTML(item.project?.description || "")}</p>
      </div>
    `;
  }

  /* ================= PROJECTS ================= */

  async function renderProjects() {
    const section = document.getElementById("projects-section");
    if (!section) return;

    const d = await DataService.getProjects();
    if (!Array.isArray(d?.categories)) return;

    const box = section.querySelector(".glass-box") || section;

    box.innerHTML = `
      <h2>${escapeHTML(d.section?.title || "Projects")}</h2>
      ${d.categories
        .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
        .map(cat => `
          <div class="project-category">
            <div class="project-category-title">${escapeHTML(cat.label || "")}</div>
            ${cat.projects.map(renderProjectCard).join("")}
          </div>
        `).join("")}
    `;
  }

  function renderProjectCard(p) {
    return `
      <div class="project-card" data-omni-reveal>
        <h4>${escapeHTML(p.project?.name || "")}</h4>
        <p>${escapeHTML(p.project?.summary || "")}</p>
        ${
          p.repository?.url
            ? `<a href="${p.repository.url}" target="_blank" rel="noopener">View on GitHub →</a>`
            : ""
        }
      </div>
    `;
  }

  /* ================= EDUCATION ================= */

  async function renderEducation() {
    const section = document.getElementById("education-section");
    if (!section) return;

    const d = await DataService.getEducation();
    if (!Array.isArray(d?.records)) return;

    const box = section.querySelector(".glass-box") || section;

    box.innerHTML = `
      <h2>${escapeHTML(d.section?.title || "Education")}</h2>
      ${d.records.map(r => `
        <div class="education-item" data-omni-reveal>
          <strong>${escapeHTML(r.institution || "")}</strong>
          <div>${escapeHTML(r.degree || "")}${r.field ? " — " + escapeHTML(r.field) : ""}</div>
          <div>${escapeHTML(r.start || "")} – ${escapeHTML(r.end || "")}</div>
          ${r.description ? `<p>${escapeHTML(r.description)}</p>` : ""}
        </div>
      `).join("")}
    `;
  }

  /* ================= CONTACT ================= */

  async function renderContact() {
    const section = document.getElementById("contact-section");
    if (!section) return;

    const d = await DataService.getContact();
    if (!d?.section) return;

    const box = section.querySelector(".glass-box") || section;

    box.innerHTML = `
      <div class="contact-panel" data-omni-reveal>
        <h2>${escapeHTML(d.section.title)}</h2>
        <p>${escapeHTML(d.section.description || "")}</p>
        ${
          d.primary?.email?.value
            ? `<a href="mailto:${escapeHTML(d.primary.email.value)}">${escapeHTML(d.primary.email.value)}</a>`
            : ""
        }
      </div>
    `;
  }

  /* ================= IMAGE VIEWER ================= */

  function bindImageViewer() {
    document.body.addEventListener("click", e => {
      const img = e.target.closest("img[data-expandable]");
      if (!img) return;
      openImageViewer(img.src, img.alt || "");
    });
  }

  function openImageViewer(src, alt) {
    if (document.getElementById("image-viewer-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "image-viewer-overlay";
    overlay.innerHTML = `
      <div class="image-viewer-backdrop"></div>
      <div class="image-viewer-panel">
        <button class="image-viewer-close">×</button>
        <img src="${src}" alt="${escapeHTML(alt)}">
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    overlay.addEventListener("click", e => {
      if (
        e.target.classList.contains("image-viewer-backdrop") ||
        e.target.classList.contains("image-viewer-close")
      ) {
        overlay.remove();
        document.body.style.overflow = "";
      }
    });
  }

  /* ================= UTIL ================= */

  function escapeHTML(str) {
    return typeof str === "string"
      ? str.replace(/[&<>"']/g, c =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
        )
      : "";
  }

})();
