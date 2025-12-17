/**
 * Home Page Controller (FINAL — RACE SAFE)
 * =======================================
 * Responsibilities:
 * - Runs deterministically after DOM is ready
 * - Loads all required data (bottom → top)
 * - Attaches data safely to DOM
 * - Emits lifecycle events for renderers
 *
 * No rendering logic lives here.
 */

/* ============================================================
   ENTRY POINT (FIXED)
   DOMContentLoaded cannot be missed
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  HomePageController().catch((err) => {
    console.error("[HomePage] Fatal initialization error", err);
  });
});

async function HomePageController() {
  console.group("[HomePage] Initialization");

  /* =========================
     SECTION REGISTRY
  ========================= */
  const sections = {
    hero: document.getElementById("hero-section"),
    experience: document.getElementById("experience-section"),
    featured: document.getElementById("featured-section"),
    projects: document.getElementById("projects-section"),
    education: document.getElementById("education-section"),
    licenses: document.getElementById("licenses-section"),
    contact: document.getElementById("contact-section")
  };

  validateSections(sections);

  /* =========================
     DATA LOADING (BOTTOM → TOP)
  ========================= */
  console.info("[HomePage] Loading data…");

  const results = await Promise.allSettled([
    DataService.getContact(),
    DataService.getLicenses(),
    DataService.getEducation(),
    DataService.getProjects(),
    DataService.getFeatured(),
    DataService.getExperience(),
    DataService.getProfile()
  ]);

  const [
    contactData,
    licensesData,
    educationData,
    projectsData,
    featuredData,
    experienceData,
    profileData
  ] = normalizeResults(results);

  /* =========================
     DATA ATTACHMENT
  ========================= */
  attach(sections.contact, contactData);
  attach(sections.licenses, licensesData);
  attach(sections.education, educationData);
  attach(sections.projects, projectsData);
  attach(sections.featured, featuredData);
  attach(sections.experience, experienceData);
  attach(sections.hero, profileData);

  console.info("[HomePage] Data attached");
  console.groupEnd();

  /* =========================
     LIFECYCLE EVENT
  ========================= */
  window.dispatchEvent(
    new CustomEvent("home:ready", {
      detail: { timestamp: Date.now() }
    })
  );
}

/* ============================================================
   HELPERS
============================================================ */
function validateSections(sections) {
  Object.entries(sections).forEach(([key, el]) => {
    if (!el) {
      console.warn(`[HomePage] Missing section: ${key}`);
    }
  });
}

function normalizeResults(results) {
  return results.map((res, idx) => {
    if (res.status === "fulfilled" && res.value) {
      return res.value;
    }
    console.warn(`[HomePage] Data source failed at index ${idx}`);
    return null;
  });
}

function attach(section, data) {
  if (!section || !data) return;
  try {
    section.dataset.source = JSON.stringify(data);
  } catch (err) {
    console.error("[HomePage] Failed to attach data", err);
  }
}
