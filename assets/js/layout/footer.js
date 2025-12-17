/**
 * Footer Layout Controller
 * ------------------------
 * Renders:
 * - Contact email
 * - Social links
 * - Copyright
 *
 * Fully data-driven.
 */

(async function renderFooter() {
  const footerEl = document.getElementById("site-footer");
  if (!footerEl) return;

  const contact = await DataService.getContact();
  const socials = await DataService.getSocials();

  if (!contact) return;

  const socialLinks = socials?.socials
    ?.map(
      (s) => `
      <a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">
        <span class="icon icon-${s.icon}"></span>
      </a>
    `
    )
    .join("");

  const year = new Date().getFullYear();

  footerEl.innerHTML = `
    <div class="footer-container">

      <div class="footer-contact">
        <a href="mailto:${contact.email}">
          ${contact.email}
        </a>
      </div>

      <div class="footer-socials">
        ${socialLinks || ""}
      </div>

      <div class="footer-meta">
        © ${year} ${contact.title}. All rights reserved.
      </div>

    </div>
  `;
})();
