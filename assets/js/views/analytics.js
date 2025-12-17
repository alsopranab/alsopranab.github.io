import { renderBarChart } from "../ui/charts.js";
import { renderHeatmap } from "../ui/heatmap.js";
import { fetchGitHubContributions } from "../services/githubContributions.js";
import { getProjectsByCategory } from "../core/projectStore.js";

/**
 * Analytics View (FINAL, FIXED)
 * - Single source of truth
 * - Auto project distribution
 * - GitHub-style heatmap
 * - Async-safe
 */
export async function AnalyticsView(container) {
  if (!container) return;

  /* ----------------------------------------
     DATA: Projects by category
  ---------------------------------------- */
  const grouped = getProjectsByCategory();

  const labels = [];
  const values = [];

  Object.entries(grouped).forEach(([category, projects]) => {
    if (Array.isArray(projects) && projects.length > 0) {
      labels.push(category.toUpperCase());
      values.push(projects.length);
    }
  });

  /* ----------------------------------------
     BASE LAYOUT (ALWAYS RENDERS)
  ---------------------------------------- */
  container.innerHTML = `
    <section class="analytics dashboard">

      <header class="dashboard-header" data-reveal>
        <h1>Analytics</h1>
        <p>Project distribution & activity overview</p>
      </header>

      <section class="dashboard-chart panel" data-reveal>
        <h2>Projects by Type</h2>
        <div class="chart-wrap">
          <canvas id="category-chart"></canvas>
        </div>
      </section>

      <section class="panel" data-reveal>
        <h2>Contribution Activity</h2>
        <div id="heatmap"></div>
      </section>

    </section>
  `;

  /* ----------------------------------------
     BAR CHART (SYNC, SAFE)
  ---------------------------------------- */
  if (labels.length > 0) {
    renderBarChart(
      container.querySelector("#category-chart"),
      labels,
      values
    );
  } else {
    container.querySelector(".dashboard-chart").innerHTML =
      "<p class='muted'>No project data available.</p>";
  }

  /* ----------------------------------------
     HEATMAP (ASYNC, NON-BLOCKING)
  ---------------------------------------- */
  try {
    const contributions = await fetchGitHubContributions();
    renderHeatmap(
      container.querySelector("#heatmap"),
      contributions
    );
  } catch (err) {
    console.warn("[Analytics] Heatmap failed", err);
    container.querySelector("#heatmap").innerHTML =
      "<p class='muted'>Contribution data unavailable.</p>";
  }
}
