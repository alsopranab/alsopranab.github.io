function renderProjects() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Projects</h1>
      <p>Live GitHub repositories grouped by domain.</p>
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
      <h2>Automation / ETL</h2>
      <div id="automation-projects" class="grid"></div>
    </section>
  `;

  fetchProjects();
}

function fetchProjects() {
  fetch("https://api.github.com/users/alsopranab/repos")
    .then(res => res.json())
    .then(repos => {
      repos.filter(r => !r.fork).forEach(repo => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <button onclick="location.hash='#/project?repo=${repo.name}'">
            Open Project
          </button>
        `;

        const name = repo.name.toLowerCase();
        if (name.includes("sql")) {
          sqlAppend(card);
        } else if (repo.language === "Python") {
          pythonAppend(card);
        } else {
          autoAppend(card);
        }
      });
    });
}

function sqlAppend(el) {
  document.getElementById("sql-projects").appendChild(el);
}
function pythonAppend(el) {
  document.getElementById("python-projects").appendChild(el);
}
function autoAppend(el) {
  document.getElementById("automation-projects").appendChild(el);
}
