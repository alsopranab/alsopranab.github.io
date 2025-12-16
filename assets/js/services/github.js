import { CONFIG } from "../core/config.js";
import { store } from "../core/store.js";

export async function fetchGitHubRepos() {
  return store.cached(
    "github_repos",
    CONFIG.github.cacheTTL,
    async () => {
      const res = await fetch(
        `${CONFIG.github.apiBase}/users/${CONFIG.github.username}/repos?per_page=100`
      );
      const data = await res.json();

      return data
        .filter(r => !r.fork && !r.archived)
        .map(repo => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          url: repo.html_url,
          type: detectProjectType(repo)
        }));
    }
  );
}

function detectProjectType(repo) {
  const name = repo.name.toLowerCase();
  if (name.includes("sql")) return "SQL";
  if (name.includes("dashboard")) return "Dashboard";
  if (name.includes("python")) return "Python";
  if (name.includes("google")) return "Google";
  return "Other";
}
