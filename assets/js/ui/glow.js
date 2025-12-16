let glowEl = null;
let rafId = null;
let mouseMoveHandler = null;
let magneticTarget = null;

/**
 * Global Mouse Glow + Magnetic System
 * - SPA safe
 * - Performance safe
 * - Reduced-motion aware
 * - Single-init only
 */
export function initGlow() {
  if (glowEl) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Create glow element
  glowEl = document.createElement("div");
  glowEl.className = "mouse-glow";
  document.body.appendChild(glowEl);

  if (prefersReducedMotion) {
    glowEl.style.display = "none";
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  mouseMoveHandler = e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const target = e.target.closest("[data-magnetic]");
    if (target !== magneticTarget) {
      if (magneticTarget) {
        magneticTarget.style.transform = "translate(0,0)";
      }
      magneticTarget = target;
    }
  };

  window.addEventListener("mousemove", mouseMoveHandler);

  function animate() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glowEl.style.transform = `translate(${currentX - 160}px, ${currentY - 160}px)`;

    if (magneticTarget) {
      const rect = magneticTarget.getBoundingClientRect();
      const x = mouseX - (rect.left + rect.width / 2);
      const y = mouseY - (rect.top + rect.height / 2);
      magneticTarget.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    }

    rafId = requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Cleanup (router / teardown safe)
 */
export function destroyGlow() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (mouseMoveHandler) {
    window.removeEventListener("mousemove", mouseMoveHandler);
    mouseMoveHandler = null;
  }

  if (magneticTarget) {
    magneticTarget.style.transform = "translate(0,0)";
    magneticTarget = null;
  }

  if (glowEl) {
    glowEl.remove();
    glowEl = null;
  }
}
