/**
 * Fetch GitHub contribution data
 * - Uses pre-generated static JSON
 * - No tokens
 * - No auth
 * - GitHub Pages safe
 */
export async function fetchGitHubContributions() {
  try {
    const res = await fetch("/assets/data/contributions.json");

    if (!res.ok) {
      throw new Error("Contribution data not found");
    }

    const data = await res.json();

    // Defensive check
    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (err) {
    console.warn(
      "[Analytics] Contribution heatmap unavailable",
      err
    );
    return [];
  }
}
