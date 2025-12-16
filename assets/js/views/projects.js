import { fetchGitHubRepos } from "../services/github.js";
import { navigate } from "../core/router.js";

export async function ProjectsView(container) {
  const repos = await fetchGitHubRepos();

  const grouped = repos.reduce((acc, repo) => {
    acc[repo.type] = acc[repo.type] || [];
    acc[repo.type].push(repo);
    return acc;
  }, {});

  container.innerHTML = `
    <section>
      <h2>Projects</h2>
      ${Object.keys(grouped).map(type => `
        <div data-reveal>
          <h3>${type}</h3>
          ${grouped[type].map(repo => `
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

  container.querySelectorAll(".project-card").forEach(card => {
    card.onclick = () =>
      navigate("project", { repo: card.dataset.repo });
  });
}
