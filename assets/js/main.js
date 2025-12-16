// --------------------------------------------------
// APPLICATION ENTRY (TOP-LEVEL FINAL)
// --------------------------------------------------

import { initApp } from "./app.js";
import { registerRoute, initRouter } from "./core/router.js";
import { initProjectStore } from "./core/projectStore.js";

// Views
import { IntroView } from "./views/intro.js";
import { DashboardView } from "./views/dashboard.js";
import { ProjectsView } from "./views/projects.js";
import { ProjectView } from "./views/project.js";
import { LearningsView } from "./views/learnings.js";
import { AnalyticsView } from "./views/analytics.js";
import { ProfilesView } from "./views/profiles.js";

/**
 * Safe application bootstrap (FINAL)
 */
async function boot() {
  console.log("[MAIN] Boot sequence started");

  try {
    // 1️⃣ Init app shell (DOM + UI)
    initApp();

    // 2️⃣ Init project store (DATA MUST COME FIRST)
    await initProjectStore();

    // 3️⃣ Register routes (pure config)
    registerRoute("intro", IntroView);
    registerRoute("dashboard", DashboardView);
    registerRoute("projects", ProjectsView);
    registerRoute("project", ProjectView);
    registerRoute("learnings", LearningsView);
    registerRoute("analytics", AnalyticsView);
    registerRoute("profiles", ProfilesView);

    // 4️⃣ Start router (last)
    initRouter("intro");

    console.log("[MAIN] Application ready");
  } catch (err) {
    console.error("[MAIN] Fatal bootstrap error", err);

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
}

// --------------------------------------------------
// DOM READY GUARANTEE
// --------------------------------------------------
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
