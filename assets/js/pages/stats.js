/**
 * Stats Page Controller
 * ---------------------
 * Responsible for:
 * - Loading project/topic data
 * - Preparing containers for stats rendering
 * - Enforcing bottom-up data readiness
 */

(async function StatsPageController() {
  const sections = {
    competitive: document.getElementById("competitive-section"),
    repositories: document.getElementById("repositories-section"),
    contributions: document.getElementById("contributions-section"),
    overview: document.getElementById("stats-overview-section")
  };

  // Integrity check
  Object.values(sections).forEach((el) => {
    if (!el) {
      console.error("[StatsPage] Missing section container");
    }
  });

  /**
   * Bottom → Top data resolution
   */
  const [
    socialData,
    projectsData,
    profileData
  ] = await Promise.all([
    DataService.getSocials(),
    DataService.getProjects(),
    DataService.getProfile()
  ]);

  /**
   * Attach resolved data to DOM nodes
   * Rendering is delegated upward
   */
  if (sections.competitive) {
    sections.competitive.dataset.source = JSON.stringify({
      leetcode: socialData?.socials?.find(s => s.id === "leetcode"),
      hackerrank: socialData?.socials?.find(s => s.id === "hackerrank")
    });
  }

  if (sections.repositories) {
    sections.repositories.dataset.source = JSON.stringify(projectsData);
  }

  if (sections.contributions) {
    sections.contributions.dataset.source = JSON.stringify({
      github: profileData?.social?.github || null
    });
  }

  if (sections.overview) {
    sections.overview.dataset.source = JSON.stringify(profileData);
  }
})();
