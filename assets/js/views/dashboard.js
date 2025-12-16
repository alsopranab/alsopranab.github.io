import { fetchGitHubRepos } from "../services/github.js";
import { fetchLeetCodeStats } from "../services/leetcode.js";
import { fetchContributions } from "../services/contributions.js";

export async function DashboardView(container) {
  const [repos, leetcode, contributions] = await Promise.all([
    fetchGitHubRepos(),
    fetchLeetCodeStats(),
    fetchContributions()
  ]);

  container.innerHTML = `
    <section>
      <h2>Dashboard</h2>
      <div>Total Projects: ${repos.length}</div>
      <div>LeetCode Solved: ${
        leetcode.reduce((a, b) => a + b.count, 0)
      }</div>
    </section>
  `;
}
