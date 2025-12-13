function renderHome() {
  app.innerHTML = `
    <section class="hero fade-in">
      <h1>${PROFILE.name}</h1>
      <h2>${PROFILE.role}</h2>
      <p>Data analysis, automation, and real-world problem solving.</p>
    </section>

    <section>
      <h2>Experience Automation</h2>
      <div class="grid">
        ${PROFILE.experience.map((e, i) => `
          <div class="card experience-card" onclick="toggleExp(${i})">
            <h3>${e.role}</h3>
            <p>${e.company}</p>
            <small>${e.period}</small>

            <div class="experience-details" id="exp-${i}">
              ${e.points.map(p => `
                <div class="experience-step">${p}</div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function toggleExp(i) {
  document
    .getElementById(`exp-${i}`)
    .parentElement
    .classList
    .toggle("active");
}
