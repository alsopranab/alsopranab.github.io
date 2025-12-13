/* =====================================================
   SPA ROUTER & LIFECYCLE CONTROLLER
   macOS-STYLE · STABLE · NO FLICKER
===================================================== */

const app = document.getElementById("app");

/* =====================
   ROUTE MAP
===================== */
const routes = {
  "/": () => window.renderHome?.(),
  "/dashboard": () => window.renderDashboard?.(),
  "/funnels": () => window.renderFunnels?.(),
  "/projects": () => window.renderProjects?.(),
  "/project": q => window.renderProject?.(q),
  "/learnings": () => window.renderLearnings?.(),
  "/contacts": () => window.renderContacts?.()
};

/* =====================
   CORE NAVIGATION
===================== */
function navigate() {
  if (!app) return;

  const hash = location.hash || "#/";
  const [path, query] = hash.replace("#", "").split("?");

  // HARD RESET — prevents layout ghosts
  app.classList.remove("fade-in");
  app.innerHTML = "";

  const view = routes[path];

  if (!view) {
    render404();
    return;
  }

  try {
    // 1️⃣ Render content synchronously
    view(query);

    // 2️⃣ Charts ONLY after DOM is stable
    if (path === "/dashboard" && typeof renderCharts === "function") {
      requestAnimationFrame(() => {
        renderCharts();
      });
    }

    // 3️⃣ Motion AFTER content is final
    if (typeof runMotionEnhancements === "function") {
      requestAnimationFrame(() => {
        runMotionEnhancements();
      });
    }

    // 4️⃣ Fade-in LAST (single paint)
    requestAnimationFrame(() => {
      app.classList.add("fade-in");
    });

  } catch (err) {
    console.error(err);
    renderError(err);
  }
}

/* =====================
   FALLBACK VIEWS
===================== */
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

/* =====================
   INITIALIZE
===================== */
window.addEventListener("load", navigate);
window.addEventListener("hashchange", navigate);
