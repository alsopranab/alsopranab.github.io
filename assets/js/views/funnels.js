function renderFunnels() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Career Funnel</h1>
      <p class="muted">
        A left-to-right view of how experience transforms into skills,
        projects, and measurable impact.
      </p>
    </section>

    <section class="funnel-row">
      ${funnelStage(
        "Experience",
        "Where real-world problems originate",
        [
          "MagicBricks — lead & site-visit analytics",
          "NoBroker — revenue & conversion analysis",
          "Daily reporting & operational dashboards"
        ]
      )}

      ${funnelArrow()}

      ${funnelStage(
        "Skills",
        "Tools used to solve those problems",
        [
          "SQL — joins, CTEs, window functions",
          "Python — EDA, automation scripts",
          "Excel — dashboards & KPI tracking"
        ]
      )}

      ${funnelArrow()}

      ${funnelStage(
        "Projects",
        "Hands-on implementations",
        [
          "SQL practice repositories",
          "Titanic survival prediction (Python)",
          "Email & report automation scripts"
        ],
        "#/projects"
      )}

      ${funnelArrow()}

      ${funnelStage(
        "Impact",
        "What changed because of the work",
        [
          "~15% monthly revenue growth",
          "Improved lead-to-visit visibility",
          "Reduced manual reporting effort"
        ],
        "#/dashboard"
      )}
    </section>
  `;

  app.classList.add("fade-in");
}

/* =========================
   HELPERS
========================= */

function funnelStage(title, subtitle, points, link) {
  return `
    <div class="card funnel-stage" onclick="this.classList.toggle('active')">
      <h3>${title}</h3>
      <p class="muted">${subtitle}</p>

      <div class="funnel-details">
        <ul>
          ${points.map(p => `<li>${p}</li>`).join("")}
        </ul>

        ${
          link
            ? `<button onclick="event.stopPropagation(); location.hash='${link}'">
                 Explore
               </button>`
            : ""
        }
      </div>
    </div>
  `;
}

function funnelArrow() {
  return `
    <div class="funnel-arrow">→</div>
  `;
}
