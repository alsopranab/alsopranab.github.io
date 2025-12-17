/**
 * Footer Layout Controller (FINAL — FAIL SAFE + COMPLETE)
 * ======================================================
 * - Always renders footer (even if JSON fails)
 * - Enhances with contact.json + socials.json when available
 * - Never exits early
 */

window.addEventListener("app:ready", async () => {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  let email = "career.pranab@gmail.com";
  let socials = [];

  try {
    const [contact, socialData] = await Promise.all([
      DataService.getContact(),
      DataService.getSocials()
    ]);

    if (contact?.primary?.email?.value) {
      email = contact.primary.email.value;
    }

    if (Array.isArray(socialData?.socials)) {
      socials = socialData.socials.filter(s => s.enabled);
    }
  } catch {
    /* silent fallback — footer still renders */
  }

  footer.innerHTML = `
    <div class="footer-container">

      <div class="footer-email">
        <a href="mailto:${email}">
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
                      ${escapeHTML(s.name)}
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
});

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
