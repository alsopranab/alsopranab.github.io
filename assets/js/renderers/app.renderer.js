/**
 * Unified App Renderer
 * ====================
 * - Single file
 * - Top → Bottom rendering
 * - No fetch
 * - No CSS
 * - No page awareness
 * - Reads ONLY dataset.source
 * - FINAL & IMMUTABLE
 */

/* =========================
   HERO / INTRO (TOP)
========================= */
(function renderHero() {
  const section = document.getElementById("hero-section");
  if (!section?.dataset.source) return;

  const d = JSON.parse(section.dataset.source);

  section.innerHTML = `
    <div class="hero-wrapper">
      <h1>${d.name}</h1>
      <p>${d.tagline}</p>

      ${
        d.currentRole?.companyLogo
          ? `<img src="${d.currentRole.companyLogo}" alt="${d.currentRole.company}" />`
          : ""
      }
    </div>
  `;
})();

/* =========================
   EXPERIENCE
========================= */
(function renderExperience() {
  const section = document.getElementById("experience-section");
  if (!section?.dataset.source) return;

  const d = JSON.parse(section.dataset.source);

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${d.experience
      .map(
        (c) => `
        <div>
          <h3>${c.company}</h3>
          ${c.roles
            .map(
              (r) => `
              <div>
                <strong>${r.designation}</strong>
                <span>${r.startDate} – ${r.endDate}</span>
                <ul>${r.work.map((w) => `<li>${w}</li>`).join("")}</ul>
              </div>
            `
            )
            .join("")}
        </div>
      `
      )
      .join("")}
  `;
})();

/* =========================
   FEATURED PROJECTS
========================= */
(function renderFeatured() {
  const section = document.getElementById("featured-section");
  if (!section?.dataset.source) return;

  const d = JSON.parse(section.dataset.source);

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${d.projects
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
})();

/* =========================
   PROJECTS (SQL | PYTHON | ETC)
========================= */
(function renderProjects() {
  const section = document.getElementById("projects-section");
  if (!section?.dataset.source) return;

  const d = JSON.parse(section.dataset.source);

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${d.categories
      .map(
        (c) => `
        <div>
          <h3>${c.label}</h3>
          ${c.projects
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
})();

/* =========================
   EDUCATION
========================= */
(function renderEducation() {
  const section = document.getElementById("education-section");
  if (!section?.dataset.source) return;

  const d = JSON.parse(section.dataset.source);

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${d.education
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
})();

/* =========================
   LICENSES / CERTIFICATIONS
========================= */
(function renderLicenses() {
  const section = document.getElementById("licenses-section");
  if (!section?.dataset.source) return;

  const d = JSON.parse(section.dataset.source);

  section.innerHTML = `
    <h2>${d.sectionTitle}</h2>
    ${d.licenses
      .map(
        (l) => `
        <img src="${l.image}" alt="${l.title}" />
      `
      )
      .join("")}
  `;
})();

/* =========================
   CONTACT (BOTTOM)
========================= */
(function renderContact() {
  const section = document.getElementById("contact-section");
  if (!section?.dataset.source) return;

  const d = JSON.parse(section.dataset.source);

  section.innerHTML = `
    <h2>${d.title}</h2>
    <p>${d.message}</p>
    <a href="mailto:${d.email}">${d.email}</a>
    <div>
      ${d.socials
        .map(
          (s) =>
            `<a href="${s.url}" target="_blank">${s.name}</a>`
        )
        .join("")}
    </div>
  `;
})();

