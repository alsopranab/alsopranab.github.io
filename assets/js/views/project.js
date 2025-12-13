async function renderProject(params) {
  const repo = params.repo;
  if (!repo) {
    app.innerHTML = "<p>Project not found</p>";
    return;
  }

  app.innerHTML = `<p>Loading project...</p>`;

  const base = `https://api.github.com/repos/${PROFILE.github}/${repo}/contents`;

  const res = await fetch(base);
  const files = await res.json();

  app.innerHTML = `
    <a href="#/projects">← Back</a>
    <h2>${repo}</h2>
    <div id="file-list" class="grid"></div>
    <div id="code-viewer"></div>
  `;

  files
    .filter(f => f.type === "file")
    .forEach(f => {
      document.getElementById("file-list").innerHTML += `
        <div class="card">
          <strong>${f.name}</strong><br/>
          <button onclick="openFile('${repo}','${f.name}','${f.download_url}')">
            Open
          </button>
        </div>
      `;
    });
}

async function openFile(repo, name, url) {
  const res = await fetch(url);
  const code = await res.text();

  const lang =
    name.endsWith(".sql") ? "sql" :
    name.endsWith(".py") ? "python" :
    name.endsWith(".js") ? "javascript" :
    "none";

  document.getElementById("code-viewer").innerHTML = `
    <h3>${name}</h3>
    <pre class="code-block">
      <code class="language-${lang}">
${escapeHTML(code)}
      </code>
    </pre>
  `;

  Prism.highlightAll();
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
