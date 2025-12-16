import { renderNavbar } from "./ui/navbar.js";
import { initReveal, destroyReveal } from "./ui/reveal.js";
import { initGlow } from "./ui/glow.js";

let appRoot = null;
let mainRoot = null;
let initialized = false;

/**
 * Initialize application shell (runs ONCE)
 */
export function initApp() {
  if (initialized) return;
  initialized = true;

  // Ensure DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, { once: true });
    return;
  }

  appRoot = document.getElementById("app");
  if (!appRoot) {
    throw new Error("[App] #app root not found");
  }

  // Reset root safely
  appRoot.innerHTML = "";

  // --------------------------------------------------
  // App shell (LOCKED STRUCTURE)
  // --------------------------------------------------
  const shell = document.createElement("div");
  shell.id = "app-shell";

  const header = document.createElement("header");
  header.id = "app-header";

  mainRoot = document.createElement("main");
  mainRoot.id = "app-main";

  shell.appendChild(header);
  shell.appendChild(mainRoot);
  appRoot.appendChild(shell);

  // --------------------------------------------------
  // Static UI (render ONCE)
  // --------------------------------------------------
  renderNavbar(header);

  // --------------------------------------------------
  // Global effects (render ONCE)
  // --------------------------------------------------
  initGlow();

  // --------------------------------------------------
  // Reveal lifecycle (SPA-safe)
  // --------------------------------------------------
  initReveal(mainRoot);

  window.addEventListener("route:rendered", () => {
    destroyReveal();
    initReveal(mainRoot);
  });
}

/**
 * Router access point
 */
export function getAppMain() {
  if (!mainRoot) {
    throw new Error("[App] App not initialized");
  }
  return mainRoot;
}
