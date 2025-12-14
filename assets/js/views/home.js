/* =====================================================
   HOME VIEW
   Clean · Data-Driven · SPA-Safe
===================================================== */

let homeSkillChart = null;
let homeGrowthChart = null;

function renderHome() {
  const app = document.getElementById("app");
  if (!app || !window.PROFILE) return;

  app.innerHTML = `
    <!-- =====================
         HERO
    ====================== -->
    <section class="home-hero">
      <div class="card hero-card">
        <h1 class="home-name">${PROFILE.identity.name}</h1>
        <h2 class="home-role">${PROFILE.identity.role}</h2>

        <p class="home-summary">
          ${PROFILE.identity.tagline}
        </p>

        <div class="grid home-metrics">
          ${metricCard("SQL", "Production queries & optimization")}
          ${metricCard("Python", "EDA, automation, scripting")}
          ${metricCard("Analytics", "Funnels, KPIs, dashboards")}
        </div>
      </div>
    </section>

    <!-- =====================
         MINI ANALYTICS
    ====================== -->
    <section>
      <h2>Analytics Snapshot</h2>

      <div class="grid">
        <div class="card chart-card">
          <h3>Skill Distribution</h3>
          <div class="chart-box">
            <canvas id="homeSkillChart"></canvas>
          </div>
        </div>

        <div class="card chart-card">
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

    <!-- =====================
         ANALYTICS FOCUS
    ====================== -->
    <section>
      <h2>Analytics Focus</h2>

      <div class="grid">
        ${focusCard(
          "Operational Analytics",
          "Lead flow, site visits, schedule rate, QA trends, funnel drop-offs"
        )}
        ${focusCard(
          "Automation & ETL",
          "SQL + Python pipelines replacing manual reporting"
        )}
        ${focusCard(
          "Decision Dashboards",
          "Executive-ready performance & conversion views"
        )}
      </div>
    </section>

    <!-- =====================
         EXPERIENCE SNAPSHOT
    ====================== -->
    <section>
      <h2>Experience Snapshot</h2>

      <div class="grid">
        ${experienceCard(
          "MagicBricks",
          "Operations Data Analyst",
          "2025 – Present",
          [
            "Automated reporting using SQL, Python, Apps Script & Power Automate",
            "EDA on agent performance, funnels & schedule rate",
            "Built KPI dashboards for leadership decisions",
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

    <!-- =====================
         EXPLORE
    ====================== -->
    <section>
      <h2>Explore</h2>
      <p class="muted">
        This site is both a portfolio and a working analytics knowledge base.
      </p>

      <div class="grid">
        ${exploreCard("Dashboard", "Metrics, skills & growth", "#/dashboard")}
        ${exploreCard("Projects", "Live GitHub repositories", "#/projects")}
        ${exploreCard("Learnings", "Production-tested insights", "#/learnings")}
      </div>
    </section>
  `;

  renderHomeCharts();
}

/* =====================================================
   HOME CHARTS (READ-ONLY PREVIEW)
===================================================== */

function renderHomeCharts() {
  if (typeof Chart === "undefined" || !window.PROFILE) return;

  const skillCanvas = document.getElementById("homeSkillChart");
  const growthCanvas = document.getElementById("homeGrowthChart");

  if (!skillCanvas || !growthCanvas) return;

  homeSkillChart?.destroy();
  homeGrowthChart?.destroy();

  const { skillDistribution, growthTimeline } = PROFILE.dashboard;

  homeSkillChart = new Chart(skillCanvas, {
    type: "doughnut",
    data: {
      labels: skillDistribution.labels,
      datasets: [{
        data: skillDistribution.values,
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
      animation: {
        duration: 450,
        easing: "easeOutCubic"
      }
    }
  });

  homeGrowthChart = new Chart(growthCanvas, {
    type: "line",
    data: {
      labels: growthTimeline.years,
      datasets: [{
        data: growthTimeline.values,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.14)",
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
      animation: {
        duration: 500,
        easing: "easeOutCubic"
      }
    }
  });
}

/* =====================================================
   UI HELPERS
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

function exploreCard(title, desc, link) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p class="muted">${desc}</p>
      <button onclick="location.hash='${link}'">Open</button>
    </div>
  `;
}
