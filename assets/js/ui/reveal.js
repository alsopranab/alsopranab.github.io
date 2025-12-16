let revealObserver = null;

/**
 * Initialize scroll reveal system
 * Safe for SPA, route changes, and re-initialization
 */
export function initReveal(root = document) {
  if (!root) return;

  const elements = Array.from(
    root.querySelectorAll("[data-reveal]:not(.revealed)")
  );

  if (!elements.length) return;

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Cleanup previous observer
  destroyReveal();

  // Reduced motion or no support → reveal immediately
  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach(el => el.classList.add("revealed"));
    return;
  }

  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        if (!el.classList.contains("revealed")) {
          el.classList.add("revealed");
        }

        revealObserver.unobserve(el);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  elements.forEach(el => revealObserver.observe(el));
}

/**
 * Destroy reveal observer
 * Call on route changes or app teardown
 */
export function destroyReveal() {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
}
