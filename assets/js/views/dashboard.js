import { fetchGitHubRepos } from "../services/github.js";
import { fetchLeetCodeStats } from "../services/leetcode.js";
import { fetchContributions } from "../services/contributions.js";

import { renderStatCard } from "../ui/cards.js";
import { renderContributionMap } from "../ui/contributionMap.js";
import { renderBarChart } from "../ui/charts.js";
import { animateCount } from "../ui/animations.js";
import { isMobile } from "../ui/responsive.js";

export async function DashboardView(container) {
  if (!container) return;

  /* -----------------------------
     BASE RENDER (ALWAYS)
  ----------------------------- */

  container.innerHTML = `
    <section class="dashboard">
      <header>
        <h1 data-reveal>Dashboard</h1>
        <p data-reveal>Live analytics metrics</p>
      </header>

      <section id="kpi-row" data-reveal></section>

      <section id="contribution-section" data-reveal>
        <h2>Contributions</h2>
        <div id="contribution-map"></div>
      </section>

      <section id="project-analytics" data-reveal>
        <h2>Projects by Type</h2>
        <div id="projects-chart-wrap">
          <canvas id="projects-chart"></canvas>
        </div>
      </section>
    </section>
  `;

  /* -----------------------------
     DATA LOADING (SAFE)
  ----------------------------- */

  let repos = [];
  let leetcodeStats = [];
  let contributions = [];

  const results = await Promise.allSettled([
    fetchGitHubRepos(),
    fetchLeetCodeStats(),
    fetchContributions()
  ]);

  if (results[0].status === "fulfilled") {
    repos = Array.isArray(results[0].value) ? results[0].value : [];
  }

  if (results[1].status === "fulfilled") {
    leetcodeStats = Array.isArray(results[1].value)
      ? results[1].value
      : [];
  }

  if (results[2].status === "fulfilled") {
    contributions = Array.isArray(results[2].value)
      ? results[2].value
      : [];
  }

  /* -----------------------------
     KPI METRICS
  ----------------------------- */

  const kpiRow = container.querySelector("#kpi-row");
  if (!kpiRow) return;

  const projectsByType = repos.reduce((acc, r) => {
    const type = r?.type || "Other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const kpis = [
    { label: "Projects", value: repos.length },
    {
      label: "LeetCode Solved",
      value: leetcodeStats.reduce(
        (sum, d) => sum + (d?.count || 0),
        0
      )
    },
    {
      label: "Project Types",
      value: Object.keys(projectsByType).length
    }
  ];

  kpis.forEach(({ label, value }) => {
    const card = renderStatCard({ label, value: 0 });
    kpiRow.appendChild(card);

    const valueEl = card.querySelector(".value");
    if (valueEl) animateCount(valueEl, value);
  });

  /* -----------------------------
     CONTRIBUTIONS
  ----------------------------- */

  const contributionEl =
    container.querySelector("#contribution-map");

  if (contributionEl) {
    if (contributions.length > 0) {
      renderContributionMap(contributionEl, contributions);
    } else {
      contributionEl.innerHTML =
        "<small>No contribution data available</small>";
    }
  }

  /* -----------------------------
     PROJECT TYPE CHART
  ----------------------------- */

  const chartCanvas =
    container.querySelector("#projects-chart");

  if (
    chartCanvas &&
    typeof Chart !== "undefined" &&
    Object.keys(projectsByType).length > 0
  ) {
    renderBarChart(
      chartCanvas,
      Object.keys(projectsByType),
      Object.values(projectsByType)
    );

    if (isMobile()) chartCanvas.height = 220;
  } else if (chartCanvas) {
    chartCanvas.parentElement.innerHTML =
      "<small>No project data available</small>";
  }
}
