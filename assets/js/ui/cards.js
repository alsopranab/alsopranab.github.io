export function renderStatCard({ label, value, icon }) {
  const card = document.createElement("div");
  card.className = "stat-card";
  card.innerHTML = `
    <div class="icon">${icon || ""}</div>
    <div class="meta">
      <span class="label">${label}</span>
      <strong class="value">${value}</strong>
    </div>
  `;
  return card;
}
