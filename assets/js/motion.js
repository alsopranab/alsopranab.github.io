/* =====================================================
   MOTION & INTERACTION LAYER
   macOS Dynamic Island · Buttery · SPA Safe
===================================================== */

/* =====================================================
   1. GLOBAL STATE
===================================================== */

let revealObserver = null;
let lastScrollY = 0;
let headerVisible = true;
let scrollTicking = false;

/* =====================================================
   2. SCROLL CONTROL
===================================================== */
function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  lastScrollY = 0;
}

/* =====================================================
   3. DYNAMIC ISLAND HEADER
===================================================== */
function setupDynamicHeader() {
  const header = document.querySelector(".dynamic-header");
  if (!header) return;

  if (header.dataset.bound === "true") return;
  header.dataset.bound = "true";

  showHeader(header);

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;

      if (currentY < 40) {
        showHeader(header);
        lastScrollY = currentY;
        scrollTicking = false;
        return;
      }

      if (currentY > lastScrollY + 10 && headerVisible) {
        hideHeader(header);
      }

      if (currentY < lastScrollY - 10 && !headerVisible) {
        showHeader(header);
      }

      lastScrollY = currentY;
      scrollTicking = false;
    });
  });
}

function hideHeader(header) {
  header.style.transform = "translateX(-50%) translateY(-120%)";
  header.style.opacity = "0";
  headerVisible = false;
}

function showHeader(header) {
  header.style.transform = "translateX(-50%) translateY(0)";
  header.style.opacity = "1";
  headerVisible = true;
}

/* =====================================================
   4. BUTTON INTERACTION
===================================================== */
function enhanceButtons() {
  document.querySelectorAll("button").forEach(btn => {
    if (btn.dataset.enhanced === "true") return;
    btn.dataset.enhanced = "true";

    btn.addEventListener("pointerdown", () => btn.classList.add("pressed"));
    btn.addEventListener("pointerup", () => btn.classList.remove("pressed"));
    btn.addEventListener("pointerleave", () => btn.classList.remove("pressed"));
  });
}

/* =====================================================
   5. CARD INTERACTION
===================================================== */
function enhanceCards() {
  document.querySelectorAll(".card").forEach(card => {
    if (card.dataset.enhanced === "true") return;
    card.dataset.enhanced = "true";

    if (card.classList.contains("chart-card")) return;

    card.addEventListener("pointerdown", () => card.classList.add("pressed"));
    card.addEventListener("pointerup", () => card.classList.remove("pressed"));
    card.addEventListener("pointerleave", () => card.classList.remove("pressed"));
  });
}

/* =====================================================
   6. SCROLL REVEAL (CRITICAL FIX)
===================================================== */
function setupRevealObserver() {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  const targets = document.querySelectorAll(
    "section, .card, .project-card, .chart-card"
  );

  targets.forEach(el => {
    el.classList.remove("reveal");
    revealObserver.observe(el);
  });
}

/* =====================================================
   7. MASTER RUNNER
===================================================== */
function runMotionEnhancements() {
  scrollToTop();
  setupDynamicHeader();
  enhanceButtons();
  enhanceCards();
  setupRevealObserver();
}
