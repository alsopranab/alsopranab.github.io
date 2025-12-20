/**
 * Home Page Controller (FINAL — CANONICAL & SAFE)
 * ===============================================
 * Responsibilities:
 * - Runs after `app:ready` OR DOMContentLoaded fallback
 * - Loads all required JSON via DataService
 * - Attaches data to DOM sections (non-destructive)
 * - Emits `home:ready` exactly once
 */

let HOME_INITIALIZED = false;

function bootHomePage() {
  if (HOME_INITIALIZED) return;
  HOME_INITIALIZED = true;

  HomePageController().catch(err => {
    console.error("[HomePage] Fatal initialization error", err);
  });
}

/* Primary trigger */
window.addEventListener("app:ready", bootHomePage);

/* Safety fallback */
document.addEventListener("DOMContentLoaded", () => {
  // allow app:ready a tick to fire first
  setTimeout(() => {
    if (!HOME_INITIALIZED) {
      console.warn("[HomePage] app:ready not detected, falling back");
      bootHomePage();
    }
  }, 0);
});

async function HomePageController() {
  console.group("[HomePage] Initialization");

  /* -------------------------------------------------
     Section references (MUST match index.html IDs)
  ------------------------------------------------- */
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
     Profile is mandatory
  ------------------------------------------------- */
  if (!profileData?.identity) {
    console.error("[HomePage] profile.json missing or invalid");
    console.groupEnd();
    return;
  }

  /* -------------------------------------------------
     Attach data (non-serial, safe)
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
     Signal downstream systems ONCE
  ------------------------------------------------- */
  window.dispatchEvent(new CustomEvent("home:ready"));
}

/* =================================================
   Helpers
================================================= */

function validateSections(sections) {
  Object.entries(sections).forEach(([key, el]) => {
    if (!el) {
      console.warn(`[HomePage] Section not present: ${key}`);
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
    Object.defineProperty(section, "__data__", {
      value: data,
      writable: false,
      enumerable: false,
      configurable: false
    });
  } catch (err) {
    console.error("[HomePage] Failed to attach data", err);
  }
}
