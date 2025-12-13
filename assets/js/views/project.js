function renderProject(query) {
  const app = document.getElementById("app");
  const repo = new URLSearchParams(query).get("repo");

  if (!repo) {
    app.innerHTML = "<p>Project not found.</p>";
    return;
  }

  app.innerHTML = `
    <section>
      <a href="#/projects">← Back to Projects</a>
      <h1>${repo}</h1>
      <p>Repository files preview (code only).</p>
      <div id="files" class="grid"></div>
    </section>
  `;

  fetch(`https://api.github.com/repos/alsopranab/${repo}/contents`)
    .then(res => res.json())
    .then(files => {
      files
        .filter(f => f.type === "file" && /\.(sql|py|js)$/i.test(f.name))
        .forEach(file => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${file.name}</h3>
            <button onclick="loadFile('${repo}','${file.path}')">
              View Code
            </button>
            <pre class="code-block"><code id="code-${file.sha}"></code></pre>
          `;
          document.getElementById("files").appendChild(card);
        });
    });
}

function loadFile(repo, path) {
  fetch(`https://api.github.com/repos/alsopranab/${repo}/contents/${path}`)
    .then(res => res.json())
    .then(file => {
      const code = atob(file.content);
      const el = document.querySelector(`[id^="code-"]`);
      el.textContent = code;
      Prism.highlightElement(el);
    });
}
