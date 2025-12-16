import { navigate } from "../core/router.js";

/**
 * Intro / Landing View
 * - Router-compatible cleanup
 * - Motion-aware
 * - Impossible to double-navigate
 */
export function IntroView(container) {
  if (!container) return;

  let transitionTimer = null;

  // Clear container
  container.innerHTML = "";

  // Build DOM safely
  const section = document.createElement("section");
  section.className = "intro";

  const title = document.createElement("h1");
  title.textContent = "Pranab Debnath";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Analytics • Data • Insights";

  section.appendChild(title);
  section.appendChild(subtitle);
  container.appendChild(section);

  // Motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const delay = prefersReducedMotion ? 800 : 2200;

  // Auto transition (guarded)
  transitionTimer = window.setTimeout(() => {
    if (container.contains(section)) {
      navigate("dashboard");
    }
  }, delay);

  // Router cleanup hook (IMPORTANT)
  return {
    destroy() {
      if (transitionTimer) {
        clearTimeout(transitionTimer);
        transitionTimer = null;
      }
    }
  };
}
