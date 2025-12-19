/**
 * Unified App Renderer — FINAL PRODUCTION BUILD
 * ============================================
 * - Safe top-to-bottom rendering
 * - JSON-driven (data-source only)
 * - No layout mutation
 * - Fail-safe (never blanks page)
 * - Lighthouse friendly
 */

/* ============================================================
   EVENT BRIDGE (CRITICAL)
============================================================ */

window.addEventListener("app:ready", () => {
  window.dispatchEvent(new CustomEvent("home:ready"));
});

/* ============================================================
   ENTRY POINT
============================================================ */

window.addEventListener("home:ready", () => {
  renderHero();
  renderExperience();
  renderFeatured();
  renderProjects();
  renderEducation();
  renderContact();
});

/* ============================================================
   HERO
============================================================ */

function renderHero() {
  const section = document.getElementById("hero-section");
  const d = getData(section);
  if (!d?.identity) return;

  let wrapper = section.querySelector(".hero-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "hero-wrapper";
    section.appendChild(wrapper);
  }

  wrapper.innerHTML = `
    <h1>${escape(d.identity.fullName || "")}</h1>
    ${d.identity.headline ? `<p class="hero-tagline">${escape(d.identity.headline)}</p>` : ""}
    ${d.identity.summary ? `<p class="hero-summary">${escape(d.identity.summary)}</p>` : ""}
  `;
}

/* ============================================================
   EXPERIENCE
============================================================ */

function renderExperience() {
  const section = document.getElementById("experience-section");
  const d = getData(section);
  if (!Array.isArray(d?.timeline)) return;

  ensureHeading(section, d.section?.title || "Experience");

  let list = section.querySelector(".experience-list");
  if (!list) {
    list = document.createElement("div");
    list.className = "experience-list";
    section.appendChild(list);
  }

  list.innerHTML = d.timeline
    .flatMap(org =>
      Array.isArray(org.roles)
        ? org.roles.map(role => renderRole(role, org.organization))
        : []
    )
    .join("");
}

function renderRole(role, org) {
  if (!role) return "";

  const start = role.duration?.start?.year || "";
  const end =
    role.duration?.end?.status === "present"
      ? "Present"
      : role.duration?.end?.year || "";

  return `
    <div class="experience-role" data-omni-reveal>
      <strong>${escape(role.title || "")}</strong>
      <div class="experience-meta">
        ${org?.name ? escape(org.name) + " · " : ""}
        ${start}${end ? " – " + end : ""}
      </div>
      ${
        Array.isArray(role.responsibilities)
          ? `<ul>${role.responsibilities.map(r => `<li>${escape(r)}</li>`).join("")}</ul>`
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

  ensureHeading(section, d.section?.title || "Featured");

  let list = section.querySelector(".featured-list");
  if (!list) {
    list = document.createElement("div");
    list.className = "featured-list";
    section.appendChild(list);
  }

  list.innerHTML = d.items.map(renderFeaturedItem).join("");
}

function renderFeaturedItem(item) {
  if (!item?.project) return "";

  return `
    <div class="featured-item" data-omni-reveal>
      ${
        item.media?.coverImage
          ? `<img src="${item.media.coverImage}" alt="${escape(item.media.alt || "")}" data-expandable>`
          : ""
      }
      <h3>${escape(item.project.name || "")}</h3>
      <p>${escape(item.project.description || "")}</p>
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

  ensureHeading(section, d.section?.title || "Projects");

  const ordered = [...d.categories].sort(
    (a, b) => (a.priority ?? 99) - (b.priority ?? 99)
  );

  ordered.forEach(cat => {
    if (!Array.isArray(cat.projects)) return;

    const block = document.createElement("div");
    block.className = "project-category";

    block.innerHTML = `
      <div class="project-category-title">${escape(cat.label || "")}</div>
      ${cat.projects.map(renderProjectCard).join("")}
    `;

    section.appendChild(block);
  });
}

function renderProjectCard(p) {
  if (!p?.project) return "";

  return `
    <div class="project-card" data-omni-reveal>
      <h4>${escape(p.project.name || "")}</h4>
      <p>${escape(p.project.summary || "")}</p>
      ${
        p.repository?.url
          ? `<a href="${p.repository.url}" target="_blank" rel="noopener">View on GitHub →</a>`
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

  ensureHeading(section, d.section?.title || "Education");

  d.records.forEach(r => {
    const item = document.createElement("div");
    item.className = "education-item";
    item.setAttribute("data-omni-reveal", "");

    item.innerHTML = `
      <strong>${escape(r.institution || "")}</strong>
      ${r.degree || r.field ? `<div>${escape(r.degree || "")}${r.field ? " — " + escape(r.field) : ""}</div>` : ""}
      <div>${escape(r.start || "")} – ${escape(r.end || "")}</div>
      ${r.description ? `<p>${escape(r.description)}</p>` : ""}
      ${
        Array.isArray(r.highlights)
          ? `<ul>${r.highlights.map(h => `<li>${escape(h)}</li>`).join("")}</ul>`
          : ""
      }
    `;

    section.appendChild(item);
  });
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
      <h2>${escape(d.section.title || "Contact")}</h2>
      ${d.section.subtitle ? `<div class="contact-tagline">${escape(d.section.subtitle)}</div>` : ""}
      ${d.section.description ? `<p>${escape(d.section.description)}</p>` : ""}
      ${
        d.primary?.email?.value
          ? `<a class="contact-email" href="mailto:${escape(d.primary.email.value)}">${escape(d.primary.email.value)}</a>`
          : ""
      }
      ${
        Array.isArray(d.socials)
          ? `<div class="contact-socials">
              ${d.socials
                .filter(s => s.enabled !== false)
                .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
                .map(s => `<a href="${s.url}" target="_blank" rel="noopener">${escape(s.name)}</a>`)
                .join("")}
            </div>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   HELPERS
============================================================ */

function ensureHeading(section, text) {
  let h = section.querySelector(":scope > h2");
  if (!h) {
    h = document.createElement("h2");
    section.prepend(h);
  }
  h.textContent = text;
}

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
   IMAGE VIEWER
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
  overlay.innerHTML = `
    <div class="image-viewer-backdrop"></div>
    <div class="image-viewer-panel">
      <button class="image-viewer-close" aria-label="Close">×</button>
      <img src="${src}" alt="${escape(alt)}">
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  overlay.addEventListener("click", e => {
    if (
      e.target.classList.contains("image-viewer-backdrop") ||
      e.target.classList.contains("image-viewer-close")
    ) closeImageViewer();
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
