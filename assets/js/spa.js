const app = document.getElementById("app");

const routes = {
  "/": renderHome,
  "/dashboard": renderDashboard,
  "/projects": renderProjects,
  "/project": renderProject,
  "/learnings": renderLearnings,
  "/contacts": renderContacts
};

function parseParams(q) {
  const p = {};
  if (!q) return p;
  q.split("&").forEach(x => {
    const [k, v] = x.split("=");
    p[k] = decodeURIComponent(v);
  });
  return p;
}

async function navigate() {
  const hash = location.hash.replace("#", "") || "/";
  const [path, query] = hash.split("?");

  const route = routes[path];
  if (!route) {
    app.innerHTML = "<h2>404</h2>";
    return;
  }

  await route(parseParams(query));
}

window.addEventListener("hashchange", navigate);
window.addEventListener("load", navigate);
