/**
 * Render GitHub-style contribution heatmap
 * - Pure DOM
 * - 52 weeks × 7 days
 * - Timezone-safe
 * - SPA-safe
 */
export function renderHeatmap(container, data = []) {
  if (!container) return;

  container.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML =
      "<small class='muted'>No contribution data available</small>";
    return;
  }

  const heatmap = document.createElement("div");
  heatmap.className = "heatmap";

  // Build lookup map
  const contributionMap = Object.create(null);
  for (const item of data) {
    if (item?.date) {
      contributionMap[item.date] = item.count || 0;
    }
  }

  // Calculate start date (Sunday, 52 weeks ago)
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 364);

  while (start.getDay() !== 0) {
    start.setDate(start.getDate() - 1);
  }

  // Render 364 days
  for (let i = 0; i < 364; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    const iso =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0");

    const count = contributionMap[iso] || 0;

    const cell = document.createElement("div");
    cell.className = `heatmap-cell level-${getLevel(count)}`;
    cell.title = `${iso}: ${count} contributions`;

    heatmap.appendChild(cell);
  }

  container.appendChild(heatmap);
}

function getLevel(count) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}
