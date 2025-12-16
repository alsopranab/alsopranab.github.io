let revealObserver = null;

/**
 * Scroll Reveal System
 * - SPA-safe
 * - Idempotent
 * - Reduced-motion aware
 * - Dynamic DOM safe
 */
export function initReveal(root = document) {
  if (!root) return;

  const elements = Array.from(
    root.querySelectorAll("[data-reveal]")
  );

  if (!elements.length) return;

  // Reduced motion support
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Always cleanup before re-init
  destroyReveal();

  // If motion disabled or unsupported → reveal instantly
  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach(el => el.classList.add("revealed"));
    return;
  }

  revealObserver = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  elements.forEach(el => {
    if (!el.classList.contains("revealed")) {
      revealObserver.observe(el);
    }
  });
}

/**
 * Cleanup observer
 */
export function destroyReveal() {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
}
