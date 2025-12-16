import { CONFIG } from "../core/config.js";
import { store } from "../core/store.js";

/**
 * Fetch repository file tree.
 * Must be defensive: repo may be empty or API may fail.
 */
export async function fetchRepoTree(repo) {
  try {
    const res = await fetch(
      `${CONFIG.github.apiBase}/repos/${CONFIG.github.username}/${repo}/contents`
    );

    if (!res.ok) {
      throw new Error(`GitHub tree HTTP ${res.status}`);
    }

    const data = await res.json();

    // Ensure array
    if (!Array.isArray(data)) {
      throw new Error("Invalid repo tree format");
    }

    return data;
  } catch (error) {
    console.warn(
      `[GitHubCode] Failed to load repo tree for ${repo}`,
      error
    );

    // SAFE fallback
    return [];
  }
}

/**
 * Fetch full file content.
 * MUST handle:
 * - folders
 * - binary files
 * - missing content
 * - rate limits
 */
export async function fetchFileContent(repo, path) {
  return store.cached(
    `code_${repo}_${path}`,
    CONFIG.github.cacheTTL,
    async () => {
      try {
        const res = await fetch(
          `${CONFIG.github.apiBase}/repos/${CONFIG.github.username}/${repo}/contents/${path}`
        );

        if (!res.ok) {
          throw new Error(`GitHub file HTTP ${res.status}`);
        }

        const data = await res.json();

        // Validate file content
        if (!data || data.type !== "file" || !data.content) {
          throw new Error("Not a valid text file");
        }

        // Decode Base64 safely
        return atob(data.content.replace(/\n/g, ""));
      } catch (error) {
        console.warn(
          `[GitHubCode] Failed to load file ${path} in ${repo}`,
          error
        );

        // SAFE fallback: show readable message in UI
        return "// Unable to load file content.";
      }
    }
  );
}
