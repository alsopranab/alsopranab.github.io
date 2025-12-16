/**
 * Render GitHub-style contribution heatmap
 */
export function renderHeatmap(container, data = []) {
  if (!container || !Array.isArray(data)) return;

  container.innerHTML = "";
  container.className = "heatmap";

  data.forEach(day => {
    const cell = document.createElement("div");
    cell.className = `heatmap-day level-${getLevel(day.count)}`;
    cell.title = `${day.count} contributions on ${day.date}`;
    container.appendChild(cell);
  });
}

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}
