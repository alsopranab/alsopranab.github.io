import { fetchRepoTree, fetchFileContent } from "../services/githubCode.js";

export async function ProjectView(container, params = {}) {
  const repo = params.repo;

  // Guard: missing repo
  if (!repo) {
    container.innerHTML = `
      <section>
        <h2>Project not found</h2>
        <p>Invalid or missing project reference.</p>
      </section>
    `;
    return;
  }

  let tree = [];

  try {
    const result = await fetchRepoTree(repo);
    tree = Array.isArray(result) ? result : [];
  } catch (error) {
    console.warn("[ProjectView] Failed to load repo tree", error);
    tree = [];
  }

  container.innerHTML = `
    <section>
      <h2>${repo}</h2>
      <div class="project-layout">
        <aside id="file-tree"></aside>
        <pre id="code-viewer"><code>// Select a file to view its code</code></pre>
      </div>
    </section>
  `;

  const treeEl = container.querySelector("#file-tree");
  const codeEl = container.querySelector("#code-viewer code");

  // Empty state
  if (tree.length === 0) {
    treeEl.innerHTML = "<p>No files found in this repository.</p>";
    return;
  }

  // Render only valid files
  tree
    .filter(item => item && item.type === "file")
    .forEach(file => {
      const btn = document.createElement("div");
      btn.textContent = file.name;
      btn.className = "file-item";

      btn.addEventListener("click", async () => {
        codeEl.textContent = "// Loading file…";

        try {
          const content = await fetchFileContent(repo, file.path);
          codeEl.textContent = content || "// Unable to load file.";
        } catch (error) {
          console.warn(
            `[ProjectView] Failed to load file ${file.path}`,
            error
          );
          codeEl.textContent = "// Error loading file.";
        }
      });

      treeEl.appendChild(btn);
    });
}
