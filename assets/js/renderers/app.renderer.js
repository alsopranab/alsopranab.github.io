/**
 * Unified App Renderer (FINAL — CANONICAL & IMMUTABLE)
 * ==================================================
 * - Runs ONLY after home:ready
 * - Reads ONLY dataset.source
 * - Matches CSS layout contracts exactly
 * - Zero duplication (footer-safe)
 * - Never breaks on partial data
 * - Preserves static hero dashboard
 */

window.addEventListener("home:ready", () => {
  console.log("[Renderer] home:ready received");

  renderHero();
  renderExperience();
  renderFeatured();
  renderProjects();
  renderEducation();
  renderContact();
});

/* ============================================================
   HERO — HYBRID (STATIC + DYNAMIC SAFE)
============================================================ */

function renderHero() {
  const section = document.getElementById("hero-section");
  const d = getData(section);
  if (!d?.identity) return;

  let wrapper = section.querySelector(".hero-wrapper");

  // Create wrapper if missing, never replace section
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "hero-wrapper";
    section.prepend(wrapper);
  }

  wrapper.innerHTML = `
    <h1>${escape(d.identity.fullName || "")}</h1>
    ${
      d.identity.headline
        ? `<p class="hero-tagline">${escape(d.identity.headline)}</p>`
        : ""
    }
    ${
      d.identity.summary
        ? `<p class="hero-summary">${escape(d.identity.summary)}</p>`
        : ""
    }
  `;
}

/* ============================================================
   EXPERIENCE
============================================================ */

function renderExperience() {
  const section = document.getElementById("experience-section");
  const d = getData(section);
  if (!Array.isArray(d?.timeline)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Experience")}</h2>
    <div class="experience-list">
      ${d.timeline.map(renderOrganization).join("")}
    </div>
  `;
}

function renderOrganization(org) {
  if (!org?.organization) return "";

  return `
    <div class="experience-company">
      <h3>${escape(org.organization.name || "")}</h3>
      ${Array.isArray(org.roles) ? org.roles.map(renderRole).join("") : ""}
    </div>
  `;
}

function renderRole(role) {
  if (!role) return "";

  const start = role.duration?.start?.year || "";
  const end =
    role.duration?.end?.status === "present"
      ? "Present"
      : role.duration?.end?.year || "";

  return `
    <div class="experience-role">
      <strong>${escape(role.title || "")}</strong>
      <span>${start}${end ? " – " + end : ""}</span>
      ${
        Array.isArray(role.responsibilities)
          ? `<ul>${role.responsibilities
              .map(r => `<li>${escape(r)}</li>`)
              .join("")}</ul>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   FEATURED
============================================================ */

function renderFeatured() {
  const section = document.getElementById("featured-section");
  const d = getData(section);
  if (!Array.isArray(d?.items)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Featured")}</h2>
    <div class="featured-list">
      ${d.items.map(renderFeaturedItem).join("")}
    </div>
  `;
}

function renderFeaturedItem(item) {
  if (!item?.project) return "";

  return `
    <div class="featured-item">
      ${
        item.media?.coverImage
          ? `
            <div class="media-frame">
              <img src="${item.media.coverImage}" alt="${escape(
                item.media.alt || ""
              )}">
            </div>
          `
          : ""
      }
      <div>
        <h3>${escape(item.project.name || "")}</h3>
        <p>${escape(item.project.description || "")}</p>
      </div>
    </div>
  `;
}

/* ============================================================
   PROJECTS
============================================================ */

function renderProjects() {
  const section = document.getElementById("projects-section");
  const d = getData(section);
  if (!Array.isArray(d?.categories)) return;

  const categories = [...d.categories].sort(
    (a, b) => (a.priority ?? 99) - (b.priority ?? 99)
  );

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Projects")}</h2>
    ${categories.map(renderProjectCategory).join("")}
  `;
}

function renderProjectCategory(category) {
  if (!Array.isArray(category.projects)) return "";

  return `
    <div class="project-category">
      <h3>${escape(category.label || "")}</h3>
      ${category.projects.map(renderProjectCard).join("")}
    </div>
  `;
}

function renderProjectCard(p) {
  if (!p?.project) return "";

  return `
    <div class="project-card">
      <h4>${escape(p.project.name || "")}</h4>
      <p>${escape(p.project.summary || "")}</p>
      ${
        p.repository?.url
          ? `<a href="${p.repository.url}" target="_blank" rel="noopener">
              View on GitHub →
            </a>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   EDUCATION
============================================================ */

function renderEducation() {
  const section = document.getElementById("education-section");
  const d = getData(section);
  if (!Array.isArray(d?.records)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Education")}</h2>
    ${d.records.map(renderEducationItem).join("")}
  `;
}

function renderEducationItem(r) {
  return `
    <div class="education-item">
      <strong>${escape(r.institution || "")}</strong>
      ${
        r.degree || r.field
          ? `<div>${escape(r.degree || "")}${
              r.field ? " — " + escape(r.field) : ""
            }</div>`
          : ""
      }
      <div>${escape(r.start || "")} – ${escape(r.end || "")}</div>
      ${r.description ? `<p>${escape(r.description)}</p>` : ""}
      ${
        Array.isArray(r.highlights)
          ? `<ul>${r.highlights
              .map(h => `<li>${escape(h)}</li>`)
              .join("")}</ul>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   CONTACT
============================================================ */

function renderContact() {
  const section = document.getElementById("contact-section");
  const d = getData(section);
  if (!d?.section) return;

  section.innerHTML = `
    <div class="contact-panel">
      <div class="contact-grid">

        <div>
          <h2>${escape(d.section.title || "Contact")}</h2>
          ${
            d.section.subtitle
              ? `<div class="contact-tagline">
                  ${escape(d.section.subtitle)}
                </div>`
              : ""
          }
        </div>

        <div class="contact-description">
          ${
            d.section.description
              ? `<p>${escape(d.section.description)}</p>`
              : ""
          }
        </div>

        <div class="contact-email">
          ${
            d.primary?.email?.value
              ? `<a href="mailto:${escape(d.primary.email.value)}">
                  ${escape(d.primary.email.value)}
                </a>`
              : ""
          }
        </div>

      </div>
    </div>
  `;
}

/* ============================================================
   HELPERS
============================================================ */

function getData(section) {
  if (!section?.dataset?.source) return null;
  try {
    return JSON.parse(section.dataset.source);
  } catch {
    return null;
  }
}

function escape(str) {
  return typeof str === "string"
    ? str.replace(/[&<>"']/g, c =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
      )
    : "";
}

/* ============================================================
   IMAGE VIEWER — SAFE, GLOBAL, IMMUTABLE
============================================================ */

window.addEventListener("home:ready", () => {
  document.body.addEventListener("click", e => {
    const img = e.target.closest("img[data-expandable]");
    if (!img) return;

    openImageViewer(img.src, img.alt || "");
  });
});

function openImageViewer(src, alt) {
  if (document.getElementById("image-viewer-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "image-viewer-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  overlay.innerHTML = `
    <div class="image-viewer-backdrop"></div>
    <div class="image-viewer-panel">
      <button class="image-viewer-close" aria-label="Close image">×</button>
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
      closeImageViewer();
    }
  });

  window.addEventListener("keydown", onImageViewerKey);
}

function closeImageViewer() {
  const overlay = document.getElementById("image-viewer-overlay");
  if (!overlay) return;

  overlay.remove();
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onImageViewerKey);
}

function onImageViewerKey(e) {
  if (e.key === "Escape") closeImageViewer();
}
