/**
 * Resume Redirect Controller (FINAL — SAFE & USER-DRIVEN)
 * ======================================================
 * - Guaranteed user-initiated open
 * - Async-safe (no popup blocking)
 * - Schema-true
 * - No redirect loops
 * - Emits lifecycle events
 */

(function initResumeController() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-action='resume']");
    if (!trigger) return;

    e.preventDefault();

    // 🔑 MUST open synchronously
    const popup = window.open("", "_blank", "noopener,noreferrer");

    if (!popup) {
      console.warn("[Resume] Popup blocked by browser");
      return;
    }

    ResumeController(popup).catch(err => {
      console.error("[Resume] Fatal error", err);
      try { popup.close(); } catch {}
    });
  });
})();

async function ResumeController(popupWindow) {
  console.group("[Resume] Initialization");

  /* =========================
     LOAD PROFILE
  ========================= */
  const profile = await DataService.getProfile();

  if (!profile?.resume) {
    fail("Profile resume section unavailable");
    popupWindow.close();
    console.groupEnd();
    return;
  }

  /* =========================
     RESOLVE DESTINATION
  ========================= */
  const resumeTarget = resolveResumeTarget(profile);

  if (!resumeTarget) {
    fail("No valid resume destination configured");
    popupWindow.close();
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
     NAVIGATE EXISTING TAB
  ========================= */
  popupWindow.location.href = resumeTarget.url;
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
