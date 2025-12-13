const app = document.getElementById("app");

/* =========================
   ROUTES (SINGLE SOURCE)
========================= */
const routes = {
  "/": renderHome,
  "/dashboard": renderDashboard,
  "/funnels": renderFunnels,
  "/projects": renderProjects,
  "/project": renderProject,
  "/learnings": renderLearnings,
  "/contacts": renderContacts,
  "/resume": renderResume
};

/* =========================
   NAVIGATION HANDLER
========================= */
function navigate() {
  const hash = location.hash || "#/";
  const [path, query] = hash.replace("#", "").split("?");

  const view = routes[path];

  // Remove animation before render
  app.classList.remove("fade-in");

  // Ensure clean render cycle
  requestAnimationFrame(() => {
    app.innerHTML = "";

    if (!view) {
      app.innerHTML = `
        <section>
          <h1>404</h1>
          <p>Page not found</p>
        </section>
      `;
      app.classList.add("fade-in");
      return;
    }

    // Render view
    view(query || "");

    // Re-apply animation
    app.classList.add("fade-in");

    // Run motion hooks safely
    if (typeof runMotionEnhancements === "function") {
      runMotionEnhancements();
    }
  });
}

/* =========================
   LISTENERS
========================= */
window.addEventListener("load", navigate);
window.addEventListener("hashchange", navigate);
