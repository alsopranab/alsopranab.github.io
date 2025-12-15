/* =====================================================
   HOME VIEW
   LANDIO-GRADE · MONOCHROME · SCROLL-AWARE
===================================================== */

let homeSkillChart = null;
let homeGrowthChart = null;

/* =====================================================
   MAIN RENDER
===================================================== */
function renderHome() {
  const app = document.getElementById("app");
  if (!app || !window.PROFILE) return;

  app.innerHTML = `
    <!-- =====================
         HERO
    ====================== -->
    <section class="home-hero">
      <div class="card hero-card">
        <h1>${PROFILE.identity.name}</h1>
        <h2>${PROFILE.identity.role}</h2>

        <p>
          ${PROFILE.identity.tagline}
        </p>

        <div class="grid">
          ${metricCard("SQL", "Production-grade queries & optimization")}
          ${metricCard("Python", "EDA, automation, pipelines")}
          ${metricCard("Analytics", "Funnels, KPIs, dashboards")}
        </div>
      </div>
    </section>

    <!-- =====================
         ANALYTICS SNAPSHOT
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
        <a href="#/dashboard">Open full analytics dashboard →</a>
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
          "Lead flow, visit efficiency, QA trends, funnel drop-offs"
        )}
        ${focusCard(
          "Automation & ETL",
          "SQL + Python pipelines replacing manual reporting"
        )}
        ${focusCard(
          "Decision Dashboards",
          "Executive-grade performance views"
        )}
      </div>
    </section>

    <!-- =====================
         EXPERIENCE
    ====================== -->
    <section>
      <h2>Experience Snapshot</h2>

      <div class="grid">
        ${experienceCard(
          "MagicBricks",
          "Operations Data Analyst",
          "2025 – Present",
          [
            "Automated reporting using SQL & Python",
            "EDA on agent performance & funnels",
            "Built KPI dashboards for leadership",
            "Unified CRM & dialer datasets"
          ]
        )}

        ${experienceCard(
          "NoBroker",
          "Unit Head",
          "2024",
          [
            "Led unit achieving ~15% MoM growth",
            "Sales call analysis & coaching",
            "Execution aligned to business KPIs"
          ]
        )}
      </div>

      <div class="home-cta">
        <a href="#/funnels">See funnel impact →</a>
      </div>
    </section>

    <!-- =====================
         EXPLORE
    ====================== -->
    <section>
      <h2>Explore</h2>
      <p>
        This site is both a portfolio and a working analytics knowledge base.
      </p>

      <div class="grid">
        ${exploreCard("Dashboard", "Metrics, skills & growth", "#/dashboard")}
        ${exploreCard("Projects", "Production repositories", "#/projects")}
        ${exploreCard("Learnings", "Applied analytics insights", "#/learnings")}
      </div>
    </section>
  `;

  requestAnimationFrame(renderHomeCharts);
}

/* =====================================================
   HOME CHARTS (MONOCHROME · STATIC)
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
      datasets: [{
        data: skillDistribution.values,
        backgroundColor: [
          "#ffffff",
          "rgba(255,255,255,0.85)",
          "rgba(255,255,255,0.7)",
          "rgba(255,255,255,0.55)",
          "rgba(255,255,255,0.4)"
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
      animation: false
    }
  });

  homeGrowthChart = new Chart(growthCanvas, {
    type: "line",
    data: {
      labels: growthTimeline.years,
      datasets: [{
        data: growthTimeline.values,
        borderColor: "#ffffff",
        borderWidth: 1.5,
        tension: 0.35,
        fill: false,
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
      animation: false
    }
  });
}

/* =====================================================
   UI HELPERS
===================================================== */
function metricCard(title, desc) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>
  `;
}

function focusCard(title, desc) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>
  `;
}

function experienceCard(company, role, period, points) {
  return `
    <div class="card">
      <h3>${company}</h3>
      <p><strong>${role}</strong></p>
      <p>${period}</p>
      <ul>${points.map(p => `<li>${p}</li>`).join("")}</ul>
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
