/**
 * Unified App Renderer (FINAL — JSON SCHEMA LOCKED)
 * =================================================
 * - Runs ONLY after home:ready
 * - Reads ONLY dataset.source
 * - Zero demo / fallback content
 * - Strictly aligned to your JSON structure
 */

window.addEventListener("home:ready", () => {
  renderHero();
  renderExperience();
  renderFeatured();
  renderProjects();
  renderEducation();
  renderContact();
});

/* ============================================================
   HERO (profile.json)
============================================================ */
function renderHero() {
  const section = document.getElementById("hero-section");
  const d = getData(section);
  if (!d?.identity) return;

  section.innerHTML = `
    <div class="hero-wrapper">
      <h1>${escape(d.identity.fullName)}</h1>
      ${
        d.identity.headline
          ? `<p class="hero-tagline">${escape(d.identity.headline)}</p>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   EXPERIENCE (experience.json)
============================================================ */
function renderExperience() {
  const section = document.getElementById("experience-section");
  const d = getData(section);
  if (!Array.isArray(d?.timeline)) return;

  section.innerHTML = `
    <h2>${escape(d.section.title)}</h2>
    <div class="experience-list">
      ${d.timeline.map(renderOrganization).join("")}
    </div>
  `;
}

function renderOrganization(item) {
  return `
    <div class="experience-company">
      <h3>${escape(item.organization.name)}</h3>
      ${item.roles.map(renderRole).join("")}
    </div>
  `;
}

function renderRole(role) {
  const start = `${role.duration.start.month}/${role.duration.start.year}`;
  const end =
    role.duration.end?.status === "present"
      ? "Present"
      : `${role.duration.end.month}/${role.duration.end.year}`;

  return `
    <div class="experience-role">
      <strong>${escape(role.title)}</strong>
      <span>${start} – ${end}</span>
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

/* ============================================================
   FEATURED (featured.json — ONLY WHAT EXISTS)
============================================================ */
function renderFeatured() {
  const section = document.getElementById("featured-section");
  const d = getData(section);
  if (!Array.isArray(d?.items)) return;

  section.innerHTML = `
    <h2>${escape(d.section.title)}</h2>
    <div class="featured-list">
      ${d.items.map(renderFeaturedItem).join("")}
    </div>
  `;
}

function renderFeaturedItem(item) {
  return `
    <div class="featured-item" data-alignment="${item.layout.alignment}">
      ${
        item.media?.coverImage
          ? `<img src="${item.media.coverImage}" alt="${escape(item.media.alt)}" />`
          : ""
      }
      <div>
        <h3>${escape(item.project.name)}</h3>
        <p>${escape(item.project.description)}</p>
      </div>
    </div>
  `;
}

/* ============================================================
   PROJECTS (projects.json)
============================================================ */
function renderProjects() {
  const section = document.getElementById("projects-section");
  const d = getData(section);
  if (!Array.isArray(d?.categories)) return;

  section.innerHTML = `
    <h2>${escape(d.section.title)}</h2>
    ${d.categories.map(renderProjectCategory).join("")}
  `;
}

function renderProjectCategory(cat) {
  return `
    <div class="project-category">
      <h3>${escape(cat.label)}</h3>
      ${cat.projects.map(renderProjectCard).join("")}
    </div>
  `;
}

function renderProjectCard(p) {
  return `
    <div class="project-card">
      <h4>${escape(p.title)}</h4>
      <p>${escape(p.description)}</p>
    </div>
  `;
}

/* ============================================================
   EDUCATION (education.json)
============================================================ */
function renderEducation() {
  const section = document.getElementById("education-section");
  const d = getData(section);
  if (!Array.isArray(d?.records)) return;

  section.innerHTML = `
    <h2>${escape(d.section.title)}</h2>
    ${d.records.map(r => `
      <div class="education-item">
        <strong>${escape(r.institution)}</strong>
        <span>${escape(r.start)} – ${escape(r.end)}</span>
      </div>
    `).join("")}
  `;
}

/* ============================================================
   CONTACT (contact.json)
============================================================ */
function renderContact() {
  const section = document.getElementById("contact-section");
  const d = getData(section);
  if (!d?.section) return;

  section.innerHTML = `
    <h2>${escape(d.section.title)}</h2>
    <p>${escape(d.section.description)}</p>

    ${
      d.primary?.email?.value
        ? `<a href="mailto:${d.primary.email.value}" class="contact-email">
            ${d.primary.email.value}
          </a>`
        : ""
    }

    <div class="contact-socials">
      ${(d.socials || [])
        .filter(s => s.enabled)
        .map(s => `
          <a href="${s.url}" target="_blank" rel="noopener">
            ${escape(s.name)}
          </a>
        `)
        .join("")}
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
  if (typeof str !== "string") return "";
  return str.replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}
