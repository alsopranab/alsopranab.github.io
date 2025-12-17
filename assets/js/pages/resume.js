/**
 * Resume Redirect Controller (ADVANCED & FINAL)
 * =============================================
 * Responsibilities:
 * - Waits for application readiness
 * - Loads profile data safely
 * - Validates resume destination
 * - Prevents redirect loops
 * - Supports future resume providers
 * - Emits lifecycle events
 *
 * Resume PDF generation is delegated
 * entirely to the external provider (LinkedIn).
 */

window.addEventListener("app:ready", () => {
  ResumeController().catch((err) => {
    console.error("[Resume] Fatal error", err);
  });
});

async function ResumeController() {
  console.group("[Resume] Initialization");

  /* =========================
     LOAD PROFILE
  ========================= */
  const profile = await DataService.getProfile();

  if (!profile) {
    fail("Profile data unavailable");
    return;
  }

  /* =========================
     RESUME PROVIDER RESOLUTION
  ========================= */
  const resumeTarget = resolveResumeTarget(profile);

  if (!resumeTarget) {
    fail("No resume destination configured");
    return;
  }

  /* =========================
     LOOP PREVENTION
  ========================= */
  if (isRedirectLoop(resumeTarget)) {
    fail("Redirect loop detected");
    return;
  }

  /* =========================
     EMIT ANALYTICS EVENT
  ========================= */
  window.dispatchEvent(
    new CustomEvent("resume:redirect", {
      detail: {
        provider: resumeTarget.provider,
        url: resumeTarget.url,
        timestamp: Date.now()
      }
    })
  );

  console.info("[Resume] Redirecting to", resumeTarget.provider);
  console.groupEnd();

  /* =========================
     REDIRECT (FINAL STEP)
  ========================= */
  performRedirect(resumeTarget.url);
}

/* =========================
   PROVIDER RESOLUTION
========================= */

function resolveResumeTarget(profile) {
  // Priority order (future-proof)
  if (isValidUrl(profile.linkedinProfile)) {
    return {
      provider: "linkedin",
      url: profile.linkedinProfile
    };
  }

  // Future expansion example:
  // if (isValidUrl(profile.resumeUrl)) { ... }

  return null;
}

/* =========================
   SAFETY UTILITIES
========================= */

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isRedirectLoop(target) {
  try {
    return window.location.href === target.url;
  } catch {
    return false;
  }
}

function performRedirect(url) {
  // Use replace to avoid polluting history
  window.location.replace(url);
}

function fail(reason) {
  console.warn("[Resume]", reason);

  window.dispatchEvent(
    new CustomEvent("resume:error", {
      detail: {
        reason,
        timestamp: Date.now()
      }
    })
  );
}
