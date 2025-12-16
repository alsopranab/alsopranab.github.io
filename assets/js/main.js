// --------------------------------------------------
// SAFE BOOTSTRAP
// --------------------------------------------------
console.log("[MAIN] Booting application...");

let initAppFn;
let registerRouteFn;
let initRouterFn;

try {
  ({ initApp: initAppFn } = await import("./app.js"));
  ({ registerRoute: registerRouteFn, initRouter: initRouterFn } =
    await import("./core/router.js"));
} catch (err) {
  console.error("[MAIN] Core import failed", err);
  document.getElementById("app").innerHTML =
    "<h1 style='color:white;padding:40px'>Core load failed</h1>";
  throw err;
}

// --------------------------------------------------
// INIT APP SHELL
// --------------------------------------------------
try {
  initAppFn();
  console.log("[MAIN] App initialized");
} catch (err) {
  console.error("[MAIN] initApp failed", err);
  throw err;
}

// --------------------------------------------------
// REGISTER ROUTES (SAFE)
// --------------------------------------------------
async function safeRegister(name, path) {
  try {
    const mod = await import(path);
    registerRouteFn(name, mod[Object.keys(mod)[0]]);
    console.log(`[MAIN] Route registered: ${name}`);
  } catch (err) {
    console.error(`[MAIN] Failed to register route: ${name}`, err);
  }
}

await safeRegister("intro", "./views/intro.js");
await safeRegister("dashboard", "./views/dashboard.js");
await safeRegister("projects", "./views/projects.js");
await safeRegister("project", "./views/project.js");
await safeRegister("learnings", "./views/learnings.js");
await safeRegister("analytics", "./views/analytics.js");
await safeRegister("profiles", "./views/profiles.js");

// --------------------------------------------------
// START ROUTER
// --------------------------------------------------
try {
  initRouterFn("intro");
  console.log("[MAIN] Router started");
} catch (err) {
  console.error("[MAIN] Router failed", err);
}

// --------------------------------------------------
// PLACEHOLDERS (DO NOT ACTIVATE YET)
// --------------------------------------------------
// mouseGlow()
// magneticButtons()
// scrollReveal()
// charts()
// These will be added AFTER everything renders
