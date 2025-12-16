import { renderBarChart } from "../ui/charts.js";

/**
 * Dashboard View
 * - Always renders UI first
 * - Zero external service dependency
 * - Charts are optional, never blocking
 * - SPA safe
 */
export function DashboardView(container) {
  if (!container) return;

  /* --------------------------------------------------
     BASE LAYOUT (NEVER FAILS)
  -------------------------------------------------- */

  container.innerHTML = `
    <section class="dashboard">
      <header class="dashboard-header">
        <h1 data-reveal>Dashboard</h1>
        <p data-reveal>Analytics overview</p>
      </header>

      <section class="dashboard-kpis" data-reveal>
        <div class="kpi-card">
          <span class="label">Projects</span>
          <span class="value">12</span>
        </div>
        <div class="kpi-card">
          <span class="label">Certifications</span>
          <span class="value">6</span>
        </div>
        <div class="kpi-card">
          <span class="label">Skills</span>
          <span class="value">10+</span>
        </div>
      </section>

      <section class="dashboard-chart" data-reveal>
        <h2>Projects by Type</h2>
        <div class="chart-wrap">
          <canvas id="projects-chart" height="260"></canvas>
        </div>
      </section>
    </section>
  `;

  /* --------------------------------------------------
     CHART (SAFE, NON-BLOCKING)
  -------------------------------------------------- */

  const canvas = container.querySelector("#projects-chart");
  if (!canvas) return;

  // Static data (stable base)
  const labels = ["Web", "Data", "Automation", "Other"];
  const values = [5, 3, 2, 2];

  // Render chart safely
  requestAnimationFrame(() => {
    try {
      renderBarChart(canvas, labels, values);
    } catch (e) {
      console.warn("[Dashboard] Chart failed", e);
      canvas.parentElement.innerHTML =
        "<small>Chart unavailable</small>";
    }
  });
}
