/**
 * Application Bootstrap
 * - Single responsibility
 * - Deterministic startup
 * - No synthetic lifecycle events
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.DataService && typeof window.DataService.debugSnapshot === "function") {
    console.log("[Bootstrap] DataService ready:", window.DataService.debugSnapshot());
  } else {
    console.warn("[Bootstrap] DataService not detected");
  }
});
