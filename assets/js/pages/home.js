/**
 * Home Page Controller (FINAL — LIFECYCLE SAFE)
 * ============================================
 * - Runs ONLY after app:ready
 * - Loads all required JSON
 * - Attaches data to DOM
 * - Emits home:ready exactly once
 */

window.addEventListener("app:ready", () => {
  HomePageController().catch(err => {
    console.error("[HomePage] Fatal initialization error", err);
  });
});

async function HomePageController() {
  console.group("[HomePage] Initialization");

  // ✅ IDs NOW MATCH index.html EXACTLY
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

  if (!profileData?.identity) {
    console.error("[HomePage] profile.json missing — aborting");
    console.groupEnd();
    return;
  }

  attach(sections.hero, profileData);
  attach(sections.experience, experienceData);
  attach(sections.featured, featuredData);
  attach(sections.projects, projectsData);
  attach(sections.education, educationData);
  attach(sections.licenses, licensesData);
  attach(sections.contact, contactData);

  console.info("[HomePage] Data attached successfully");
  console.groupEnd();

  window.dispatchEvent(new CustomEvent("home:ready"));
}

/* ================= HELPERS ================= */

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
