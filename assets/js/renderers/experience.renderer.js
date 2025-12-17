/**
 * Experience Section Renderer
 * ---------------------------
 * Input  : sectionElement.dataset.source (JSON string)
 * Output : Injected HTML
 * Rules  :
 * - No fetch
 * - No styling
 * - No global state
 */

(function renderExperienceSection() {
  const section = document.getElementById("experience-section");
  if (!section || !section.dataset.source) return;

  let data;
  try {
    data = JSON.parse(section.dataset.source);
  } catch {
    console.error("[ExperienceRenderer] Invalid JSON source");
    return;
  }

  const companiesHTML = (data.experience || [])
    .map(
      (company) => `
        <div class="experience-company" data-company-id="${company.id}">
          
          <div class="experience-company-header">
            ${
              company.companyLogo
                ? `<img
                    src="${company.companyLogo}"
                    alt="${company.company}"
                    class="experience-company-logo"
                  />`
                : ""
            }

            <div class="experience-company-meta">
              <h3 class="experience-company-name">${company.company}</h3>
              ${
                company.location
                  ? `<span class="experience-company-location">
                      ${company.location}
                    </span>`
                  : ""
              }
            </div>
          </div>

          <div class="experience-roles">
            ${(company.roles || [])
              .map(
                (role) => `
                  <div class="experience-role">
                    <div class="experience-role-header">
                      <h4 class="experience-role-title">
                        ${role.designation}
                      </h4>
                      <span class="experience-role-duration">
                        ${role.startDate} – ${role.endDate}
                      </span>
                    </div>

                    ${
                      role.work && role.work.length
                        ? `
                          <ul class="experience-work">
                            ${role.work
                              .map((item) => `<li>${item}</li>`)
                              .join("")}
                          </ul>
                        `
                        : ""
                    }

                    ${
                      role.projects && role.projects.length
                        ? `
                          <div class="experience-projects">
                            <strong>Projects:</strong>
                            <ul>
                              ${role.projects
                                .map((p) => `<li>${p}</li>`)
                                .join("")}
                            </ul>
                          </div>
                        `
                        : ""
                    }

                    ${
                      role.skills && role.skills.length
                        ? `
                          <div class="experience-skills">
                            ${(role.skills || [])
                              .map(
                                (skill) =>
                                  `<span class="experience-skill">${skill}</span>`
                              )
                              .join("")}
                          </div>
                        `
                        : ""
                    }
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `
    )
    .join("");

  section.innerHTML = `
    <div class="experience-wrapper">
      <h2 class="experience-title">${data.sectionTitle}</h2>

      <div class="experience-list">
        ${companiesHTML}
      </div>
    </div>
  `;
})();
