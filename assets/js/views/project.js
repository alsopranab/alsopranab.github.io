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
      <p>Code files preview (SQL / Python / JS).</p>
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
            <button onclick="loadFile(this, '${file.download_url}', '${file.name}')">
              View Code
            </button>
            <pre class="code-block" style="display:none">
              <code class="language-${getLang(file.name)}"></code>
            </pre>
          `;
          document.getElementById("files").appendChild(card);
        });
    });
}

function loadFile(btn, url, filename) {
  const card = btn.closest(".card");
  const block = card.querySelector("pre");
  const codeEl = block.querySelector("code");

  if (block.style.display === "block") {
    block.style.display = "none";
    return;
  }

  fetch(url)
    .then(res => res.text())
    .then(code => {
      codeEl.textContent = code;
      block.style.display = "block";
      Prism.highlightElement(codeEl);
    });
}

function getLang(name) {
  if (name.endsWith(".sql")) return "sql";
  if (name.endsWith(".py")) return "python";
  if (name.endsWith(".js")) return "javascript";
  return "none";
}
