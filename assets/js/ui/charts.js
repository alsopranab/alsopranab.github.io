/* =====================================================
   CHART RENDERERS (BAR + LINE)
   Premium • Token-driven • SPA-safe
===================================================== */

/* -----------------------------------------------------
   BAR CHART
----------------------------------------------------- */
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

  const css = getComputedStyle(document.documentElement);

  const colorPrimary = css.getPropertyValue("--chart-1").trim();
  const colorSecondary = css.getPropertyValue("--chart-2").trim();
  const textPrimary = css.getPropertyValue("--text-primary").trim();
  const textMuted = css.getPropertyValue("--text-muted").trim();

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, colorPrimary);
  gradient.addColorStop(1, colorSecondary);

  canvas._chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: gradient,
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      animation: {
        duration: 800,
        easing: "easeOutQuart"
      },

      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(10, 15, 25, 0.95)",
          titleColor: textPrimary,
          bodyColor: textPrimary,
          borderColor: "rgba(255,255,255,0.08)",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
          displayColors: false
        }
      },

      scales: {
        x: {
          ticks: { color: textMuted },
          grid: { display: false }
        },
        y: {
          ticks: { color: textMuted },
          grid: {
            color: "rgba(255,255,255,0.06)",
            drawBorder: false
          }
        }
      },

      onClick: (_, elements) => {
        if (!elements.length || !options.onClick) return;
        options.onClick(elements[0].index);
      }
    }
  });
}

/* -----------------------------------------------------
   LINE / AREA CHART
----------------------------------------------------- */
export function renderLineChart(
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

  const css = getComputedStyle(document.documentElement);

  const colorPrimary = css.getPropertyValue("--chart-1").trim();
  const colorSecondary = css.getPropertyValue("--chart-2").trim();
  const textPrimary = css.getPropertyValue("--text-primary").trim();
  const textMuted = css.getPropertyValue("--text-muted").trim();

  const strokeGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  strokeGradient.addColorStop(0, colorPrimary);
  strokeGradient.addColorStop(1, colorSecondary);

  const fillGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  fillGradient.addColorStop(0, `${colorPrimary}33`);
  fillGradient.addColorStop(1, "rgba(0,0,0,0)");

  canvas._chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data: values,
          borderColor: strokeGradient,
          backgroundColor: fillGradient,
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointBackgroundColor: colorSecondary
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
          backgroundColor: "rgba(10, 15, 25, 0.95)",
          titleColor: textPrimary,
          bodyColor: textPrimary,
          borderColor: "rgba(255,255,255,0.08)",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
          displayColors: false
        }
      },

      scales: {
        x: {
          ticks: { color: textMuted },
          grid: { display: false }
        },
        y: {
          ticks: { color: textMuted },
          grid: {
            color: "rgba(255,255,255,0.06)",
            drawBorder: false
          }
        }
      },

      onClick: (_, elements) => {
        if (!elements.length || !options.onClick) return;
        options.onClick(elements[0].index);
      }
    }
  });
}
