/**
 * Resume Redirect Controller (FINAL — SCHEMA TRUE & SAFE)
 * ======================================================
 * - Runs ONLY on explicit user click
 * - Reads real profile.json schema
 * - Supports LinkedIn-first strategy
 * - Prevents redirect loops
 * - Emits lifecycle events
 *
 * NEVER auto-runs on page load.
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
     LOOP PREVENTION
  ========================= */
  if (isRedirectLoop(resumeTarget.url)) {
    fail("Redirect loop detected");
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

  console.info("[Resume] Redirecting to", resumeTarget.provider);
  console.groupEnd();

  /* =========================
     REDIRECT
  ========================= */
  performRedirect(resumeTarget.url);
}

/* ============================================================
   PROVIDER RESOLUTION (REAL SCHEMA)
============================================================ */

function resolveResumeTarget(profile) {
  const resume = profile?.resume;

  if (!resume || resume.strategy !== "external") {
    return null;
  }

  if (
    resume.provider === "linkedin" &&
    isValidUrl(resume.externalProfile)
  ) {
    return {
      provider: "linkedin",
      url: resume.externalProfile
    };
  }

  return null;
}

/* ============================================================
   SAFETY UTILITIES
============================================================ */

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isRedirectLoop(targetUrl) {
  return window.location.href === targetUrl;
}

function performRedirect(url) {
  // replace() prevents back-button loops
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
