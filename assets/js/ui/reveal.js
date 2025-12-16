let revealObserver = null;

export function initReveal(root = document) {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // If motion is reduced, reveal everything immediately
  if (prefersReducedMotion) {
    root.querySelectorAll("[data-reveal]").forEach(el => {
      el.classList.add("revealed");
    });
    return;
  }

  // Guard: IntersectionObserver support
  if (!("IntersectionObserver" in window)) {
    root.querySelectorAll("[data-reveal]").forEach(el => {
      el.classList.add("revealed");
    });
    return;
  }

  // Disconnect old observer (SPA-safe)
  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  // Observe only unrevealed elements
  root.querySelectorAll("[data-reveal]:not(.revealed)").forEach(el => {
    revealObserver.observe(el);
  });
}
