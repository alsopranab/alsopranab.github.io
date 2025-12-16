/**
 * Monochrome bar chart
 * - SPA safe
 * - Chart.js CDN safe
 * - No side effects
 */
export function renderBarChart(canvas, labels = [], values = []) {
  if (!canvas) return;
  if (typeof Chart === "undefined") {
    console.warn("[Charts] Chart.js not loaded");
    return;
  }

  // Destroy previous instance (SPA-safe)
  if (canvas._chart) {
    canvas._chart.destroy();
    canvas._chart = null;
  }

  const ctx = canvas.getContext("2d");

  canvas._chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: "#ffffff",
          borderColor: "#ffffff",
          borderWidth: 1,
          hoverBackgroundColor: "#ffffff"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 600,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#0b0b0f",
          titleColor: "#ffffff",
          bodyColor: "#b5b5b5",
          borderColor: "#2f2f2f",
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#b5b5b5"
          }
        },
        y: {
          grid: {
            color: "#1f1f1f"
          },
          ticks: {
            color: "#b5b5b5",
            beginAtZero: true
          }
        }
      }
    }
  });
}
