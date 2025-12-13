function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- HERO -->
    <section>
      <h1>Pranab Debnath</h1>
      <h2>Data Analyst</h2>
      <p>
        I work with data to understand problems, uncover patterns,
        and build automation that improves business decisions.
      </p>
    </section>

    <!-- KPI SNAPSHOT -->
    <section>
      <h2>Professional Snapshot</h2>
      <div class="grid">
        <div class="card kpi">
          <div class="kpi-value">3+</div>
          <p>Years in Sales & Analytics</p>
        </div>
        <div class="card kpi">
          <div class="kpi-value">15%</div>
          <p>Avg Monthly Growth Driven</p>
        </div>
        <div class="card kpi">
          <div class="kpi-value">100+</div>
          <p>SQL & Data Exercises</p>
        </div>
        <div class="card kpi">
          <div class="kpi-value">₹27K</div>
          <p>Current In-hand (Magicbricks)</p>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE AUTOMATION -->
    <section>
      <h2>Experience Automation</h2>

      <div class="grid">
        <div class="card experience-card" onclick="toggleExperience(this)">
          <h3>Account Manager</h3>
          <p><strong>Magicbricks</strong> · 2024 – Present</p>

          <div class="experience-details">
            <div class="experience-step">
              Managed site visits and client coordination
            </div>
            <div class="experience-step">
              Tracked lead-to-visit conversion metrics
            </div>
            <div class="experience-step">
              Built Excel trackers for daily performance
            </div>
          </div>

          <button>View Automation</button>
        </div>

        <div class="card experience-card" onclick="toggleExperience(this)">
          <h3>Senior Account Manager</h3>
          <p><strong>NoBroker</strong> · 2023 – 2024</p>

          <div class="experience-details">
            <div class="experience-step">
              Led a high-performing revenue team
            </div>
            <div class="experience-step">
              Analyzed call data & conversion funnels
            </div>
            <div class="experience-step">
              Improved monthly revenue by ~15%
            </div>
          </div>

          <button>View Automation</button>
        </div>
      </div>
    </section>

    <!-- SKILL NETWORK -->
    <section>
      <h2>Skill Network</h2>

      <div class="grid">
        <div class="card">SQL · Joins · CTEs · Window Functions</div>
        <div class="card">Python · EDA · Pandas · Automation</div>
        <div class="card">Excel · Dashboards · KPI Tracking</div>
        <div class="card">Business Analysis · Funnels · Metrics</div>
      </div>
    </section>

    <!-- CTA -->
    <section>
      <h2>Explore Deeper</h2>
      <div class="grid">
        <div class="card">
          <h3>Analytics Dashboard</h3>
          <p>Visual KPIs, charts, and performance trends.</p>
          <button onclick="location.hash='#/dashboard'">Open Dashboard</button>
        </div>

        <div class="card">
          <h3>Projects & Code</h3>
          <p>SQL, Python, Automation projects with live code.</p>
          <button onclick="location.hash='#/projects'">View Projects</button>
        </div>

        <div class="card">
          <h3>Learning Journey</h3>
          <p>Structured notes and concepts I’ve mastered.</p>
          <button onclick="location.hash='#/learnings'">View Learnings</button>
        </div>
      </div>
    </section>
  `;
}

/* EXPERIENCE TOGGLE */
function toggleExperience(card) {
  card.classList.toggle("active");
}
