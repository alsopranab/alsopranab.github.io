const username = "alsopranab";

const sqlBox = document.getElementById("sql-projects");
const pythonBox = document.getElementById("python-projects");
const autoBox = document.getElementById("automation-projects");

fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
  .then(res => res.json())
  .then(repos => {
    repos.forEach(repo => {
      if (!repo.description || repo.fork) return;
      if (repo.name.includes("github.io")) return;

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${repo.name.replace(/-/g, " ")}</h3>
        <p>${repo.description}</p>
        <p><strong>Primary:</strong> ${repo.language || "Multiple"}</p>
        <button onclick="openProject('${repo.owner.login}','${repo.name}')">
          View Inside Website
        </button>
      `;

      const name = repo.name.toLowerCase();

      if (
        repo.language === "SQL" ||
        name.includes("sql")
      ) {
        sqlBox.appendChild(card);
      } 
      else if (
        repo.language === "Python" ||
        name.includes("eda") ||
        name.includes("ml")
      ) {
        pythonBox.appendChild(card);
      } 
      else {
        autoBox.appendChild(card);
      }
    });
  });

function openProject(owner, repo) {
  window.location.href = `project.html?repo=${owner}/${repo}`;
}
