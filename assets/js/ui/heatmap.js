/* ============================
   GITHUB-STYLE HEATMAP
============================ */

.heatmap {
  display: grid;
  grid-template-columns: repeat(52, 1fr);
  grid-auto-rows: 12px;
  gap: 4px;
  margin-top: var(--space-md);
}

.heatmap-cell {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: #161b22;
}

/* Intensity levels */
.heatmap-cell.level-1 { background: #0e4429; }
.heatmap-cell.level-2 { background: #006d32; }
.heatmap-cell.level-3 { background: #26a641; }
.heatmap-cell.level-4 { background: #39d353; }
