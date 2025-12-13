// assets/js/views/projects.js

async function renderProjects() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="fade-in">
      <h1>Projects</h1>
      <p>Real projects built from practice, work, and automation.</p>
      <div id="project-groups"></div>
    </section>
  `;

  const res = await fetch("https://api.github.com/users/alsopranab/repos");
  const repos = await res.json();

  const groups = {
    SQL: [],
    Python: [],
    Automation: [],
    Other: []
  };

  repos.forEach(repo => {
    const name = repo.name.toLowerCase();

    if (name.includes("sql")) groups.SQL.push(repo);
    else if (name.includes("python") || name.includes("eda")) groups.Python.push(repo);
    else if (name.includes("automation") || name.includes("script")) groups.Automation.push(repo);
    else groups.Other.push(repo);
  });

  const container = document.getElementById("project-groups");

  Object.entries(groups).forEach(([category, list]) => {
    if (!list.length) return;

    container.innerHTML += `
      <h2>${category}</h2>
      ${list
        .map(
          r => `
        <div class="card">
          <h3>${r.name}</h3>
          <p>${r.description || "No description provided."}</p>
          <button onclick="location.href='#/project?repo=${r.name}'">
            View Project
          </button>
        </div>
      `
        )
        .join("")}
    `;
  });
}

window.renderProjects = renderProjects;
