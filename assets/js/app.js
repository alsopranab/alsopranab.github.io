async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

async function loadProfile() {
  const data = await loadJSON("assets/data/profile.json");
  document.getElementById("name").textContent = data.name;
  document.getElementById("designation").textContent = data.designation;
  document.getElementById("tagline").textContent = data.tagline;
}

async function loadExperience() {
  const data = await loadJSON("assets/data/experience.json");
  const container = document.getElementById("experience");
  data.forEach(e => {
    container.innerHTML += `
      <div class="card">
        <h3>${e.company}</h3>
        <p>${e.designation}</p>
        <p>${e.duration}</p>
      </div>`;
  });
}

async function loadProjects() {
  const data = await loadJSON("assets/data/projects.json");
  const container = document.getElementById("projects");
  data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.title}</h3>
        <p>${p.tech}</p>
        <div class="code">${p.code}</div>
      </div>`;
  });
}

async function loadSkills() {
  const data = await loadJSON("assets/data/skills.json");
  document.getElementById("skills").textContent = data.join(" • ");
}

document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadExperience();
  loadProjects();
  loadSkills();
});
