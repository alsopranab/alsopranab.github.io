function renderCharts() {
  const skill = document.getElementById("skillChart");
  const growth = document.getElementById("growthChart");

  new Chart(skill, {
    type: "doughnut",
    data: {
      labels: ["SQL", "Python", "Excel", "Automation", "Analytics"],
      datasets: [{
        data: [30, 25, 15, 15, 15],
        backgroundColor: ["#38bdf8","#22c55e","#f59e0b","#a855f7","#06b6d4"]
      }]
    }
  });

  new Chart(growth, {
    type: "line",
    data: {
      labels: ["2022","2023","2024","2025"],
      datasets: [{
        label: "Skill Growth",
        data: [20,40,70,90],
        borderColor: "#38bdf8",
        tension: 0.4
      }]
    }
  });
}
