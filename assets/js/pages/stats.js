/**
 * Stats Page Controller (ADVANCED & FINAL)
 * =======================================
 * Responsibilities:
 * - Waits for application readiness
 * - Loads and normalizes stats-related data
 * - Handles partial failures gracefully
 * - Attaches clean, deterministic payloads
 * - Emits lifecycle events for observability
 *
 * Rendering is handled elsewhere.
 */

window.addEventListener("app:ready", () => {
  StatsPageController().catch((err) => {
    console.error("[StatsPage] Fatal initialization error", err);
  });
});

async function StatsPageController() {
  console.group("[StatsPage] Initialization");

  /* =========================
     SECTION REGISTRY
  ========================= */
  const sections = {
    competitive: document.getElementById("competitive-section"),
    repositories: document.getElementById("repositories-section"),
    contributions: document.getElementById("contributions-section"),
    overview: document.getElementById("stats-overview-section")
  };

  validateSections(sections);

  /* =========================
     DATA LOADING (BOTTOM → TOP)
  ========================= */
  console.info("[StatsPage] Loading data…");

  const results = await Promise.allSettled([
    DataService.getSocials(),   // Competitive platforms
    DataService.getProjects(),  // Repositories / topics
    DataService.getProfile()    // Identity + GitHub
  ]);

  const [socialData, projectsData, profileData] =
    normalizeResults(results);

  /* =========================
     DATA NORMALIZATION
  ========================= */
  const competitivePayload = normalizeCompetitive(socialData);
  const repositoriesPayload = normalizeRepositories(projectsData);
  const contributionsPayload = normalizeContributions(profileData);
  const overviewPayload = normalizeOverview(profileData);

  /* =========================
     DATA ATTACHMENT
  ========================= */
  attach(sections.competitive, competitivePayload);
  attach(sections.repositories, repositoriesPayload);
  attach(sections.contributions, contributionsPayload);
  attach(sections.overview, overviewPayload);

  console.info("[StatsPage] Data attached");
  console.groupEnd();

  /* =========================
     LIFECYCLE EVENT
  ========================= */
  window.dispatchEvent(
    new CustomEvent("stats:ready", {
      detail: {
        timestamp: Date.now()
      }
    })
  );
}

/* =========================
   NORMALIZERS (INTERNAL)
========================= */

function normalizeCompetitive(socialData) {
  if (!socialData?.socials) return null;

  return {
    leetcode: socialData.socials.find((s) => s.id === "leetcode") || null,
    hackerrank: socialData.socials.find((s) => s.id === "hackerrank") || null
  };
}

function normalizeRepositories(projectsData) {
  if (!projectsData?.categories) return null;

  return {
    categories: projectsData.categories.map((cat) => ({
      key: cat.key,
      label: cat.label,
      projectCount: (cat.projects || []).length,
      projects: cat.projects || []
    }))
  };
}

function normalizeContributions(profileData) {
  return {
    github:
      profileData?.social?.github ||
      profileData?.linkedinProfile ||
      null
  };
}

function normalizeOverview(profileData) {
  if (!profileData) return null;

  return {
    name: profileData.name,
    tagline: profileData.tagline,
    location: profileData.location,
    social: profileData.social || {}
  };
}

/* =========================
   HELPERS (INTERNAL)
========================= */

function validateSections(sections) {
  Object.entries(sections).forEach(([key, el]) => {
    if (!el) {
      console.warn(`[StatsPage] Missing section: ${key}`);
    }
  });
}

function normalizeResults(results) {
  return results.map((res, idx) => {
    if (res.status === "fulfilled" && res.value) {
      return res.value;
    }
    console.warn(`[StatsPage] Data source failed at index ${idx}`);
    return null;
  });
}

function attach(section, data) {
  if (!section || !data) return;

  try {
    section.dataset.source = JSON.stringify(data);
  } catch (err) {
    console.error("[StatsPage] Failed to attach data", err);
  }
}
