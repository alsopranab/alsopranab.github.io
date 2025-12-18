/**
 * Nav Behaviour Controller (FINAL — SAFE)
 * ---------------------------------------
 * - No inline styles
 * - Uses CSS classes only
 * - rAF throttled
 * - Compatible with ui.motion.js
 */

(() => {
  const header = document.getElementById("site-header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      const currentY = window.scrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          if (currentY > lastScrollY && currentY > 120) {
            header.classList.add("header-hidden");
          } else {
            header.classList.remove("header-hidden");
          }

          lastScrollY = currentY;
          ticking = false;
        });

        ticking = true;
      }
    },
    { passive: true }
  );
})();
