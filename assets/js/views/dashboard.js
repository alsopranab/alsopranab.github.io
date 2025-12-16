import { fetchGitHubRepos } from "../services/github.js";
import { fetchLeetCodeStats } from "../services/leetcode.js";
import { fetchContributions } from "../services/contributions.js";

import { renderStatCard } from "../ui/cards.js";
import { renderContributionMap } from "../ui/contributionMap.js";
import { renderBarChart } from "../ui/charts.js";
import { animateCount } from "../ui/animations.js";
import { isMobile } from "../ui/responsive.js";

export async function DashboardView(container) {
  // Root layout (UI will style later)
  container.innerHTML = `
    <section class="dashboard">
      <header>
        <h1 data-reveal>Dashboard</h1>
        <p data-reveal>Live engineering & analytics metrics</p>
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

  // Fetch everything in parallel
  const [repos, leetcodeStats, contributions] = await Promise.all([
    fetchGitHubRepos(),
    fetchLeetCodeStats(),
    fetchContributions()
  ]);

  /* -----------------------------
     KPI METRICS
  ----------------------------- */

  const totalProjects = repos.length;

  const projectsByType = repos.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});

  const solvedLeetCode = leetcodeStats.reduce(
    (sum, d) => sum + d.count,
    0
  );

  const kpiRow = container.querySelector("#kpi-row");

  const kpis = [
    { label: "Projects", value: totalProjects },
    { label: "LeetCode Solved", value: solvedLeetCode },
    { label: "Project Types", value: Object.keys(projectsByType).length }
  ];

  kpis.forEach(kpi => {
    const card = renderStatCard({
      label: kpi.label,
      value: 0
    });

    kpiRow.appendChild(card);

    // Animate numbers
    animateCount(
      card.querySelector(".value"),
      kpi.value
    );
  });

  /* -----------------------------
     CONTRIBUTION HEATMAP
  ----------------------------- */

  const contributionContainer =
    container.querySelector("#contribution-map");

  renderContributionMap(contributionContainer, contributions);

  /* -----------------------------
     PROJECT TYPE CHART
  ----------------------------- */

  const chartCanvas =
    container.querySelector("#projects-chart");

  const labels = Object.keys(projectsByType);
  const values = Object.values(projectsByType);

  renderBarChart(chartCanvas, labels, values);

  /* -----------------------------
     RESPONSIVE AWARENESS
  ----------------------------- */

  if (isMobile()) {
    // Future: reduce chart density / simplify heatmap
    chartCanvas.height = 200;
  }
}
