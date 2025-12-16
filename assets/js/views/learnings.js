export async function LearningsView(container) {
  const tools = [
    "sql",
    "python",
    "excel",
    "dax",
    "statistics",
    "ab_testing"
  ];

  // Load each learning file defensively
  const results = await Promise.all(
    tools.map(async tool => {
      try {
        const res = await fetch(
          `/assets/js/data/knowledge/${tool}.json`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();

        if (!Array.isArray(json)) {
          throw new Error("Invalid JSON format");
        }

        return { tool, items: json };
      } catch (error) {
        console.warn(
          `[Learnings] Failed to load ${tool}.json`,
          error
        );
        return { tool, items: [] };
      }
    })
  );

  container.innerHTML = `
    <section>
      <h2>Learnings</h2>

      ${
        results.every(r => r.items.length === 0)
          ? `<p>No learning content available yet.</p>`
          : results
              .map(({ tool, items }) => {
                if (items.length === 0) return "";

                return `
                  <div data-reveal>
                    <h3>${tool.toUpperCase()}</h3>

                    ${items
                      .map(
                        item => `
                          <div class="learning-card">
                            <strong>${item.topic || ""}</strong>
                            ${
                              item.syntax
                                ? `<pre>${item.syntax}</pre>`
                                : ""
                            }
                            ${
                              item.explanation
                                ? `<p>${item.explanation}</p>`
                                : ""
                            }
                            ${
                              item.use_case
                                ? `<small>${item.use_case}</small>`
                                : ""
                            }
                          </div>
                        `
                      )
                      .join("")}
                  </div>
                `;
              })
              .join("")
      }
    </section>
  `;
}
