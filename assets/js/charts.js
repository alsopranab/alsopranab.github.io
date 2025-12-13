/* =========================
   CHART RENDERER (FINAL)
========================= */

let skillChartInstance = null;
let growthChartInstance = null;

function renderCharts() {
  const skill = document.getElementById("skillChart");
  const growth = document.getElementById("growthChart");

  // Exit safely if not on dashboard
  if (!skill || !growth || typeof Chart === "undefined") return;

  // HARD DESTROY (prevents height growth bug)
  if (skillChartInstance) {
    skillChartInstance.destroy();
    skillChartInstance = null;
  }
  if (growthChartInstance) {
    growthChartInstance.destroy();
    growthChartInstance = null;
  }

  // Lock canvas size (CRITICAL)
  skill.height = 220;
  growth.height = 220;

  /* ---------- SKILL DISTRIBUTION ---------- */
  skillChartInstance = new Chart(skill.getContext("2d"), {
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
        ],
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: false,               // 🔒 IMPORTANT
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#9ca3af",
            padding: 14,
            font: { size: 13 }
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${ctx.parsed}%`
          }
        }
      },
      animation: {
        duration: 800,
        easing: "easeOutQuart"
      }
    }
  });

  /* ---------- GROWTH TREND ---------- */
  growthChartInstance = new Chart(growth.getContext("2d"), {
    type: "line",
    data: {
      labels: ["2022", "2023", "2024", "2025"],
      datasets: [{
        data: [20, 40, 70, 90],
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.15)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#38bdf8"
      }]
    },
    options: {
      responsive: false,               // 🔒 IMPORTANT
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false
        }
      },
      scales: {
        x: {
          ticks: { color: "#9ca3af" },
          grid: { display: false }
        },
        y: {
          min: 0,
          max: 100,
          ticks: {
            color: "#9ca3af",
            callback: v => `${v}%`
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        }
      },
      animation: {
        duration: 900,
        easing: "easeOutCubic"
      }
    }
  });
}
