import { CONFIG } from "../core/config.js";
import { store } from "../core/store.js";

/**
 * Fetch GitHub repositories (RAW + NORMALIZED)
 * - No classification
 * - No UI logic
 * - Safe, cached, defensive
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

        if (!res.ok) {
          throw new Error(`GitHub API HTTP ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("GitHub API returned non-array response");
        }

        // Normalize ONLY
        return data
          .filter(repo => repo && !repo.fork && !repo.archived)
          .map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || "",
            language: repo.language || "",
            topics: Array.isArray(repo.topics) ? repo.topics : [],
            stars: repo.stargazers_count || 0,
            updatedAt: repo.updated_at,
            htmlUrl: repo.html_url
          }));
      } catch (error) {
        console.warn(
          "[GitHub] Failed to load repositories. Returning empty list.",
          error
        );

        return [];
      }
    }
  );
}
