const root = document.documentElement;

function setTheme(mode) {
  if (mode === "system") {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", dark ? "dark" : "light");
  } else {
    root.setAttribute("data-theme", mode);
  }
  localStorage.setItem("theme", mode);
}

setTheme(localStorage.getItem("theme") || "system");
