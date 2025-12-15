/* =====================================================
   DASHBOARD VIEW
   LANDIO-GRADE · MONOCHROME · ANALYTICS-FIRST
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
      <p>
        A consolidated, data-driven view of skills, experience, and focus areas.
      </p>
    </section>

    <!-- =====================
         KEY METRICS
         (EDITORIAL, NOT FLASHY)
    ====================== -->
    <section>
      <div class="grid">
        ${metric("12+", "GitHub repositories")}
        ${metric("3", "Core analytics domains")}
        ${metric("100+", "SQL problems solved")}
        ${metric("15%", "Average business impact")}
      </div>
    </section>

    <!-- =====================
         SKILL & GROWTH
         (STATIC, TRUSTWORTHY)
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
         PROFICIENCY AREAS
         (NO BARS, NO COLOR)
    ====================== -->
    <section>
      <h2>Proficiency Areas</h2>

      <div class="grid">
        ${area(
          "SQL & Databases",
          "Joins, CTEs, window functions, performance optimization"
        )}
        ${area(
          "Python & Automation",
          "EDA, automation scripts, data pipelines"
        )}
        ${area(
          "Analytics & Reporting",
          "Funnels, KPIs, dashboards, decision support"
        )}
        ${area(
          "Business Context",
          "Metrics interpretation, stakeholder communication"
        )}
      </div>
    </section>

    <!-- =====================
         PROJECT DOMAINS
    ====================== -->
    <section>
      <h2>Project Domains</h2>

      <div class="grid">
        ${domain(
          "SQL Analytics",
          "Query optimization, schema design, reporting logic",
          "Structured, production-ready repositories"
        )}
        ${domain(
          "Python Projects",
          "EDA, automation, applied data workflows",
          "End-to-end data projects"
        )}
        ${domain(
          "Automation & ETL",
          "CSV pipelines, email parsing, workflow automation",
          "Operational scripts used in production"
        )}
      </div>
    </section>
  `;

  /* =====================
     CHARTS (AFTER DOM)
     NO ANIMATION
  ====================== */
  requestAnimationFrame(() => {
    if (typeof window.renderCharts === "function") {
      window.renderCharts("dashboard");
    }
  });
}

/* =====================================================
   UI HELPERS (EDITORIAL)
===================================================== */

function metric(value, label) {
  return `
    <div class="card">
      <h3>${value}</h3>
      <p>${label}</p>
    </div>
  `;
}

function area(title, desc) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>
  `;
}

function domain(title, desc, meta) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
      <p>${meta}</p>
    </div>
  `;
}
