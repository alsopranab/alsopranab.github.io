/**
 * Licenses & Certifications Section Renderer
 * ------------------------------------------
 * Input  : sectionElement.dataset.source (JSON string)
 * Output : Injected HTML
 * Rules  :
 * - No fetch
 * - No styling
 * - No global state
 */

(function renderLicensesSection() {
  const section = document.getElementById("licenses-section");
  if (!section || !section.dataset.source) return;

  let data;
  try {
    data = JSON.parse(section.dataset.source);
  } catch {
    console.error("[LicensesRenderer] Invalid JSON source");
    return;
  }

  const itemsHTML = (data.licenses || [])
    .map(
      (lic) => `
        <div class="license-card">
          <img
            src="${lic.image}"
            alt="${lic.title}"
            class="license-image"
          />

          <div class="license-meta">
            <h3 class="license-title">${lic.title}</h3>
            <span class="license-issuer">${lic.issuer}</span>
            <span class="license-date">${lic.issueDate}</span>

            ${
              lic.credentialUrl
                ? `<a href="${lic.credentialUrl}" target="_blank" rel="noopener">
                    View Credential
                   </a>`
                : ""
            }
          </div>
        </div>
      `
    )
    .join("");

  section.innerHTML = `
    <div class="licenses-wrapper">
      <h2 class="licenses-title">${data.sectionTitle}</h2>

      <div class="licenses-grid">
        ${itemsHTML}
      </div>
    </div>
  `;
})();
