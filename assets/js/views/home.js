function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <h1>${PROFILE.name}</h1>
      <h2>${PROFILE.role}</h2>
      <p>Data analysis, automation, and real-world problem solving.</p>
    </section>

    <section>
      <h3>Experience</h3>
      <div class="grid">
        ${PROFILE.experience.map(e => `
          <div class="card">
            <h4>${e.role}</h4>
            <p>${e.company}</p>
            <small>${e.period}</small>
            <ul>${e.points.map(p => `<li>${p}</li>`).join("")}</ul>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}
