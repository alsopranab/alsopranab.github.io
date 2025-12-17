/**
 * Header Layout Controller (FINAL — SCHEMA SAFE)
 * =============================================
 * - Runs after app:ready
 * - Uses ONLY profile.json + social.json
 * - Schema-aligned with identity/currentPosition
 * - Deterministic, accessible, silent on failure
 */

window.addEventListener("app:ready", () => {
  HeaderController().catch((err) => {
    console.error("[Header] Fatal initialization error", err);
  });
});

async function HeaderController() {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  const results = await Promise.allSettled([
    DataService.getProfile(),
    DataService.getSocials()
  ]);

  const [profile, socials] = normalizeResults(results);
  if (!profile?.identity) return;

  const payload = normalizeHeaderPayload(profile, socials);
  headerEl.innerHTML = renderHeaderHTML(payload);

  window.dispatchEvent(new CustomEvent("header:ready"));
}

/* =========================
   NORMALIZATION
========================= */

function normalizeHeaderPayload(profile, socials) {
  return {
    name:
      profile.identity.preferredName ||
      profile.identity.fullName ||
      "Pranab Debnath",

    role: profile.identity.headline || "",

    socials: Array.isArray(socials?.socials)
      ? socials.socials.filter(s => s.enabled)
      : [],

    nav: [
      { label: "Home", href: "index.html" },
      { label: "Stats", href: "stats.html" },
      { label: "Resume", href: "resume.html" }
    ]
  };
}

function normalizeResults(results) {
  return results.map(r =>
    r.status === "fulfilled" ? r.value : null
  );
}

/* =========================
   RENDER
========================= */

function renderHeaderHTML(p) {
  return `
    <div class="header-container">

      <div class="header-identity">
        <span class="header-name">${escapeHTML(p.name)}</span>
        ${
          p.role
            ? `<span class="header-role">${escapeHTML(p.role)}</span>`
            : ""
        }
      </div>

      <nav class="header-nav" aria-label="Primary Navigation">
        ${p.nav
          .map(
            n => `<a href="${n.href}">${n.label}</a>`
          )
          .join("")}
      </nav>

      ${
        p.socials.length
          ? `
            <div class="header-socials">
              ${p.socials
                .map(
                  s => `
                    <a href="${s.url}" target="_blank" rel="noopener">
                      ${escapeHTML(s.name)}
                    </a>
                  `
                )
                .join("")}
            </div>
          `
          : ""
      }

    </div>
  `;
}

/* =========================
   UTIL
========================= */

function escapeHTML(str) {
  return typeof str === "string"
    ? str.replace(/[&<>"']/g, m =>
        ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[m])
      )
    : "";
}
