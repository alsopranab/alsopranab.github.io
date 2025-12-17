/* =====================================================
   ROUTER (FINAL, AUTO-BOOTSTRAPPED)
===================================================== */

import { getAppMain } from "../app.js";

/* -----------------------------------------------------
   VIEWS
----------------------------------------------------- */
import { DashboardView } from "../views/dashboard.js";
import { AnalyticsView } from "../views/analytics.js";
import { ProjectsView } from "../views/projects.js";
import { LearningsView } from "../views/learnings.js";

/* -----------------------------------------------------
   INTERNAL STATE
----------------------------------------------------- */
const routes = Object.create(null);
let activeView = null;
let currentRoute = null;
let renderToken = 0;

/* -----------------------------------------------------
   REGISTER ROUTE
----------------------------------------------------- */
export function registerRoute(name, viewFn) {
  if (!name || typeof viewFn !== "function") {
    throw new Error(`[Router] Invalid route registration: ${name}`);
  }
  routes[name] = viewFn;
}

/* -----------------------------------------------------
   HASH PARSER
----------------------------------------------------- */
function getRouteFromHash() {
  const raw = window.location.hash
    .replace(/^#\/?/, "")
    .replace(/\/$/, "");
  return raw || null;
}

/* -----------------------------------------------------
   CORE RENDERER
----------------------------------------------------- */
async function renderRoute(route) {
  if (route === currentRoute) return;
  currentRoute = route;

  const token = ++renderToken;
  const root = getAppMain();

  root.innerHTML = "";

  if (activeView && typeof activeView.destroy === "function") {
    try {
      activeView.destroy();
    } catch (e) {
      console.warn("[Router] View cleanup failed", e);
    }
  }

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

  window.scrollTo(0, 0);
  dispatchRendered(route);
}

/* -----------------------------------------------------
   EVENTS
----------------------------------------------------- */
function dispatchRendered(route) {
  window.dispatchEvent(
    new CustomEvent("route:rendered", {
      detail: { route }
    })
  );
}

/* -----------------------------------------------------
   NAVIGATION
----------------------------------------------------- */
export function navigate(route) {
  if (!routes[route]) {
    console.warn(`[Router] Route "${route}" not registered`);
    return;
  }
  window.location.hash = `#/${route}`;
}

/* -----------------------------------------------------
   INIT ROUTER
----------------------------------------------------- */
function initRouter(defaultRoute = "dashboard") {
  function onChange() {
    const route = getRouteFromHash() || defaultRoute;
    renderRoute(route);
  }

  window.addEventListener("hashchange", onChange);

  if (!window.location.hash) {
    window.location.hash = `#/${defaultRoute}`;
  } else {
    onChange();
  }
}

/* =====================================================
   REGISTER ROUTES (AUTO)
===================================================== */

registerRoute("dashboard", DashboardView);
registerRoute("analytics", AnalyticsView);
registerRoute("projects", ProjectsView);
registerRoute("learnings", LearningsView);

/* =====================================================
   BOOT ROUTER (AUTO)
===================================================== */

initRouter("dashboard");
