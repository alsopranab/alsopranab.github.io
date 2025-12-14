function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- =================================================
         HERO — PRIMARY POSITIONING
    ================================================== -->
    <section class="home-hero">
      <div class="card hero-card">
        <h1 class="home-name">Pranab Debnath</h1>
        <h2 class="home-role">Data Analyst</h2>

        <p class="home-summary">
          I build analytics systems that convert operational data into clarity,
          automation, and measurable business impact.
        </p>

        <div class="grid home-metrics">
          ${metricCard("SQL", "Production queries & optimization")}
          ${metricCard("Python", "EDA, automation, scripting")}
          ${metricCard("Analytics", "Funnels, KPIs, dashboards")}
        </div>
      </div>
    </section>

    <!-- =================================================
         MINI ANALYTICS SNAPSHOT
    ================================================== -->
    <section>
      <h2>Analytics Snapshot</h2>

      <div class="grid">
        <div class="card">
          <h3>Skill Distribution</h3>
          <div class="chart-box">
            <canvas id="homeSkillChart"></canvas>
          </div>
        </div>

        <div class="card">
          <h3>Growth Trend</h3>
          <div class="chart-box">
            <canvas id="homeGrowthChart"></canvas>
          </div>
        </div>
      </div>

      <div class="home-cta">
        <a href="#/dashboard" class="impact-link">
          Open full analytics dashboard →
        </a>
      </div>
    </section>

    <!-- =================================================
         ANALYTICS FOCUS
    ================================================== -->
    <section>
      <h2>Analytics Focus</h2>

      <div class="grid">
        ${focusCard(
          "Operational Analytics",
          "Lead flow, site visits, schedule rate, QA trends, funnel drop-offs"
        )}
        ${focusCard(
          "Automation & ETL",
          "SQL + Python pipelines that replace manual reporting"
        )}
        ${focusCard(
          "Decision Dashboards",
          "Executive-ready views for performance & conversion tracking"
        )}
      </div>
    </section>

    <!-- =================================================
         EXPERIENCE SNAPSHOT
    ================================================== -->
    <section>
      <h2>Experience Snapshot</h2>

      <div class="grid">
        ${experienceCard(
          "MagicBricks",
          "Operations Data Analyst",
          "2025 – Present",
          [
            "Automated reporting using SQL, Python, Apps Script & Power Automate",
            "EDA on agent performance, funnels, schedule rate & SV timelines",
            "Built KPI dashboards for leadership",
            "Unified CRM & dialer data into analytical models"
          ]
        )}

        ${experienceCard(
          "NoBroker",
          "Unit Head",
          "2024",
          [
            "Led a unit achieving ~15% MoM conversion growth",
            "Sales call analysis for coaching & uplift",
            "Execution aligned with business targets"
          ]
        )}
      </div>

      <div class="home-cta">
        <a href="#/funnels" class="impact-link">
          See how experience converts into impact →
        </a>
      </div>
    </section>

    <!-- =================================================
         WHAT I BUILD
    ================================================== -->
    <section>
      <h2>What I Build</h2>

      <div class="grid">
        ${buildCard(
          "Analytics Projects",
          "SQL, Python & Excel projects solving real business problems",
          "#/projects"
        )}
        ${buildCard(
          "Automation Systems",
          "End-to-end pipelines eliminating manual reporting",
          "#/projects"
        )}
        ${buildCard(
          "Learning Notes",
          "Clear explanations from production analytics work",
          "#/learnings"
        )}
      </div>
    </section>

    <!-- =================================================
         EXPLORE
    ================================================== -->
    <section>
      <h2>Explore</h2>
      <p class="muted">
        This site is both a portfolio and a working analytics knowledge base.
      </p>

      <div class="grid">
        ${exploreCard("Dashboard", "Metrics, skills & growth", "#/dashboard")}
        ${exploreCard("Projects", "Live GitHub code viewer", "#/projects")}
        ${exploreCard("Learnings", "Production-tested insights", "#/learnings")}
      </div>
    </section>
  `;

  renderHomeCharts();
}

/* =====================================================
   MINI HOME CHARTS (READ-ONLY, STABLE)
===================================================== */

let homeSkillChart = null;
let homeGrowthChart = null;

function renderHomeCharts() {
  if (typeof Chart === "undefined") return;

  const skill = document.getElementById("homeSkillChart");
  const growth = document.getElementById("homeGrowthChart");

  if (!skill || !growth) return;

  homeSkillChart?.destroy();
  homeGrowthChart?.destroy();

  homeSkillChart = new Chart(skill, {
    type: "doughnut",
    data: {
      labels: ["SQL", "Python", "Excel", "Automation", "Analytics"],
      datasets: [{
        data: [30, 25, 15, 15, 15],
        backgroundColor: [
          "#38bdf8",
          "#22c55e",
          "#f59e0b",
          "#a855f7",
          "#06b6d4"
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "72%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      animation: { duration: 500 }
    }
  });

  homeGrowthChart = new Chart(growth, {
    type: "line",
    data: {
      labels: ["2022", "2023", "2024", "2025"],
      datasets: [{
        data: [20, 40, 70, 90],
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.15)",
        borderWidth: 2,
        tension: 0.35,
        fill: true,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      },
      animation: { duration: 600 }
    }
  });
}

/* =====================================================
   HELPERS
===================================================== */

function metricCard(title, desc) {
  return `
    <div class="card kpi">
      <div class="kpi-value">${title}</div>
      <p class="muted">${desc}</p>
    </div>
  `;
}

function focusCard(title, desc) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p class="muted">${desc}</p>
    </div>
  `;
}

function experienceCard(company, role, period, points) {
  return `
    <div class="card">
      <h3>${company}</h3>
      <p><strong>${role}</strong></p>
      <p class="muted">${period}</p>
      <ul>${points.map(p => `<li>${p}</li>`).join("")}</ul>
    </div>
  `;
}

function buildCard(title, desc, link) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p class="muted">${desc}</p>
      <button onclick="location.hash='${link}'">Explore</button>
    </div>
  `;
}

function exploreCard(title, desc, link) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p class="muted">${desc}</p>
      <button onclick="location.hash='${link}'">Open</button>
    </div>
  `;
}
