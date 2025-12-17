/**
 * Unified App Renderer (FINAL — SCHEMA CORRECT)
 * ============================================
 * - Executes after home:ready
 * - Reads dataset.source ONLY
 * - Matches actual JSON structure
 * - Silent & production-safe
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

/* =========================
   HERO (profile.json)
========================= */
function renderHero() {
  const s = document.getElementById("hero-section");
  const d = getData(s);
  if (!d?.identity) return;

  const name =
    d.identity.preferredName ||
    d.identity.fullName ||
    "Pranab Debnath";

  const tagline =
    d.identity.headline ||
    d.identity.summary ||
    "";

  const logo = d.currentPosition?.organization?.logo || "";
  const company = d.currentPosition?.organization?.name || "";

  s.innerHTML = `
    <div class="hero-wrapper">
      <h1>${escape(name)}</h1>
      ${tagline ? `<p>${escape(tagline)}</p>` : ""}
      ${logo ? `<img src="${logo}" alt="${escape(company)}" />` : ""}
    </div>
  `;
}

/* =========================
   EXPERIENCE (experience.json)
========================= */
function renderExperience() {
  const s = document.getElementById("experience-section");
  const d = getData(s);
  if (!Array.isArray(d?.timeline)) return;

  s.innerHTML = `
    <h2>${escape(d.section?.title || "Experience")}</h2>
    <div class="experience-list">
      ${d.timeline.map(org => `
        <div class="experience-company">
          <h3>${escape(org.organization.name)}</h3>
          ${org.roles.map(role => `
            <div class="experience-role">
              <strong>${escape(role.title)}</strong>
              <span>
                ${formatDate(role.duration.start)} –
                ${role.duration.end?.status || formatDate(role.duration.end)}
              </span>
              <ul>
                ${(role.responsibilities || [])
                  .map(r => `<li>${escape(r)}</li>`)
                  .join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   FEATURED (featured.json)
========================= */
function renderFeatured() {
  const s = document.getElementById("featured-section");
  const d = getData(s);
  if (!Array.isArray(d?.projects)) return;

  s.innerHTML = `
    <h2>${escape(d.sectionTitle || "Featured Projects")}</h2>
    <div class="featured-list">
      ${d.projects.map(p => `
        <div class="featured-item" data-alignment="${p.alignment || "left"}">
          ${p.image ? `<img src="${p.image}" />` : ""}
          <div>
            <h3>${escape(p.title)}</h3>
            <p>${escape(p.description)}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   PROJECTS (projects.json)
========================= */
function renderProjects() {
  const s = document.getElementById("projects-section");
  const d = getData(s);
  if (!Array.isArray(d?.categories)) return;

  s.innerHTML = `
    <h2>${escape(d.sectionTitle || "Projects")}</h2>
    ${d.categories.map(c => `
      <div class="project-category">
        <h3>${escape(c.label)}</h3>
        ${(c.projects || []).map(p => `
          <div class="project-card">
            <h4>${escape(p.title)}</h4>
            <p>${escape(p.description)}</p>
          </div>
        `).join("")}
      </div>
    `).join("")}
  `;
}

/* =========================
   EDUCATION (education.json)
========================= */
function renderEducation() {
  const s = document.getElementById("education-section");
  const d = getData(s);
  if (!Array.isArray(d?.education)) return;

  s.innerHTML = `
    <h2>${escape(d.sectionTitle || "Education")}</h2>
    ${d.education.map(e => `
      <div class="education-item">
        <strong>${escape(e.institution)}</strong>
        <span>${escape(e.startDate)} – ${escape(e.endDate)}</span>
      </div>
    `).join("")}
  `;
}

/* =========================
   LICENSES (licenses.json)
========================= */
function renderLicenses() {
  const s = document.getElementById("licenses-section");
  const d = getData(s);
  if (!Array.isArray(d?.licenses)) return;

  s.innerHTML = `
    <h2>${escape(d.sectionTitle || "Licenses")}</h2>
    <div class="licenses-grid">
      ${d.licenses.map(l => `
        <img src="${l.image}" alt="${escape(l.title)}" />
      `).join("")}
    </div>
  `;
}

/* =========================
   CONTACT (contact.json) ✅ FIXED
========================= */
function renderContact() {
  const s = document.getElementById("contact-section");
  const d = getData(s);
  if (!d?.section) return;

  const email = d.primary?.email?.value || "";

  s.innerHTML = `
    <h2>${escape(d.section.title)}</h2>
    <p>${escape(d.section.description)}</p>

    ${email ? `<a href="mailto:${email}">${email}</a>` : ""}

    <div>
      ${(d.socials || [])
        .filter(s => s.enabled)
        .sort((a, b) => a.priority - b.priority)
        .map(s => `
          <a href="${s.url}" target="_blank">${escape(s.name)}</a>
        `).join("")}
    </div>
  `;
}

/* =========================
   HELPERS
========================= */
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
    ? str.replace(/[&<>"']/g, m => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[m])
    : "";
}

function formatDate(d) {
  if (!d) return "";
  return `${d.month}/${d.year}`;
}
