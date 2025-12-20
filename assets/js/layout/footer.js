/**
 * Footer Layout Controller (FINAL — IMMUTABLE)
 * ===========================================
 * - Social links ONLY
 * - No contact/email rendering
 * - Apple-style minimal footer
 * - Canonical IDs
 * - Race-condition safe
 */

let FOOTER_INITIALIZED = false;

function bootFooter() {
  if (FOOTER_INITIALIZED) return;
  FOOTER_INITIALIZED = true;

  FooterController().catch(err => {
    console.warn("[Footer] Initialization failed", err);
  });
}

/* Primary trigger */
window.addEventListener("app:ready", bootFooter);

/* Safety fallback */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (!FOOTER_INITIALIZED) {
      console.warn("[Footer] app:ready not detected, falling back");
      bootFooter();
    }
  }, 0);
});

async function FooterController() {
  const footerEl = document.getElementById("site-footer");
  if (!footerEl) return;

  let socials = [];

  try {
    const socialData = await DataService.getSocials();

    if (Array.isArray(socialData?.profiles)) {
      socials = socialData.profiles
        .filter(p => p.enabled !== false && p.url)
        .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
    }
  } catch (err) {
    console.warn("[Footer] Social fallback enabled", err);
  }

  footerEl.innerHTML = `
    <div class="footer-container">

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
}

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
