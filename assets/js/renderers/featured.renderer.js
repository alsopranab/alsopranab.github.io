/**
 * Featured Projects Section Renderer
 * ----------------------------------
 * Input  : sectionElement.dataset.source (JSON string)
 * Output : Injected HTML
 * Rules  :
 * - No fetch
 * - No styling
 * - No global state
 * - Layout alternation driven by data
 */

(function renderFeaturedSection() {
  const section = document.getElementById("featured-section");
  if (!section || !section.dataset.source) return;

  let data;
  try {
    data = JSON.parse(section.dataset.source);
  } catch {
    console.error("[FeaturedRenderer] Invalid JSON source");
    return;
  }

  const projectsHTML = (data.projects || [])
    .map(
      (proj) => `
        <div
          class="featured-item"
          data-alignment="${proj.alignment}"
          data-id="${proj.id}"
        >
          <div class="featured-image">
            <img src="${proj.image}" alt="${proj.title}" />
          </div>

          <div class="featured-content">
            <h3 class="featured-title">${proj.title}</h3>

            <p class="featured-description">
              ${proj.description}
            </p>

            <div class="featured-links">
              ${
                proj.links?.live
                  ? `<a href="${proj.links.live}" target="_blank" rel="noopener">Live</a>`
                  : ""
              }
              ${
                proj.links?.github
                  ? `<a href="${proj.links.github}" target="_blank" rel="noopener">GitHub</a>`
                  : ""
              }
              ${
                proj.links?.caseStudy
                  ? `<a href="${proj.links.caseStudy}" target="_blank" rel="noopener">Case Study</a>`
                  : ""
              }
            </div>
          </div>
        </div>
      `
    )
    .join("");

  section.innerHTML = `
    <div class="featured-wrapper">
      <h2 class="featured-title">${data.sectionTitle}</h2>

      <div class="featured-list">
        ${projectsHTML}
      </div>
    </div>
  `;
})();
