/* =====================================================
   PROJECTS VIEW
   LANDIO-GRADE · MONOCHROME · SCROLL-AWARE
===================================================== */

function renderProjects() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <section>
      <h1>Projects</h1>
      <p>
        A curated selection of real-world work, grouped by technology
        and built with production intent.
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
      <h2>Automation & Others</h2>
      <div id="other-projects" class="grid"></div>
    </section>
  `;

  fetchAndClassifyProjects();
}

/* =====================================================
   FETCH & CLASSIFY (RATE-LIMIT SAFE)
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
    if (!Array.isArray(data)) throw new Error("Invalid response");

    repos = data.filter(r => !r.fork && !r.archived);

  } catch (err) {
    console.error("GitHub repo fetch failed:", err);
    renderProjectsFallback();
    return;
  }

  repos.forEach(repo => classifyRepo(repo));
}

/* =====================================================
   CLASSIFICATION
===================================================== */

function classifyRepo(repo) {
  const language = (repo.language || "").toLowerCase();

  let bucket = "other";
  if (language === "sql") bucket = "sql";
  else if (language === "python") bucket = "python";

  const card = projectCard(repo);

  document
    .getElementById(`${bucket}-projects`)
    ?.appendChild(card);
}

/* =====================================================
   FALLBACK UI
===================================================== */

function renderProjectsFallback() {
  const other = document.getElementById("other-projects");
  if (!other) return;

  other.innerHTML = `
    <div class="card">
      <h3>GitHub API limit reached</h3>
      <p>
        GitHub temporarily blocked requests.
        Please browse projects directly on GitHub.
      </p>
      <button onclick="window.open('https://github.com/alsopranab', '_blank')">
        Open GitHub Profile
      </button>
    </div>
  `;
}

/* =====================================================
   PROJECT CARD (EDITORIAL)
===================================================== */

function projectCard(repo) {
  const div = document.createElement("div");
  div.className = "card project-card";

  div.innerHTML = `
    <h3>${repo.name}</h3>

    <p>
      ${repo.description || "No description provided."}
    </p>

    <button onclick="location.hash='#/project?repo=${repo.name}'">
      View repository
    </button>
  `;

  return div;
}
