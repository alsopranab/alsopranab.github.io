function renderDashboard() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- DASHBOARD HEADER -->
    <section>
      <h1>Analytics Dashboard</h1>
      <p class="muted">
        High-level view of my work, skills, and project distribution.
      </p>
    </section>

    <!-- KPI ROW -->
    <section>
      <div class="grid">
        ${kpiCard("12+", "Active Repositories")}
        ${kpiCard("3", "Core Domains")}
        ${kpiCard("100+", "SQL Problems Solved")}
        ${kpiCard("15%", "Revenue Impact (Avg)")}
      </div>
    </section>

    <!-- SKILL DISTRIBUTION -->
    <section>
      <h2>Skill Distribution</h2>

      <div class="grid">
        ${skillBar("SQL", "Joins, CTEs, Window Functions", 90)}
        ${skillBar("Python", "EDA, Automation, Scripting", 80)}
        ${skillBar("Excel", "Dashboards, KPI Models", 75)}
        ${skillBar("Business Analytics", "Funnels, Metrics, Reporting", 85)}
      </div>
    </section>

    <!-- PROJECT CLASSIFICATION -->
    <section>
      <h2>Project Classification</h2>

      <div class="grid">
        ${projectClassCard(
          "SQL",
          "Query optimization, joins, CTEs, schema design",
          "2 Major Repos"
        )}

        ${projectClassCard(
          "Python",
          "EDA, automation scripts, data processing",
          "1 End-to-End Project"
        )}

        ${projectClassCard(
          "Automation / ETL",
          "Email parsing, CSV extraction, workflow automation",
          "4 Automation Scripts"
        )}
      </div>
    </section>
  `;

  app.classList.add("fade-in");
}

/* =========================
   HELPERS
========================= */

function kpiCard(value, label) {
  return `
    <div class="card kpi">
      <div class="kpi-value">${value}</div>
      <p>${label}</p>
    </div>
  `;
}

function skillBar(title, desc, percent) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p class="muted">${desc}</p>

      <div class="skill-bar">
        <div class="skill-fill" style="width:${percent}%"></div>
      </div>

      <p class="muted">${percent}% proficiency</p>
    </div>
  `;
}

function projectClassCard(title, desc, count) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
      <p class="muted">${count}</p>
    </div>
  `;
}
