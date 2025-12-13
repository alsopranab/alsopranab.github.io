async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

/* EXPERIENCE STACK + POPUP */
async function loadExperience() {
  const data = await loadJSON("assets/data/experience.json");
  const box = document.getElementById("experience");
  if (!box) return;

  box.innerHTML = "";

  data.forEach(exp => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${exp.role}</h3>
      <p><strong>${exp.company}</strong></p>
      <p>${exp.duration}</p>
      <p>${exp.summary}</p>
      <button onclick='openExperience(${JSON.stringify(exp)})'>View Details</button>
    `;
    box.appendChild(card);
  });
}

function openExperience(exp) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <h2>${exp.role} – ${exp.company}</h2>
    <p>${exp.duration}</p>

    <h3>Responsibilities</h3>
    <ul>${exp.details.map(d => `<li>${d}</li>`).join("")}</ul>

    <h3>Skills Used</h3>
    <p>${exp.skills.join(" • ")}</p>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* SKILLS GRAPH */
async function loadSkillGraph() {
  const data = await loadJSON("assets/data/skill-metrics.json");
  const box = document.getElementById("skill-graph");
  if (!box) return;

  box.innerHTML = '<div class="bar-chart"></div>';
  const chart = box.querySelector(".bar-chart");

  data.forEach(s => {
    const row = document.createElement("div");
    row.className = "bar";
    row.innerHTML = `
      <div class="bar-label">${s.skill}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${s.level}%"></div>
      </div>
    `;
    chart.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadExperience();
  loadSkillGraph();
});
