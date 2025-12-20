/**
 * Stats Page Controller (FINAL — HARD SAFE & SCHEMA TRUE)
 * ======================================================
 * - Runs ONLY on stats page
 * - Matches real JSON structures
 * - Attaches data safely (non-serial)
 * - Never crashes rendering
 * - Emits stats:ready exactly once
 */

let STATS_INITIALIZED = false;

/* ============================================================
   ENTRY POINT (PAGE SAFE)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (STATS_INITIALIZED) return;
  if (!document.getElementById("stats-overview-section")) return;

  STATS_INITIALIZED = true;

  StatsPageController().catch(err => {
    console.error("[StatsPage] Fatal initialization error", err);
  });
});

async function StatsPageController() {
  console.group("[StatsPage] Initialization");

  /* =========================
     SECTION REGISTRY
  ========================= */
  const sections = {
    overview: document.getElementById("stats-overview-section"),
    competitive: document.getElementById("competitive-section"),
    repositories: document.getElementById("repositories-section"),
    contributions: document.getElementById("contributions-section")
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
     DATA NORMALIZATION + ATTACH
  ========================= */
  attach(sections.overview, normalizeOverview(profileData));
  attach(sections.competitive, normalizeCompetitive(socialData));
  attach(sections.repositories, normalizeRepositories(projectsData));
  attach(sections.contributions, normalizeContributions(socialData));

  console.info("[StatsPage] Data attached successfully");
  console.groupEnd();

  /* =========================
     LIFECYCLE EVENT
  ========================= */
  window.dispatchEvent(
    new CustomEvent("stats:ready", {
      detail: { timestamp: Date.now() }
    })
  );
}

/* ============================================================
   NORMALIZERS (SCHEMA TRUE)
============================================================ */

function normalizeOverview(profileData) {
  if (!profileData?.identity) return null;

  return {
    name:
      profileData.identity.preferredName ||
      profileData.identity.fullName ||
      "",
    headline: profileData.identity.headline || "",
    summary: profileData.identity.summary || "",
    location: profileData.identity.location
      ? `${profileData.identity.location.city}, ${profileData.identity.location.country}`
      : ""
  };
}

function normalizeCompetitive(socialData) {
  if (!Array.isArray(socialData?.profiles)) return null;

  return socialData.profiles
    .filter(p => p.enabled !== false)
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
    .map(p => ({
      id: p.id,
      platform: p.platform,
      username: p.username || "",
      url: p.url
    }));
}

function normalizeRepositories(projectsData) {
  if (!Array.isArray(projectsData?.categories)) return null;

  return projectsData.categories
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
    .map(cat => ({
      label: cat.label,
      projectCount: Array.isArray(cat.projects)
        ? cat.projects.length
        : 0,
      projects: Array.isArray(cat.projects)
        ? cat.projects.map(p => ({
            name: p.project?.name || "",
            summary: p.project?.summary || "",
            repo: p.repository?.url || ""
          }))
        : []
    }));
}

function normalizeContributions(socialData) {
  if (!Array.isArray(socialData?.profiles)) return null;

  const github = socialData.profiles.find(
    p => p.enabled !== false && p.id === "github"
  );

  return github
    ? {
        platform: "GitHub",
        url: github.url
      }
    : null;
}

/* ============================================================
   HELPERS
============================================================ */

function validateSections(sections) {
  Object.entries(sections).forEach(([key, el]) => {
    if (!el) {
      console.warn(`[StatsPage] Missing section in DOM: ${key}`);
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
    Object.defineProperty(section, "__data__", {
      value: data,
      writable: false,
      enumerable: false,
      configurable: false
    });
  } catch (err) {
    console.error("[StatsPage] Failed to attach data", err);
  }
}
