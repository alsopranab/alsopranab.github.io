/**
 * Unified App Renderer (FINAL)
 * ===========================
 * - Single file
 * - Top → Bottom rendering
 * - Executes ONLY after app:ready
 * - No fetch
 * - No CSS
 * - No page awareness
 * - Reads ONLY dataset.source
 * - Deterministic
 */

window.addEventListener("app:ready", () => {
  renderHero();
  renderExperience();
  renderFeatured();
  renderProjects();
  renderEducation();
  renderLicenses();
  renderContact();
});

/* =========================
   HERO / INTRO (TOP)
========================= */
function renderHero() {
  const section = document.getElementById("hero-section");
  if (!section || !section.dataset.source) return;

  const d = safeParse(section.dataset.source);
  if (!d) return;

  section.innerHTML = `
    <div class="hero-wrapper">
      <h1>${d.name}</h1>
      <p>${d.tagline || ""}</p>
      ${
        d.currentRole?.companyLogo
          ? `<img src="${d.currentRole.companyLogo}" alt="${d.currentRole.company}" />`
          : ""
      }
    </div>
  `;
}

/* =========================
   EXPERIENCE
========================= */
function renderExperience() {
  const section = document.getElementById("experience-section");
  if (!section || !section.dataset.source) return;

  const d = safeParse(section.dataset.source);
  if (!d) return;

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${(d.experience || [])
      .map(
        (c) => `
          <div>
            <h3>${c.company}</h3>
            ${(c.roles || [])
              .map(
                (r) => `
                  <div>
                    <strong>${r.designation}</strong>
                    <span>${r.startDate} – ${r.endDate}</span>
                    ${
                      r.work?.length
                        ? `<ul>${r.work.map((w) => `<li>${w}</li>`).join("")}</ul>`
                        : ""
                    }
                  </div>
                `
              )
              .join("")}
          </div>
        `
      )
      .join("")}
  `;
}

/* =========================
   FEATURED PROJECTS
========================= */
function renderFeatured() {
  const section = document.getElementById("featured-section");
  if (!section || !section.dataset.source) return;

  const d = safeParse(section.dataset.source);
  if (!d) return;

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${(d.projects || [])
      .map(
        (p) => `
          <div data-align="${p.alignment}">
            <img src="${p.image}" alt="${p.title}" />
            <h3>${p.title}</h3>
            <p>${p.description}</p>
          </div>
        `
      )
      .join("")}
  `;
}

/* =========================
   PROJECTS (SQL | PYTHON | ETC)
========================= */
function renderProjects() {
  const section = document.getElementById("projects-section");
  if (!section || !section.dataset.source) return;

  const d = safeParse(section.dataset.source);
  if (!d) return;

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${(d.categories || [])
      .map(
        (c) => `
          <div>
            <h3>${c.label}</h3>
            ${(c.projects || [])
              .map(
                (p) => `
                  <div>
                    <h4>${p.title}</h4>
                    <p>${p.description}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        `
      )
      .join("")}
  `;
}

/* =========================
   EDUCATION
========================= */
function renderEducation() {
  const section = document.getElementById("education-section");
  if (!section || !section.dataset.source) return;

  const d = safeParse(section.dataset.source);
  if (!d) return;

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${(d.education || [])
      .map(
        (e) => `
          <div>
            <strong>${e.institution}</strong>
            <span>${e.startDate} – ${e.endDate}</span>
          </div>
        `
      )
      .join("")}
  `;
}

/* =========================
   LICENSES / CERTIFICATIONS
========================= */
function renderLicenses() {
  const section = document.getElementById("licenses-section");
  if (!section || !section.dataset.source) return;

  const d = safeParse(section.dataset.source);
  if (!d) return;

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${(d.licenses || [])
      .map(
        (l) => `
          <img src="${l.image}" alt="${l.title}" />
        `
      )
      .join("")}
  `;
}

/* =========================
   CONTACT (BOTTOM)
========================= */
function renderContact() {
  const section = document.getElementById("contact-section");
  if (!section || !section.dataset.source) return;

  const d = safeParse(section.dataset.source);
  if (!d) return;

  section.innerHTML = `
    <h2>${d.title}</h2>
    <p>${d.message}</p>
    <a href="mailto:${d.email}">${d.email}</a>
    <div>
      ${(d.socials || [])
        .map(
          (s) =>
            `<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`
        )
        .join("")}
    </div>
  `;
}

/* =========================
   SAFE JSON PARSER (INTERNAL)
========================= */
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error("[Renderer] Invalid JSON source", e);
    return null;
  }
}
