/**
 * Education Section Renderer
 * --------------------------
 * Input  : sectionElement.dataset.source (JSON string)
 * Output : Injected HTML
 * Rules  :
 * - No fetch
 * - No styling
 * - No global state
 */

(function renderEducationSection() {
  const section = document.getElementById("education-section");
  if (!section || !section.dataset.source) return;

  let data;
  try {
    data = JSON.parse(section.dataset.source);
  } catch {
    console.error("[EducationRenderer] Invalid JSON source");
    return;
  }

  const educationHTML = (data.education || [])
    .map(
      (edu) => `
        <div class="education-item">
          <h3 class="education-institution">${edu.institution}</h3>

          <div class="education-meta">
            <span class="education-degree">
              ${edu.degree}${edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}
            </span>
            <span class="education-duration">
              ${edu.startDate} – ${edu.endDate}
            </span>
            ${
              edu.location
                ? `<span class="education-location">${edu.location}</span>`
                : ""
            }
          </div>

          ${
            edu.description
              ? `<p class="education-description">${edu.description}</p>`
              : ""
          }

          ${
            edu.subjects && edu.subjects.length
              ? `
                <ul class="education-subjects">
                  ${edu.subjects
                    .map((subj) => `<li>${subj}</li>`)
                    .join("")}
                </ul>
              `
              : ""
          }
        </div>
      `
    )
    .join("");

  section.innerHTML = `
    <div class="education-wrapper">
      <h2 class="education-title">${data.sectionTitle}</h2>

      <div class="education-list">
        ${educationHTML}
      </div>
    </div>
  `;
})();
