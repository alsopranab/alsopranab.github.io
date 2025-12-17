export function renderHeatmap(container, data = []) {
  if (!container) return;

  container.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML =
      "<small class='muted'>No contribution data available</small>";
    return;
  }

  /* -----------------------------------------------------
     THEME TOKENS
  ----------------------------------------------------- */
  const css = getComputedStyle(document.documentElement);

  const accentPrimary = css.getPropertyValue("--accent-primary").trim();
  const accentSecondary = css.getPropertyValue("--accent-secondary").trim();
  const textPrimary = css.getPropertyValue("--text-primary").trim();

  /* -----------------------------------------------------
     HEATMAP CONTAINER
  ----------------------------------------------------- */
  const heatmap = document.createElement("div");
  heatmap.className = "heatmap";

  /* -----------------------------------------------------
     DATA MAP
  ----------------------------------------------------- */
  const map = {};
  data.forEach(d => (map[d.date] = d.count || 0));

  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364);

  // Align to Sunday (GitHub-style)
  while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

  /* -----------------------------------------------------
     BUILD CELLS
  ----------------------------------------------------- */
  for (let i = 0; i < 364; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    const iso = d.toISOString().slice(0, 10);
    const count = map[iso] || 0;
    const lvl = level(count);

    const cell = document.createElement("div");
    cell.className = `heatmap-cell level-${lvl}`;
    cell.dataset.count = count;

    /* Tooltip (premium, readable) */
    cell.title = `${iso} • ${count} contribution${count === 1 ? "" : "s"}`;

    /* Subtle inline styling for richness */
    if (lvl > 0) {
      cell.style.background =
        lvl >= 4
          ? accentSecondary
          : accentPrimary;
      cell.style.opacity = 0.15 + lvl * 0.15;
    }

    heatmap.appendChild(cell);
  }

  container.appendChild(heatmap);
}

/* -----------------------------------------------------
   LEVEL CALCULATION (BALANCED, NOT HARSH)
----------------------------------------------------- */
function level(c) {
  if (c === 0) return 0;
  if (c < 3) return 1;
  if (c < 6) return 2;
  if (c < 10) return 3;
  return 4;
}
