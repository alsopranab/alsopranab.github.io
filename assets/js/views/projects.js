import { fetchGitHubRepos } from "../services/github.js";
import { navigate } from "../core/router.js";

export async function ProjectsView(container) {
  let repos = [];

  try {
    const result = await fetchGitHubRepos();
    repos = Array.isArray(result) ? result : [];
  } catch (error) {
    console.warn("[ProjectsView] Failed to load repos", error);
    repos = [];
  }

  // Group safely by project type
  const grouped = repos.reduce((acc, repo) => {
    const type = repo?.type || "Other";
    acc[type] = acc[type] || [];
    acc[type].push(repo);
    return acc;
  }, {});

  // Render empty state safely
  if (repos.length === 0) {
    container.innerHTML = `
      <section>
        <h2>Projects</h2>
        <p>No projects available right now.</p>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section>
      <h2>Projects</h2>
      ${Object.entries(grouped).map(([type, items]) => `
        <div data-reveal>
          <h3>${type}</h3>
          ${items.map(repo => `
            <div class="project-card" data-repo="${repo.name}">
              <strong>${repo.name}</strong>
              <p>${repo.description || ""}</p>
              <small>${repo.language || ""}</small>
            </div>
          `).join("")}
        </div>
      `).join("")}
    </section>
  `;

  // Attach navigation safely
  container.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const repoName = card.dataset.repo;
      if (repoName) {
        navigate("project", { repo: repoName });
      }
    });
  });
}
