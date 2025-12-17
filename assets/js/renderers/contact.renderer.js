/**
 * Contact Section Renderer
 * ------------------------
 * Input  : sectionElement.dataset.source (JSON string)
 * Output : Injected HTML
 * Rules  :
 * - No fetch
 * - No globals
 * - No styling
 * - No mutation outside section
 */

(function renderContactSection() {
  const section = document.getElementById("contact-section");
  if (!section || !section.dataset.source) return;

  let data;
  try {
    data = JSON.parse(section.dataset.source);
  } catch {
    console.error("[ContactRenderer] Invalid JSON source");
    return;
  }

  const socialsHTML = (data.socials || [])
    .map(
      (s) => `
        <a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">
          <span class="icon icon-${s.icon}"></span>
        </a>
      `
    )
    .join("");

  section.innerHTML = `
    <div class="contact-wrapper">
      <h2 class="contact-title">${data.title}</h2>

      <p class="contact-message">
        ${data.message}
      </p>

      <a href="mailto:${data.email}" class="contact-email">
        ${data.email}
      </a>

      <div class="contact-socials">
        ${socialsHTML}
      </div>
    </div>
  `;
})();
