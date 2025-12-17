/**
 * Unified App Renderer (STABLE & SCHEMA-ALIGNED)
 * =============================================
 * - Runs ONLY after home:ready
 * - Reads ONLY dataset.source
 * - No fetch, no mutation
 * - Safe against missing sections
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
  if (!d || !d.identity) return;

  const name =
    d.identity.preferredName ||
    d.identity.fullName ||
    "Pranab Debnath";

  const headline =
    d.identity.headline ||
    d.identity.summary ||
    "";

  const logo = d.currentPosition?.organization?.logo || "";
  const company = d.currentPosition?.organization?.name || "";

  section.innerHTML = `
    <div class="hero-wrapper">
      <h1>${escape(name)}</h1>
      ${headline ? `<p class="hero-tagline">${escape(headline)}</p>` : ""}
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
  if (!d || !Array.isArray(d.timeline)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Experience")}</h2>
    <div class="experience-list">
      ${d.timeline.map(renderOrganization).join("")}
    </div>
  `;
}

function renderOrganization(org) {
  return `
    <div class="experience-company">
      <h3>${escape(org.organization?.name || "")}</h3>
      ${(org.roles || []).map(renderRole).join("")}
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
      <strong>${escape(role.title)}</strong>
      <span>${start}${end ? " – " + end : ""}</span>
      ${
        Array.isArray(role.responsibilities)
          ? `<ul class="experience-work">
              ${role.responsibilities
                .map(item => `<li>${escape(item)}</li>`)
                .join("")}
            </ul>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   FEATURED (featured.json — ONLY HackerRank)
============================================================ */
function renderFeatured() {
  const section = document.getElementById("featured-section");
  const d = getData(section);
  if (!d || !Array.isArray(d.items)) return;

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
          ? `<img src="${item.media.coverImage}"
                  alt="${escape(item.media.alt || item.project.name)}" />`
          : ""
      }
      <div>
        <h3>${escape(item.project.name)}</h3>
        <p>${escape(item.project.description)}</p>
        ${
          item.links?.live
            ? `<a href="${item.links.live}" target="_blank" rel="noopener">
                View Proof →
              </a>`
            : ""
        }
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
  if (!d || !Array.isArray(d.categories)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Projects")}</h2>
    ${d.categories.map(renderProjectCategory).join("")}
  `;
}

function renderProjectCategory(cat) {
  return `
    <div class="project-category">
      <h3>${escape(cat.label)}</h3>
      ${(cat.projects || []).map(renderProjectCard).join("")}
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
  if (!d || !Array.isArray(d.records)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Education")}</h2>
    ${d.records.map(e => `
      <div class="education-item">
        <strong>${escape(e.institution)}</strong>
        <span>${escape(e.start)} – ${escape(e.end)}</span>
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
  if (!d) return;

  const email = d.primary?.email?.value || "";

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Contact")}</h2>
    <p>${escape(d.section?.description || "")}</p>

    ${
      email
        ? `<a href="mailto:${email}" class="contact-email">
            ${email}
          </a>`
        : ""
    }

    <div class="contact-socials">
      ${(d.socials || [])
        .filter(s => s.enabled)
        .map(
          s => `<a href="${s.url}" target="_blank" rel="noopener">
                  ${escape(s.name)}
                </a>`
        )
        .join("")}
    </div>
  `;
}

/* ============================================================
   HELPERS
============================================================ */
function getData(section) {
  if (!section || !section.dataset?.source) return null;
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
