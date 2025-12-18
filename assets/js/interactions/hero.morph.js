/**
 * Hero → Header Morph Interaction (Apple-style)
 * =============================================
 * - Hero identity shrinks into header identity
 * - Runs only after header + hero are ready
 * - No layout shift
 * - No DOM mutation of renderer output
 */

(function () {
  let heroEl, headerIdentity;
  let hasMorphed = false;

  function init() {
    heroEl = document.querySelector(".hero-wrapper");
    headerIdentity = document.querySelector(".header-identity");

    if (!heroEl || !headerIdentity) return;

    // Hide header identity initially
    headerIdentity.style.opacity = "0";
    headerIdentity.style.transform = "translateY(6px)";
    headerIdentity.style.transition = "opacity 240ms ease, transform 240ms ease";

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function onScroll() {
    if (hasMorphed) return;

    const rect = heroEl.getBoundingClientRect();

    // Trigger point: hero starts leaving viewport
    if (rect.bottom < window.innerHeight * 0.55) {
      morph();
      hasMorphed = true;
    }
  }

  function morph() {
    const heroTitle = heroEl.querySelector("h1");
    const heroTagline = heroEl.querySelector(".hero-tagline");

    if (!heroTitle) return;

    const clone = document.createElement("div");
    clone.className = "hero-morph-clone";
    clone.innerHTML = `
      <div class="hero-morph-name">${heroTitle.textContent}</div>
      ${
        heroTagline
          ? `<div class="hero-morph-role">${heroTagline.textContent}</div>`
          : ""
      }
    `;

    document.body.appendChild(clone);

    const from = heroTitle.getBoundingClientRect();
    const to = headerIdentity.getBoundingClientRect();

    clone.style.position = "fixed";
    clone.style.left = `${from.left}px`;
    clone.style.top = `${from.top}px`;
    clone.style.width = `${from.width}px`;
    clone.style.zIndex = "999";
    clone.style.transition =
      "transform 520ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease";

    const scale =
      headerIdentity.offsetHeight / heroTitle.offsetHeight;

    const dx = to.left - from.left;
    const dy = to.top - from.top;

    requestAnimationFrame(() => {
      clone.style.transform = `
        translate(${dx}px, ${dy}px)
        scale(${scale})
      `;
      clone.style.opacity = "0";
    });

    setTimeout(() => {
      clone.remove();
      headerIdentity.style.opacity = "1";
      headerIdentity.style.transform = "translateY(0)";
    }, 520);
  }

  window.addEventListener("header:ready", init);
})();
