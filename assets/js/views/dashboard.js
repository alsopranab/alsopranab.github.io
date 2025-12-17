import { renderBarChart } from "../ui/charts.js";
import {
  getAllProjects,
  getProjectsByCategory
} from "../core/projectStore.js";

/**
 * Dashboard View (FINAL, SAFE, NON-BLANK)
 */
export function DashboardView(container) {
  console.log("[Dashboard] render start");

  if (!container) {
    console.warn("[Dashboard] No container");
    return;
  }

  /* ==================================================
     READ DATA (DEFENSIVE)
  ================================================== */

  const projects = Array.isArray(getAllProjects())
    ? getAllProjects()
    : [];

  const grouped =
    typeof getProjectsByCategory === "function"
      ? getProjectsByCategory()
      : {};

  const projectCount = projects.length;

  const categoryLabels = [];
  const categoryValues = [];

  Object.entries(grouped || {}).forEach(([category, items]) => {
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
        <div class="kpi-card">
          <span class="label">Projects</span>
          <span class="value">${projectCount || "—"}</span>
        </div>

        <div class="kpi-card">
          <span class="label">Categories</span>
          <span class="value">${categoryLabels.length || "—"}</span>
        </div>

        <div class="kpi-card">
          <span class="label">Certifications</span>
          <span class="value">6</span>
        </div>
      </section>

      <section class="dashboard-chart" data-reveal>
        <h2>Projects by Category</h2>
        <div class="chart-wrap">
          ${
            categoryLabels.length
              ? `<canvas id="projects-chart"></canvas>`
              : `<div class="muted" style="padding:20px">
                   No project data available yet
                 </div>`
          }
        </div>
      </section>

    </section>
  `;

  /* ==================================================
     CHART (ONLY IF DATA EXISTS)
  ================================================== */

  if (categoryLabels.length === 0) {
    console.warn("[Dashboard] No category data");
    return;
  }

  const canvas = container.querySelector("#projects-chart");
  if (!canvas) return;

  requestAnimationFrame(() => {
    try {
      renderBarChart(canvas, categoryLabels, categoryValues);
    } catch (err) {
      console.warn("[Dashboard] Chart render failed", err);
      canvas.parentElement.innerHTML =
        "<small class='muted'>Chart unavailable</small>";
    }
  });
}
