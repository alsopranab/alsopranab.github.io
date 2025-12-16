// --------------------------------------------------
// APPLICATION ENTRY (FINAL)
// --------------------------------------------------
import { initApp } from "./app.js";
import { registerRoute, initRouter } from "./core/router.js";

// Views (explicit & safe)
import { IntroView } from "./views/intro.js";
import { DashboardView } from "./views/dashboard.js";
import { ProjectsView } from "./views/projects.js";
import { ProjectView } from "./views/project.js";
import { LearningsView } from "./views/learnings.js";
import { AnalyticsView } from "./views/analytics.js";
import { ProfilesView } from "./views/profiles.js";

// --------------------------------------------------
// BOOT SEQUENCE (DETERMINISTIC)
// --------------------------------------------------
console.log("[MAIN] Starting application");

try {
  // 1. Init app shell + global effects
  initApp();

  // 2. Register routes (explicit, no magic)
  registerRoute("intro", IntroView);
  registerRoute("dashboard", DashboardView);
  registerRoute("projects", ProjectsView);
  registerRoute("project", ProjectView);
  registerRoute("learnings", LearningsView);
  registerRoute("analytics", AnalyticsView);
  registerRoute("profiles", ProfilesView);

  // 3. Start router
  initRouter("intro");

  console.log("[MAIN] Application ready");
} catch (error) {
  console.error("[MAIN] Fatal error", error);

  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
      <div style="padding:40px;color:white">
        <h1>Application failed to start</h1>
        <p>Check console for details.</p>
      </div>
    `;
  }
}
