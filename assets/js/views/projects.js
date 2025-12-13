function renderProjects() {
  app.innerHTML = `<h2>Projects</h2><div id="proj" class="grid"></div>`;

  fetch(`https://api.github.com/users/${PROFILE.github}/repos`)
    .then(r=>r.json())
    .then(repos=>{
      repos.filter(r=>!r.fork).forEach(r=>{
        const type =
          r.name.toLowerCase().includes("sql") ? "SQL" :
          r.name.toLowerCase().includes("python") ? "Python" : "Other";

        document.getElementById("proj").innerHTML += `
          <div class="card">
            <h4>${r.name}</h4>
            <small>${type}</small>
            <p>${r.description || ""}</p>
            <button onclick="location.hash='#/project?${r.name}'">
              Open →
            </button>
          </div>
        `;
      });
    });
}
