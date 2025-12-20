/**
 * Application Bootstrap (FINAL — PRODUCTION SAFE)
 * ===============================================
 * Responsibilities:
 * - Wait for DOM readiness
 * - Verify DataService availability
 * - Warm DataService cache (optional)
 * - Emit `app:ready` exactly once
 * - NEVER touch DOM
 * - NEVER emit page-level events
 */

let APP_INITIALIZED = false;

document.addEventListener("DOMContentLoaded", async () => {
  if (APP_INITIALIZED) return;
  APP_INITIALIZED = true;

  console.log("[Bootstrap] DOM ready");

  if (!window.DataService) {
    console.error("[Bootstrap] DataService not available");
    return;
  }

  try {
    /* Optional cache warm — non-blocking logic downstream */
    await Promise.allSettled([
      DataService.getProfile(),
      DataService.getExperience(),
      DataService.getFeatured(),
      DataService.getProjects(),
      DataService.getEducation(),
      DataService.getContact(),
      DataService.getSocials?.()
    ]);

    window.dispatchEvent(
      new CustomEvent("app:ready", {
        detail: { timestamp: Date.now() }
      })
    );

    console.log("[Bootstrap] App ready");
  } catch (e) {
    console.error("[Bootstrap] Fatal init error", e);
  }
});
