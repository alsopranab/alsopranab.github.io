/**
 * Animate numeric count safely using requestAnimationFrame
 * SPA-safe, accessible, and smooth
 */
export function animateCount(el, to, duration = 800) {
  if (!el) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const target = Number(to);
  if (Number.isNaN(target)) {
    el.textContent = to;
    return;
  }

  // Respect reduced motion
  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }

  const startValue = Number(el.textContent) || 0;
  const startTime = performance.now();

  // Cancel any previous animation on this element
  if (el._countRAF) {
    cancelAnimationFrame(el._countRAF);
  }

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);

    const current = Math.round(
      startValue + (target - startValue) * eased
    );

    el.textContent = current;

    if (progress < 1) {
      el._countRAF = requestAnimationFrame(tick);
    } else {
      el.textContent = target;
      delete el._countRAF;
    }
  }

  el._countRAF = requestAnimationFrame(tick);
}
