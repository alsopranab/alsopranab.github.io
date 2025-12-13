function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- HERO -->
    <section>
      <h1>Pranab Debnath</h1>
      <p style="font-size:18px">
        Data Analyst focused on turning raw business data into
        clarity, automation, and measurable outcomes.
      </p>

      <div class="grid">
        <div class="card kpi">
          <div class="kpi-value">SQL</div>
          <p>Business queries, joins, CTEs</p>
        </div>

        <div class="card kpi">
          <div class="kpi-value">Python</div>
          <p>EDA, automation, scripting</p>
        </div>

        <div class="card kpi">
          <div class="kpi-value">Analytics</div>
          <p>Funnels, KPIs, reporting</p>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE SNAPSHOT -->
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

      <p>
        <a href="#/funnels">See how experience converts into impact →</a>
      </p>
    </section>

    <!-- WHAT I BUILD -->
    <section>
      <h2>What I Build</h2>

      <div class="grid">
        ${buildCard(
          "Analytics Projects",
          "SQL, Python, Excel projects based on real problems",
          "#/projects"
        )}

        ${buildCard(
          "Automation",
          "Scripts that reduce manual reporting & errors",
          "#/funnels"
        )}

        ${buildCard(
          "Learning Notes",
          "Clear explanations of concepts that actually work",
          "#/learnings"
        )}
      </div>
    </section>

    <!-- CTA -->
    <section>
      <h2>Explore</h2>
      <p>
        This site is both a portfolio and a knowledge base.
        Start anywhere:
      </p>

      <div class="grid">
        <div class="card">
          <h3>Dashboard</h3>
          <p>Analytics-style view of metrics & funnels.</p>
          <button onclick="location.hash='#/dashboard'">Open Dashboard</button>
        </div>

        <div class="card">
          <h3>Projects</h3>
          <p>Live GitHub projects with in-site code viewer.</p>
          <button onclick="location.hash='#/projects'">View Projects</button>
        </div>

        <div class="card">
          <h3>Learnings</h3>
          <p>Patterns learned from real-world analytics work.</p>
          <button onclick="location.hash='#/learnings'">Read Learnings</button>
        </div>
      </div>
    </section>
  `;
}

/* ---------- HELPERS ---------- */

function experienceCard(company, role, period, points) {
  return `
    <div class="card experience-card" onclick="this.classList.toggle('active')">
      <h3>${company}</h3>
      <p><strong>${role}</strong></p>
      <p>${period}</p>

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
