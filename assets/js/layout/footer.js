/**
 * Footer Layout Controller (FINAL — HARD FAIL SAFE)
 * ================================================
 * - Always renders footer
 * - Enhances with contact.json + social.json when available
 * - Never exits early
 * - Schema-aligned with your data
 * - CSS-compatible with omniverse layout
 */

window.addEventListener("app:ready", async () => {
  const footerEl = document.getElementById("site-footer");
  if (!footerEl) return;

  /* -------------------------
     DEFAULT FALLBACK CONTENT
  ------------------------- */
  let email = "career.pranab@gmail.com";
  let socials = [];

  /* -------------------------
     TRY DATA ENRICHMENT
  ------------------------- */
  try {
    const [contact, socialData] = await Promise.all([
      DataService.getContact(),
      DataService.getSocials()
    ]);

    if (contact?.primary?.email?.value) {
      email = contact.primary.email.value;
    }

    if (Array.isArray(socialData?.profiles)) {
      socials = socialData.profiles
        .filter(p => p.enabled)
        .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
    }
  } catch (e) {
    console.warn("[Footer] Using fallback content");
  }

  /* -------------------------
     RENDER (ALWAYS)
  ------------------------- */
  footerEl.innerHTML = `
    <div class="footer-container">

      <div class="footer-email">
        <a href="mailto:${escapeHTML(email)}">
          ${escapeHTML(email)}
        </a>
      </div>

      <div class="footer-socials">
        ${
          socials.length
            ? socials
                .map(
                  s => `
                    <a href="${s.url}" target="_blank" rel="noopener">
                      ${escapeHTML(s.platform)}
                    </a>
                  `
                )
                .join("")
            : `<span class="footer-muted">Social links coming soon</span>`
        }
      </div>

      <div class="footer-meta">
        © ${new Date().getFullYear()} Pranab Debnath
      </div>

    </div>
  `;

  /* -------------------------
     LIFECYCLE EVENT
  ------------------------- */
  window.dispatchEvent(
    new CustomEvent("footer:ready", {
      detail: { timestamp: Date.now() }
    })
  );
});

/* =========================
   UTIL
========================= */

function escapeHTML(str) {
  return typeof str === "string"
    ? str.replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[c])
    : "";
}
