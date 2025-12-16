let activeCharts = new WeakMap();

/**
 * Render a bar chart safely (SPA-safe, defensive)
 */
export function renderBarChart(canvas, labels = [], values = []) {
  if (!canvas || typeof Chart === "undefined") {
    console.warn("[Chart] Chart.js not available or canvas missing");
    return null;
  }

  // Normalize data
  const safeLabels = Array.isArray(labels) ? labels : [];
  const safeValues = Array.isArray(values) ? values : [];

  // Guard: empty dataset
  if (safeLabels.length === 0 || safeValues.length === 0) {
    canvas.replaceWith(
      Object.assign(document.createElement("small"), {
        textContent: "No chart data available."
      })
    );
    return null;
  }

  // Destroy existing chart on this canvas (SPA-safe)
  if (activeCharts.has(canvas)) {
    activeCharts.get(canvas).destroy();
    activeCharts.delete(canvas);
  }

  const chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: safeLabels,
      datasets: [
        {
          data: safeValues,
          borderRadius: 6,
          maxBarThickness: 42
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 900,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          intersect: false,
          mode: "index"
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });

  activeCharts.set(canvas, chart);
  return chart;
}
