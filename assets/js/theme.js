(function () {
  const root = document.documentElement;
  const btn = () => document.getElementById("themeToggle");

  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  function applyTheme(mode) {
    if (mode === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", mode);
    }
    localStorage.setItem("theme", mode);
  }

  function initTheme() {
    const saved = localStorage.getItem("theme") || "system";
    applyTheme(saved);
  }

  function toggleTheme() {
    const current = localStorage.getItem("theme") || "system";
    const next = current === "dark" ? "light" : current === "light" ? "system" : "dark";
    applyTheme(next);
  }

  window.addEventListener("DOMContentLoaded", () => {
    initTheme();
    btn()?.addEventListener("click", toggleTheme);
  });
})();
