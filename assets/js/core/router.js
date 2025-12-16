const routes = {};
let currentRoute = null;

/**
 * Register a route
 */
export function registerRoute(name, viewFn) {
  if (typeof viewFn !== "function") {
    throw new Error(`Route "${name}" must be a function`);
  }
  routes[name] = viewFn;
}

/**
 * Navigate to a route (SPA-safe)
 */
export async function navigate(route, params = {}, replace = false) {
  // Guard: route exists
  if (!routes[route]) {
    console.warn(`[Router] Route "${route}" not found`);
    return;
  }

  // Prevent re-render loop
  if (route === currentRoute && !replace) return;
  currentRoute = route;

  const app = document.getElementById("app");
  if (!app) {
    console.error("[Router] #app container not found");
    return;
  }

  // Clear view safely
  app.innerHTML = "";

  try {
    await routes[route](app, params);
  } catch (error) {
    console.error(`[Router] Error rendering route "${route}"`, error);
    app.innerHTML = `
      <section>
        <h2>Something went wrong</h2>
        <p>Unable to load this section.</p>
      </section>
    `;
  }

  // Update URL (prevent infinite popstate loop)
  const state = { route, params };
  const url = `#${route}`;

  if (replace) {
    window.history.replaceState(state, "", url);
  } else {
    window.history.pushState(state, "", url);
  }
}

/**
 * Initialize router on page load
 */
export function initRouter(defaultRoute = "dashboard") {
  const hash = window.location.hash.replace("#", "");

  const initialRoute = routes[hash]
    ? hash
    : defaultRoute;

  navigate(initialRoute, {}, true);
}

/**
 * Handle browser back / forward
 */
window.addEventListener("popstate", event => {
  const state = event.state;

  if (state && state.route) {
    currentRoute = null; // allow re-render
    navigate(state.route, state.params || {}, true);
  }
});
