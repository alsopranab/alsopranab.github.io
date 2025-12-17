/**
 * Fetch GitHub contribution data (STATIC JSON)
 * --------------------------------------------
 * Source: /assets/data/contributions.json
 * - Defensive parsing
 * - Handles invalid JSON / HTML / 404
 * - NEVER crashes Analytics page
 */
export async function fetchGitHubContributions() {
  try {
    const res = await fetch("/assets/data/contributions.json", {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    // Read as text first (CRITICAL)
    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.warn(
        "[GitHub] Contribution JSON invalid. Raw response:",
        text.slice(0, 200)
      );
      throw parseError;
    }

    // Validate expected array shape
    if (!Array.isArray(data)) {
      throw new Error("Contribution JSON is not an array");
    }

    return data.filter(
      item =>
        item &&
        typeof item.date === "string" &&
        typeof item.count === "number"
    );
  } catch (error) {
    console.warn(
      "[GitHub] Contribution JSON unavailable",
      error
    );

    // 🔒 SAFE fallback
    return [];
  }
}
