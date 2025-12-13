/* =========================
   CHART RENDERER (SAFE SPA)
========================= */

let skillChartInstance = null;
let growthChartInstance = null;

function renderCharts() {
  const skill = document.getElementById("skillChart");
  const growth = document.getElementById("growthChart");

  // Exit silently if charts are not on current page
  if (!skill || !growth || typeof Chart === "undefined") return;

  // Destroy old instances to avoid SPA duplication bugs
  if (skillChartInstance) skillChartInstance.destroy();
  if (growthChartInstance) growthChartInstance.destroy();

  /* ---------- SKILL DISTRIBUTION ---------- */
  skillChartInstance = new Chart(skill, {
    type: "doughnut",
    data: {
      labels: ["SQL", "Python", "Excel", "Automation", "Analytics"],
      datasets: [
        {
          data: [30, 25, 15, 15, 15],
          backgroundColor: [
            "#38bdf8", // SQL
            "#22c55e", // Python
            "#f59e0b", // Excel
            "#a855f7", // Automation
            "#06b6d4"  // Analytics
          ],
          borderWidth: 0,
          hoverOffset: 12
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#9ca3af",
            padding: 14,
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
        duration: 900,
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
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#38bdf8"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
          ticks: { color: "#9ca3af" },
          grid: { display: false }
        },
        y: {
          ticks: {
            color: "#9ca3af",
            callback: v => `${v}%`
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          },
          min: 0,
          max: 100
        }
      },
      animation: {
        duration: 1000,
        easing: "easeOutCubic"
      }
    }
  });
}
