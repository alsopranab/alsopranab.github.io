export function renderBarChart(
  canvas,
  labels = [],
  values = [],
  options = {}
) {
  if (!canvas || typeof Chart === "undefined") return;

  if (canvas._chart) {
    canvas._chart.destroy();
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
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600 },
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: "#b5b5b5" },
          grid: { display: false }
        },
        y: {
          ticks: { color: "#b5b5b5" },
          grid: { color: "#1f1f1f" }
        }
      },
      onClick: (_, elements) => {
        if (!elements.length || !options.onClick) return;
        const index = elements[0].index;
        options.onClick(index);
      }
    }
  });
}
