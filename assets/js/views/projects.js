import { navigate } from "../core/router.js";
import { getAllProjects } from "../core/projectStore.js";

/**
 * Projects View (FINAL)
 * - Uses canonical project store
 * - Supports category filtering
 * - ID-based navigation
 */
export function ProjectsView(container, params = {}) {
  if (!container) return;

  const { category } = params;

  // ----------------------------------------
  // Load projects (single source of truth)
  // ----------------------------------------
  let projects = getAllProjects();

  // ----------------------------------------
  // Apply category filter (from Analytics)
  // ----------------------------------------
  if (category) {
    projects = projects.filter(
      project => project.category === category
    );
  }

  // ----------------------------------------
  // Empty state
  // ----------------------------------------
  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <section class="projects">
        <h2>Projects</h2>
        <p>No projects available.</p>
      </section>
    `;
    return;
  }

  // ----------------------------------------
  // Group by category
  // ----------------------------------------
  const grouped = projects.reduce((acc, project) => {
    const key = project.category || "Other";
    acc[key] = acc[key] || [];
    acc[key].push(project);
    return acc;
  }, {});

  // ----------------------------------------
  // Render
  // ----------------------------------------
  container.innerHTML = `
    <section class="projects">
      <header data-reveal>
        <h1>Projects</h1>
        ${
          category
            ? `<p>Filtered by category: <strong>${category}</strong></p>`
            : `<p>Selected work & experiments</p>`
        }
      </header>

      ${Object.entries(grouped)
        .filter(([, items]) => items.length > 0)
        .map(
          ([group, items]) => `
            <section class="project-group" data-reveal>
              <h2>${group.toUpperCase()}</h2>

              <div class="project-grid">
                ${items
                  .map(
                    project => `
                      <article
                        class="project-card"
                        data-id="${project.id}"
                        data-magnetic
                      >
                        <h3>${project.name}</h3>
                        <p>${project.description || "No description provided."}</p>
                        <small>${project.language || ""}</small>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>
          `
        )
        .join("")}
    </section>
  `;

  // ----------------------------------------
  // Navigation (ID-based)
  // ----------------------------------------
  container.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      if (id) {
        navigate("project", { id });
      }
    });
  });
}
