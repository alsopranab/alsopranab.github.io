function renderLearnings() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Learnings</h1>
      <p>
        A structured view of the concepts I have learned, practiced,
        and applied in real projects.
      </p>
    </section>

    <!-- SQL -->
    <section>
      <h2>SQL</h2>
      <div class="grid">
        <div class="card">
          <h3>Core Queries</h3>
          <ul>
            <li>SELECT, WHERE, ORDER BY</li>
            <li>GROUP BY, HAVING</li>
            <li>Filtering & Aggregations</li>
          </ul>
        </div>

        <div class="card">
          <h3>Joins</h3>
          <ul>
            <li>INNER / LEFT / RIGHT JOIN</li>
            <li>Self Joins</li>
            <li>Join performance basics</li>
          </ul>
        </div>

        <div class="card">
          <h3>Advanced SQL</h3>
          <ul>
            <li>CTEs (WITH clause)</li>
            <li>Window Functions</li>
            <li>Subqueries</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- PYTHON -->
    <section>
      <h2>Python</h2>
      <div class="grid">
        <div class="card">
          <h3>Data Analysis</h3>
          <ul>
            <li>Pandas & NumPy</li>
            <li>EDA workflows</li>
            <li>Data cleaning</li>
          </ul>
        </div>

        <div class="card">
          <h3>Automation</h3>
          <ul>
            <li>File handling</li>
            <li>Email & report automation</li>
            <li>Script scheduling concepts</li>
          </ul>
        </div>

        <div class="card">
          <h3>Basics of ML</h3>
          <ul>
            <li>Train / Test split</li>
            <li>Classification models</li>
            <li>Model evaluation</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- EXCEL & BUSINESS -->
    <section>
      <h2>Excel & Business Analytics</h2>
      <div class="grid">
        <div class="card">
          <h3>Excel</h3>
          <ul>
            <li>Advanced formulas</li>
            <li>Pivot tables</li>
            <li>Dashboard creation</li>
          </ul>
        </div>

        <div class="card">
          <h3>Business Metrics</h3>
          <ul>
            <li>Conversion funnels</li>
            <li>KPI tracking</li>
            <li>Performance reporting</li>
          </ul>
        </div>

        <div class="card">
          <h3>Real-World Application</h3>
          <ul>
            <li>Sales analytics</li>
            <li>Operational reporting</li>
            <li>Decision support</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}
