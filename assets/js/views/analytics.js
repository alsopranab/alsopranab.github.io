import { renderBadges } from "../ui/badges.js";
import { renderBarChart } from "../ui/charts.js";
import { renderHeatmap } from "../ui/heatmap.js";
import { fetchGitHubContributions } from "../services/githubContributions.js";
import { getProjectsByCategory } from "../core/projectStore.js";

/**
 * Analytics View (FINAL)
 * - Stable & deterministic
 * - Project distribution (auto)
 * - GitHub-style heatmap (async)
 * - Profile / platform badges
 */
export async function AnalyticsView(container) {
  if (!container) return;

  /* --------------------------------------------------
     DATA: Projects by category
  -------------------------------------------------- */
  const grouped = getProjectsByCategory() || {};

  const labels = [];
  const values = [];

  for (const [category, projects] of Object.entries(grouped)) {
    if (Array.isArray(projects) && projects.length > 0) {
      labels.push(category.toUpperCase());
      values.push(projects.length);
    }
  }

  /* --------------------------------------------------
     BASE LAYOUT (ALWAYS RENDERS)
  -------------------------------------------------- */
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

      <section class="panel" data-reveal>
        <h2>Profiles & Badges</h2>
        <div id="badges"></div>
      </section>

    </section>
  `;

  /* --------------------------------------------------
     BAR CHART (SYNC, SAFE)
  -------------------------------------------------- */
  const chartCanvas = container.querySelector("#category-chart");

  if (chartCanvas && labels.length > 0) {
    try {
      renderBarChart(chartCanvas, labels, values);
    } catch (err) {
      console.warn("[Analytics] Chart render failed", err);
      chartCanvas.parentElement.innerHTML =
        "<p class='muted'>Chart unavailable.</p>";
    }
  } else if (chartCanvas) {
    chartCanvas.parentElement.innerHTML =
      "<p class='muted'>No project data available.</p>";
  }

  /* --------------------------------------------------
     HEATMAP (ASYNC, ISOLATED)
  -------------------------------------------------- */
  const heatmapEl = container.querySelector("#heatmap");

  if (heatmapEl) {
    try {
      const contributions = await fetchGitHubContributions();
      renderHeatmap(heatmapEl, contributions);
    } catch (err) {
      console.warn("[Analytics] Heatmap failed", err);
      heatmapEl.innerHTML =
        "<p class='muted'>Contribution data unavailable.</p>";
    }
  }

  /* --------------------------------------------------
     BADGES (SYNC, ISOLATED)
  -------------------------------------------------- */
  const badgesEl = container.querySelector("#badges");

  if (badgesEl) {
    try {
      renderBadges(badgesEl);
    } catch (err) {
      console.warn("[Analytics] Badges render failed", err);
      badgesEl.innerHTML =
        "<p class='muted'>Badges unavailable.</p>";
    }
  }
}
