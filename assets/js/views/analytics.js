import { fetchGitHubRepos } from "../services/github.js";
import { fetchContributions } from "../services/contributions.js";

export async function AnalyticsView(container) {
  let repos = [];
  let contributions = [];

  try {
    const results = await Promise.all([
      fetchGitHubRepos(),
      fetchContributions()
    ]);

    repos = Array.isArray(results[0]) ? results[0] : [];
    contributions = Array.isArray(results[1]) ? results[1] : [];
  } catch (error) {
    console.warn("[AnalyticsView] Failed to load analytics data", error);
    repos = [];
    contributions = [];
  }

  // Group projects by type safely
  const byType = repos.reduce((acc, repo) => {
    const type = repo?.type || "Other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const hasProjectData = Object.keys(byType).length > 0;
  const contributionDays = contributions.length;

  container.innerHTML = `
    <section>
      <h2>Analytics</h2>

      <div>
        <h3>Projects by Type</h3>
        ${
          hasProjectData
            ? `<pre>${JSON.stringify(byType, null, 2)}</pre>`
            : `<p>No project analytics available.</p>`
        }
      </div>

      <div>
        <h3>Contribution Activity</h3>
        ${
          contributionDays > 0
            ? `<small>${contributionDays} days tracked</small>`
            : `<small>No contribution data available.</small>`
        }
      </div>
    </section>
  `;
}
