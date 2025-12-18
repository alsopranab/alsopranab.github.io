/**
 * Resume Redirect Controller (FINAL — SAFE & USER-DRIVEN)
 * ======================================================
 * - Runs only on explicit user click
 * - Reads real profile.json schema
 * - Opens resume in new tab
 * - No redirect loops
 * - Emits lifecycle events
 */

(function initResumeController() {
  document.addEventListener("click", async (e) => {
    const trigger = e.target.closest("[data-action='resume']");
    if (!trigger) return;

    e.preventDefault();

    try {
      await ResumeController();
    } catch (err) {
      console.error("[Resume] Fatal error", err);
    }
  });
})();

async function ResumeController() {
  console.group("[Resume] Initialization");

  /* =========================
     LOAD PROFILE
  ========================= */
  const profile = await DataService.getProfile();

  if (!profile) {
    fail("Profile data unavailable");
    console.groupEnd();
    return;
  }

  /* =========================
     RESOLVE DESTINATION
  ========================= */
  const resumeTarget = resolveResumeTarget(profile);

  if (!resumeTarget) {
    fail("No valid resume destination configured");
    console.groupEnd();
    return;
  }

  /* =========================
     ANALYTICS EVENT
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

  console.info("[Resume] Opening resume:", resumeTarget.provider);
  console.groupEnd();

  /* =========================
     OPEN (USER EXPECTATION SAFE)
  ========================= */
  openResume(resumeTarget.url);
}

/* =================================================
   PROVIDER RESOLUTION (SCHEMA TRUE)
================================================= */

function resolveResumeTarget(profile) {
  const url = profile?.resume?.externalProfile;

  if (isValidUrl(url)) {
    return {
      provider: profile.resume.provider || "external",
      url
    };
  }

  return null;
}

/* =================================================
   UTILITIES
================================================= */

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function openResume(url) {
  window.open(url, "_blank", "noopener,noreferrer");
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
