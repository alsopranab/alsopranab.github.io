import { fetchGitHubRepos } from "../services/github.js";
import { fetchContributions } from "../services/contributions.js";

export async function AnalyticsView(container) {
  const [repos, contributions] = await Promise.all([
    fetchGitHubRepos(),
    fetchContributions()
  ]);

  const byType = repos.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});

  container.innerHTML = `
    <section>
      <h2>Analytics</h2>

      <div>
        <h3>Projects by Type</h3>
        <pre>${JSON.stringify(byType, null, 2)}</pre>
      </div>

      <div>
        <h3>Contribution Data</h3>
        <small>${contributions.length} days tracked</small>
      </div>
    </section>
  `;
}
