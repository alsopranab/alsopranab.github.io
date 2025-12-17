/**
 * Unified App Renderer (FINAL & STABLE)
 * ====================================
 * - Executes ONLY after home:ready
 * - Deterministic top → bottom
 * - Zero fetch
 * - Zero side effects
 * - Reads ONLY dataset.source
 * - CSS-aligned markup
 * - Defensive against partial / broken data
 */

/* ============================================================
   FIXED EVENT LISTENER
   Renderer must wait until data is attached
============================================================ */

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
   HERO / INTRO
============================================================ */
function renderHero() {
  const section = document.getElementById("hero-section");
  const d = getData(section);
  if (!d) return;

  section.innerHTML = `
    <div class="hero-wrapper">
      <h1>${escape(d.name)}</h1>
      ${d.tagline ? `<p class="hero-tagline">${escape(d.tagline)}</p>` : ""}
      ${
        d.currentRole?.companyLogo
          ? `<img class="hero-company-logo"
                  src="${d.currentRole.companyLogo}"
                  alt="${escape(d.currentRole.company || "Company logo")}" />`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   EXPERIENCE
============================================================ */
function renderExperience() {
  const section = document.getElementById("experience-section");
  const d = getData(section);
  if (!d) return;

  section.innerHTML = `
    <h2>${escape(d.sectionTitle || "Experience")}</h2>
    <div class="experience-list">
      ${(d.experience || []).map(renderCompany).join("")}
    </div>
  `;
}

function renderCompany(c) {
  return `
    <div class="experience-company">
      <h3>${escape(c.company)}</h3>
      ${(c.roles || []).map(renderRole).join("")}
    </div>
  `;
}

function renderRole(r) {
  return `
    <div class="experience-role">
      <strong>${escape(r.designation)}</strong>
      <span>${escape(r.startDate)} – ${escape(r.endDate)}</span>
      ${
        r.work?.length
          ? `<ul class="experience-work">
              ${r.work.map(w => `<li>${escape(w)}</li>`).join("")}
            </ul>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   FEATURED PROJECTS
============================================================ */
function renderFeatured() {
  const section = document.getElementById("featured-section");
  const d = getData(section);
  if (!d) return;

  section.innerHTML = `
    <h2>${escape(d.sectionTitle || "Featured Projects")}</h2>
    <div class="featured-list">
      ${(d.projects || []).map(renderFeaturedItem).join("")}
    </div>
  `;
}

function renderFeaturedItem(p) {
  return `
    <div class="featured-item" data-alignment="${p.alignment || "left"}">
      <img src="${p.image}" alt="${escape(p.title)}" />
      <div>
        <h3>${escape(p.title)}</h3>
        <p>${escape(p.description)}</p>
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
  if (!d) return;

  section.innerHTML = `
    <h2>${escape(d.sectionTitle || "Projects")}</h2>
    ${(d.categories || []).map(renderCategory).join("")}
  `;
}

function renderCategory(c) {
  return `
    <div class="project-category">
      <h3>${escape(c.label)}</h3>
      ${(c.projects || []).map(renderProjectCard).join("")}
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
   EDUCATION
============================================================ */
function renderEducation() {
  const section = document.getElementById("education-section");
  const d = getData(section);
  if (!d) return;

  section.innerHTML = `
    <h2>${escape(d.sectionTitle || "Education")}</h2>
    ${(d.education || []).map(e => `
      <div class="education-item">
        <strong>${escape(e.institution)}</strong>
        <span>${escape(e.startDate)} – ${escape(e.endDate)}</span>
      </div>
    `).join("")}
  `;
}

/* ============================================================
   LICENSES
============================================================ */
function renderLicenses() {
  const section = document.getElementById("licenses-section");
  const d = getData(section);
  if (!d) return;

  section.innerHTML = `
    <h2>${escape(d.sectionTitle || "Licenses & Certifications")}</h2>
    <div class="licenses-grid">
      ${(d.licenses || []).map(l => `
        <img class="license-image"
             src="${l.image}"
             alt="${escape(l.title)}" />
      `).join("")}
    </div>
  `;
}

/* ============================================================
   CONTACT
============================================================ */
function renderContact() {
  const section = document.getElementById("contact-section");
  if (!section || !section.dataset.source) return;

  const d = safeParse(section.dataset.source);
  if (!d) return;

  const email =
    d.primary?.email?.value ||
    d.contact?.email?.value ||
    "";

  section.innerHTML = `
    <h2>${escape(d.title || "Contact")}</h2>
    <p>${escape(d.message || "")}</p>
    ${email ? `<a href="mailto:${email}">${email}</a>` : ""}
    <div>
      ${(d.socials || []).map(
        s => `<a href="${s.url}" target="_blank" rel="noopener">${escape(s.name)}</a>`
      ).join("")}
    </div>
  `;
}

/* ============================================================
   INTERNAL HELPERS
============================================================ */
function getData(section) {
  if (!section || !section.dataset?.source) return null;
  try {
    return JSON.parse(section.dataset.source);
  } catch (e) {
    console.error("[Renderer] Invalid dataset.source", e);
    return null;
  }
}

function safeParse(str) {
  try {
    return JSON.parse(str);
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
