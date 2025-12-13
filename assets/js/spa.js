const app = document.getElementById("app");

const routes = {
  "/": () => renderHome(),
  "/projects": () => renderProjects(),
  "/project": (params) => renderProject(params),
  "/learnings": () => renderLearnings(),
  "/contacts": () => renderContacts()
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

function navigate() {
  const hash = location.hash.replace("#", "") || "/";
  const [path, query] = hash.split("?");

  app.innerHTML = "";

  const route = routes[path];
  if (!route) {
    app.innerHTML = "<h2>404</h2>";
    return;
  }

  route(parseParams(query));
}

window.addEventListener("hashchange", navigate);
window.addEventListener("load", navigate);
