/**
 * Resume Redirect Controller (FINAL & LOCKED)
 * ------------------------------------------
 * Redirects the user to LinkedIn, where
 * LinkedIn itself generates the resume PDF
 * via "Resources → Save to PDF".
 *
 * PDF generation CANNOT be done outside LinkedIn.
 */

(async function ResumeRedirect() {
  const profile = await DataService.getProfile();
  if (!profile || !profile.linkedinProfile) return;

  // Redirect to LinkedIn profile
  window.location.href = profile.linkedinProfile;
})();
