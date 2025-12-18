/**
 * UI Motion Engine — Apple Style
 * Handles:
 * - Header auto-hide
 * - Hero → header morph
 * - Section reveal
 * - Resume modal
 */

(() => {
  const header = document.getElementById("site-header");
  const hero = document.getElementById("hero-section");

  if (!header || !hero) return;

  let lastY = window.scrollY;
  let ticking = false;

  /* =============================
     HEADER AUTO-HIDE
  ============================= */
  function handleHeaderScroll(y) {
    if (y > lastY && y > 120) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
    lastY = y;
  }

  /* =============================
     HERO → HEADER MORPH
  ============================= */
  function handleHeroMorph(y) {
    const heroHeight = hero.offsetHeight || 1;
    const progress = Math.min(y / heroHeight, 1);

    hero.style.setProperty("--hero-progress", progress);
    header.style.setProperty("--hero-progress", progress);
  }

  /* =============================
     SCROLL LOOP
  ============================= */
  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleHeaderScroll(y);
        handleHeroMorph(y);
        ticking = false;
      });
      ticking = true;
    }
  });

  /* =============================
     SECTION REVEAL
  ============================= */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("section-visible");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("section.omniverse-section")
    .forEach(s => revealObserver.observe(s));

  /* =============================
     RESUME MODAL
  ============================= */
  document.addEventListener("click", e => {
    const trigger = e.target.closest("[data-action='resume']");
    if (!trigger) return;

    e.preventDefault();

    const modal = document.createElement("div");
    modal.className = "resume-modal";
    modal.innerHTML = `
      <div class="resume-sheet">
        <h3>Resume</h3>
        <p>Resume is maintained on LinkedIn for authenticity.</p>
        <a href="https://linkedin.com/in/alsopranab"
           target="_blank"
           class="resume-open">
          Open LinkedIn Resume →
        </a>
        <button class="resume-close">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() =>
      modal.classList.add("active")
    );

    modal.addEventListener("click", e => {
      if (
        e.target.classList.contains("resume-modal") ||
        e.target.classList.contains("resume-close")
      ) {
        modal.classList.remove("active");
        setTimeout(() => modal.remove(), 300);
      }
    });
  });

})();
