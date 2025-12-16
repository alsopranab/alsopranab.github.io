/**
 * Monochrome bar chart with stable rendering
 * No colors. No gradients. Glow via shadow only.
 */
export function renderBarChart(canvas, labels = [], values = []) {
  if (!canvas || typeof Chart === "undefined") return;

  // Destroy previous chart (SPA-safe)
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
          borderWidth: 1,
          hoverBackgroundColor: "#ffffff"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 600
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#000",
          titleColor: "#fff",
          bodyColor: "#b5b5b5",
          borderColor: "#2f2f2f",
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#b5b5b5" }
        },
        y: {
          grid: { color: "#1f1f1f
