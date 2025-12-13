/* =========================
   CHART RENDERER (DESKTOP SAFE)
========================= */

let skillChartInstance = null;
let growthChartInstance = null;

function renderCharts() {
  const skill = document.getElementById("skillChart");
  const growth = document.getElementById("growthChart");

  // Exit safely if not on dashboard
  if (!skill || !growth || typeof Chart === "undefined") return;

  // Destroy old instances (SPA safe)
  if (skillChartInstance) {
    skillChartInstance.destroy();
    skillChartInstance = null;
  }
  if (growthChartInstance) {
    growthChartInstance.destroy();
    growthChartInstance = null;
  }

  /* ---------- SKILL DISTRIBUTION ---------- */
  skillChartInstance = new Chart(skill, {
    type: "doughnut",
    data: {
      labels: ["SQL", "Python", "Excel", "Automation", "Analytics"],
      datasets: [
        {
          data: [30, 25, 15, 15, 15],
          backgroundColor: [
            "#38bdf8",
            "#22c55e",
            "#f59e0b",
            "#a855f7",
            "#06b6d4"
          ],
          borderWidth: 0,
          hoverOffset: 12
        }
      ]
    },
    options: {
      responsive: true,                 // ✅ FIX
      maintainAspectRatio: false,       // allows card to control size
      cutout: "65%",
      layout: {
        padding: 10
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#9ca3af",
            padding: 16,
            font: {
              size: 13,
              weight: "500"
            }
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${ctx.parsed}%`
          }
        }
      },
      animation: {
        duration: 700,
        easing: "easeOutQuart"
      }
    }
  });

  /* ---------- GROWTH TREND ---------- */
  growthChartInstance = new Chart(growth, {
    type: "line",
    data: {
      labels: ["2022", "2023", "2024", "2025"],
      datasets: [
        {
          label: "Skill Growth Index",
          data: [20, 40, 70, 90],
          borderColor: "#38bdf8",
          backgroundColor: "rgba(56,189,248,0.15)",
          borderWidth: 3,
          tension: 0.35,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#38bdf8"
        }
      ]
    },
    options: {
      responsive: true,                 // ✅ FIX
      maintainAspectRatio: false,
      layout: {
        padding: 10
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: "index",
          intersect: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#9ca3af"
          },
          grid: {
            display: false
          }
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
        duration: 800,
        easing: "easeOutCubic"
      }
    }
  });
}
