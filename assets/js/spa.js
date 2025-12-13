// assets/js/spa.js

const app = document.getElementById("app");

/**
 * Central route registry
 * Each route maps to a render function
 */
const routes = {
  "/": () => renderHome(),
  "/projects": () => renderProjects(),
  "/project": (params) => renderProject(params),
  "/learnings": () => renderLearnings(),
  "/contacts": () => renderContacts()
};

/**
 * Parse query params from hash
 * Example: #/project?repo=abc
 */
function parseParams(queryString) {
  const params = {};
  if (!queryString) return params;

  queryString.split("&").forEach(pair => {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value || "");
  });

  return params;
}

/**
 * SPA navigation handler
 */
function navigate() {
  let hash = location.hash.replace("#", "") || "/";
  let [path, query] = hash.split("?");

  const route = routes[path];

  // Clear + animate
  app.classList.remove("fade-in");

  setTimeout(() => {
    app.innerHTML = "";

    if (!route) {
      app.innerHTML = `
        <section class="fade-in">
          <h1>404</h1>
          <p>Page not found.</p>
        </section>
      `;
      app.classList.add("fade-in");
      return;
    }

    const params = parseParams(query);
    route(params);

    app.classList.add("fade-in");
  }, 120);
}

/**
 * Attach listeners
 */
window.addEventListener("hashchange", navigate);
window.addEventListener("load", navigate);
