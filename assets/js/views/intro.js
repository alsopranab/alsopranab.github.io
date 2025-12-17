import { navigate } from "../core/router.js";

/**
 * Intro / Landing View (FINAL, SAFE)
 * - Router-compatible
 * - Motion-aware
 * - Single navigation guarantee
 */
export function IntroView(container) {
  if (!container) return;

  let transitionTimer = null;
  let navigated = false;

  /* --------------------------------------------------
     BUILD DOM
  -------------------------------------------------- */
  const section = document.createElement("section");
  section.className = "intro";
  section.setAttribute("data-reveal", "");

  const title = document.createElement("h1");
  title.textContent = "Pranab Debnath";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Analytics • Data • Insights";

  section.appendChild(title);
  section.appendChild(subtitle);
  container.appendChild(section);

  /* --------------------------------------------------
     MOTION PREFERENCE
  -------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const delay = prefersReducedMotion ? 800 : 2200;

  /* --------------------------------------------------
     SAFE AUTO-NAVIGATION
  -------------------------------------------------- */
  transitionTimer = window.setTimeout(() => {
    if (navigated) return;
    if (!container.contains(section)) return;

    navigated = true;
    navigate("dashboard");
  }, delay);

  /* --------------------------------------------------
     CLEANUP HOOK (ROUTER-SAFE)
  -------------------------------------------------- */
  return {
    destroy() {
      navigated = true;

      if (transitionTimer) {
        clearTimeout(transitionTimer);
        transitionTimer = null;
      }
    }
  };
}
