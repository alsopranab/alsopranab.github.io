function renderDashboard() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Analytics Dashboard</h1>
      <p>High-level view of my work, skills, and project distribution.</p>
    </section>

    <!-- KPI ROW -->
    <section>
      <div class="grid">
        <div class="card kpi">
          <div class="kpi-value">12+</div>
          <p>Active Repositories</p>
        </div>
        <div class="card kpi">
          <div class="kpi-value">3</div>
          <p>Core Domains</p>
        </div>
        <div class="card kpi">
          <div class="kpi-value">100+</div>
          <p>SQL Problems Solved</p>
        </div>
        <div class="card kpi">
          <div class="kpi-value">15%</div>
          <p>Revenue Impact (Avg)</p>
        </div>
      </div>
    </section>

    <!-- CHARTS -->
    <section>
      <h2>Skill Distribution</h2>
      <div class="card">
        <canvas id="skillsChart" height="120"></canvas>
      </div>
    </section>

    <section>
      <h2>Project Classification</h2>
      <div class="card">
        <canvas id="projectsChart" height="120"></canvas>
      </div>
    </section>
  `;

  renderDashboardCharts();
}
