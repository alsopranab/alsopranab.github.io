/**
 * Render a KPI / stat card safely
 * @param {Object} param0
 * @param {string} param0.label
 * @param {number|string} param0.value
 * @param {string} [param0.icon]
 */
export function renderStatCard({ label, value, icon } = {}) {
  const card = document.createElement("div");
  card.className = "stat-card";
  card.setAttribute("role", "status");

  const safeLabel = label ?? "";
  const safeValue =
    value !== undefined && value !== null ? value : "—";

  card.innerHTML = `
    ${icon ? `<div class="icon" aria-hidden="true">${icon}</div>` : ""}
    <div class="meta">
      <span class="label">${safeLabel}</span>
      <strong class="value" data-count>${safeValue}</strong>
    </div>
  `;

  return card;
}
