function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="home-hero">
      <h1 class="home-name">Pranab Debnath</h1>
      <h2 class="home-role">Data Analyst</h2>

      <p class="home-summary">
        Turning raw business data into clarity, automation,
        and measurable outcomes through analytics systems.
      </p>

      <div class="grid home-skills">
        ${skillCard("SQL", "Business queries, joins, CTEs")}
        ${skillCard("Python", "EDA, automation, scripting")}
        ${skillCard("Analytics", "Funnels, KPIs, reporting")}
      </div>
    </section>

    <section>
      <h2>Experience Snapshot</h2>

      <div class="grid">
        ${experienceCard(
          "MagicBricks",
          "Account Manager",
          "2024 – Present",
          [
            "Lead performance tracking & reporting",
            "Site-visit funnel analysis",
            "Daily operational dashboards"
          ]
        )}

        ${experienceCard(
          "NoBroker",
          "Senior Account Manager",
          "2023 – 2024",
          [
            "Revenue & conversion analytics",
            "Sales call analysis",
            "Team-level performance tracking"
          ]
        )}
      </div>

      <div class="home-cta">
        <a href="#/funnels" class="impact-link">
          See how experience converts into impact →
        </a>
      </div>
    </section>

    <section>
      <h2>What I Build</h2>

      <div class="grid">
        ${buildCard(
          "Analytics Projects",
          "SQL, Python, and Excel projects solving real business problems",
          "#/projects"
        )}

        ${buildCard(
          "Automation",
          "Scripts that reduce manual reporting and operational errors",
          "#/funnels"
        )}

        ${buildCard(
          "Learning Notes",
          "Clear explanations of concepts that actually work",
          "#/learnings"
        )}
      </div>
    </section>

    <section>
      <h2>Explore</h2>
      <p class="muted">
        This site is both a portfolio and a knowledge base.
      </p>

      <div class="grid">
        ${exploreCard(
          "Dashboard",
          "Analytics-style view of metrics, skills, and impact",
          "#/dashboard"
        )}

        ${exploreCard(
          "Projects",
          "Live GitHub projects with in-site code viewer",
          "#/projects"
        )}

        ${exploreCard(
          "Learnings",
          "Patterns learned from real-world analytics work",
          "#/learnings"
        )}
      </div>
    </section>
  `;
}

/* =========================
   HELPERS
========================= */

function skillCard(title, desc) {
  return `
    <div class="card kpi">
      <div class="kpi-value">${title}</div>
      <p>${desc}</p>
    </div>
  `;
}

function experienceCard(company, role, period, points) {
  return `
    <div class="card experience-card" onclick="this.classList.toggle('active')">
      <h3>${company}</h3>
      <p><strong>${role}</strong></p>
      <p class="muted">${period}</p>

      <div class="experience-details">
        <ul>
          ${points.map(p => `<li>${p}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function buildCard(title, desc, link) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
      <button onclick="location.hash='${link}'">Explore</button>
    </div>
  `;
}

function exploreCard(title, desc, link) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
      <button onclick="location.hash='${link}'">Open</button>
    </div>
  `;
}
