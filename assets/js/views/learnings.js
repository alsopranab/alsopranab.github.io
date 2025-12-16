export async function LearningsView(container) {
  const tools = [
    "sql",
    "python",
    "excel",
    "dax",
    "statistics",
    "ab_testing"
  ];

  const data = await Promise.all(
    tools.map(t =>
      fetch(`/assets/js/data/knowledge/${t}.json`).then(r => r.json())
    )
  );

  container.innerHTML = `
    <section>
      <h2>Learnings</h2>
      ${data.map((items, i) => `
        <div data-reveal>
          <h3>${tools[i].toUpperCase()}</h3>
          ${items.map(item => `
            <div class="learning-card">
              <strong>${item.topic}</strong>
              <pre>${item.syntax}</pre>
              <p>${item.explanation}</p>
              <small>${item.use_case}</small>
            </div>
          `).join("")}
        </div>
      `).join("")}
    </section>
  `;
}
