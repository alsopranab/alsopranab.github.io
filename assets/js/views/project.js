function renderProject(query) {
  const app = document.getElementById("app");
  const params = new URLSearchParams(query);
  const repoName = params.get("repo");

  if (!repoName) {
    app.innerHTML = `<p class="muted">Project not found.</p>`;
    return;
  }

  app.innerHTML = `
    <section>
      <h1>${repoName}</h1>
      <p class="muted">Loading project details...</p>
    </section>
  `;

  fetch(`https://api.github.com/repos/alsopranab/${repoName}`)
    .then(res => res.json())
    .then(repo => {
      renderProjectDetails(repo);
      fetchReadme(repoName);
    });
}

function renderProjectDetails(repo) {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>${repo.name}</h1>
      <p class="muted">${repo.description || ""}</p>

      <div class="grid">
        <div class="card">
          <p><strong>Language:</strong> ${repo.language || "N/A"}</p>
          <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
          <p><strong>Updated:</strong> ${new Date(repo.updated_at).toDateString()}</p>

          <button onclick="window.open('${repo.html_url}', '_blank')">
            Open on GitHub
          </button>
        </div>
      </div>
    </section>

    <section>
      <h2>README</h2>
      <div class="card" id="readme">
        <p class="muted">Loading README...</p>
      </div>
    </section>
  `;
}

function fetchReadme(repo) {
  fetch(`https://api.github.com/repos/alsopranab/${repo}/readme`)
    .then(res => res.json())
    .then(data => {
      const content = atob(data.content);
      document.getElementById("readme").innerHTML = `
        <pre><code>${escapeHtml(content)}</code></pre>
      `;
    })
    .catch(() => {
      document.getElementById("readme").innerHTML =
        "<p class='muted'>No README available.</p>";
    });
}

/* =========================
   UTIL
========================= */

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
