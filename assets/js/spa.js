/* =====================================================
   SPA ROUTER & LIFECYCLE CONTROLLER
   macOS-STYLE · STABLE · NO FLICKER · MOTION-SAFE
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
     HARD RESET (NO GHOSTS)
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
       (SYNC, NO MOTION)
    --------------------- */
    view(query);

    /* ---------------------
       2️⃣ RENDER CHARTS
       (AFTER DOM PAINT)
    --------------------- */
    if (
      (path === "/dashboard" || path === "/") &&
      typeof renderCharts === "function"
    ) {
      requestAnimationFrame(() => {
        renderCharts();
      });
    }

    /* ---------------------
       3️⃣ RUN MOTION
       (AFTER FINAL DOM)
    --------------------- */
    if (typeof runMotionEnhancements === "function") {
      requestAnimationFrame(() => {
        runMotionEnhancements();
      });
    }

    /* ---------------------
       4️⃣ FADE-IN
       (LAST PAINT ONLY)
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
