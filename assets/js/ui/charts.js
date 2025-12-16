export function renderBarChart(ctx, labels, values) {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: values
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}
