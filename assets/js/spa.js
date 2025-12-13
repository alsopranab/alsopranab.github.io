const app = document.getElementById("app");

const routes = {
  "/": renderHome,
  "/dashboard": renderDashboard,
  "/projects": renderProjects,
  "/project": renderProject,
  "/learnings": renderLearnings,
  "/contacts": renderContacts
};

function parseParams(query) {
  const params = {};
  if (!query) return params;
  query.split("&").forEach(p => {
    const [k, v] = p.split("=");
    params[k] = decodeURIComponent(v);
  });
  return params;
}

async function navigate() {
  const hash = location.hash.replace("#", "") || "/";
  const [path, query] = hash.split("?");

  app.innerHTML = `<p>Loading...</p>`;

  const route = routes[path];
  if (!route) {
    app.innerHTML = `<h2>404 – Page not found</h2>`;
    return;
  }

  await route(parseParams(query));
}

window.addEventListener("hashchange", navigate);
window.addEventListener("load", navigate);
