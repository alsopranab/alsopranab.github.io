import { CONFIG } from "../core/config.js";
import { store } from "../core/store.js";

/**
 * Fetch GitHub repositories.
 * MUST be defensive:
 * - Rate limits
 * - Network errors
 * - Invalid responses
 * - Never crash the SPA
 */
export async function fetchGitHubRepos() {
  return store.cached(
    "github_repos",
    CONFIG.github.cacheTTL,
    async () => {
      try {
        const res = await fetch(
          `${CONFIG.github.apiBase}/users/${CONFIG.github.username}/repos?per_page=100`
        );

        // Handle non-200 responses
        if (!res.ok) {
          throw new Error(`GitHub API HTTP ${res.status}`);
        }

        const data = await res.json();

        // Validate expected array
        if (!Array.isArray(data)) {
          throw new Error("GitHub API returned non-array response");
        }

        return data
          .filter(r => r && !r.fork && !r.archived)
          .map(repo => ({
            name: repo.name,
            description: repo.description || "",
            stars: repo.stargazers_count || 0,
            language: repo.language || "",
            updatedAt: repo.updated_at,
            url: repo.html_url,
            type: detectProjectType(repo)
          }));
      } catch (error) {
        console.warn(
          "[GitHub] Failed to load repositories. Returning empty list.",
          error
        );

        // SAFE fallback
        return [];
      }
    }
  );
}

function detectProjectType(repo) {
  const name = (repo.name || "").toLowerCase();

  if (name.includes("sql")) return "SQL";
  if (name.includes("dashboard")) return "Dashboard";
  if (name.includes("python")) return "Python";
  if (name.includes("google")) return "Google";

  return "Other";
}
