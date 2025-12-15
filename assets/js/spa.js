/* =====================================================
   SPA ROUTER & LIFECYCLE CONTROLLER
   STABLE · MOTION-SAFE · SCROLL-AWARE
===================================================== */

/* =====================================================
   1. ROOT
===================================================== */
const app = document.getElementById("app");

/* =====================================================
   2. ROUTE MAP
===================================================== */
const routes = {
  "/": () => window.renderHome?.(),
  "/dashboard": () => window.renderDashboard?.(),
  "/funnels": () => window.renderFunnels?.(),
  "/projects": () => window.renderProjects?.(),
  "/project": q => window.renderProject?.(q),
  "/learnings": () => window.renderLearnings?.(),
  "/contacts": () => window.renderContacts?.()
};

/* =====================================================
   3. NAVIGATION CORE
===================================================== */
function navigate() {
  if (!app) return;

  const hash = location.hash || "#/";
  const [path, query] = hash.replace("#", "").split("?");

  /* ---------------------
     HARD RESET
     (NO GHOST DOM)
  --------------------- */
  app.classList.remove("fade-in");
  app.innerHTML = "";

  const view = routes[path];

  if (!view) {
    render404();
    return;
  }

  try {
    /* ---------------------
       1️⃣ RENDER VIEW
       (SYNC HTML INJECTION)
    --------------------- */
    view(query);

    /* ---------------------
       2️⃣ RENDER CHARTS
       (AFTER DOM EXISTS)
    --------------------- */
    if (
      (path === "/dashboard" || path === "/") &&
      typeof window.renderCharts === "function"
    ) {
      requestAnimationFrame(() => {
        window.renderCharts();
      });
    }

    /* ---------------------
       3️⃣ RUN MOTION ENHANCEMENTS
       (NON-LAYOUT AFFECTING)
    --------------------- */
    if (typeof window.runMotionEnhancements === "function") {
      requestAnimationFrame(() => {
        window.runMotionEnhancements();
      });
    }

    /* ---------------------
       4️⃣ SCROLL REVEAL (CRITICAL)
       (AFTER FINAL DOM)
    --------------------- */
    if (typeof window.initScrollReveal === "function") {
      requestAnimationFrame(() => {
        window.initScrollReveal();
      });
    }

    /* ---------------------
       5️⃣ APP FADE-IN
       (LAST PAINT)
    --------------------- */
    requestAnimationFrame(() => {
      app.classList.add("fade-in");
    });

  } catch (err) {
    console.error(err);
    renderError(err);
  }
}

/* =====================================================
   4. FALLBACK VIEWS
===================================================== */
function render404() {
  app.innerHTML = `
    <section>
      <h1>404</h1>
      <p class="muted">The page you are looking for does not exist.</p>
    </section>
  `;
}

function renderError(err) {
  app.innerHTML = `
    <section>
      <h1>Runtime Error</h1>
      <pre>${err.message}</pre>
    </section>
  `;
}

/* =====================================================
   5. INITIALIZATION
===================================================== */
window.addEventListener("load", navigate);
window.addEventListener("hashchange", navigate);
