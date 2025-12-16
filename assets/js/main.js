import { registerRoute, navigate } from "./core/router.js";
import { IntroView } from "./views/intro.js";
import { DashboardView } from "./views/dashboard.js";

registerRoute("intro", IntroView);
registerRoute("dashboard", DashboardView);

navigate("intro");
