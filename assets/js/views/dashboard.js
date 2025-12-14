/* =====================================================
   DASHBOARD VIEW
   Stable · Analytics-First · SPA-Safe
===================================================== */

function renderDashboard() {
  const app = document.getElementById("app");
  if (!app || !window.PROFILE) return;

  app.innerHTML = `
    <!-- =====================
         HEADER
    ====================== -->
    <section>
      <h1>Analytics Dashboard</h1>
      <p class="muted">
        A data-driven overview of skills, experience, and project focus.
      </p>
    </section>

    <!-- =====================
         KPI METRICS
    ====================== -->
    <section>
      <div class="grid">
        ${kpiCard("12+", "GitHub Repositories")}
        ${kpiCard("3", "Core Domains")}
        ${kpiCard("100+", "SQL Problems Solved")}
        ${kpiCard("15%", "Avg Business Impact")}
      </div>
    </section>

    <!-- =====================
         CHARTS (LOCKED, NO MOTION)
    ====================== -->
    <section>
      <h2>Skill & Growth Overview</h2>

      <div class="grid">
        <div class="card chart-card">
          <h3>Skill Distribution</h3>
          <div class="chart-box">
            <canvas id="skillChart"></canvas>
          </div>
        </div>

        <div class="card chart-card">
          <h3>Growth Over Time</h3>
          <div class="chart-box">
            <canvas id="growthChart"></canvas>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================
         SKILL BREAKDOWN
    ====================== -->
    <section>
      <h2>Skill Proficiency</h2>

      <div class="grid">
        ${skillBar("SQL", "Joins, CTEs, Window Functions", 90)}
        ${skillBar("Python", "EDA, Automation, Scripting", 80)}
        ${skillBar("Excel", "Dashboards, KPI Models", 75)}
        ${skillBar("Business Analytics", "Funnels, Metrics, Reporting", 85)}
      </div>
    </section>

    <!-- =====================
         PROJECT DOMAINS
    ====================== -->
    <section>
      <h2>Project Domains</h2>

      <div class="grid">
        ${projectClassCard(
          "SQL Analytics",
          "Query optimization, schema design, reporting logic",
          "Multiple structured repositories"
        )}
        ${projectClassCard(
          "Python Projects",
          "EDA, ML basics, automation scripts",
          "End-to-end data projects"
        )}
        ${projectClassCard(
          "Automation & ETL",
          "Email parsing, CSV pipelines, workflow automation",
          "Production-ready scripts"
        )}
      </div>
    </section>
  `;

  /* =====================
     CHARTS (AFTER DOM)
  ====================== */
  requestAnimationFrame(() => {
    if (typeof renderCharts === "function") {
      renderCharts("dashboard");
    }
  });
}

/* =====================================================
   UI HELPERS
===================================================== */

function kpiCard(value, label) {
  return `
    <div class="card kpi">
      <div class="kpi-value">${value}</div>
      <p class="muted">${label}</p>
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

function projectClassCard(title, desc, meta) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
      <p class="muted">${meta}</p>
    </div>
  `;
}
