/**
 * Footer Layout Controller (FINAL — IMMUTABLE & DEDUP SAFE)
 * ========================================================
 * - Never duplicates contact email
 * - Social-first Apple-style footer
 * - Canonical IDs only
 * - Hard-fail safe
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

    const contactRendered =
      document.getElementById("contact-section")?.innerHTML?.trim();

    if (!contactRendered && contact?.primary?.email?.value) {
      email = contact.primary.email.value;
    }

    /* ================= SOCIALS ================= */

    if (Array.isArray(socialData?.profiles)) {
      socials = socialData.profiles
        .filter(p => p.enabled && p.url)
        .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
    }
  } catch (err) {
    console.warn("[Footer] Fallback mode enabled", err);
  }

  /* ================= RENDER ================= */

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
                    <a
                      href="${s.url}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ${escapeHTML(formatPlatform(s.platform))}
                    </a>
                  `
                )
                .join("")
            : ""
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

function formatPlatform(name) {
  if (!name) return "";
  return name
    .replace(/github/i, "GitHub")
    .replace(/linkedin/i, "LinkedIn")
    .replace(/leetcode/i, "LeetCode")
    .replace(/hackerrank/i, "HackerRank")
    .replace(/instagram/i, "Instagram");
}
