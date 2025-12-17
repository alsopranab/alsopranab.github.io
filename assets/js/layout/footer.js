/**
 * Footer Layout Controller (FINAL — SCHEMA SAFE)
 * =============================================
 * - Runs after app:ready
 * - Uses contact.json + social.json
 * - Clean, minimal, deterministic
 */

window.addEventListener("app:ready", () => {
  FooterController().catch((err) => {
    console.error("[Footer] Fatal initialization error", err);
  });
});

async function FooterController() {
  const footerEl = document.getElementById("site-footer");
  if (!footerEl) return;

  const results = await Promise.allSettled([
    DataService.getContact(),
    DataService.getSocials()
  ]);

  const [contact, socials] = normalizeResults(results);
  if (!contact?.section) return;

  const payload = normalizeFooterPayload(contact, socials);
  footerEl.innerHTML = renderFooterHTML(payload);

  window.dispatchEvent(new CustomEvent("footer:ready"));
}

/* =========================
   NORMALIZATION
========================= */

function normalizeFooterPayload(contact, socials) {
  return {
    title: contact.section.title || "Contact",
    email: contact.primary?.email?.value || "",
    socials: Array.isArray(socials?.socials)
      ? socials.socials.filter(s => s.enabled)
      : [],
    year: new Date().getFullYear()
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

function renderFooterHTML(p) {
  return `
    <div class="footer-container">

      ${
        p.email
          ? `<a class="footer-email" href="mailto:${p.email}">
               ${p.email}
             </a>`
          : ""
      }

      ${
        p.socials.length
          ? `
            <div class="footer-socials">
              ${p.socials
                .map(
                  s => `<a href="${s.url}" target="_blank" rel="noopener">
                         ${escapeHTML(s.name)}
                       </a>`
                )
                .join("")}
            </div>
          `
          : ""
      }

      <div class="footer-meta">
        © ${p.year} Pranab Debnath
      </div>

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
