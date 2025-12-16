let glowEl = null;
let rafId = null;

/**
 * Initialize mouse glow + magnetic effects
 * Safe to call once from app shell
 */
export function initGlow() {
  if (glowEl) return; // already initialized

  glowEl = document.createElement("div");
  glowEl.className = "mouse-glow";
  document.body.appendChild(glowEl);

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    glowEl.style.display = "none";
    return;
  }

  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    glowEl.style.transform = `translate(${currentX}px, ${currentY}px)`;

    rafId = requestAnimationFrame(animate);
  }

  animate();

  initMagnetic();
}

/**
 * Magnetic hover effect (buttons, links)
 */
function initMagnetic() {
  document.addEventListener("mousemove", e => {
    const target = e.target.closest("[data-magnetic]");
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    target.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  document.addEventListener("mouseleave", e => {
    const target = e.target.closest("[data-magnetic]");
    if (!target) return;
    target.style.transform = "translate(0,0)";
  });
}

/**
 * Cleanup (not required now, but permanent-ready)
 */
export function destroyGlow() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (glowEl) {
    glowEl.remove();
    glowEl = null;
  }
}
