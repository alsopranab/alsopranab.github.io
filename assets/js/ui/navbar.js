import { navigate } from "../core/router.js";
import { CONFIG } from "../core/config.js";

const NAV_ITEMS = [
  { label: "Dashboard", route: "dashboard" },
  { label: "Projects", route: "projects" },
  { label: "Learnings", route: "learnings" },
  { label: "Analytics", route: "analytics" },
  { label: "Profiles", route: "profiles" }
];

export function renderNavbar(container) {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <div class="nav-brand">
      <strong>${CONFIG.owner.name}</strong>
      <span>${CONFIG.owner.designation}</span>
    </div>
    <ul class="nav-links">
      ${NAV_ITEMS.map(
        i => `<li data-route="${i.route}">${i.label}</li>`
      ).join("")}
    </ul>
  `;

  nav.querySelectorAll("[data-route]").forEach(item => {
    item.onclick = () => navigate(item.dataset.route);
  });

  container.prepend(nav);
}

export function setActiveRoute(route) {
  document.querySelectorAll(".nav-links li").forEach(li => {
    li.classList.toggle("active", li.dataset.route === route);
  });
}
