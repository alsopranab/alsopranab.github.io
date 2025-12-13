function renderDashboardCharts() {
  /* SKILLS BAR CHART */
  const skillsCtx = document.getElementById("skillsChart");

  new Chart(skillsCtx, {
    type: "bar",
    data: {
      labels: ["SQL", "Python", "Excel", "Automation", "EDA", "Business Analysis"],
      datasets: [
        {
          label: "Skill Strength",
          data: [90, 80, 75, 70, 85, 80],
          backgroundColor: "#38bdf8"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#9ca3af" }
        },
        x: {
          ticks: { color: "#9ca3af" }
        }
      }
    }
  });

  /* PROJECT PIE CHART */
  const projectCtx = document.getElementById("projectsChart");

  new Chart(projectCtx, {
    type: "doughnut",
    data: {
      labels: ["SQL", "Python", "Automation / ETL", "Mixed"],
      datasets: [
        {
          data: [40, 25, 20, 15],
          backgroundColor: [
            "#38bdf8",
            "#22d3ee",
            "#22c55e",
            "#a78bfa"
          ]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#e5e7eb" }
        }
      }
    }
  });
}
