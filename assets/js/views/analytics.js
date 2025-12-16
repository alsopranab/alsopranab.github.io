import { renderBarChart } from "../ui/charts.js";

export function AnalyticsView(container) {
  if (!container) return;

  container.innerHTML = `
    <section class="analytics">

      <header class="analytics-header" data-reveal>
        <h1>Analytics</h1>
        <p>Project distribution & activity overview</p>
      </header>

      <section class="analytics-panel" data-reveal>
        <h2>Projects by Type</h2>
        <div class="chart-wrap">
          <canvas id="projects-type-chart" height="260"></canvas>
        </div>
      </section>

      <section class="analytics-panel muted-panel" data-reveal>
        <h2>Contribution Activity</h2>
        <p class="muted">2192 days tracked</p>
      </section>

    </section>
  `;

  // ---------- STATIC, SAFE DATA ----------
  const projectTypes = {
    Other: 14,
    SQL: 2
  };

  const canvas = container.querySelector("#projects-type-chart");
  if (!canvas) return;

  requestAnimationFrame(() => {
    renderBarChart(
      canvas,
      Object.keys(projectTypes),
      Object.values(projectTypes)
    );
  });
}
