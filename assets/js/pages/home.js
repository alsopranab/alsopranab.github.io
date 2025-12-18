/**
 * Home Page Controller
 * ====================
 * Responsibilities:
 * - Runs only after `app:ready`
 * - Loads all required JSON via DataService
 * - Attaches data to DOM sections
 * - Emits `home:ready` exactly once
 */

window.addEventListener("app:ready", () => {
  HomePageController().catch(err => {
    console.error("[HomePage] Fatal initialization error", err);
  });
});

async function HomePageController() {
  console.group("[HomePage] Initialization");

  /* -------------------------------------------------
     Section references (must match index.html IDs)
  ------------------------------------------------- */
  const sections = {
    hero: document.getElementById("hero"),
    experience: document.getElementById("experience"),
    featured: document.getElementById("featured"),
    projects: document.getElementById("projects"),
    education: document.getElementById("education"),
    licenses: document.getElementById("licenses"),
    contact: document.getElementById("contact")
  };

  validateSections(sections);

  console.info("[HomePage] Loading data…");

  /* -------------------------------------------------
     Load all page data (partial failure safe)
  ------------------------------------------------- */
  const results = await Promise.allSettled([
    DataService.getProfile(),
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

  /* -------------------------------------------------
     Profile is mandatory for homepage
  ------------------------------------------------- */
  if (!profileData || !profileData.identity) {
    console.error("[HomePage] profile.json missing or invalid");
    console.groupEnd();
    return;
  }

  /* -------------------------------------------------
     Attach data to sections
  ------------------------------------------------- */
  attach(sections.hero, profileData);
  attach(sections.experience, experienceData);
  attach(sections.featured, featuredData);
  attach(sections.projects, projectsData);
  attach(sections.education, educationData);
  attach(sections.licenses, licensesData);
  attach(sections.contact, contactData);

  console.info("[HomePage] Data attached successfully");
  console.groupEnd();

  /* -------------------------------------------------
     Signal renderer + motion engine
  ------------------------------------------------- */
  window.dispatchEvent(new CustomEvent("home:ready"));
}

/* =================================================
   Helpers
================================================= */

function validateSections(sections) {
  Object.entries(sections).forEach(([key, el]) => {
    if (!el) {
      console.info(`[HomePage] Section not present: ${key}`);
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
