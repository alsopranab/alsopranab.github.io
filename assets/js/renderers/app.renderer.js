(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", async () => {
    try {
      await DataService.preloadAll();
      renderHome();
    } catch (e) {
      console.error("App render failed", e);
    }
  });

  function renderHome() {
    renderHero();
    renderExperience();
    renderFeatured();
    renderProjects();
    renderEducation();
    renderContact();
    bindImageViewer();
  }

  async function renderHero() {
    const section = document.getElementById("hero-section");
    if (!section) return;

    const d = await DataService.getProfile();
    if (!d?.identity) return;

    section.innerHTML = `
      <div class="hero-wrapper">
        <h1>${escape(d.identity.fullName || "")}</h1>
        ${d.identity.headline ? `<p class="hero-tagline">${escape(d.identity.headline)}</p>` : ""}
        ${d.identity.summary ? `<p class="hero-summary">${escape(d.identity.summary)}</p>` : ""}
      </div>
    `;
  }

  async function renderExperience() {
    const section = document.getElementById("experience-section");
    if (!section) return;

    const d = await DataService.getExperience();
    if (!Array.isArray(d?.timeline)) return;

    ensureHeading(section, d.section?.title || "Experience");

    section.innerHTML += d.timeline
      .flatMap(org =>
        (org.roles || []).map(role => renderRole(role, org.organization))
      )
      .join("");
  }

  function renderRole(role, org) {
    const start = role.duration?.start?.year || "";
    const end =
      role.duration?.end?.status === "present"
        ? "Present"
        : role.duration?.end?.year || "";

    return `
      <div class="experience-role" data-omni-reveal>
        <strong>${escape(role.title || "")}</strong>
        <div class="experience-meta">
          ${org?.name ? escape(org.name) + " · " : ""}${start}${end ? " – " + end : ""}
        </div>
        ${
          Array.isArray(role.responsibilities)
            ? `<ul>${role.responsibilities.map(r => `<li>${escape(r)}</li>`).join("")}</ul>`
            : ""
        }
      </div>
    `;
  }

  async function renderFeatured() {
    const section = document.getElementById("featured-section");
    if (!section) return;

    const d = await DataService.getFeatured();
    if (!Array.isArray(d?.items)) return;

    ensureHeading(section, d.section?.title || "Featured");

    section.innerHTML += `
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
            ? `<img src="${item.media.coverImage}" alt="${escape(item.media.alt || "")}" data-expandable>`
            : ""
        }
        <h3>${escape(item.project?.name || "")}</h3>
        <p>${escape(item.project?.description || "")}</p>
      </div>
    `;
  }

  async function renderProjects() {
    const section = document.getElementById("projects-section");
    if (!section) return;

    const d = await DataService.getProjects();
    if (!Array.isArray(d?.categories)) return;

    ensureHeading(section, d.section?.title || "Projects");

    d.categories
      .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
      .forEach(cat => {
        section.innerHTML += `
          <div class="project-category">
            <div class="project-category-title">${escape(cat.label || "")}</div>
            ${cat.projects.map(renderProjectCard).join("")}
          </div>
        `;
      });
  }

  function renderProjectCard(p) {
    return `
      <div class="project-card" data-omni-reveal>
        <h4>${escape(p.project?.name || "")}</h4>
        <p>${escape(p.project?.summary || "")}</p>
        ${
          p.repository?.url
            ? `<a href="${p.repository.url}" target="_blank" rel="noopener">View on GitHub →</a>`
            : ""
        }
      </div>
    `;
  }

  async function renderEducation() {
    const section = document.getElementById("education-section");
    if (!section) return;

    const d = await DataService.getEducation();
    if (!Array.isArray(d?.records)) return;

    ensureHeading(section, d.section?.title || "Education");

    d.records.forEach(r => {
      section.innerHTML += `
        <div class="education-item" data-omni-reveal>
          <strong>${escape(r.institution || "")}</strong>
          <div>${escape(r.degree || "")}${r.field ? " — " + escape(r.field) : ""}</div>
          <div>${escape(r.start || "")} – ${escape(r.end || "")}</div>
          ${r.description ? `<p>${escape(r.description)}</p>` : ""}
        </div>
      `;
    });
  }

  async function renderContact() {
    const section = document.getElementById("contact-section");
    if (!section) return;

    const d = await DataService.getContact();
    if (!d?.section) return;

    section.innerHTML = `
      <div class="contact-panel">
        <h2>${escape(d.section.title)}</h2>
        <p>${escape(d.section.description || "")}</p>
        ${
          d.primary?.email?.value
            ? `<a href="mailto:${escape(d.primary.email.value)}">${escape(d.primary.email.value)}</a>`
            : ""
        }
      </div>
    `;
  }

  function ensureHeading(section, text) {
    if (!section.querySelector("h2")) {
      const h = document.createElement("h2");
      h.textContent = text;
      section.prepend(h);
    }
  }

  function escape(str) {
    return typeof str === "string"
      ? str.replace(/[&<>"']/g, c =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
        )
      : "";
  }

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
        <img src="${src}" alt="${escape(alt)}">
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
})();
