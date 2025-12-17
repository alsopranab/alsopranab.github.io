/**
 * Fetch GitHub contribution data (STATIC JSON)
 * - No tokens
 * - No CORS
 * - GitHub Pages safe
 */
export async function fetchGitHubContributions() {
  try {
    const res = await fetch("/assets/data/contributions.json", {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid contributions JSON");
    }

    return data;
  } catch (error) {
    console.warn(
      "[GitHub] Contribution JSON unavailable",
      error
    );
    return [];
  }
}
