/**
 * Fetch GitHub contribution data from static JSON
 * - NO token
 * - NO GraphQL
 * - GitHub Pages safe
 * - Never crashes Analytics page
 */
export async function fetchGitHubContributions() {
  try {
    const res = await fetch("/assets/data/contributions.json", {
      cache: "no-cache"
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const text = await res.text();

    // 🔒 HARD GUARD: ensure valid JSON
    const data = JSON.parse(text);

    if (!Array.isArray(data)) {
      throw new Error("Invalid contributions format");
    }

    return data;
  } catch (err) {
    console.warn("[GitHub] Contribution JSON unavailable", err);
    return [];
  }
}
