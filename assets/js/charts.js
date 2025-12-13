export function drawSkillChart(skills) {
  const svg = document.getElementById("skill-chart");
  const cx = 300, cy = 110, r = 80;

  skills.forEach((s, i) => {
    const angle = (2 * Math.PI / skills.length) * i;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);

    svg.innerHTML += `
      <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#1e293b"/>
      <circle cx="${x}" cy="${y}" r="22" fill="#38bdf8"/>
      <text x="${x}" y="${y+4}" text-anchor="middle" fill="#000" font-size="10">${s}</text>
    `;
  });

  svg.innerHTML += `<circle cx="${cx}" cy="${cy}" r="30" fill="#22d3ee"/>`;
}
