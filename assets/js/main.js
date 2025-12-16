import { initApp } from "./app.js";
import { registerRoute, initRouter } from "./core/router.js";

import { IntroView } from "./views/intro.js";
import { DashboardView } from "./views/dashboard.js";
import { ProjectsView } from "./views/projects.js";
import { ProjectView } from "./views/project.js";
import { LearningsView } from "./views/learnings.js";
import { AnalyticsView } from "./views/analytics.js";
import { ProfilesView } from "./views/profiles.js";

// --------------------------------------------------
// App bootstrap (runs once)
// --------------------------------------------------
initApp();

// --------------------------------------------------
// Route registration (pure configuration)
// --------------------------------------------------
registerRoute("intro", IntroView);
registerRoute("dashboard", DashboardView);
registerRoute("projects", ProjectsView);
registerRoute("project", ProjectView);
registerRoute("learnings", LearningsView);
registerRoute("analytics", AnalyticsView);
registerRoute("profiles", ProfilesView);

// --------------------------------------------------
// Router initialization (single source of truth)
// --------------------------------------------------
initRouter("intro");
