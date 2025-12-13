// assets/js/views/learnings.js

function renderLearnings() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="fade-in">
      <h1>Learnings</h1>
      <p>Concepts I have practiced and applied in real scenarios.</p>

      <div class="card">
        <h3>SQL</h3>
        <ul>
          <li>Joins (Inner, Left, Right)</li>
          <li>CTEs & Subqueries</li>
          <li>Window Functions</li>
          <li>Performance optimization</li>
        </ul>
      </div>

      <div class="card">
        <h3>Python</h3>
        <ul>
          <li>EDA with Pandas & NumPy</li>
          <li>Data cleaning & validation</li>
          <li>Automation scripts</li>
        </ul>
      </div>

      <div class="card">
        <h3>Analytics</h3>
        <ul>
          <li>Business problem framing</li>
          <li>Metric design</li>
          <li>Dashboard thinking</li>
        </ul>
      </div>
    </section>
  `;
}

window.renderLearnings = renderLearnings;
