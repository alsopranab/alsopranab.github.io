function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- HERO -->
    <section class="home-hero">
      <h1 class="home-name">Pranab Debnath</h1>
      <h2 class="home-role">Data Analyst</h2>

      <p class="home-summary">
        Results-oriented analytics professional specializing in SQL,
        automation, and performance reporting across multi-city operations.
        Focused on building efficient data systems that improve business outcomes.
      </p>

      <div class="grid home-skills">
        ${skillCard("SQL", "CTEs, joins, window functions")}
        ${skillCard("Python", "EDA, automation, scripting")}
        ${skillCard("Analytics", "Funnels, KPIs, dashboards")}
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section>
      <h2>Experience Snapshot</h2>

      <div class="grid">
        ${experienceCard(
          "MagicBricks",
          "Operations Data Analyst",
          "Jan 2025 – Present",
          [
            "Built automated reporting pipelines using SQL, Python, Google Apps Script, and Power Automate",
            "Performed EDA on agent performance, lead funnels, schedule rates, and user behavior",
            "Developed dashboards tracking KPIs such as contractability, schedule rate, SV timelines, QA trends",
            "Unified CRM and dialer data into structured analytical models, improving data accuracy and consistency",
            "Designed frameworks for new vs repeat leads, builder engagement, and conversion metrics"
          ]
        )}

        ${experienceCard(
          "MagicBricks",
          "Account Manager",
          "Jan 2025 – Present",
          [
            "Analyzed lead flow patterns and conversion drop-offs to identify funnel issues",
            "Shared actionable insights with leadership to improve conversion performance",
            "Consistently exceeded monthly Site Visit Done targets and recognized as an over-achiever",
            "Maintained strong client relationships and ensured timely issue resolution"
          ]
        )}

        ${experienceCard(
          "NoBroker",
          "Unit Head",
          "Jun 2024 – Oct 2024",
          [
            "Led a sales unit achieving ~15% month-on-month growth in conversions",
            "Analyzed sales calls to identify coaching and performance improvement areas",
            "Mentored team members and aligned sales strategy with business goals"
          ]
        )}

        ${experienceCard(
          "NoBroker",
          "Business Development Executive",
          "Dec 2023 – May 2024",
          [
            "Delivered tailored real estate solutions for NRI tenants and buyers",
            "Achieved consistent over-performance with multiple months above 130–230% of targets",
            "Recognized as top performer for six consecutive months"
          ]
        )}
      </div>

      <div class="home-cta">
        <a href="#/funnels" class="impact-link">
          See how experience converts into impact →
        </a>
      </div>
    </section>

    <!-- WHAT I BUILD -->
    <section>
      <h2>What I Build</h2>

      <div class="grid">
        ${buildCard(
          "Analytics Projects",
          "SQL, Python, and Excel projects solving real business problems",
          "#/projects"
        )}

        ${buildCard(
          "Automation & ETL",
          "End-to-end pipelines that remove manual reporting and errors",
          "#/projects"
        )}

        ${buildCard(
          "Learning Notes",
          "Clear explanations of concepts that work in production",
          "#/learnings"
        )}
      </div>
    </section>

    <!-- EXPLORE -->
    <section>
      <h2>Explore</h2>
      <p class="muted">
        This site is both a portfolio and a practical knowledge base.
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
