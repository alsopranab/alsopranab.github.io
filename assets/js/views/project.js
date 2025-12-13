// assets/js/views/project.js

async function renderProject() {
  const app = document.getElementById("app");

  const params = new URLSearchParams(window.location.search);
  const repo = params.get("repo");

  if (!repo) {
    app.innerHTML = `<p>Project not found.</p>`;
    return;
  }

  app.innerHTML = `
    <section class="fade-in">
      <a href="#/projects">← Back to Projects</a>
      <h1>${repo.replace(/-/g, " ")}</h1>
      <p>Loading project details…</p>
    </section>
  `;

  try {
    const repoRes = await fetch(
      `https://api.github.com/repos/alsopranab/${repo}`
    );
    const repoData = await repoRes.json();

    const readmeRes = await fetch(
      `https://raw.githubusercontent.com/alsopranab/${repo}/main/README.md`
    );
    const readmeText = readmeRes.ok
      ? await readmeRes.text()
      : "README not available.";

    const filesRes = await fetch(
      `https://api.github.com/repos/alsopranab/${repo}/contents`
    );
    const files = await filesRes.json();

    const filteredFiles = files.filter(
      f =>
        f.type === "file" &&
        !["README.md", ".gitignore"].includes(f.name)
    );

    app.innerHTML = `
      <section class="fade-in">
        <a href="#/projects">← Back to Projects</a>

        <h1>${repoData.name}</h1>
        <p>${repoData.description || ""}</p>

        <h2>Overview</h2>
        <div class="card">
          <p><b>Language:</b> ${repoData.language || "Multiple"}</p>
          <p><b>Stars:</b> ${repoData.stargazers_count}</p>
          <p><b>Last Updated:</b> ${new Date(
            repoData.updated_at
          ).toLocaleDateString()}</p>
        </div>

        <h2>README</h2>
        <div class="card code-block">
          <pre>${escapeHTML(readmeText)}</pre>
        </div>

        <h2>Project Files</h2>
        <div class="card">
          ${filteredFiles
            .map(
              f => `
              <div class="file-row" onclick="openFile('${repo}','${f.path}')">
                📄 ${f.name}
              </div>
            `
            )
            .join("")}
        </div>
      </section>
    `;
  } catch (err) {
    app.innerHTML = `<p>Error loading project.</p>`;
  }
}

function openFile(repo, path) {
  fetch(
    `https://raw.githubusercontent.com/alsopranab/${repo}/main/${path}`
  )
    .then(res => res.text())
    .then(code => {
      document.getElementById("app").innerHTML += `
        <div class="modal" style="display:flex">
          <div class="modal-box">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
            <h3>${path}</h3>
            <pre class="code-block">${escapeHTML(code)}</pre>
          </div>
        </div>
      `;
    });
}

function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// SPA hook
window.renderProject = renderProject;
