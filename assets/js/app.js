import { renderNavbar } from "./ui/navbar.js";
import { initReveal } from "./ui/reveal.js";

let appRoot = null;
let initialized = false;

/**
 * Initialize application shell (runs ONCE)
 */
export function initApp() {
  // Prevent double execution
  if (initialized) return;
  initialized = true;

  // Ensure DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, { once: true });
    return;
  }

  // SPA root (NOT document.body)
  appRoot = document.getElementById("app");

  if (!appRoot) {
    throw new Error("[App] #app root not found");
  }

  // Clear root (defensive)
  appRoot.innerHTML = "";

  // --------------------------------------------------
  // App shell
  // --------------------------------------------------
  const shell = document.createElement("div");
  shell.id = "app-shell";

  const main = document.createElement("main");
  main.id = "app-main";

  shell.appendChild(main);
  appRoot.appendChild(shell);

  // --------------------------------------------------
  // Static UI (render once)
  // --------------------------------------------------
  renderNavbar(shell);

  // --------------------------------------------------
  // Reveal system
  // --------------------------------------------------
  initReveal();

  // Re-run reveal after each route render
  window.addEventListener("route:rendered", () => {
    initReveal();
  });
}

/**
 * Router access point
 */
export function getAppMain() {
  if (!appRoot) {
    throw new Error("[App] App not initialized");
  }
  return document.getElementById("app-main");
}
