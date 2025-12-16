import { getAppMain } from "../app.js";

const routes = {};
let currentRoute = null;

/**
 * Register a route
 */
export function registerRoute(name, viewFn) {
  if (typeof viewFn !== "function") {
    throw new Error(`[Router] Route "${name}" must be a function`);
  }
  routes[name] = viewFn;
}

/**
 * Internal render handler
 */
async function renderRoute(route, params = {}) {
  // Prevent unnecessary re-render
  if (route === currentRoute) return;
  currentRoute = route;

  const root = getAppMain();

  if (!root) {
    throw new Error("[Router] #app-main not found");
  }

  // Clear previous view
  root.innerHTML = "";

  const View = routes[route];

  if (!View) {
    root.innerHTML = `
      <section>
        <h2>404</h2>
        <p>Page not found</p>
      </section>
    `;
    return;
  }

  try {
    await View(root, params);
  } catch (error) {
    console.error(`[Router] Error rendering "${route}"`, error);
    root.innerHTML = `
      <section>
        <h2>Something went wrong</h2>
        <p>Unable to load this section.</p>
      </section>
    `;
  }

  // Notify app systems (reveal, analytics, etc.)
  window.dispatchEvent(new CustomEvent("route:rendered", {
    detail: { route, params }
  }));
}

/**
 * Navigate to a route (hash-based)
 */
export function navigate(route, params = {}) {
  if (!routes[route]) {
    console.warn(`[Router] Route "${route}" not registered`);
    return;
  }

  // Update hash ONLY (single source of truth)
  window.location.hash = `#/${route}`;

  // Params can be cached later if needed
}

/**
 * Initialize router
 */
export function initRouter(defaultRoute = "dashboard") {
  function handleHashChange() {
    const hash = window.location.hash.replace("#/", "");
    const route = routes[hash] ? hash : defaultRoute;
    renderRoute(route);
  }

  window.addEventListener("hashchange", handleHashChange);

  // Initial load
  if (!window.location.hash) {
    window.location.hash = `#/${defaultRoute}`;
  } else {
    handleHashChange();
  }
}
