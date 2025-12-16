import { fetchRepoTree, fetchFileContent } from "../services/githubCode.js";

export async function ProjectView(container, { repo }) {
  const tree = await fetchRepoTree(repo);

  container.innerHTML = `
    <section>
      <h2>${repo}</h2>
      <div class="project-layout">
        <aside id="file-tree"></aside>
        <pre id="code-viewer"><code>Select a file</code></pre>
      </div>
    </section>
  `;

  const treeEl = container.querySelector("#file-tree");
  const codeEl = container.querySelector("#code-viewer code");

  tree
    .filter(item => item.type === "file")
    .forEach(file => {
      const btn = document.createElement("div");
      btn.textContent = file.name;
      btn.onclick = async () => {
        const content = await fetchFileContent(repo, file.path);
        codeEl.textContent = content;
      };
      treeEl.appendChild(btn);
    });
}
