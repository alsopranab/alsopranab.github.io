/**
 * Unified App Renderer (FINAL — SCHEMA SAFE)
 * =========================================
 * - Executes ONLY after home:ready
 * - Deterministic top → bottom
 * - Reads ONLY dataset.source
 * - Fully aligned with current JSON schemas
 * - No side effects, no fetches
 */

window.addEventListener("home:ready", () => {
  renderHero();
  renderExperience();
  renderFeatured();
  renderProjects();
  renderEducation();
  renderLicenses();
  renderContact();
});

/* ============================================================
   HERO / INTRO  (profile.json)
============================================================ */
function renderHero() {
  const section = document.getElementById("hero-section");
  const d = getData(section);
  if (!d?.identity) return;

  const name =
    d.identity.preferredName ||
    d.identity.fullName ||
    "";

  const tagline =
    d.identity.headline ||
    d.identity.summary ||
    "";

  const logo =
    d.currentPosition?.organization?.logo || "";

  const company =
    d.currentPosition?.organization?.name || "";

  section.innerHTML = `
    <div class="hero-wrapper">
      ${name ? `<h1>${escape(name)}</h1>` : ""}
      ${tagline ? `<p class="hero-tagline">${escape(tagline)}</p>` : ""}
      ${
        logo
          ? `<img class="hero-company-logo"
                  src="${logo}"
                  alt="${escape(company)}" />`
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
  if (!Array.isArray(d?.companies)) return;

  section.innerHTML = `
    <h2>${escape(d.sectionTitle || "Experience")}</h2>
    <div class="experience-list">
      ${d.companies.map(renderCompany).join("")}
    </div>
  `;
}

function renderCompany(c) {
  return `
    <div class="experience-company">
      <h3>${escape(c.name)}</h3>
      ${(c.roles || []).map(renderRole).join("")}
    </div>
  `;
}

function renderRole(r) {
  return `
    <div class="experience-role">
      <strong>${escape(r.title)}</strong>
      <span>${escape(r.start)} – ${escape(r.end || "Present")}</span>
      ${
        Array.isArray(r.responsibilities)
          ? `<ul class="experience-work">
              ${r.responsibilities
                .map(item => `<li>${escape(item)}</li>`)
                .join("")}
            </ul>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   FEATURED PROJECTS (featured.json)
============================================================ */
function renderFeatured() {
  const section = document.getElementById("featured-section");
  const d = getData(section);
  if (!Array.isArray(d?.items)) return;

  section.innerHTML = `
    <h2>${escape(d.sectionTitle || "Featured Projects")}</h2>
    <div class="featured-list">
      ${d.items.map(renderFeaturedItem).join("")}
    </div>
  `;
}

function renderFeaturedItem(p) {
  return `
    <div class="featured-item" data-alignment="${p.alignment || "left"}">
      ${p.image ? `<img src="${p.image}" alt="${escape(p.title)}" />` : ""}
      <div>
        <h3>${escape(p.title)}</h3>
        <p>${escape(p.description)}</p>
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
    <h2>${escape(d.sectionTitle || "Projects")}</h2>
    ${d.categories.map(renderCategory).join("")}
  `;
}

function renderCategory(c) {
  return `
    <div class="project-category">
      <h3>${escape(c.name)}</h3>
      ${(c.items || []).map(renderProjectCard).join("")}
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
    <h2>${escape(d.sectionTitle || "Education")}</h2>
    ${d.records.map(e => `
      <div class="education-item">
        <strong>${escape(e.institution)}</strong>
        <span>${escape(e.start)} – ${escape(e.end)}</span>
      </div>
    `).join("")}
  `;
}

/* ============================================================
   LICENSES (licenses.json)
============================================================ */
function renderLicenses() {
  const section = document.getElementById("licenses-section");
  const d = getData(section);
  if (!Array.isArray(d?.items)) return;

  section.innerHTML = `
    <h2>${escape(d.sectionTitle || "Licenses & Certifications")}</h2>
    <div class="licenses-grid">
      ${d.items.map(l => `
        <img class="license-image"
             src="${l.image}"
             alt="${escape(l.title)}" />
      `).join("")}
    </div>
  `;
}

/* ============================================================
   CONTACT (contact.json — FIXED)
============================================================ */
function renderContact() {
  const section = document.getElementById("contact-section");
  const d = getData(section);
  if (!d) return;

  const title = d.section?.title || "Contact";
  const description = d.section?.description || "";
  const email = d.primary?.email?.value || "";

  const socials = Array.isArray(d.socials)
    ? d.socials
        .filter(s => s.enabled)
        .sort((a, b) => a.priority - b.priority)
    : [];

  section.innerHTML = `
    <h2>${escape(title)}</h2>
    ${description ? `<p>${escape(description)}</p>` : ""}

    ${
      email
        ? `<a class="contact-email" href="mailto:${email}">
             ${escape(email)}
           </a>`
        : ""
    }

    ${
      socials.length
        ? `<div class="contact-socials">
            ${socials
              .map(
                s => `<a href="${s.url}" target="_blank" rel="noopener">
                        ${escape(s.name)}
                      </a>`
              )
              .join("")}
           </div>`
        : ""
    }
  `;
}

/* ============================================================
   INTERNAL HELPERS
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
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[m]);
}
