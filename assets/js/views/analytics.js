import { getProjectsByCategory } from "../core/projectStore.js";
import { renderBarChart } from "../ui/charts.js";

export function AnalyticsView(container) {
  if (!container) return;

  // 🔥 ALWAYS read fresh grouped data
  const grouped = getProjectsByCategory();

  const labels = [];
  const values = [];

  Object.entries(grouped).forEach(([category, items]) => {
    if (Array.isArray(items) && items.length > 0) {
      labels.push(category.toUpperCase());
      values.push(items.length);
    }
  });

  // HARD fallback (never blank)
  if (labels.length === 0) {
    container.innerHTML = `
      <section class="dashboard">
        <h1>Analytics</h1>
        <p>No analytics data available yet.</p>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section class="dashboard">
      <header class="dashboard-header">
        <h1>Analytics</h1>
        <p>Project distribution by category</p>
      </header>

      <section class="dashboard-chart">
        <h2>Projects by Type</h2>
        <div class="chart-wrap">
          <canvas id="analytics-chart"></canvas>
        </div>
      </section>
    </section>
  `;

  const canvas = container.querySelector("#analytics-chart");
  renderBarChart(canvas, labels, values);
}
