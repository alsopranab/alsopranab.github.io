import { CONFIG } from "../core/config.js";

/**
 * Fetch GitHub contribution data.
 * This MUST be defensive:
 * - External API
 * - Rate-limited
 * - Network may fail
 * - App must NEVER crash
 */
export async function fetchContributions() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${CONFIG.github.username}`
    );

    // Handle non-200 responses
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    // Validate shape
    if (!data || !Array.isArray(data.contributions)) {
      throw new Error("Invalid contributions format");
    }

    return data.contributions;
  } catch (error) {
    console.warn(
      "[Contributions] Failed to load. Returning empty dataset.",
      error
    );

    // SAFE fallback: empty contribution grid
    return [];
  }
}
