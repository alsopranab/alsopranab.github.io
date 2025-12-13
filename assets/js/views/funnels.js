function renderFunnels() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- HEADER -->
    <section>
      <h1>Career Funnel</h1>
      <p class="muted">
        A left-to-right flow showing how experience becomes skills,
        projects, and measurable business impact.
      </p>
    </section>

    <!-- FUNNEL -->
    <section class="funnel-row">
      ${funnelStage({
        title: "Experience",
        subtitle: "Where real-world problems originate",
        points: [
          "MagicBricks — lead & site-visit analytics",
          "NoBroker — revenue & conversion analysis",
          "Operational reporting & dashboards"
        ]
      })}

      ${funnelArrow()}

      ${funnelStage({
        title: "Skills",
        subtitle: "Tools applied to solve those problems",
        points: [
          "SQL — joins, CTEs, window functions",
          "Python — EDA & automation",
          "Excel — KPI tracking & dashboards"
        ]
      })}

      ${funnelArrow()}

      ${funnelStage({
        title: "Projects",
        subtitle: "Hands-on implementations",
        points: [
          "SQL practice & optimization repositories",
          "Titanic survival prediction (Python)",
          "Automation & ETL scripts"
        ],
        action: {
          label: "View Projects",
          route: "#/projects"
        }
      })}

      ${funnelArrow()}

      ${funnelStage({
        title: "Impact",
        subtitle: "Measurable outcomes",
        points: [
          "~15% average revenue improvement",
          "Improved funnel visibility",
          "Reduced manual reporting workload"
        ],
        action: {
          label: "Open Dashboard",
          route: "#/dashboard"
        }
      })}
    </section>
  `;
}

/* =========================
   HELPERS
========================= */

function funnelStage({ title, subtitle, points, action }) {
  return `
    <div class="card funnel-stage" tabindex="0"
         onclick="toggleFunnel(this)"
         onkeypress="if(event.key==='Enter') toggleFunnel(this)">
      
      <h3>${title}</h3>
      <p class="muted">${subtitle}</p>

      <div class="funnel-details">
        <ul>
          ${points.map(p => `<li>${p}</li>`).join("")}
        </ul>

        ${
          action
            ? `<button onclick="event.stopPropagation(); location.hash='${action.route}'">
                 ${action.label}
               </button>`
            : ""
        }
      </div>
    </div>
  `;
}

function funnelArrow() {
  return `
    <div class="funnel-arrow" aria-hidden="true">
      <span>→</span>
    </div>
  `;
}

/* =========================
   INTERACTION
========================= */

function toggleFunnel(el) {
  el.classList.toggle("active");
}
