(function heroToHeaderMorph() {
  const hero = document.querySelector(".hero-wrapper");
  const headerIdentity = document.querySelector(".header-identity");

  if (!hero || !headerIdentity) return;

  const maxScroll = 180;

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function onScroll() {
    const scrollY = clamp(window.scrollY, 0, maxScroll);
    const progress = scrollY / maxScroll;

    // HERO TRANSFORM
    const scale = 1 - progress * 0.25;
    const translateY = -progress * 60;

    hero.style.transform = `
      translateY(${translateY}px)
      scale(${scale})
    `;
    hero.style.opacity = 1 - progress * 0.6;

    // HEADER IDENTITY
    if (progress > 0.55) {
      headerIdentity.removeAttribute("data-hidden");
    } else {
      headerIdentity.setAttribute("data-hidden", "");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
})();
