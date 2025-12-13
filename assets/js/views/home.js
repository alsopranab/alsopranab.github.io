function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <h1>${PROFILE.name}</h1>
      <h2>${PROFILE.role}</h2>
      <p>Data-driven analysis, automation, and practical problem solving.</p>
    </section>

    <section>
      <h3>Experience Timeline</h3>
      <div class="grid">
        ${PROFILE.experience.map((e,i)=>`
          <div class="card" onclick="openExp(${i})">
            <h4>${e.role}</h4>
            <p>${e.company}</p>
            <small>${e.period}</small>
          </div>
        `).join("")}
      </div>
    </section>

    <section>
      <h3>Skill Network</h3>
      <div class="skill-grid">
        ${PROFILE.skills.map(s=>`<span class="pill">${s}</span>`).join("")}
      </div>
    </section>
  `;
}

window.openExp = (i) => {
  const e = PROFILE.experience[i];
  alert(`${e.role} @ ${e.company}\n\n${e.details.join("\n")}`);
};
