import { CONFIG } from "../core/config.js";
import { store } from "../core/store.js";

export async function fetchGitHubStats() {
  return store.cached("github_stats", 3600000, async () => {
    const res = await fetch(
      `${CONFIG.github.apiBase}/users/${CONFIG.github.username}`
    );

    if (!res.ok) throw new Error("GitHub stats failed");

    const data = await res.json();

    return {
      repos: data.public_repos,
      followers: data.followers
    };
  });
}
