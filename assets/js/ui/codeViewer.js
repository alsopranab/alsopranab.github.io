import { fetchRepoTree, fetchFileContent } from "../services/githubCode.js";

/**
 * Load repository code tree safely
 * Returns only renderable files (no folders, no noise)
 */
export async function loadProjectCode(repo) {
  if (!repo) return [];

  try {
    const tree = await fetchRepoTree(repo);

    if (!Array.isArray(tree)) return [];

    // Only expose files suitable for viewing
    return tree
      .filter(
        item =>
          item &&
          item.type === "file" &&
          typeof item.path === "string"
      )
      .map(file => ({
        name: file.name,
        path: file.path,
        size: file.size || 0
      }));
  } catch (error) {
    console.warn(
      `[CodeViewer] Failed to load project tree for ${repo}`,
      error
    );
    return [];
  }
}

/**
 * Load file content safely
 * Handles:
 * - missing repo/path
 * - API failure
 * - non-text files
 */
export async function loadFile(repo, path) {
  if (!repo || !path) {
    return {
      content: "// Invalid file reference.",
      error: true
    };
  }

  try {
    const content = await fetchFileContent(repo, path);

    // Defensive: ensure string
    if (typeof content !== "string") {
      throw new Error("Invalid file content");
    }

    return {
      content,
      error: false
    };
  } catch (error) {
    console.warn(
      `[CodeViewer] Failed to load file ${path} in ${repo}`,
      error
    );

    return {
      content: "// Unable to load file content.",
      error: true
    };
  }
}
