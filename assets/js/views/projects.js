/* =====================================================
   PROJECTS VIEW
   Safe · Rate-limit aware · SPA stable
===================================================== */

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

/* =====================================================
   FETCH & CLASSIFY (SAFE)
===================================================== */

async function fetchAndClassifyProjects() {
  let repos = [];

  try {
    const res = await fetch(
      "https://api.github.com/users/alsopranab/repos?per_page=100",
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!res.ok) throw new Error(res.status);

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid repo response");

    repos = data.filter(r => !r.fork && !r.archived);

  } catch (err) {
    console.error("GitHub repo fetch failed:", err);
    renderProjectsFallback();
    return;
  }

  repos.forEach(repo => classifyRepo(repo));
}

/* =====================================================
   CLASSIFICATION (FAST FIRST)
===================================================== */

function classifyRepo(repo) {
  const language = (repo.language || "").toLowerCase();

  let bucket = "other";
  if (language === "sql") bucket = "sql";
  else if (language === "python") bucket = "python";

  const card = projectCard(repo, bucket);

  document
    .getElementById(`${bucket}-projects`)
    ?.appendChild(card);
}

/* =====================================================
   FALLBACK UI (RATE LIMIT SAFE)
===================================================== */

function renderProjectsFallback() {
  const other = document.getElementById("other-projects");
  if (!other) return;

  other.innerHTML = `
    <div class="card">
      <h3>GitHub API limit reached</h3>
      <p class="muted">
        GitHub temporarily blocked requests.
        Please refresh later or browse projects directly on GitHub.
      </p>
      <button onclick="window.open('https://github.com/alsopranab', '_blank')">
        Open GitHub Profile
      </button>
    </div>
  `;
}

/* =====================================================
   UI CARD
===================================================== */

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

  div.addEventListener("mouseenter", () => {
    const d = div.querySelector(".project-desc");
    if (d) d.style.display = "block";
  });

  div.addEventListener("mouseleave", () => {
    const d = div.querySelector(".project-desc");
    if (d) d.style.display = "none";
  });

  return div;
}

/* =====================================================
   ICON MAP
===================================================== */

function techIcon(type) {
  const icons = {
    sql: "https://cdn.simpleicons.org/postgresql/38bdf8",
    python: "https://cdn.simpleicons.org/python/38bdf8",
    js: "https://cdn.simpleicons.org/javascript/38bdf8",
    other: "https://cdn.simpleicons.org/github/9ca3af"
  };

  return icons[type] || icons.other;
}
