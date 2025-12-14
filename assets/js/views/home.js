function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- =====================
         HERO (PRIMARY SIGNAL)
    ====================== -->
    <section class="home-hero">
      <div class="card hero-card">
        <h1 class="home-name">Pranab Debnath</h1>
        <h2 class="home-role">Data Analyst</h2>

        <p class="home-summary">
          I design analytics systems that turn messy operational data into
          clarity, automation, and measurable business impact.
        </p>

        <div class="grid home-metrics">
          ${metricCard("SQL", "Production queries & optimization")}
          ${metricCard("Python", "EDA, automation, scripting")}
          ${metricCard("Analytics", "Funnels, KPIs, dashboards")}
        </div>
      </div>
    </section>

    <!-- =====================
         ANALYTICS PREVIEW
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
          "SQL + Python pipelines that replace manual reporting"
        )}

        ${focusCard(
          "Decision Dashboards",
          "Executive-ready views for performance & conversion tracking"
        )}
      </div>

      <div class="home-cta">
        <a href="#/dashboard" class="impact-link">
          Open Analytics Dashboard →
        </a>
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
            "EDA on agent performance, funnels, schedule rate & SV timelines",
            "Built KPI dashboards for leadership decision-making",
            "Unified CRM & dialer data into structured analytical models"
          ]
        )}

        ${experienceCard(
          "NoBroker",
          "Unit Head",
          "2024",
          [
            "Led a unit achieving ~15% MoM conversion growth",
            "Sales call analysis for coaching & performance uplift",
            "Aligned execution with business targets"
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
         WHAT I BUILD
    ====================== -->
    <section>
      <h2>What I Build</h2>

      <div class="grid">
        ${buildCard(
          "Analytics Projects",
          "SQL, Python, and Excel projects solving real business problems",
          "#/projects"
        )}

        ${buildCard(
          "Automation Systems",
          "End-to-end pipelines that eliminate manual reporting",
          "#/projects"
        )}

        ${buildCard(
          "Learning Notes",
          "Clear explanations from real-world analytics work",
          "#/learnings"
        )}
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
        ${exploreCard(
          "Dashboard",
          "Metrics, skills, and growth visualized",
          "#/dashboard"
        )}

        ${exploreCard(
          "Projects",
          "Live GitHub repositories with in-site code viewer",
          "#/projects"
        )}

        ${exploreCard(
          "Learnings",
          "Patterns learned from production analytics systems",
          "#/learnings"
        )}
      </div>
    </section>
  `;
}

/* =========================
   HELPERS
========================= */

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
    <div class="card experience-card">
      <h3>${company}</h3>
      <p><strong>${role}</strong></p>
      <p class="muted">${period}</p>

      <ul>
        ${points.map(p => `<li>${p}</li>`).join("")}
      </ul>
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
