function renderFunnels() {
  app.innerHTML = `
    <section class="fade-in">
      <h1>Career Funnel</h1>
      <p>How experience converts into skills and real-world projects.</p>
    </section>

    <section class="funnel">
      <div class="funnel-stage">
        <h3>Experience</h3>
        <ul>
          <li>MagicBricks – Client & funnel analysis</li>
          <li>NoBroker – Conversion & performance tracking</li>
        </ul>
      </div>

      <div class="funnel-arrow">↓</div>

      <div class="funnel-stage">
        <h3>Skills</h3>
        <ul>
          <li>SQL (Joins, CTEs, Windows)</li>
          <li>Python (EDA, Automation)</li>
          <li>Excel (Dashboards, KPIs)</li>
        </ul>
      </div>

      <div class="funnel-arrow">↓</div>

      <div class="funnel-stage">
        <h3>Projects</h3>
        <ul>
          <li>SQL Practice Repos</li>
          <li>Titanic ML Analysis</li>
          <li>Automation Scripts</li>
        </ul>
        <button onclick="location.hash='#/projects'">
          View Projects
        </button>
      </div>
    </section>
  `;
}
