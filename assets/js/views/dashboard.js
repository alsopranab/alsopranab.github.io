import { fetchGitHubRepos } from "../services/github.js";
import { fetchLeetCodeStats } from "../services/leetcode.js";
import { fetchContributions } from "../services/contributions.js";

import { renderStatCard } from "../ui/cards.js";
import { renderContributionMap } from "../ui/contributionMap.js";
import { renderBarChart } from "../ui/charts.js";
import { animateCount } from "../ui/animations.js";
import { isMobile } from "../ui/responsive.js";

export async function DashboardView(container) {
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
        <canvas id="projects-chart"></canvas>
      </section>
    </section>
  `;

  let repos = [];
  let leetcodeStats = [];
  let contributions = [];

  try {
    const results = await Promise.allSettled([
      fetchGitHubRepos(),
      fetchLeetCodeStats(),
      fetchContributions()
    ]);

    repos = Array.isArray(results[0]?.value) ? results[0].value : [];
    leetcodeStats = Array.isArray(results[1]?.value)
      ? results[1].value
      : [];
    contributions = Array.isArray(results[2]?.value)
      ? results[2].value
      : [];
  } catch (error) {
    console.warn("[Dashboard] Data loading failed", error);
  }

  /* -----------------------------
     KPI METRICS (SAFE)
  ----------------------------- */

  const totalProjects = repos.length;

  const projectsByType = repos.reduce((acc, repo) => {
    const type = repo?.type || "Other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const solvedLeetCode = leetcodeStats.reduce(
    (sum, d) => sum + (d?.count || 0),
    0
  );

  const kpiRow = container.querySelector("#kpi-row");

  const kpis = [
    { label: "Projects", value: totalProjects },
    { label: "LeetCode Solved", value: solvedLeetCode },
    {
      label: "Project Types",
      value: Object.keys(projectsByType).length
    }
  ];

  kpis.forEach(kpi => {
    const card = renderStatCard({
      label: kpi.label,
      value: 0
    });

    kpiRow?.appendChild(card);

    const valueEl = card?.querySelector(".value");
    if (valueEl) {
      animateCount(valueEl, kpi.value);
    }
  });

  /* -----------------------------
     CONTRIBUTION HEATMAP (SAFE)
  ----------------------------- */

  const contributionContainer =
    container.querySelector("#contribution-map");

  if (contributionContainer && contributions.length > 0) {
    renderContributionMap(contributionContainer, contributions);
  } else if (contributionContainer) {
    contributionContainer.innerHTML =
      "<small>No contribution data available.</small>";
  }

  /* -----------------------------
     PROJECT TYPE CHART (SAFE)
  ----------------------------- */

  const chartCanvas =
    container.querySelector("#projects-chart");

  const labels = Object.keys(projectsByType);
  const values = Object.values(projectsByType);

  if (chartCanvas && labels.length > 0) {
    renderBarChart(chartCanvas, labels, values);

    if (isMobile()) {
      chartCanvas.height = 200;
    }
  }
}
