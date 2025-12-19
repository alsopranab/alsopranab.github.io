/**
 * Project Intelligence Dashboard — PRODUCTION
 * -------------------------------------------
 * • Distinct visual language (no waves, no circles)
 * • GitHub-backed (alsopranab)
 * • Scroll-activated
 * • Cached
 * • Silent fail
 */

(() => {
  "use strict";

  const USERNAME = "alsopranab";
  const HOST_ID = "project-intelligence-dashboard";
  const CACHE_KEY = "GH::PROJECT_INTEL::v1";
  const CACHE_TTL = 30 * 60 * 1000;

  window.addEventListener("app:ready", () => {
    const host = document.getElementById(HOST_ID);
    if (!host) return;

    observe(host);
  });

  /* ================= VISIBILITY GATE ================= */

  function observe(el) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.disconnect();
        init(el);
      });
    }, { threshold: 0.35 });

    io.observe(el);
  }

  /* ================= INIT ================= */

  async function init(host) {
    const data = await getData();
    if (!data) return;

    render(host, data);
  }

  /* ================= DATA ================= */

  async function getData() {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.t < CACHE_TTL) return parsed.d;
      } catch {}
    }

    try {
      const res = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100`,
        { headers: { Accept: "application/vnd.github+json" } }
      );

      if (!res.ok) return null;

      const repos = await res.json();

      const now = Date.now();
      const years = {};
      const categories = { Analytics: 0, Automation: 0, Infra: 0 };

      repos.forEach(r => {
        const y = new Date(r.created_at).getFullYear();
        years[y] = (years[y] || 0) + 1;

        const name = (r.name + " " + (r.description || "")).toLowerCase();
        if (name.match(/sql|data|analysis|analytics/)) categories.Analytics++;
        else if (name.match(/auto|bot|script|workflow/)) categories.Automation++;
        else categories.Infra++;
      });

      const payload = {
        total: repos.length,
        years,
        categories
      };

      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ t: Date.now(), d: payload })
      );

      return payload;
    } catch {
      return null;
    }
  }

  /* ================= RENDER ================= */

  function render(host, data) {
    const years = Object.keys(data.years).sort();
    const maxYear = Math.max(...Object.values(data.years));

    host.innerHTML = `
      <div class="intel-shell" data-reveal data-hover>
        <header class="intel-header">
          <h3>Project Intelligence</h3>
          <span class="intel-meta">${data.total}+ shipped systems</span>
        </header>

        <div class="intel-timeline">
          ${years.map(y => `
            <div class="intel-row">
              <span class="intel-year">${y}</span>
              <i style="width:${(data.years[y] / maxYear) * 100}%"></i>
              <b>${data.years[y]}</b>
            </div>
          `).join("")}
        </div>

        <div class="intel-divider"></div>

        <div class="intel-categories">
          ${Object.entries(data.categories).map(
            ([k, v]) => `
              <div>
                <strong>${v}</strong>
                <span>${k}</span>
              </div>
            `
          ).join("")}
        </div>
      </div>
    `;
  }
})();
