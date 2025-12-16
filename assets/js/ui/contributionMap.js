export function renderContributionMap(container, data) {
  const grid = document.createElement("div");
  grid.className = "contribution-grid";

  data.forEach(day => {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.dataset.level = day.count;
    cell.title = `${day.date}: ${day.count} contributions`;
    grid.appendChild(cell);
  });

  container.appendChild(grid);
}
