/* =====================================================
   APPLICATION ENTRY POINT (FINAL)
   Stable • SPA-safe • Production-ready
===================================================== */

/* -----------------------------------------------------
   Core systems
----------------------------------------------------- */
import "./core/router.js";

/* -----------------------------------------------------
   UI systems
----------------------------------------------------- */
import { renderNavbar } from "./ui/navbar.js";
import { initReveal, destroyReveal } from "./ui/reveal.js";
import { initGlow } from "./ui/glow.js";

/* -----------------------------------------------------
   App state
----------------------------------------------------- */
let appRoot = null;
let mainRoot = null;
let initialized = false;
let routeListenerBound = false;

/* =====================================================
   INITIALIZE APPLICATION SHELL
===================================================== */
export function initApp() {
  if (initialized) return;
  initialized = true;

  /* Ensure DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, { once: true });
    return;
  }

  try {
    appRoot = document.getElementById("app");
    if (!appRoot) {
      throw new Error("#app root not found");
    }

    /* --------------------------------------------------
       HARD RESET ROOT
    -------------------------------------------------- */
    appRoot.innerHTML = "";

    /* --------------------------------------------------
       LOCKED APP SHELL STRUCTURE
    -------------------------------------------------- */
    const shell = document.createElement("div");
    shell.id = "app-shell";

    const header = document.createElement("header");
    header.id = "app-header";

    mainRoot = document.createElement("main");
    mainRoot.id = "app-main";

    shell.appendChild(header);
    shell.appendChild(mainRoot);
    appRoot.appendChild(shell);

    /* --------------------------------------------------
       STATIC UI (RENDER ONCE)
    -------------------------------------------------- */
    renderNavbar(header);

    /* --------------------------------------------------
       GLOBAL VISUAL SYSTEMS
    -------------------------------------------------- */
    initGlow();

    /* --------------------------------------------------
       REVEAL SYSTEM (ROUTE-AWARE)
    -------------------------------------------------- */
    initReveal(mainRoot);

    if (!routeListenerBound) {
      window.addEventListener("route:rendered", () => {
        destroyReveal();
        initReveal(mainRoot);
      });
      routeListenerBound = true;
    }
  } catch (err) {
    console.error("[App] Fatal initialization error", err);

    /* Hard fallback – never blank screen */
    if (appRoot) {
      appRoot.innerHTML = `
        <div style="padding:40px;color:white">
          <h1>Application failed to load</h1>
          <p>Check console for details.</p>
        </div>
      `;
    }
  }
}

/* =====================================================
   ROUTER ACCESS POINT (STRICT)
===================================================== */
export function getAppMain() {
  if (!mainRoot) {
    throw new Error("[App] App shell not initialized");
  }
  return mainRoot;
}

/* =====================================================
   AUTO BOOTSTRAP (REQUIRED)
===================================================== */
initApp();
