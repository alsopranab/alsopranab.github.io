let resizeListenerAttached = false;
let resizeTimeout = null;

/**
 * Detect mobile viewport safely
 */
export function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Listen to responsive changes safely (SPA-safe)
 * - Debounced
 * - No duplicate listeners
 * - Calls callback immediately with current state
 */
export function onResize(callback, delay = 150) {
  if (typeof callback !== "function") return;

  // Fire once immediately
  callback(isMobile());

  // Prevent duplicate listeners
  if (resizeListenerAttached) return;
  resizeListenerAttached = true;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      callback(isMobile());
    }, delay);
  });

  // Orientation change support (mobile/tablet)
  window.addEventListener("orientationchange", () => {
    callback(isMobile());
  });
}
