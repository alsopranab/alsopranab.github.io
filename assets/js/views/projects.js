function renderProjects() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Projects</h1>
      <p class="muted">
        A curated view of my real-world work, grouped by domain.
      </p>
    </section>

    <section>
      <h2>SQL Projects</h2>
      <div id="sql-projects" class="grid"></div>
    </section>

    <section>
      <h2>Python Projects</h2>
      <div id="python-projects" class="grid"></div>
    </section>

    <section>
      <h2>Automation / ETL</h2>
      <div id="automation-projects" class="grid"></div>
    </section>
  `;

  fetchProjects();
}

/* =========================
   FETCH & CLASSIFY
========================= */

function fetchProjects() {
  fetch("https://api.github.com/users/alsopranab/repos")
    .then(res => res.json())
    .then(repos => {
      repos
        .filter(r => !r.fork)
        .forEach(repo => {
          const card = projectCard(repo);

          const name = repo.name.toLowerCase();
          if (name.includes("sql")) {
            document.getElementById("sql-projects").appendChild(card);
          } else if (repo.language === "Python") {
            document.getElementById("python-projects").appendChild(card);
          } else {
            document.getElementById("automation-projects").appendChild(card);
          }
        });
    });
}

function projectCard(repo) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h3>${repo.name}</h3>
    <p class="muted">${repo.description || "No description provided."}</p>
    <button onclick="location.hash='#/project?repo=${repo.name}'">
      View Code
    </button>
  `;

  return div;
}
