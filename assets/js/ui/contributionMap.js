/**
 * Render GitHub-style contribution heatmap safely
 */
export function renderContributionMap(container, data = []) {
  if (!container) return;

  // Clear previous render (SPA-safe)
  container.innerHTML = "";

  // Guard: invalid or empty data
  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML =
      "<small>No contribution activity available.</small>";
    return;
  }

  const grid = document.createElement("div");
  grid.className = "contribution-grid";
  grid.setAttribute("role", "grid");

  data.forEach(day => {
    // Validate day object
    const count = Number(day?.count) || 0;
    const date = day?.date || "";

    const cell = document.createElement("div");
    cell.className = "day";
    cell.setAttribute("role", "gridcell");

    // Normalize intensity levels (0–4 typical GitHub style)
    let level = 0;
    if (count > 0 && count < 5) level = 1;
    else if (count < 10) level = 2;
    else if (count < 20) level = 3;
    else if (count >= 20) level = 4;

    cell.dataset.level = level;
    cell.title = date
      ? `${date}: ${count} contributions`
      : `${count} contributions`;

    grid.appendChild(cell);
  });

  container.appendChild(grid);
}
