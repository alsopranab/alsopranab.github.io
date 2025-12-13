const params = new URLSearchParams(window.location.search);
const repoPath = params.get("repo");

const [owner, repo] = repoPath.split("/");

const nameEl = document.getElementById("project-name");
const descEl = document.getElementById("project-desc");
const readmeEl = document.getElementById("readme");
const filesEl = document.getElementById("file-list");

nameEl.textContent = repo.replace(/-/g, " ");

fetch(`https://api.github.com/repos/${owner}/${repo}`)
  .then(r => r.json())
  .then(d => descEl.textContent = d.description || "");

/* README AS CONTENT */
fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
  .then(r => r.json())
  .then(d => {
    readmeEl.textContent = atob(d.content);
  });

/* FILE FILTERING */
fetch(`https://api.github.com/repos/${owner}/${repo}/contents`)
  .then(r => r.json())
  .then(files => {
    files
      .filter(f =>
        f.type === "dir" ||
        f.name.endsWith(".sql") ||
        f.name.endsWith(".py")
      )
      .forEach(f => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = f.name;

        if (f.type === "file") {
          card.onclick = () =>
            window.location.href =
              `file.html?repo=${owner}/${repo}&path=${f.path}`;
        }

        filesEl.appendChild(card);
      });
  });
