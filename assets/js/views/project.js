import { fetchRepoTree, fetchFileContent } from "../services/githubCode.js";
import { getProjectById } from "../core/projectStore.js";

/**
 * Single Project View (FINAL)
 * - Uses canonical project index
 * - Validates project existence
 * - SPA-safe
 */
export async function ProjectView(container, params = {}) {
  if (!container) return;

  const projectId = Number(params.id);

  // ----------------------------------------
  // Resolve project from central store
  // ----------------------------------------
  const project = getProjectById(projectId);

  if (!project) {
    container.innerHTML = `
      <section class="project-error">
        <h2>Project not found</h2>
        <p>The requested project does not exist.</p>
      </section>
    `;
    return;
  }

  // ----------------------------------------
  // Base layout (renders immediately)
  // ----------------------------------------
  container.innerHTML = `
    <section class="project-detail">
      <header>
        <h1>${project.name}</h1>
        <p class="muted">${project.description || "No description provided."}</p>
      </header>

      <div class="project-layout">
        <aside id="file-tree">
          <p class="muted">Loading files…</p>
        </aside>

        <pre id="code-viewer">
<code>// Select a file to view its code</code>
        </pre>
      </div>
    </section>
  `;

  const treeEl = container.querySelector("#file-tree");
  const codeEl = container.querySelector("#code-viewer code");

  // ----------------------------------------
  // Load repository tree
  // ----------------------------------------
  let tree = [];

  try {
    const result = await fetchRepoTree(project.repo);
    tree = Array.isArray(result) ? result : [];
  } catch (error) {
    console.warn("[ProjectView] Repo tree load failed", error);
  }

  // ----------------------------------------
  // Empty state
  // ----------------------------------------
  if (tree.length === 0) {
    treeEl.innerHTML = "<p>No files found in this repository.</p>";
    return;
  }

  // ----------------------------------------
  // Render file list (files only)
  // ----------------------------------------
  treeEl.innerHTML = "";

  tree
    .filter(item => item && item.type === "file")
    .forEach(file => {
      const item = document.createElement("button");
      item.className = "file-item";
      item.textContent = file.path;

      item.addEventListener("click", async () => {
        codeEl.textContent = "// Loading file…";

        try {
          const content = await fetchFileContent(
            project.repo,
            file.path
          );
          codeEl.textContent =
            content || "// Unable to load file.";
        } catch (error) {
          console.warn(
            `[ProjectView] Failed to load ${file.path}`,
            error
          );
          codeEl.textContent = "// Error loading file.";
        }
      });

      treeEl.appendChild(item);
    });
}
