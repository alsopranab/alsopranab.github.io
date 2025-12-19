document.addEventListener("DOMContentLoaded", async () => {
  console.log("[Bootstrap] DOM ready");

  if (!window.DataService) {
    console.error("[Bootstrap] DataService not available");
    return;
  }

  try {
    const [
      profile,
      experience,
      featured,
      projects,
      education,
      contact
    ] = await Promise.all([
      DataService.getProfile(),
      DataService.getExperience(),
      DataService.getFeatured(),
      DataService.getProjects(),
      DataService.getEducation(),
      DataService.getContact()
    ]);

    inject("hero-section", profile);
    inject("experience-section", experience);
    inject("featured-section", featured);
    inject("projects-section", projects);
    inject("education-section", education);
    inject("contact-section", contact);

    window.dispatchEvent(new Event("app:ready"));
    window.dispatchEvent(new Event("home:ready"));

    console.log("[Bootstrap] App ready");
  } catch (e) {
    console.error("[Bootstrap] Fatal init error", e);
  }
});

function inject(id, data) {
  const el = document.getElementById(id);
  if (!el || !data) return;
  el.dataset.source = JSON.stringify(data);
}
