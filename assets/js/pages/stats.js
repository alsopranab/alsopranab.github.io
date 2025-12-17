/**
 * Stats Page Controller (FINAL — PAGE SAFE)
 * ========================================
 * - Runs ONLY when stats page exists
 * - Schema-aligned with current JSON
 * - Failure-tolerant
 * - Renderer-safe
 */

/* ============================================================
   ENTRY POINT (PAGE SAFE)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("stats-overview-section")) return;

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
     DATA LOADING
  ========================= */
  const results = await Promise.allSettled([
    DataService.getSocials(),
    DataService.getProjects(),
    DataService.getProfile()
  ]);

  const [socialData, projectsData, profileData] =
    normalizeResults(results);

  /* =========================
     DATA NORMALIZATION
  ========================= */
  attach(sections.competitive, normalizeCompetitive(socialData));
  attach(sections.repositories, normalizeRepositories(projectsData));
  attach(sections.contributions, normalizeContributions(profileData));
  attach(sections.overview, normalizeOverview(profileData));

  console.info("[StatsPage] Data attached");
  console.groupEnd();

  window.dispatchEvent(
    new CustomEvent("stats:ready", {
      detail: { timestamp: Date.now() }
    })
  );
}

/* ============================================================
   NORMALIZERS (SCHEMA ALIGNED)
============================================================ */

function normalizeCompetitive(socialData) {
  if (!socialData?.socials) return null;

  return socialData.socials
    .filter(s => s.enabled)
    .map(s => ({
      id: s.id,
      name: s.name,
      url: s.url
    }));
}

function normalizeRepositories(projectsData) {
  if (!projectsData?.categories) return null;

  return projectsData.categories.map(cat => ({
    label: cat.label,
    projectCount: (cat.projects || []).length,
    projects: cat.projects || []
  }));
}

function normalizeContributions(profileData) {
  const github =
    profileData?.identity?.links?.github || null;

  return github
    ? { github }
    : null;
}

function normalizeOverview(profileData) {
  if (!profileData?.identity) return null;

  return {
    name:
      profileData.identity.preferredName ||
      profileData.identity.fullName ||
      "",
    headline:
      profileData.identity.headline ||
      profileData.identity.summary ||
      "",
    location:
      profileData.identity.location || ""
  };
}

/* ============================================================
   HELPERS
============================================================ */

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
