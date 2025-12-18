/**
 * Unified App Renderer (FINAL — SCHEMA TRUE & HARDENED)
 * ====================================================
 * - Runs ONLY after home:ready
 * - Reads ONLY dataset.source
 * - Matches real JSON exactly
 * - Never crashes on partial data
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
   HERO (profile.json)
============================================================ */

function renderHero() {
  const section = document.getElementById("hero");
  const d = getData(section);
  clear(section);

  if (!d?.identity) return;

  section.innerHTML = `
    <div class="hero-wrapper">
      <h1>${escape(d.identity.fullName || "")}</h1>
      ${d.identity.headline ? `<p class="hero-tagline">${escape(d.identity.headline)}</p>` : ""}
      ${d.identity.summary ? `<p class="hero-summary">${escape(d.identity.summary)}</p>` : ""}
    </div>
  `;
}

/* ============================================================
   EXPERIENCE (experience.json)
============================================================ */

function renderExperience() {
  const section = document.getElementById("experience");
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
          ? `<ul>${role.responsibilities.map(r => `<li>${escape(r)}</li>`).join("")}</ul>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   FEATURED (featured.json)
============================================================ */

function renderFeatured() {
  const section = document.getElementById("featured");
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
  if (!item?.project) return "";

  return `
    <div class="featured-item">
      ${item.media?.coverImage ? `<img src="${item.media.coverImage}" alt="">` : ""}
      <div>
        <h3>${escape(item.project.name || "")}</h3>
        <p>${escape(item.project.summary || "")}</p>
      </div>
    </div>
  `;
}

/* ============================================================
   PROJECTS (projects.json)
============================================================ */

function renderProjects() {
  const section = document.getElementById("projects");
  const d = getData(section);
  clear(section);

  if (!Array.isArray(d?.categories)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Projects")}</h2>
    ${d.categories.map(renderProjectCategory).join("")}
  `;
}

function renderProjectCategory(category) {
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
          ? `<a href="${p.repository.url}" target="_blank">View on GitHub →</a>`
          : ""
      }
    </div>
  `;
}

/* ============================================================
   EDUCATION (education.json)
============================================================ */

function renderEducation() {
  const section = document.getElementById("education");
  const d = getData(section);
  clear(section);

  if (!Array.isArray(d?.records)) return;

  section.innerHTML = `
    <h2>${escape(d.section?.title || "Education")}</h2>
    ${d.records.map(r => `
      <div class="education-item">
        <strong>${escape(r.institution)}</strong>
        <div>${escape(r.degree || "")} ${r.field ? "— " + escape(r.field) : ""}</div>
        <div>${escape(r.start)} – ${escape(r.end)}</div>
      </div>
    `).join("")}
  `;
}

/* ============================================================
   CONTACT (contact.json)
============================================================ */

function renderContact() {
  const section = document.getElementById("contact");
  const d = getData(section);
  clear(section);

  if (!d?.section) return;

  section.innerHTML = `
    <h2>${escape(d.section.title)}</h2>
    <p>${escape(d.section.description || "")}</p>
    ${
      d.primary?.email?.value
        ? `<a href="mailto:${d.primary.email.value}">${escape(d.primary.email.value)}</a>`
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
