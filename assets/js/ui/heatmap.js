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

  const map = {};
  data.forEach(d => (map[d.date] = d.count || 0));

  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364);

  while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

  for (let i = 0; i < 364; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    const iso = d.toISOString().slice(0, 10);
    const count = map[iso] || 0;

    const cell = document.createElement("div");
    cell.className = `heatmap-cell level-${level(count)}`;
    cell.title = `${iso}: ${count} contributions`;

    heatmap.appendChild(cell);
  }

  container.appendChild(heatmap);
}

function level(c) {
  if (c === 0) return 0;
  if (c < 3) return 1;
  if (c < 6) return 2;
  if (c < 10) return 3;
  return 4;
}
