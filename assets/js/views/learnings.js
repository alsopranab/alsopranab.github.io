/* =====================================================
   LEARNINGS VIEW
   LANDIO-GRADE · MONOCHROME · EDITORIAL
===================================================== */

function renderLearnings() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <section>
      <h1>Learnings</h1>
      <p>
        Practical insights gathered from real-world analytics,
        automation, and decision-making work.
      </p>
    </section>

    <!-- =====================
         SQL
    ====================== -->
    <section>
      <h2>SQL & Data Modeling</h2>

      <div class="grid">
        ${learningCard(
          "CTEs vs Subqueries",
          "Why readability and reusability matter in production SQL",
          [
            "CTEs improve query readability and intent",
            "Simpler debugging for complex transformations",
            "Better long-term maintainability"
          ]
        )}

        ${learningCard(
          "Joins & Cardinality",
          "How incorrect joins silently break dashboards",
          [
            "Always validate row counts",
            "Many-to-many joins inflate metrics",
            "Pre-aggregate whenever possible"
          ]
        )}
      </div>
    </section>

    <!-- =====================
         PYTHON
    ====================== -->
    <section>
      <h2>Python & Automation</h2>

      <div class="grid">
        ${learningCard(
          "Automate Before Optimizing",
          "Time saved matters more than micro-optimizations",
          [
            "Remove manual steps first",
            "Automate repeatable logic",
            "Measure time saved, not code elegance"
          ]
        )}

        ${learningCard(
          "Scripts Over Tools",
          "Why simple scripts often outperform heavy platforms",
          [
            "Lower operational overhead",
            "Faster iteration cycles",
            "Easier debugging and ownership"
          ]
        )}
      </div>
    </section>

    <!-- =====================
         ANALYTICS
    ====================== -->
    <section>
      <h2>Analytics & Business Thinking</h2>

      <div class="grid">
        ${learningCard(
          "Funnels Reveal Leaks",
          "Most problems hide between steps, not totals",
          [
            "Track transitions, not just outcomes",
            "Drop-offs matter more than peaks",
            "Segment funnels aggressively"
          ]
        )}

        ${learningCard(
          "Dashboards Should Answer One Question",
          "Clarity beats feature-rich visuals",
          [
            "One dashboard = one decision",
            "Avoid vanity metrics",
            "Design dashboards for action"
          ]
        )}
      </div>
    </section>
  `;
}

/* =====================================================
   UI HELPERS (EDITORIAL)
===================================================== */

function learningCard(title, context, points) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${context}</p>
      <ul>
        ${points.map(p => `<li>${p}</li>`).join("")}
      </ul>
    </div>
  `;
}
