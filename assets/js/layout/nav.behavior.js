/**
 * Nav Behaviour Controller (FINAL — SAFE)
 * ---------------------------------------
 * - No inline styles
 * - Uses CSS classes only
 * - rAF throttled
 * - SPA safe
 * - Motion-aware
 * - Compatible with ui.motion.js
 */

let NAV_BEHAVIOUR_INITIALIZED = false;

function bootNavBehaviour() {
  if (NAV_BEHAVIOUR_INITIALIZED) return;
  NAV_BEHAVIOUR_INITIALIZED = true;

  const header = document.getElementById("site-header");
  if (!header) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentY = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(() => {
        if (!reduceMotion) {
          if (currentY > lastScrollY && currentY > 120) {
            header.classList.add("header-hidden");
          } else {
            header.classList.remove("header-hidden");
          }
        }

        lastScrollY = currentY;
        ticking = false;
      });

      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* Primary trigger */
window.addEventListener("header:ready", bootNavBehaviour);

/* Safety fallback */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (!NAV_BEHAVIOUR_INITIALIZED) {
      console.warn("[NavBehaviour] header:ready not detected, falling back");
      bootNavBehaviour();
    }
  }, 0);
});
