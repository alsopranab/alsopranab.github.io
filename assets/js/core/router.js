import { getAppMain } from "../app.js";

const routes = Object.create(null);
let activeView = null;
let currentRoute = null;
let renderToken = 0;

/**
 * Register a route
 */
export function registerRoute(name, viewFn) {
  if (!name || typeof viewFn !== "function") {
    throw new Error(`[Router] Invalid route registration: ${name}`);
  }
  routes[name] = viewFn;
}

/**
 * Normalize and parse hash
 */
function getRouteFromHash() {
  const raw = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
  return raw || null;
}

/**
 * Core renderer (race-safe, idempotent)
 */
async function renderRoute(route) {
  if (route === currentRoute) return;
  currentRoute = route;

  const token = ++renderToken;
  const root = getAppMain();

  if (!root) {
    throw new Error("[Router] App main container not found");
  }

  // Cleanup previous view
  if (activeView && typeof activeView.destroy === "function") {
    try {
      activeView.destroy();
    } catch (e) {
      console.warn("[Router] View cleanup failed", e);
    }
  }

  activeView = null;
  root.innerHTML = "";

  const View = routes[route];

  if (!View) {
    root.innerHTML = `
      <section>
        <h2>404</h2>
        <p>Page not found</p>
      </section>
    `;
    dispatchRendered(route);
    return;
  }

  try {
    const result = await View(root);

    // Abort if newer navigation occurred
    if (token !== renderToken) return;

    if (result && typeof result.destroy === "function") {
      activeView = result;
    }
  } catch (err) {
    console.error(`[Router] Failed to render route "${route}"`, err);
    root.innerHTML = `
      <section>
        <h2>Error</h2>
        <p>Unable to load this section.</p>
      </section>
    `;
  }

  // UX: reset scroll (safe)
  window.scrollTo(0, 0);

  dispatchRendered(route);
}

/**
 * Dispatch lifecycle event
 */
function dispatchRendered(route) {
  window.dispatchEvent(
    new CustomEvent("route:rendered", {
      detail: { route }
    })
  );
}

/**
 * Navigate to route
 */
export function navigate(route) {
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
    const route = getRouteFromHash() || defaultRoute;
    renderRoute(route);
  }

  window.addEventListener("hashchange", onChange);

  // Initial load
  if (!window.location.hash) {
    window.location.hash = `#/${defaultRoute}`;
  } else {
    onChange();
  }
}
