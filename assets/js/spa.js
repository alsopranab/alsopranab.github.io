/* =========================
   SIMPLE SPA ROUTER
   ========================= */

const app = document.getElementById("app");

/* ROUTE → VIEW FUNCTION MAP */
const routes = {
  "/": renderHome,
  "/dashboard": renderDashboard,
  "/funnels": renderFunnels,
  "/projects": renderProjects,
  "/project": renderProject,
  "/learnings": renderLearnings,
  "/contacts": renderContacts,
};

/* NAVIGATION HANDLER */
function navigate() {
  const hash = location.hash || "#/";
  const [path, query] = hash.replace("#", "").split("?");

  const view = routes[path];

  app.classList.remove("fade-in");

  setTimeout(() => {
    app.innerHTML = "";

    if (!view) {
      app.innerHTML = `
        <section>
          <h1>404</h1>
          <p>Page not found</p>
        </section>
      `;
      return;
    }

    view(query);
    app.classList.add("fade-in");
  }, 120);
}

/* INITIAL LOAD + HASH CHANGE */
window.addEventListener("load", navigate);
window.addEventListener("hashchange", navigate);
