const routes = {};

export function registerRoute(name, viewFn) {
  routes[name] = viewFn;
}

export async function navigate(route, params = {}) {
  if (!routes[route]) {
    console.error(`Route ${route} not found`);
    return;
  }

  const app = document.getElementById("app");
  app.innerHTML = "";

  await routes[route](app, params);

  window.history.pushState({ route, params }, "", `#${route}`);
}

window.addEventListener("popstate", (e) => {
  if (e.state) {
    navigate(e.state.route, e.state.params);
  }
});
