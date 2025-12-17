/**
 * Projects Section Renderer
 * -------------------------
 * Input  : sectionElement.dataset.source (JSON string)
 * Output : Injected HTML
 * Rules  :
 * - No fetch
 * - No styling
 * - No global state
 */

(function renderProjectsSection() {
  const section = document.getElementById("projects-section");
  if (!section || !section.dataset.source) return;

  let data;
  try {
    data = JSON.parse(section.dataset.source);
  } catch {
    console.error("[ProjectsRenderer] Invalid JSON source");
    return;
  }

  const categoriesHTML = (data.categories || [])
    .map(
      (cat) => `
        <div class="project-category" data-category="${cat.key}">
          <h3 class="project-category-title">${cat.label}</h3>

          ${
            cat.description
              ? `<p class="project-category-description">${cat.description}</p>`
              : ""
          }

          <div class="project-list">
            ${(cat.projects || [])
              .map(
                (proj) => `
                  <div class="project-card" data-project-id="${proj.id}">
                    <h4 class="project-title">${proj.title}</h4>

                    <p class="project-description">
                      ${proj.description}
                    </p>

                    <div class="project-tools">
                      ${(proj.tools || [])
                        .map((tool) => `<span>${tool}</span>`)
                        .join("")}
                    </div>

                    ${
                      proj.githubRepo
                        ? `
                          <a
                            href="${proj.githubRepo}"
                            target="_blank"
                            rel="noopener"
                            class="project-link"
                          >
                            View on GitHub
                          </a>
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
    <div class="projects-wrapper">
      <h2 class="projects-title">${data.sectionTitle}</h2>

      <div class="projects-categories">
        ${categoriesHTML}
      </div>
    </div>
  `;
})();
