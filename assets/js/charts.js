/* =========================
   CHART RENDERER (SPA + APPLE SAFE)
   Works for Home + Dashboard
========================= */

let skillChartInstance = null;
let growthChartInstance = null;

/**
 * @param {"home" | "dashboard"} context
 */
function renderCharts(context = "dashboard") {
  const skill = document.getElementById("skillChart");
  const growth = document.getElementById("growthChart");

  // Exit safely if charts not present
  if (!skill || !growth || typeof Chart === "undefined") return;

  /* =====================
     HARD RESET (SPA SAFE)
  ====================== */
  if (skillChartInstance) {
    skillChartInstance.destroy();
    skillChartInstance = null;
  }

  if (growthChartInstance) {
    growthChartInstance.destroy();
    growthChartInstance = null;
  }

  /* =====================
     LOCK CANVAS SIZE
     (CRITICAL FIX)
  ====================== */
  skill.style.height = "200px";
  growth.style.height = "200px";

  const isHome = context === "home";

  /* =====================
     SKILL DISTRIBUTION
  ====================== */
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
        hoverOffset: isHome ? 6 : 10 // 👈 NO inflation on home
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: isHome ? "72%" : "65%",
      layout: {
        padding: 8
      },
      plugins: {
        legend: {
          display: !isHome, // 👈 hide legend on home
          position: "bottom",
          labels: {
            color: "#9ca3af",
            padding: 14,
            font: { size: 12 }
          }
        },
        tooltip: {
          enabled: !isHome
        }
      },
      animation: {
        duration: 600,
        easing: "easeOutCubic"
      },
      hover: {
        mode: null // 👈 DISABLE layout-affecting hover
      }
    }
  });

  /* =====================
     GROWTH TREND
  ====================== */
  growthChartInstance = new Chart(growth.getContext("2d"), {
    type: "line",
    data: {
      labels: ["2022", "2023", "2024", "2025"],
      datasets: [{
        data: [20, 40, 70, 90],
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.12)",
        borderWidth: 3,
        tension: 0.35,
        fill: true,
        pointRadius: isHome ? 3 : 5,
        pointHoverRadius: isHome ? 4 : 6,
        pointBackgroundColor: "#38bdf8"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 8
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: !isHome,
          mode: "index",
          intersect: false
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#9ca3af" }
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
        duration: 700,
        easing: "easeOutCubic"
      },
      hover: {
        mode: null // 👈 prevents resize jitter
      }
    }
  });
}
