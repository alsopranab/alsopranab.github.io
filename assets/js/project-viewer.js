const params = new URLSearchParams(window.location.search);
const repoPath = params.get("repo");

if (!repoPath) {
  document.body.innerHTML = "<p>Invalid project.</p>";
  throw new Error("No repo specified");
}

const [owner, repo] = repoPath.split("/");

const nameEl = document.getElementById("project-name");
const descEl = document.getElementById("project-desc");
const readmeEl = document.getElementById("readme");
const filesEl = document.getElementById("file-list");

nameEl.textContent = repo.replace(/-/g, " ");

fetch(`https://api.github.com/repos/${owner}/${repo}`)
  .then(r => r.json())
  .then(data => {
    descEl.textContent = data.description || "";
  });

fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
  .then(r => r.json())
  .then(data => {
    const content = atob(data.content);
    readmeEl.textContent = content;
  })
  .catch(() => {
    readmeEl.textContent = "README not available.";
  });

fetch(`https://api.github.com/repos/${owner}/${repo}/contents`)
  .then(r => r.json())
  .then(files => {
    files.forEach(file => {
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = file.name;
      filesEl.appendChild(div);
    });
  });
