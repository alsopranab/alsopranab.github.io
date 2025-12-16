import { renderNavbar } from "./ui/navbar.js";
import { initReveal } from "./ui/reveal.js";

/**
 * Initialize application shell (runs once)
 */
export function initApp() {
  // Guard: DOM must be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, {
      once: true
    });
    return;
  }

  const root = document.body;
  if (!root) {
    console.error("[App] document.body not available");
    return;
  }

  // Render navbar once
  renderNavbar(root);

  // Initial reveal pass
  initReveal();

  /**
   * Re-run reveal after each route render
   * Router dispatches this custom event
   */
  window.addEventListener("route:rendered", () => {
    initReveal();
  });
}
