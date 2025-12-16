/**
 * Render GitHub-style contribution heatmap
 * Stable grid, monochrome, SPA-safe
 */
export function renderContributionMap(container, data = []) {
  if (!container) return;

  // Reset (SPA-safe)
  container.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML =
      "<small>No contribution activity available.</small>";
    return;
  }

  const grid = document.createElement("div");
  grid.className = "contribution-grid";
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(53, 1fr)";
  grid.style.gap = "4px";

  data.forEach(day => {
    const count = Number(day?.count) || 0;
    const date = day?.date || "";

    const cell = document.createElement("div");
    cell.className = "day";

    /* Normalize levels: 0–4 */
    let level = 0;
    if (count > 0 && count < 5) level = 1;
    else if (count < 10) level = 2;
    else if (count < 20) level = 3;
    else if (count >= 20) level = 4;

    cell.dataset.level = level;
    cell.title = date
      ? `${date}: ${count} contributions`
      : `${count} contributions`;

    // Fixed size → no layout shift
    cell.style.width = "10px";
    cell.style.height = "10px";

    grid.appendChild(cell);
  });

  container.appendChild(grid);
}
