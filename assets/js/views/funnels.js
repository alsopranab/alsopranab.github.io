function renderFunnels() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <!-- HEADER -->
    <section>
      <h1>Career Funnel</h1>
      <p class="muted">
        How real-world experience turns into skills, projects,
        and measurable business impact.
      </p>
    </section>

    <!-- FUNNEL -->
    <section class="funnel-row">
      ${funnelStage({
        title: "Experience",
        subtitle: "Problems faced in real environments",
        points: [
          "MagicBricks — lead quality & site-visit analytics",
          "NoBroker — revenue conversion & funnel analysis",
          "Stakeholder reporting & performance tracking"
        ],
        action: {
          label: "View LinkedIn",
          route: `https://www.linkedin.com/in/${PROFILE.linkedin}`,
          external: true
        }
      })}

      ${funnelArrow()}

      ${funnelStage({
        title: "Skills",
        subtitle: "Tools used to solve those problems",
        points: [
          "SQL — joins, CTEs, window functions",
          "Python — EDA, automation, scripting",
          "Excel — KPIs, dashboards, tracking models"
        ],
        action: {
          label: "Open Dashboard",
          route: "#/dashboard"
        }
      })}

      ${funnelArrow()}

      ${funnelStage({
        title: "Projects",
        subtitle: "Hands-on implementations",
        points: [
          "SQL practice & optimization repositories",
          "Automation & ETL scripts",
          "End-to-end analytics projects"
        ],
        action: {
          label: "View Projects",
          route: "#/projects"
        }
      })}

      ${funnelArrow()}

      ${funnelStage({
        title: "Impact",
        subtitle: "Business outcomes delivered",
        points: [
          "~15% average revenue improvement",
          "Improved funnel visibility & reporting",
          "Reduced manual effort via automation"
        ],
        action: {
          label: "See Metrics",
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
    <div class="card funnel-stage"
         tabindex="0"
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
            ? `
              <button
                onclick="event.stopPropagation(); ${
                  action.external
                    ? `window.open('${action.route}', '_blank')`
                    : `location.hash='${action.route}'`
                }">
                ${action.label}
              </button>
            `
            : ""
        }
      </div>
    </div>
  `;
}

function funnelArrow() {
  return `
    <div class="funnel-arrow" aria-hidden="true">
      →
    </div>
  `;
}

/* =========================
   INTERACTION
========================= */

function toggleFunnel(el) {
  el.classList.toggle("active");
}
