/**
 * Home Page Controller (FINAL — SCHEMA & RENDER SAFE)
 * ==================================================
 * Responsibilities:
 * - Runs after DOM is ready
 * - Loads required JSONs
 * - Attaches data ONLY if valid
 * - Fires home:ready deterministically
 *
 * NO rendering logic here.
 */

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
     DATA LOADING
  ========================= */
  console.info("[HomePage] Loading data…");

  const results = await Promise.allSettled([
    DataService.getProfile(),     // REQUIRED
    DataService.getExperience(),
    DataService.getFeatured(),
    DataService.getProjects(),
    DataService.getEducation(),
    DataService.getLicenses(),
    DataService.getContact()
  ]);

  const [
    profileData,
    experienceData,
    featuredData,
    projectsData,
    educationData,
    licensesData,
    contactData
  ] = normalizeResults(results);

  /* =========================
     HARD REQUIREMENT CHECK
  ========================= */
  if (!profileData?.identity) {
    console.error("[HomePage] profile.json missing or invalid — aborting render");
    console.groupEnd();
    return;
  }

  /* =========================
     DATA ATTACHMENT (SAFE)
  ========================= */
  attach(sections.hero, profileData);
  attach(sections.experience, experienceData);
  attach(sections.featured, featuredData);
  attach(sections.projects, projectsData);
  attach(sections.education, educationData);
  attach(sections.licenses, licensesData);
  attach(sections.contact, contactData);

  console.info("[HomePage] Data attached successfully");
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
      console.warn(`[HomePage] Missing section in DOM: ${key}`);
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
