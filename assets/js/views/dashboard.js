import { renderBarChart } from "../ui/charts.js";

/**
 * Dashboard View (FINAL)
 * - Zero external service dependency
 * - Deterministic render
 * - Reveal + Glow compatible
 * - No async fragility
 */
export function DashboardView(container) {
  if (!container) return;

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
          <span class="value">12</span>
        </div>

        <div class="kpi-card" data-magnetic>
          <span class="label">Certifications</span>
          <span class="value">6</span>
        </div>

        <div class="kpi-card" data-magnetic>
          <span class="label">Skills</span>
          <span class="value">10+</span>
        </div>
      </section>

      <section class="dashboard-chart" data-reveal>
        <h2>Projects by Category</h2>
        <div class="chart-wrap">
          <canvas id="projects-chart" height="260"></canvas>
        </div>
      </section>

    </section>
  `;

  /* ==================================================
     CHART (NON-BLOCKING, SAFE)
  ================================================== */

  const canvas = container.querySelector("#projects-chart");
  if (!canvas) return;

  const labels = ["Web", "Data", "Automation", "Other"];
  const values = [5, 3, 2, 2];

  requestAnimationFrame(() => {
    try {
      renderBarChart(canvas, labels, values);
    } catch (err) {
      console.warn("[Dashboard] Chart render failed", err);
      canvas.parentElement.innerHTML =
        "<small>Chart unavailable</small>";
    }
  });
}
