import { navigate } from "../core/router.js";
import { getAllProjects } from "../core/projectStore.js";

/**
 * Projects View (FINAL)
 * - Uses canonical project store
 * - Category-safe
 * - ID-based navigation
 */
export function ProjectsView(container) {
  if (!container) return;

  const projects = getAllProjects();

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
    const category = project.category || "others";
    acc[category] = acc[category] || [];
    acc[category].push(project);
    return acc;
  }, {});

  // ----------------------------------------
  // Render
  // ----------------------------------------
  container.innerHTML = `
    <section class="projects">
      <header data-reveal>
        <h1>Projects</h1>
        <p>Selected work & experiments</p>
      </header>

      ${Object.entries(grouped)
        .filter(([, items]) => items.length > 0)
        .map(
          ([category, items]) => `
            <section class="project-group" data-reveal>
              <h2>${category.toUpperCase()}</h2>

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
  // Navigation (ID-based, SAFE)
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
