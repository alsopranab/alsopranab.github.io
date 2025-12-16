import { renderNavbar } from "./ui/navbar.js";
import { initReveal } from "./ui/reveal.js";

export function initApp() {
  const root = document.body;
  renderNavbar(root);

  // Scroll reveal
  setTimeout(initReveal, 300);
}
