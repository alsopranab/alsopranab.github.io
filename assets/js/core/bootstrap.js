/**
 * Application Bootstrap (FINAL)
 * -----------------------------
 * Guarantees execution order:
 * 1. DOM Ready
 * 2. Page Controllers execute
 * 3. Renderers execute
 *
 * No business logic lives here.
 */

(function bootstrapApp() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    /**
     * Dispatch a global event after DOM is ready.
     * Page controllers and renderers listen to this.
     */
    window.dispatchEvent(new Event("app:ready"));
  }
})();
