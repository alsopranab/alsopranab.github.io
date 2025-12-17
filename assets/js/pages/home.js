/**
 * Home Page Controller
 * --------------------
 * Responsible for:
 * - Orchestrating section-level rendering
 * - Ensuring data is loaded before render
 * - Maintaining bottom-to-top logical order
 */

(async function HomePageController() {
  const sections = {
    hero: document.getElementById("hero-section"),
    experience: document.getElementById("experience-section"),
    featured: document.getElementById("featured-section"),
    projects: document.getElementById("projects-section"),
    education: document.getElementById("education-section"),
    licenses: document.getElementById("licenses-section"),
    contact: document.getElementById("contact-section")
  };

  // Guard: page integrity
  Object.values(sections).forEach((el) => {
    if (!el) {
      console.error("[HomePage] Missing section container");
    }
  });

  /**
   * Bottom → Top data loading order
   * (no rendering assumptions here)
   */
  const [
    contactData,
    licensesData,
    educationData,
    projectsData,
    featuredData,
    experienceData,
    profileData
  ] = await Promise.all([
    DataService.getContact(),
    DataService.getLicenses(),
    DataService.getEducation(),
    DataService.getProjects(),
    DataService.getFeatured(),
    DataService.getExperience(),
    DataService.getProfile()
  ]);

  /**
   * Attach raw data to DOM nodes
   * Rendering logic is intentionally deferred
   */
  if (sections.contact) sections.contact.dataset.source = JSON.stringify(contactData);
  if (sections.licenses) sections.licenses.dataset.source = JSON.stringify(licensesData);
  if (sections.education) sections.education.dataset.source = JSON.stringify(educationData);
  if (sections.projects) sections.projects.dataset.source = JSON.stringify(projectsData);
  if (sections.featured) sections.featured.dataset.source = JSON.stringify(featuredData);
  if (sections.experience) sections.experience.dataset.source = JSON.stringify(experienceData);
  if (sections.hero) sections.hero.dataset.source = JSON.stringify(profileData);
})();
