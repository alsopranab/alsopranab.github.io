async function renderProjects() {
  app.innerHTML = "<h2>Projects</h2><div class='grid' id='proj'></div>";

  const res = await fetch(`https://api.github.com/users/${PROFILE.github}/repos`);
  const repos = await res.json();

  repos.filter(r => !r.fork).forEach(r => {
    document.getElementById("proj").innerHTML += `
      <div class="card">
        <h4>${r.name}</h4>
        <p>${r.description || ""}</p>
        function openProject(repo) {
  location.hash = `#/project?repo=${repo}`;
}
      </div>
    `;
  });
}
