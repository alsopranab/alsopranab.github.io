import { renderBarChart } from "../ui/charts.js";
import { getAllProjects, getProjectsByCategory } from "../core/projectStore.js";

/**
 * Dashboard View (FINAL – AUTO & STABLE)
 */
export function DashboardView(container) {
  if (!container) return;

  /* ==================================================
     READ DATA (SYNC, SAFE)
  ================================================== */

  const projects = getAllProjects();
  const grouped = getProjectsByCategory();

  const projectCount = projects.length;
  const categoryLabels = [];
  const categoryValues = [];

  Object.entries(grouped).forEach(([category, items]) => {
    if (Array.isArray(items) && items.length > 0) {
      categoryLabels.push(category.toUpperCase());
      categoryValues.push(items.length);
    }
  });

  /* ==================================================
     BASE LAYOUT (ALWAYS RENDERS)
  ================================================== */

  container.innerHTML = `
    <section class="dashboard">

      <header class="dashboard-header" data-reveal>
        <h1>Dashboard</h1>
        <p>Analytics overview & capability snapshot</p>
      </header>

      <section class="dashboard-kpis" data-reveal>
        <div class="kpi-card" data-magnetic>
          <span class="label">Projects</span>
          <span class="value">${projectCount}</span>
        </div>

        <div class="kpi-card" data-magnetic>
          <span class="label">Categories</span>
          <span class="value">${categoryLabels.length}</span>
        </div>

        <div class="kpi-card" data-magnetic>
          <span class="label">Certifications</span>
          <span class="value">6</span>
        </div>
      </section>

      <section class="dashboard-chart" data-reveal>
        <h2>Projects by Category</h2>
        <div class="chart-wrap">
          <canvas id="projects-chart"></canvas>
        </div>
      </section>

    </section>
  `;

  /* ==================================================
     CHART (STABLE & AUTO)
  ================================================== */

  const canvas = container.querySelector("#projects-chart");
  if (!canvas) return;

  // Fallback protection
  if (categoryLabels.length === 0) {
    canvas.parentElement.innerHTML =
      "<small>No project data available</small>";
    return;
  }

  requestAnimationFrame(() => {
    try {
      renderBarChart(canvas, categoryLabels, categoryValues);
    } catch (err) {
      console.warn("[Dashboard] Chart render failed", err);
      canvas.parentElement.innerHTML =
        "<small>Chart unavailable</small>";
    }
  });
}
