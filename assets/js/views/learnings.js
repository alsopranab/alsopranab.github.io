function renderLearnings() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Learnings</h1>
      <p class="muted">
        Practical insights gathered from real-world analytics,
        automation, and decision-making work.
      </p>
    </section>

    <section>
      <h2>SQL & Data Modeling</h2>
      <div class="grid">
        ${learningCard(
          "CTEs vs Subqueries",
          "Why readability and reusability matter in production SQL",
          [
            "CTEs improve query readability",
            "Easier debugging and testing",
            "Better for complex transformations"
          ]
        )}

        ${learningCard(
          "Joins & Cardinality",
          "How wrong joins silently break dashboards",
          [
            "Always validate row counts",
            "Many-to-many joins inflate metrics",
            "Pre-aggregate when possible"
          ]
        )}
      </div>
    </section>

    <section>
      <h2>Python & Automation</h2>
      <div class="grid">
        ${learningCard(
          "Automate Before Optimizing",
          "Time saved beats micro-optimizations",
          [
            "Remove manual steps first",
            "Automate repeatable logic",
            "Measure time saved, not code elegance"
          ]
        )}

        ${learningCard(
          "Scripts Over Tools",
          "Why simple scripts often outperform heavy tools",
          [
            "Lower maintenance",
            "Faster iteration",
            "Easier debugging"
          ]
        )}
      </div>
    </section>

    <section>
      <h2>Analytics & Business Thinking</h2>
      <div class="grid">
        ${learningCard(
          "Funnels Reveal Leaks",
          "Most problems hide between steps, not totals",
          [
            "Track transitions, not just outcomes",
            "Drop-offs matter more than peaks",
            "Always segment funnels"
          ]
        )}

        ${learningCard(
          "Dashboards Should Answer One Question",
          "Clarity beats feature-rich visuals",
          [
            "One dashboard = one decision",
            "Avoid vanity metrics",
            "Design for action"
          ]
        )}
      </div>
    </section>
  `;

  app.classList.add("fade-in");
}

/* =========================
   HELPERS
========================= */

function learningCard(title, context, points) {
  return `
    <div class="card experience-card" onclick="this.classList.toggle('active')">
      <h3>${title}</h3>
      <p class="muted">${context}</p>

      <div class="experience-details">
        <ul>
          ${points.map(p => `<li>${p}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}
