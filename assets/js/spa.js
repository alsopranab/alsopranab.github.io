/* =====================================================
   SPA ROUTER & LIFECYCLE CONTROLLER
   Clean · Predictable · Motion-Aware
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
   INTERNAL STATE
===================== */
let isNavigating = false;

/* =====================
   CORE NAVIGATION
===================== */
function navigate() {
  if (!app || isNavigating) return;

  isNavigating = true;

  const hash = location.hash || "#/";
  const [path, query] = hash.replace("#", "").split("?");

  // Fade out old view
  app.classList.remove("fade-in");

  // Allow CSS transition to complete
  requestAnimationFrame(() => {
    setTimeout(() => {
      // Hard cleanup
      app.innerHTML = "";

      const view = routes[path];

      if (!view) {
        render404();
        isNavigating = false;
        return;
      }

      try {
        // Render view
        view(query);

        // Run motion & interactions (ONCE per route)
        if (typeof runMotionEnhancements === "function") {
          runMotionEnhancements();
        }

        // Render charts only if dashboard exists
        if (
          path === "/dashboard" &&
          typeof renderCharts === "function"
        ) {
          renderCharts();
        }

        // Fade in new view
        requestAnimationFrame(() => {
          app.classList.add("fade-in");
          isNavigating = false;
        });

      } catch (err) {
        console.error(err);
        renderError(err);
        isNavigating = false;
      }

    }, 120); // intentional, smooth transition
  });
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
      <h1>Something went wrong</h1>
      <pre>${err.message}</pre>
    </section>
  `;
}

/* =====================
   INITIALIZE
===================== */
window.addEventListener("load", () => {
  navigate();
});

window.addEventListener("hashchange", () => {
  navigate();
});
