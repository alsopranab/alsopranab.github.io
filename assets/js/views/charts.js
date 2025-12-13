function renderCharts() {
  const skillCtx = document.getElementById("skillChart");
  const growthCtx = document.getElementById("growthChart");

  new Chart(skillCtx, {
    type: "doughnut",
    data: {
      labels: ["SQL", "Python", "Excel", "Automation", "Analytics"],
      datasets: [{
        data: [30, 25, 15, 15, 15],
        backgroundColor: [
          "#38bdf8",
          "#22c55e",
          "#f59e0b",
          "#a855f7",
          "#06b6d4"
        ]
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: "#e5e7eb" } }
      }
    }
  });

  new Chart(growthCtx, {
    type: "line",
    data: {
      labels: ["2022", "2023", "2024", "2025"],
      datasets: [{
        label: "Skill Growth",
        data: [20, 40, 70, 90],
        borderColor: "#38bdf8",
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: "#e5e7eb" } }
      },
      scales: {
        x: { ticks: { color: "#9ca3af" } },
        y: { ticks: { color: "#9ca3af" } }
      }
    }
  });
}

function animateKPIs() {
  document.querySelectorAll(".kpi-value").forEach(el => {
    let target = +el.dataset.target;
    let count = 0;

    const timer = setInterval(() => {
      count++;
      el.textContent = count;
      if (count >= target) clearInterval(timer);
    }, 30);
  });
}
