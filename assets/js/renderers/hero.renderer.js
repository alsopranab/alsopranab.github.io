/**
 * Hero / Intro Section Renderer
 * -----------------------------
 * Input  : sectionElement.dataset.source (JSON string)
 * Output : Injected HTML
 * Rules  :
 * - No fetch
 * - No styling
 * - No global state
 * - Company text hidden, logo visible
 */

(function renderHeroSection() {
  const section = document.getElementById("hero-section");
  if (!section || !section.dataset.source) return;

  let data;
  try {
    data = JSON.parse(section.dataset.source);
  } catch {
    console.error("[HeroRenderer] Invalid JSON source");
    return;
  }

  section.innerHTML = `
    <div class="hero-wrapper">
      
      <div class="hero-identity">
        <h1 class="hero-name">${data.name}</h1>
        <p class="hero-tagline">${data.tagline}</p>
      </div>

      ${
        data.currentRole
          ? `
            <div class="hero-current-role">
              <span class="sr-only">
                ${data.currentRole.designation} at ${data.currentRole.company}
              </span>

              ${
                data.currentRole.companyLogo
                  ? `
                    <img
                      src="${data.currentRole.companyLogo}"
                      alt="${data.currentRole.company}"
                      class="hero-company-logo"
                    />
                  `
                  : ""
              }
            </div>
          `
          : ""
      }

    </div>
  `;
})();
