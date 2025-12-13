// HERO
document.getElementById("name").textContent = PROFILE.name;
document.getElementById("role").textContent = PROFILE.role;

// EXPERIENCE
const expBox = document.getElementById("experience");

PROFILE.experience.forEach((e, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${e.role}</h3>
    <p>${e.company}</p>
    <small>${e.period}</small>
    <button onclick="openModal(${i})">View Details</button>
  `;
  expBox.appendChild(card);
});

window.openModal = (i) => {
  const e = PROFILE.experience[i];
  document.getElementById("modal-content").innerHTML = `
    <h3>${e.role} – ${e.company}</h3>
    <ul>${e.details.map(d => `<li>${d}</li>`).join("")}</ul>
  `;
  document.getElementById("modal").style.display = "flex";
};

window.closeModal = () => {
  document.getElementById("modal").style.display = "none";
};

// SKILL GRAPH (SVG)
const svg = document.getElementById("skill-chart");
PROFILE.skills.forEach((s, i) => {
  const x = 60 + i * 120;
  svg.innerHTML += `
    <circle cx="${x}" cy="100" r="28" fill="#38bdf8"/>
    <text x="${x}" y="105" text-anchor="middle" fill="#000">${s}</text>
  `;
});
