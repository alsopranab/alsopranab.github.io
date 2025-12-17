/**
 * Unified App Renderer (FINAL — HARDENED & SCHEMA SAFE)
 * ====================================================
 * - Runs ONLY after home:ready
 * - Reads ONLY dataset.source
 * - Clears sections before render
 * - Never renders demo or stale data
 */

window.addEventListener("home:ready", () => {
  renderHero();
  renderExperience();
  renderFeatured();
  renderProjects();
  renderEducation();
  renderContact();
});

/* ================= HERO ================= */

function renderHero() {
  const section = document.getElementById("hero-section");
  const d = getData(section);
  clear(section);
  if (!d?.identity) return;

  section.innerHTML = `
    <div class="hero-wrapper">
      <h1>${escape(d.identity.fullName || "")}</h1>
      ${
        d.identity.headline
          ? `<p class="hero-tagline">${escape(d.identity.headline)}</p>`
          : ""
      }
    </div>
  `;
}

/* ================= EXPERIENCE ================= */

function renderExperience() {
  const section = document.getElementById("experience-section");
  const d = getData(section);
  clear(section);
  if (!Array.isArray(d?.timeline)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Experience")}</h2>
    <div class="experience-list">
      ${d.timeline.map(renderOrganization).join("")}
    </div>
  `;
}

function renderOrganization(item) {
  return `
    <div class="experience-company">
      <h3>${escape(item.organization?.name || "")}</h3>
      ${(item.roles || []).map(renderRole).join("")}
    </div>
  `;
}

function renderRole(role) {
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
          ? `<ul>
              ${role.responsibilities
                .map(r => `<li>${escape(r)}</li>`)
                .join("")}
            </ul>`
          : ""
      }
    </div>
  `;
}

/* ================= FEATURED ================= */

function renderFeatured() {
  const section = document.getElementById("featured-section");
  const d = getData(section);
  clear(section);
  if (!Array.isArray(d?.items)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Featured")}</h2>
    <div class="featured-list">
      ${d.items.map(renderFeaturedItem).join("")}
    </div>
  `;
}

function renderFeaturedItem(item) {
  return `
    <div class="featured-item" data-alignment="${item.layout?.alignment || "left"}">
      ${
        item.media?.coverImage
          ? `<img src="${item.media.coverImage}" alt="${escape(item.media.alt || "")}" />`
          : ""
      }
      <div>
        <h3>${escape(item.project?.name || "")}</h3>
        <p>${escape(item.project?.description || "")}</p>
      </div>
    </div>
  `;
}

/* ================= PROJECTS ================= */

function renderProjects() {
  const section = document.getElementById("projects-section");
  const d = getData(section);
  clear(section);
  if (!Array.isArray(d?.categories)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Projects")}</h2>
    ${d.categories.map(renderProjectCategory).join("")}
  `;
}

function renderProjectCategory(cat) {
  return `
    <div class="project-category">
      <h3>${escape(cat.label || "")}</h3>
      ${(cat.projects || []).map(renderProjectCard).join("")}
    </div>
  `;
}

function renderProjectCard(p) {
  return `
    <div class="project-card">
      <h4>${escape(p.title || "")}</h4>
      <p>${escape(p.description || "")}</p>
    </div>
  `;
}

/* ================= EDUCATION ================= */

function renderEducation() {
  const section = document.getElementById("education-section");
  const d = getData(section);
  clear(section);
  if (!Array.isArray(d?.records)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Education")}</h2>
    ${d.records.map(r => `
      <div class="education-item">
        <strong>${escape(r.institution || "")}</strong>
        <span>${escape(r.start || "")} – ${escape(r.end || "")}</span>
      </div>
    `).join("")}
  `;
}

/* ================= CONTACT ================= */

function renderContact() {
  const section = document.getElementById("contact-section");
  const d = getData(section);
  clear(section);
  if (!d?.section) return;

  section.innerHTML = `
    <h2>${escape(d.section.title)}</h2>
    <p>${escape(d.section.description || "")}</p>
    ${
      d.primary?.email?.value
        ? `<a href="mailto:${d.primary.email.value}" class="contact-email">
            ${d.primary.email.value}
          </a>`
        : ""
    }
  `;
}

/* ================= HELPERS ================= */

function getData(section) {
  if (!section || !section.dataset?.source) return null;
  try {
    return JSON.parse(section.dataset.source);
  } catch {
    return null;
  }
}

function clear(section) {
  if (section) section.innerHTML = "";
}

function escape(str) {
  return typeof str === "string"
    ? str.replace(/[&<>"']/g, c =>
        ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c])
      )
    : "";
}
