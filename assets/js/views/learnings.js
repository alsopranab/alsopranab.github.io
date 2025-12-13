function renderLearnings() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Learnings</h1>
      <p>
        Practical concepts I’ve learned while solving real-world
        business and data problems. These are not tutorials — they are
        patterns that work.
      </p>
    </section>

    <section class="grid">
      ${learningCard(
        "SQL Joins & CTEs",
        "How complex joins and CTEs simplify business logic",
        `
        <ul>
          <li>Use CTEs to isolate business logic</li>
          <li>Avoid nested queries for readability</li>
          <li>LEFT JOIN is safer than INNER JOIN in analytics</li>
        </ul>
        <p>
          Used heavily in my SQL practice repositories and reporting work.
        </p>
        <a href="#/projects">See SQL Projects →</a>
        `
      )}

      ${learningCard(
        "Python for Analysis",
        "Why Python is best used as a glue, not a hammer",
        `
        <ul>
          <li>Pandas for EDA, not production pipelines</li>
          <li>Use scripts to automate repetitive analysis</li>
          <li>Keep notebooks readable, not clever</li>
        </ul>
        <p>
          Applied in Titanic survival prediction and automation projects.
        </p>
        <a href="#/projects">See Python Projects →</a>
        `
      )}

      ${learningCard(
        "Analytics Automation",
        "Reducing manual work creates real impact",
        `
        <ul>
          <li>Email-based data ingestion saves hours</li>
          <li>Automation beats dashboards without freshness</li>
          <li>Logs matter more than UI</li>
        </ul>
        <p>
          Built automations for weekly reporting and lead processing.
        </p>
        <a href="#/funnels">See Workflow Funnel →</a>
        `
      )}
    </section>

    <section>
      <h2>Recommended Tools</h2>
      <p>
        Tools I personally use or have evaluated for analytics work.
        (No paid promotions yet.)
      </p>

      <div class="grid">
        ${toolCard(
          "SQL Editors",
          "DBeaver, MySQL Workbench",
          "Reliable tools for writing and testing complex queries."
        )}

        ${toolCard(
          "Python Stack",
          "Pandas, NumPy, Jupyter",
          "Best balance of speed, readability, and flexibility."
        )}

        ${toolCard(
          "Visualization",
          "Excel, Power BI, Tableau",
          "Still the fastest way to explain data to stakeholders."
        )}
      </div>
    </section>
  `;
}

/* ---------- HELPERS ---------- */

function learningCard(title, subtitle, content) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${subtitle}</p>
      <div class="experience-details">
        ${content}
      </div>
      <button onclick="this.previousElementSibling.classList.toggle('active')">
        Toggle Details
      </button>
    </div>
  `;
}

function toolCard(name, tools, description) {
  return `
    <div class="card">
      <h3>${name}</h3>
      <p><strong>${tools}</strong></p>
      <p>${description}</p>
    </div>
  `;
}
