async function renderProject(params) {
  const repo = params.repo;
  if (!repo) {
    app.innerHTML = "<p>Project not found</p>";
    return;
  }

  const res = await fetch(`https://api.github.com/repos/${PROFILE.github}/${repo}`);
  const data = await res.json();

  app.innerHTML = `
    <a href="#/projects">← Back</a>
    <h2>${data.name}</h2>
    <p>${data.description || ""}</p>
  `;
}
