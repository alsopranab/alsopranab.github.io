async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

async function loadProfile() {
  const d = await loadJSON("assets/data/profile.json");
  document.getElementById("name").textContent = d.name;
  document.getElementById("designation").textContent = d.designation;
  document.getElementById("tagline").textContent = d.tagline;
}

async function loadExperience() {
  const data = await loadJSON("assets/data/experience.json");
  const box = document.getElementById("experience");
  if (!box) return;
  data.forEach(e => {
    box.innerHTML += `
      <div class="card">
        <h3>${e.company}</h3>
        <p>${e.designation}</p>
        <p>${e.duration}</p>
      </div>`;
  });
}

async function loadSkills() {
  const data = await loadJSON("assets/data/skills.json");
  const box = document.getElementById("skills");
  if (box) box.textContent = data.join(" • ");
}

async function loadProjects() {
  const data = await loadJSON("assets/data/projects.json");
  const box = document.getElementById("projects");
  if (!box) return;
  data.forEach(p => {
    box.innerHTML += `
      <div class="card">
        <h3>${p.title}</h3>
        <p>${p.tech}</p>
        <p>${p.description}</p>
        <div class="code">${p.code}</div>
      </div>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadExperience();
  loadSkills();
  loadProjects();
});
