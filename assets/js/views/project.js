function renderProject(query) {
  const app = document.getElementById("app");
  const params = new URLSearchParams(query);
  const repo = params.get("repo");

  if (!repo) {
    app.innerHTML = `<p class="muted">Project not found.</p>`;
    return;
  }

  app.innerHTML = `
    <section>
      <h1>${repo}</h1>
      <p class="muted">Loading project data...</p>
    </section>
  `;

  Promise.all([
    fetch(`https://api.github.com/repos/alsopranab/${repo}`).then(r => r.json()),
    fetch(`https://api.github.com/repos/alsopranab/${repo}/contents`).then(r => r.json())
  ]).then(([repoData, contents]) => {
    renderProjectLayout(repoData, contents, repo);
  });
}

/* =========================
   MAIN LAYOUT
========================= */

function renderProjectLayout(repo, contents, repoName) {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>${repo.name}</h1>
      <p class="muted">${repo.description || ""}</p>

      <div class="grid">
        <div class="card">
          <p><strong>Language:</strong> ${repo.language || "Mixed"}</p>
          <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
          <p><strong>Updated:</strong> ${new Date(repo.updated_at).toDateString()}</p>
        </div>
      </div>
    </section>

    <section>
      <h2>Repository Files</h2>
      <div class="grid">
        <div class="card" id="fileTree"></div>
        <div class="card">
          <div id="fileViewer">
            <p class="muted">Select a file to view its content.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  renderFileTree(contents, repoName);
}

/* =========================
   FILE TREE
========================= */

function renderFileTree(contents, repo) {
  const tree = document.getElementById("fileTree");

  tree.innerHTML = `
    <ul style="list-style:none;padding-left:0;">
      ${contents.map(item => fileItem(item, repo)).join("")}
    </ul>
  `;
}

function fileItem(item, repo) {
  if (item.type === "dir") {
    return `
      <li style="margin-bottom:8px;">
        📁 <strong>${item.name}</strong>
      </li>
    `;
  }

  return `
    <li style="margin-bottom:8px;cursor:pointer;color:#38bdf8;"
        onclick="openFile('${repo}','${item.path}')">
      📄 ${item.name}
    </li>
  `;
}

/* =========================
   FILE VIEWER
========================= */

function openFile(repo, path) {
  const viewer = document.getElementById("fileViewer");

  viewer.innerHTML = `<p class="muted">Loading file...</p>`;

  fetch(`https://api.github.com/repos/alsopranab/${repo}/contents/${path}`)
    .then(r => r.json())
    .then(file => {
      const content = atob(file.content || "");
      const lang = detectLanguage(path);

      viewer.innerHTML = `
        <h3>${path}</h3>
        <pre>
          <code class="language-${lang}">
${escapeHtml(content)}
          </code>
        </pre>
      `;

      if (window.Prism) {
        Prism.highlightAll();
      }
    })
    .catch(() => {
      viewer.innerHTML = `<p class="muted">Unable to load file.</p>`;
    });
}

/* =========================
   HELPERS
========================= */

function detectLanguage(file) {
  if (file.endsWith(".js")) return "javascript";
  if (file.endsWith(".sql")) return "sql";
  if (file.endsWith(".py")) return "python";
  if (file.endsWith(".json")) return "json";
  if (file.endsWith(".md")) return "markdown";
  return "markup";
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
