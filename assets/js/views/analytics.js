import { getProjectsByCategory } from "../core/projectStore.js";
import { navigate } from "../core/router.js";
import { renderBarChart } from "../ui/charts.js";

export function AnalyticsView(container) {
  if (!container) return;

  const grouped = getProjectsByCategory();

  const labels = [];
  const values = [];

  Object.entries(grouped).forEach(([category, items]) => {
    if (items.length > 0) {
      labels.push(category);
      values.push(items.length);
    }
  });

  // Empty state
  if (labels.length === 0) {
    container.innerHTML = `
      <section>
        <h2>Analytics</h2>
        <p>No analytics data available.</p>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section class="analytics">
      <header>
        <h1>Analytics</h1>
        <p>Project distribution by category</p>
      </header>

      <section class="analytics-chart">
        <canvas id="category-chart"></canvas>
        <small class="muted">
          Click a category to view projects
        </small>
      </section>
    </section>
  `;

  const canvas = container.querySelector("#category-chart");

  renderBarChart(canvas, labels, values, {
    onClick: index => {
      const category = labels[index];
      navigate("projects", { category });
    }
  });
}
