const app = document.getElementById("app");

const routes = {
  "/": renderHome,
  "/projects": renderProjects,
  "/project": renderProject,
  "/learnings": renderLearnings,
  "/contacts": renderContacts
};

function navigate() {
  const hash = location.hash.slice(1) || "/";
  const [path, param] = hash.split("?");

  app.classList.remove("fade-in");
  setTimeout(() => {
    app.innerHTML = "";
    routes[path]?.(param);
    app.classList.add("fade-in");
  }, 120);
}

window.addEventListener("hashchange", navigate);
window.addEventListener("load", navigate);
