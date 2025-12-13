function renderDashboard() {
  app.innerHTML = `
    <section class="fade-in">
      <h1>Analytics Dashboard</h1>
      <p>Live view of skills, learning depth, and project distribution.</p>
    </section>

    <section class="grid">
      <div class="card kpi">
        <h3>Projects</h3>
        <span class="kpi-value" data-target="12">0</span>
      </div>

      <div class="card kpi">
        <h3>SQL Topics</h3>
        <span class="kpi-value" data-target="18">0</span>
      </div>

      <div class="card kpi">
        <h3>Python Use-Cases</h3>
        <span class="kpi-value" data-target="10">0</span>
      </div>
    </section>

    <section class="grid">
      <div class="card">
        <h3>Skill Distribution</h3>
        <canvas id="skillChart"></canvas>
      </div>

      <div class="card">
        <h3>Learning Growth</h3>
        <canvas id="growthChart"></canvas>
      </div>
    </section>
  `;

  animateKPIs();
  renderCharts();
}
