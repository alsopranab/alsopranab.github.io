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

  /* -----------------------------------------------------
     THEME TOKENS (FROM CSS VARIABLES)
  ----------------------------------------------------- */
  const css = getComputedStyle(document.documentElement);

  const colorPrimary = css.getPropertyValue("--chart-1").trim();
  const colorSecondary = css.getPropertyValue("--chart-2").trim();
  const textPrimary = css.getPropertyValue("--text-primary").trim();
  const textMuted = css.getPropertyValue("--text-muted").trim();

  /* -----------------------------------------------------
     GRADIENT (PREMIUM LOOK)
  ----------------------------------------------------- */
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, colorPrimary);
  gradient.addColorStop(1, colorSecondary);

  /* -----------------------------------------------------
     CHART INSTANCE
  ----------------------------------------------------- */
  canvas._chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: values,

          backgroundColor: gradient,
          borderRadius: 6,
          borderSkipped: false,

          /* subtle glow */
          hoverBackgroundColor: gradient,
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
          ticks: {
            color: textMuted,
            font: {
              size: 11,
              family: css.getPropertyValue("--font-body").trim()
            }
          },
          grid: {
            display: false
          }
        },

        y: {
          ticks: {
            color: textMuted,
            font: {
              size: 11,
              family: css.getPropertyValue("--font-body").trim()
            }
          },
          grid: {
            color: "rgba(255,255,255,0.06)",
            drawBorder: false
          }
        }
      },

      onHover: (event, elements) => {
        event.native.target.style.cursor =
          elements.length ? "pointer" : "default";
      },

      onClick: (_, elements) => {
        if (!elements.length || !options.onClick) return;
        const index = elements[0].index;
        options.onClick(index);
      }
    }
  });
}
