const app = document.getElementById("app");

const routes = {
  "/": () => window.renderHome?.(),
  "/dashboard": () => window.renderDashboard?.(),
  "/funnels": () => window.renderFunnels?.(),
  "/projects": () => window.renderProjects?.(),
  "/project": (q) => window.renderProject?.(q),
  "/learnings": () => window.renderLearnings?.(),
  "/contacts": () => window.renderContacts?.()
};

function navigate() {
  if (!app) return;

  const hash = location.hash || "#/";
  const [path, query] = hash.replace("#", "").split("?");

  app.classList.remove("fade-in");

  setTimeout(() => {
    app.innerHTML = "";

    const view = routes[path];

    if (!view) {
      app.innerHTML = `
        <section>
          <h1>404</h1>
          <p>Page not found</p>
        </section>
      `;
      return;
    }

    try {
      view(query);
      app.classList.add("fade-in");

      if (typeof runMotionEnhancements === "function") {
        runMotionEnhancements();
      }
    } catch (err) {
      console.error(err);
      app.innerHTML = `
        <section>
          <h1>Runtime Error</h1>
          <pre>${err.message}</pre>
        </section>
      `;
    }
  }, 100);
}

window.addEventListener("load", navigate);
window.addEventListener("hashchange", navigate);
