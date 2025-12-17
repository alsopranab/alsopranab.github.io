/**
 * Bootstrap Controller (FINAL — SINGLE SOURCE OF TRUTH)
 * =====================================================
 * - Runs once DOM is ready
 * - Emits app:ready exactly once
 * - Nothing else should use DOMContentLoaded
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Bootstrap] DOM ready");

  window.dispatchEvent(
    new CustomEvent("app:ready", {
      detail: { timestamp: Date.now() }
    })
  );

  console.log("[Bootstrap] app:ready dispatched");
});
