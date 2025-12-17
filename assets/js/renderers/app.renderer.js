/**
 * Unified App Renderer (FINAL — SCHEMA TRUE)
 * =========================================
 * - Runs ONLY after home:ready
 * - Reads ONLY dataset.source
 * - Matches your real JSON (projects / featured / profile)
 * - Never renders fake or undefined data
 * - Clears sections before render
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

/* ============================================================
   EXPERIENCE (experience.json)
============================================================ */

function renderExperience() {
  const section = document.getElementById("experience-section");
  const d = getData(section);
  clear(section);

  if (!Array.isArray(d?.timeline)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Experience")}</h2>
    <div class="experience-list">
      ${d.timeline.map(org => `
        <div class="experience-company">
          <h3>${escape(org.organization?.name || "")}</h3>
          ${(org.roles || []).map(role => renderRole(role)).join("")}
        </div>
      `).join("")}
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
              ${role.responsibilities.map(r => `<li>${escape(r)}</li>`).join("")}
            </ul>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   FEATURED (featured.json)
============================================================ */

function renderFeatured() {
  const section = document.getElementById("featured-section");
  const d = getData(section);
  clear(section);

  if (!Array.isArray(d?.items)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Featured")}</h2>
    <div class="featured-list">
      ${d.items.map(item => `
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
      `).join("")}
    </div>
  `;
}

/* ============================================================
   PROJECTS (projects.json — YOUR REAL SCHEMA)
============================================================ */

function renderProjects() {
  const section = document.getElementById("projects-section");
  const d = getData(section);
  clear(section);

  if (!Array.isArray(d?.categories)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Projects")}</h2>
    ${d.categories
      .sort((a, b) => (a.priority || 99) - (b.priority || 99))
      .map(cat => `
        <div class="project-category">
          <h3>${escape(cat.label)}</h3>

          ${(cat.projects || []).map(p => `
            <div class="project-card">
              <h4>${escape(p.project?.name || "")}</h4>
              <p>${escape(p.project?.summary || "")}</p>

              ${
                p.repository?.url
                  ? `<a href="${p.repository.url}" target="_blank" rel="noopener">
                       View on GitHub →
                     </a>`
                  : ""
              }
            </div>
          `).join("")}
        </div>
      `).join("")}
  `;
}

/* ============================================================
   EDUCATION (education.json)
============================================================ */

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

/* ============================================================
   CONTACT (contact.json)
============================================================ */

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
