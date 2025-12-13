function renderProjects() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Projects</h1>
      <p>All projects are fetched from GitHub and grouped by domain.</p>
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

  loadProjects();
}

function loadProjects() {
  fetch("https://api.github.com/users/alsopranab/repos")
    .then(res => res.json())
    .then(repos => {
      repos
        .filter(r => !r.fork)
        .forEach(repo => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description provided."}</p>
            <button onclick="location.hash='#/project?repo=${repo.name}'">
              View Inside
            </button>
          `;

          if (repo.name.toLowerCase().includes("sql")) {
            document.getElementById("sql-projects").appendChild(card);
          } else if (repo.name.toLowerCase().includes("python") || repo.language === "Python") {
            document.getElementById("python-projects").appendChild(card);
          } else {
            document.getElementById("automation-projects").appendChild(card);
          }
        });
    });
}
