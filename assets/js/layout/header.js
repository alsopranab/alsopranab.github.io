/**
 * Header Layout Controller (PREMIUM & FINAL)
 * =========================================
 * Responsibilities:
 * - Waits for application readiness
 * - Loads and validates profile & social data
 * - Renders identity, navigation, and socials
 * - Handles partial failures gracefully
 * - Accessibility-first markup
 * - Emits lifecycle events
 *
 * No styling logic. No page awareness.
 */

window.addEventListener("app:ready", () => {
  HeaderController().catch((err) => {
    console.error("[Header] Fatal initialization error", err);
  });
});

async function HeaderController() {
  console.group("[Header] Initialization");

  const headerEl = document.getElementById("site-header");
  if (!headerEl) {
    console.warn("[Header] Header container not found");
    console.groupEnd();
    return;
  }

  /* =========================
     DATA LOADING
  ========================= */
  const results = await Promise.allSettled([
    DataService.getProfile(),
    DataService.getSocials()
  ]);

  const [profileData, socialData] = normalizeResults(results);

  if (!profileData) {
    console.warn("[Header] Profile data unavailable");
    console.groupEnd();
    return;
  }

  /* =========================
     DATA NORMALIZATION
  ========================= */
  const headerPayload = normalizeHeaderPayload(profileData, socialData);

  /* =========================
     RENDER
  ========================= */
  headerEl.innerHTML = renderHeaderHTML(headerPayload);

  console.info("[Header] Render complete");
  console.groupEnd();

  /* =========================
     LIFECYCLE EVENT
  ========================= */
  window.dispatchEvent(
    new CustomEvent("header:ready", {
      detail: {
        timestamp: Date.now()
      }
    })
  );
}

/* =========================
   NORMALIZERS
========================= */

function normalizeHeaderPayload(profile, socials) {
  return {
    name: profile.name || "",
    designation: profile.currentRole?.designation || "",
    company: profile.currentRole?.company || "",
    socials: Array.isArray(socials?.socials) ? socials.socials : [],
    nav: [
      { label: "Home", href: "index.html" },
      { label: "Stats", href: "stats.html" },
      { label: "Resume", href: "resume.html" },
      { label: "About", href: "about.html" }
    ]
  };
}

function normalizeResults(results) {
  return results.map((res, idx) => {
    if (res.status === "fulfilled" && res.value) {
      return res.value;
    }
    console.warn(`[Header] Data source failed at index ${idx}`);
    return null;
  });
}

/* =========================
   RENDERER (PURE)
========================= */

function renderHeaderHTML(payload) {
  const socialsHTML = payload.socials
    .map(
      (s) => `
        <a
          href="${s.url}"
          target="_blank"
          rel="noopener"
          aria-label="${s.label}"
        >
          <span class="icon icon-${s.icon}" aria-hidden="true"></span>
        </a>
      `
    )
    .join("");

  const navHTML = payload.nav
    .map(
      (item) => `
        <a
          href="${item.href}"
          class="header-nav-link"
          role="menuitem"
        >
          ${item.label}
        </a>
      `
    )
    .join("");

  return `
    <div class="header-container">

      <div class="header-identity">
        <span class="header-name">${payload.name}</span>
        ${
          payload.designation && payload.company
            ? `
              <span class="header-role">
                ${payload.designation} @ ${payload.company}
              </span>
            `
            : ""
        }
      </div>

      <nav class="header-nav" role="menubar" aria-label="Primary Navigation">
        ${navHTML}
      </nav>

      ${
        socialsHTML
          ? `
            <div class="header-socials" aria-label="Social links">
              ${socialsHTML}
            </div>
          `
          : ""
      }

    </div>
  `;
}
