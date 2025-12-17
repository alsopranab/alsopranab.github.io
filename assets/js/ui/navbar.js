import { navigate } from "../core/router.js";
import { CONFIG } from "../core/config.js";

const NAV_ITEMS = [
  { label: "Dashboard", route: "dashboard" },
  { label: "Projects", route: "projects" },
  { label: "Learnings", route: "learnings" },
  { label: "Analytics", route: "analytics" }
];

let navbarMounted = false;

/**
 * Render navbar once (SPA-safe)
 */
export function renderNavbar(container = document.body) {
  if (navbarMounted) return;
  navbarMounted = true;

  const nav = document.createElement("nav");
  nav.setAttribute("role", "navigation");

  nav.innerHTML = `
    <div class="nav-brand">
      <strong>${CONFIG?.owner?.name || ""}</strong>
      <span>${CONFIG?.owner?.designation || ""}</span>
    </div>

    <ul class="nav-links" role="menubar">
      ${NAV_ITEMS.map(
        item => `
          <li
            role="menuitem"
            tabindex="0"
            data-route="${item.route}"
          >
            ${item.label}
          </li>
        `
      ).join("")}
    </ul>
  `;

  /* Event delegation (clean + fast) */
  nav.addEventListener("click", e => {
    const item = e.target.closest("[data-route]");
    if (!item) return;

    const route = item.dataset.route;
    if (route) navigate(route);
  });

  /* Keyboard navigation (accessibility) */
  nav.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const item = e.target.closest("[data-route]");
    if (!item) return;

    const route = item.dataset.route;
    if (route) navigate(route);
  });

  container.prepend(nav);

  /* Sync active route */
  syncActiveRoute();
  window.addEventListener("popstate", syncActiveRoute);
}

/**
 * Set active nav item safely
 */
export function setActiveRoute(route) {
  document.querySelectorAll(".nav-links li").forEach(li => {
    li.classList.toggle(
      "active",
      li.dataset.route === route
    );
  });
}

/**
 * Sync active state with URL hash (SPA-safe)
 */
function syncActiveRoute() {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    setActiveRoute(hash);
  }
}
