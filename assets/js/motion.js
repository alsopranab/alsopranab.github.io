/* =====================================================
   MOTION & INTERACTION LAYER
   macOS Dynamic Island · Buttery · SPA Safe
===================================================== */

/* =====================================================
   1. GLOBAL STATE
===================================================== */

let fadeObserver = null;
let lastScrollY = 0;
let headerVisible = true;
let scrollTicking = false;

/* =====================================================
   2. SCROLL CONTROL
   Instant on route change (no nausea)
===================================================== */
function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  lastScrollY = 0;
}

/* =====================================================
   3. DYNAMIC ISLAND HEADER
   - Hide on scroll down
   - Show on scroll up
   - Always visible near top
===================================================== */
function setupDynamicHeader() {
  const header = document.querySelector(".dynamic-header");
  if (!header) return;

  // SPA-safe: bind once
  if (header.dataset.bound === "true") return;
  header.dataset.bound = "true";

  // Ensure initial visible state
  showHeader(header);

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;

    scrollTicking = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;

      // Always show near top
      if (currentY < 40) {
        showHeader(header);
        lastScrollY = currentY;
        scrollTicking = false;
        return;
      }

      // Scroll down → hide
      if (currentY > lastScrollY + 10 && headerVisible) {
        hideHeader(header);
      }

      // Scroll up → show
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
   Native macOS press feel
===================================================== */
function enhanceButtons() {
  document.querySelectorAll("button").forEach(btn => {
    if (btn.dataset.enhanced === "true") return;
    btn.dataset.enhanced = "true";

    btn.addEventListener("pointerdown", () => {
      btn.classList.add("pressed");
    });

    btn.addEventListener("pointerup", () => {
      btn.classList.remove("pressed");
    });

    btn.addEventListener("pointerleave", () => {
      btn.classList.remove("pressed");
    });
  });
}

/* =====================================================
   5. CARD INTERACTION
   Trackpad physics (charts excluded)
===================================================== */
function enhanceCards() {
  document.querySelectorAll(".card").forEach(card => {
    if (card.dataset.enhanced === "true") return;
    card.dataset.enhanced = "true";

    // 🚫 Never animate chart containers
    if (card.classList.contains("chart-card")) return;

    card.addEventListener("pointerdown", () => {
      card.classList.add("pressed");
    });

    card.addEventListener("pointerup", () => {
      card.classList.remove("pressed");
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("pressed");
    });
  });
}

/* =====================================================
   6. FADE-IN OBSERVER
   Sections only (SPA safe)
===================================================== */
function setupFadeObserver() {
  if (fadeObserver) {
    fadeObserver.disconnect();
    fadeObserver = null;
  }

  fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  document.querySelectorAll("section").forEach(section => {
    section.classList.remove("in-view");
    fadeObserver.observe(section);
  });
}

/* =====================================================
   7. MASTER RUNNER
   Called ONCE per route (SPA lifecycle)
===================================================== */
function runMotionEnhancements() {
  scrollToTop();
  setupDynamicHeader();
  enhanceButtons();
  enhanceCards();
  setupFadeObserver();
}
