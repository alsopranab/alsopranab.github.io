function renderProjects() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Projects</h1>
      <p class="muted">
        A curated view of my real-world work, grouped dynamically by technology.
      </p>
    </section>

    <section>
      <h2>SQL</h2>
      <div id="sql-projects" class="grid"></div>
    </section>

    <section>
      <h2>Python</h2>
      <div id="python-projects" class="grid"></div>
    </section>

    <section>
      <h2>Automation / Others</h2>
      <div id="other-projects" class="grid"></div>
    </section>
  `;

  fetchAndClassifyProjects();
}

/* =========================
   FETCH & CLASSIFY (DYNAMIC)
========================= */

function fetchAndClassifyProjects() {
  fetch("https://api.github.com/users/alsopranab/repos?per_page=100")
    .then(res => res.json())
    .then(repos => {
      repos
        .filter(r => !r.fork)
        .forEach(repo => classifyRepoByFiles(repo));
    });
}

function classifyRepoByFiles(repo) {
  fetch(repo.contents_url.replace("{+path}", ""))
    .then(res => res.json())
    .then(files => {
      const types = detectRepoTypes(files);

      const card = projectCard(repo, types.primary);

      if (types.sql) {
        document.getElementById("sql-projects").appendChild(card);
      } else if (types.python) {
        document.getElementById("python-projects").appendChild(card);
      } else {
        document.getElementById("other-projects").appendChild(card);
      }
    })
    .catch(() => {
      // Fallback
      document.getElementById("other-projects").appendChild(
        projectCard(repo, "other")
      );
    });
}

/* =========================
   TYPE DETECTION
========================= */

function detectRepoTypes(files) {
  const names = files.map(f => f.name.toLowerCase());

  const sql = names.some(n => n.endsWith(".sql"));
  const python = names.some(n => n.endsWith(".py"));
  const js = names.some(n => n.endsWith(".js"));

  let primary = "other";
  if (sql) primary = "sql";
  else if (python) primary = "python";
  else if (js) primary = "js";

  return { sql, python, js, primary };
}

/* =========================
   UI CARD
========================= */

function projectCard(repo, type) {
  const div = document.createElement("div");
  div.className = "card project-card";

  div.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <img
        src="${techIcon(type)}"
        alt="${type}"
        style="width:26px;height:26px;"
      />
      <h3 style="margin:0;">${repo.name}</h3>
    </div>

    <p class="muted project-desc" style="display:none;margin-top:10px;">
      ${repo.description || "No description provided."}
    </p>

    <button
      style="margin-top:12px;"
      onclick="location.hash='#/project?repo=${repo.name}'">
      View Project
    </button>
  `;

  div.onmouseenter = () =>
    div.querySelector(".project-desc").style.display = "block";

  div.onmouseleave = () =>
    div.querySelector(".project-desc").style.display = "none";

  return div;
}

/* =========================
   ICON MAPPER (FUTURE-PROOF)
========================= */

function techIcon(type) {
  const icons = {
    sql: "https://cdn.simpleicons.org/postgresql/38bdf8",
    python: "https://cdn.simpleicons.org/python/38bdf8",
    js: "https://cdn.simpleicons.org/javascript/38bdf8",
    other: "https://cdn.simpleicons.org/github/9ca3af"
  };

  return icons[type] || icons.other;
}
