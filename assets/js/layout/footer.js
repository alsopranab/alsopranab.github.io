/**
 * Footer Layout Controller (FINAL — DEDUP SAFE)
 * =============================================
 * - Never duplicates contact email
 * - Social-first footer (Apple style)
 * - Hard-fail safe
 * - Schema aligned
 */

window.addEventListener("app:ready", async () => {
  const footerEl = document.getElementById("site-footer");
  if (!footerEl) return;

  let email = null;
  let socials = [];

  try {
    const [contact, socialData] = await Promise.all([
      DataService.getContact(),
      DataService.getSocials()
    ]);

    /* ================= CONTACT DEDUP ================= */
    const contactSectionExists =
      document.getElementById("contact")?.innerHTML?.trim(); // ✅ FIXED ID

    if (!contactSectionExists && contact?.primary?.email?.value) {
      email = contact.primary.email.value;
    }

    /* ================= SOCIALS ================= */
    if (Array.isArray(socialData?.profiles)) {
      socials = socialData.profiles
        .filter(p => p.enabled)
        .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
    }
  } catch (err) {
    console.warn("[Footer] Using minimal fallback", err);
  }

  footerEl.innerHTML = `
    <div class="footer-container">

      ${
        email
          ? `
            <div class="footer-email">
              <a href="mailto:${escapeHTML(email)}">
                ${escapeHTML(email)}
              </a>
            </div>
          `
          : ""
      }

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

  window.dispatchEvent(
    new CustomEvent("footer:ready", {
      detail: { timestamp: Date.now() }
    })
  );
});

/* ================= UTIL ================= */
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
