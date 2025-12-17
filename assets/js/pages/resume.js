/**
 * Resume Redirect Controller (FINAL — USER INITIATED)
 * ===================================================
 * Responsibilities:
 * - Runs ONLY on explicit user action
 * - Loads profile data safely
 * - Resolves resume destination (LinkedIn-first)
 * - Prevents redirect loops
 * - Emits lifecycle events for analytics
 *
 * This controller MUST NOT auto-run on app lifecycle.
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
    return;
  }

  /* =========================
     RESOLVE DESTINATION
  ========================= */
  const resumeTarget = resolveResumeTarget(profile);

  if (!resumeTarget) {
    fail("No resume destination configured");
    return;
  }

  /* =========================
     LOOP PREVENTION
  ========================= */
  if (isRedirectLoop(resumeTarget.url)) {
    fail("Redirect loop detected");
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
   PROVIDER RESOLUTION (SCHEMA-ALIGNED)
============================================================ */
function resolveResumeTarget(profile) {
  const linkedin =
    profile?.identity?.links?.linkedin;

  if (isValidUrl(linkedin)) {
    return {
      provider: "linkedin",
      url: linkedin
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
