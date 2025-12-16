import { navigate } from "../core/router.js";

let transitionTimer = null;

/**
 * Intro / Landing View
 * - Safe auto-transition
 * - Cleanup protected
 * - Motion-aware
 */
export function IntroView(container) {
  if (!container) return;

  // Clear container safely
  container.innerHTML = "";

  // Build DOM (no innerHTML race issues)
  const section = document.createElement("section");
  section.className = "intro";

  const title = document.createElement("h1");
  title.textContent = "Pranab Debnath";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Analytics • Data • Insights";

  section.appendChild(title);
  section.appendChild(subtitle);
  container.appendChild(section);

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const delay = prefersReducedMotion ? 800 : 2200;

  // Auto transition (guarded)
  transitionTimer = window.setTimeout(() => {
    // Only navigate if still on intro
    if (container.contains(section)) {
      navigate("dashboard");
    }
  }, delay);
}

/**
 * Cleanup hook (router may call later if extended)
 */
export function destroyIntroView() {
  if (transitionTimer) {
    clearTimeout(transitionTimer);
    transitionTimer = null;
  }
}
