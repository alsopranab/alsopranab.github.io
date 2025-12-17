/**
 * Footer Layout Controller (FINAL — FAIL SAFE + CONTENT COMPLETE)
 * ==============================================================
 * - Always renders footer
 * - Never depends on JSON to exist
 * - Enhances with email + socials when available
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

    email = contact?.primary?.email?.value || email;

    socials = Array.isArray(socialData?.socials)
      ? socialData.socials.filter(s => s.enabled)
      : [];
  } catch {
    /* silent fallback */
  }

  footer.innerHTML = `
    <div class="footer-container">

      <div class="footer-email">
        <a href="mailto:${email}">
          ${email}
        </a>
      </div>

      ${
        socials.length
          ? `
            <div class="footer-socials">
              ${socials
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
          : `<div class="footer-socials muted">
               Social links coming soon
             </div>`
      }

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
