/**
 * Footer Layout Controller (ADVANCED & FINAL)
 * ==========================================
 * Responsibilities:
 * - Waits for app readiness
 * - Loads footer-related data safely
 * - Normalizes and validates payloads
 * - Renders deterministic markup
 * - Handles partial failures gracefully
 * - Emits lifecycle events
 *
 * No page awareness. No styling logic.
 */

window.addEventListener("app:ready", () => {
  FooterController().catch((err) => {
    console.error("[Footer] Fatal initialization error", err);
  });
});

async function FooterController() {
  console.group("[Footer] Initialization");

  const footerEl = document.getElementById("site-footer");
  if (!footerEl) {
    console.warn("[Footer] Footer container not found");
    console.groupEnd();
    return;
  }

  /* =========================
     DATA LOADING
  ========================= */
  const results = await Promise.allSettled([
    DataService.getContact(),
    DataService.getSocials()
  ]);

  const [contactData, socialData] = normalizeResults(results);

  if (!contactData) {
    console.warn("[Footer] Contact data unavailable");
    console.groupEnd();
    return;
  }

  /* =========================
     DATA NORMALIZATION
  ========================= */
  const footerPayload = normalizeFooterPayload(contactData, socialData);

  /* =========================
     RENDER
  ========================= */
  footerEl.innerHTML = renderFooterHTML(footerPayload);

  console.info("[Footer] Render complete");
  console.groupEnd();

  /* =========================
     LIFECYCLE EVENT
  ========================= */
  window.dispatchEvent(
    new CustomEvent("footer:ready", {
      detail: {
        timestamp: Date.now()
      }
    })
  );
}

/* =========================
   NORMALIZERS
========================= */

function normalizeFooterPayload(contact, socials) {
  return {
    email: contact.email || null,
    title: contact.title || "",
    socials: Array.isArray(socials?.socials) ? socials.socials : [],
    year: new Date().getFullYear()
  };
}

function normalizeResults(results) {
  return results.map((res, idx) => {
    if (res.status === "fulfilled" && res.value) {
      return res.value;
    }
    console.warn(`[Footer] Data source failed at index ${idx}`);
    return null;
  });
}

/* =========================
   RENDERER (PURE)
========================= */

function renderFooterHTML(payload) {
  const socialLinksHTML = payload.socials
    .map(
      (s) => `
        <a
          href="${s.url}"
          target="_blank"
          rel="noopener"
          aria-label="${s.label}"
        >
          <span class="icon icon-${s.icon}"></span>
        </a>
      `
    )
    .join("");

  return `
    <div class="footer-container">

      ${
        payload.email
          ? `
            <div class="footer-contact">
              <a href="mailto:${payload.email}">
                ${payload.email}
              </a>
            </div>
          `
          : ""
      }

      ${
        socialLinksHTML
          ? `
            <div class="footer-socials">
              ${socialLinksHTML}
            </div>
          `
          : ""
      }

      <div class="footer-meta">
        © ${payload.year} ${payload.title}. All rights reserved.
      </div>

    </div>
  `;
}
