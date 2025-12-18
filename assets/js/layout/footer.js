/**
 * Footer Layout Controller — FINAL IMMUTABLE BUILD
 * ==============================================
 * - Social-only footer (NO contact logic)
 * - Zero duplication risk
 * - Mobile & desktop safe
 * - Safari layout stable
 * - Race-condition immune
 */

window.addEventListener("app:ready", async () => {
  const footerEl = document.getElementById("site-footer");
  if (!footerEl) return;

  let socials = [];

  try {
    if (window.DataService?.getSocials) {
      const socialData = await DataService.getSocials();

      if (Array.isArray(socialData?.profiles)) {
        socials = socialData.profiles
          .filter(p => p.enabled && typeof p.url === "string")
          .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
      }
    }
  } catch (err) {
    console.warn("[Footer] Social load failed — continuing safely", err);
  }

  /* ================= RENDER ================= */

  footerEl.innerHTML = `
    <div class="footer-container">

      <div class="footer-socials">
        ${
          socials.length
            ? socials
                .map(
                  s => `
                    <a
                      href="${escapeHTML(s.url)}"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="${escapeHTML(formatPlatform(s.platform))}"
                    >
                      ${escapeHTML(formatPlatform(s.platform))}
                    </a>
                  `
                )
                .join("")
            : `<span class="footer-muted" aria-hidden="true"></span>`
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
