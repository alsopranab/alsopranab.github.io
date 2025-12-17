/**
 * Fetch contribution data from static JSON (SAFE)
 * - No token
 * - No rate limits
 * - Works on GitHub Pages
 */
export async function fetchGitHubContributions() {
  try {
    const res = await fetch("/assets/data/contributions.json");
    if (!res.ok) throw new Error("Failed to load contributions.json");

    return await res.json();
  } catch (err) {
    console.warn("[GitHub] Contribution JSON unavailable", err);
    return [];
  }
}
