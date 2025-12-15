/* =====================================================
   PROJECT DETAIL VIEW
   LANDIO-GRADE · MONOCHROME · SPA SAFE
===================================================== */

function renderProject(query) {
  const app = document.getElementById("app");
  const params = new URLSearchParams(query);
  const repoName = params.get("repo");

  if (!app || !repoName) {
    app.innerHTML = `
      <section>
        <p class="muted">Project not found.</p>
      </section>
    `;
    return;
  }

  app.innerHTML = `
    <section>
      <h1>${repoName}</h1>
      <p class="muted">Loading repository details…</p>
    </section>
  `;

  Promise.all([
    fetch(`https://api.github.com/repos/alsopranab/${repoName}`).then(r => r.json()),
    fetch(`https://api.github.com/repos/alsopranab/${repoName}/contents`).then(r => r.json())
  ])
    .then(([repoData, contents]) => {
      if (!repoData || repoData.message) {
        throw new Error("Invalid repo data");
      }

      renderProjectLayout(repoData, Array.isArray(contents) ? contents : [], repoName);
    })
    .catch(() => {
      app.innerHTML = `
        <section>
          <h1>${repoName}</h1>
          <p class="muted">Unable to load repository data.</p>
        </section>
      `;

      if (window.runMotionEnhancements) {
        requestAnimationFrame(runMotionEnhancements);
      }
    });
}

/* =====================================================
   MAIN LAYOUT
===================================================== */

function renderProjectLayout(repo, contents, repoName) {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>${repo.name}</h1>
      <p class="muted">${repo.description || "No description provided."}</p>

      <div class="grid">
        <div class="card">
          <p><strong>Primary language:</strong> ${repo.language || "Mixed"}</p>
          <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
          <p><strong>Last updated:</strong> ${new Date(repo.updated_at).toDateString()}</p>
        </div>
      </div>
    </section>

    <section>
      <h2>Repository Files</h2>

      <div class="grid">
        <div class="card repo-card" id="fileTree"></div>

        <div class="card repo-card">
          <div id="fileViewer">
            <p class="muted">Select a file to view its contents.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  renderFileTree(contents, repoName);

  /* 🔑 VERY IMPORTANT: re-run motion after DOM paint */
  if (window.runMotionEnhancements) {
    requestAnimationFrame(runMotionEnhancements);
  }
}

/* =====================================================
   FILE TREE
===================================================== */

function renderFileTree(contents, repo) {
  const tree = document.getElementById("fileTree");

  if (!tree) return;

  if (!contents.length) {
    tree.innerHTML = `<p class="muted">No files found.</p>`;
    return;
  }

  tree.innerHTML = `
    <ul class="repo-tree">
      ${contents.map(item => fileItem(item, repo)).join("")}
    </ul>
  `;
}

function fileItem(item, repo) {
  if (item.type === "dir") {
    return `
      <li class="repo-dir">
        ${item.name}/
      </li>
    `;
  }

  return `
    <li
      class="repo-file"
      onclick="openFile('${repo}','${item.path}')"
    >
      ${item.name}
    </li>
  `;
}

/* =====================================================
   FILE VIEWER
===================================================== */

function openFile(repo, path) {
  const viewer = document.getElementById("fileViewer");
  if (!viewer) return;

  viewer.innerHTML = `<p class="muted">Loading file…</p>`;

  fetch(`https://api.github.com/repos/alsopranab/${repo}/contents/${path}`)
    .then(r => r.json())
    .then(file => {
      if (!file || !file.content) {
        viewer.innerHTML = `<p class="muted">Unable to load file.</p>`;
        return;
      }

      const content = atob(file.content);
      const lang = detectLanguage(path);

      viewer.innerHTML = `
        <h3>${path}</h3>
        <pre><code class="language-${lang}">
${escapeHtml(content)}
</code></pre>
      `;

      if (window.Prism) {
        Prism.highlightAll();
      }
    })
    .catch(() => {
      viewer.innerHTML = `<p class="muted">Unable to load file.</p>`;
    });
}

/* =====================================================
   HELPERS
===================================================== */

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
