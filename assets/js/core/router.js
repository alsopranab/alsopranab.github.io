import { getAppMain } from "../app.js";

const routes = {};
let activeView = null;
let renderToken = 0;

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
 * Parse hash safely
 */
function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return hash || null;
}

/**
 * Render a route (race-safe)
 */
async function renderRoute(route, params = {}) {
  const token = ++renderToken;
  const root = getAppMain();

  if (!root) {
    throw new Error("[Router] App main container not found");
  }

  // Cleanup previous view if it supports it
  if (activeView && typeof activeView.destroy === "function") {
    try {
      activeView.destroy();
    } catch (e) {
      console.warn("[Router] View cleanup failed", e);
    }
  }

  root.innerHTML = "";

  const View = routes[route];

  if (!View) {
    root.innerHTML = `
      <section>
        <h2>404</h2>
        <p>Page not found</p>
      </section>
    `;
    activeView = null;
    return;
  }

  try {
    const result = await View(root, params);

    // Abort if a newer render started
    if (token !== renderToken) return;

    // Track active view if it returns cleanup hooks
    if (result && typeof result === "object") {
      activeView = result;
    } else {
      activeView = null;
    }
  } catch (error) {
    console.error(`[Router] Error rendering "${route}"`, error);
    root.innerHTML = `
      <section>
        <h2>Something went wrong</h2>
        <p>Unable to load this section.</p>
      </section>
    `;
    activeView = null;
  }

  // UX: reset scroll
  window.scrollTo({ top: 0, behavior: "instant" });

  // Notify global systems
  window.dispatchEvent(
    new CustomEvent("route:rendered", {
      detail: { route, params }
    })
  );
}

/**
 * Navigate (single source of truth = hash)
 */
export function navigate(route, params = {}) {
  if (!routes[route]) {
    console.warn(`[Router] Route "${route}" not registered`);
    return;
  }

  window.location.hash = `#/${route}`;
}

/**
 * Initialize router
 */
export function initRouter(defaultRoute = "dashboard") {
  function onChange() {
    const route = parseHash() || defaultRoute;
    renderRoute(route);
  }

  window.addEventListener("hashchange", onChange);

  // Initial render
  if (!window.location.hash) {
    window.location.hash = `#/${defaultRoute}`;
  } else {
    onChange();
  }
}
