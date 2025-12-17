/**
 * Render GitHub-style contribution heatmap
 * - Pure DOM (no canvas, no SVG)
 * - GitHub-compatible layout (52 weeks × 7 days)
 * - Defensive: never crashes analytics page
 *
 * @param {HTMLElement} container
 * @param {Array} data [{ date: "YYYY-MM-DD", count: number }]
 */
export function renderHeatmap(container, data = []) {
  if (!container) return;

  // Clear container
  container.innerHTML = "";

  // Guard: invalid data
  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML =
      "<small>No contribution data available</small>";
    return;
  }

  // Create heatmap grid
  const heatmap = document.createElement("div");
  heatmap.className = "heatmap";

  // Map date → count
  const contributionMap = {};
  data.forEach(item => {
    if (item && item.date) {
      contributionMap[item.date] = item.count || 0;
    }
  });

  // Determine date range (last 52 weeks)
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364); // 52 weeks

  // Normalize to Sunday (GitHub behavior)
  while (start.getDay() !== 0) {
    start.setDate(start.getDate() - 1);
  }

  // Build cells day-by-day
  for (let i = 0; i < 364; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const iso = date.toISOString().slice(0, 10);
    const count = contributionMap[iso] || 0;

    const cell = document.createElement("div");
    cell.className = `heatmap-cell level-${getLevel(count)}`;
    cell.title = `${iso}: ${count} contributions`;

    heatmap.appendChild(cell);
  }

  container.appendChild(heatmap);
}

/**
 * Map contribution count → GitHub intensity level
 */
function getLevel(count) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}
