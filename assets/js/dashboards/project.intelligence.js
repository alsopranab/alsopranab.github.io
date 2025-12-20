/**
 * Project Intelligence Dashboard — FINAL PRODUCTION (LOCKED)
 * ---------------------------------------------------------
 * • Distinct visual language
 * • GitHub-backed
 * • Scroll-activated
 * • Cached
 * • Motion-safe
 * • Lifecycle-safe
 * • Silent fail
 */

(() => {
  "use strict";

  const USERNAME = "alsopranab";
  const HOST_ID = "project-intelligence-dashboard";
  const CACHE_KEY = `GH::PROJECT_INTEL::v1::${USERNAME}`;
  const CACHE_TTL = 30 * 60 * 1000;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let INITIALIZED = false;

  function boot() {
    if (INITIALIZED) return;
    INITIALIZED = true;

    const host = document.getElementById(HOST_ID);
    if (!host) return;

    observe(host);
  }

  /* Primary trigger */
  window.addEventListener("app:ready", boot);

  /* Safety fallback */
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (!INITIALIZED) boot();
    }, 0);
  });

  /* ================= VISIBILITY GATE ================= */

  function observe(el) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          io.unobserve(el);
          init(el);
        });
      },
      { threshold: 0.35 }
    );

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
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), 4000);

      const res = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100`,
        {
          signal: ctrl.signal,
          headers: {
            Accept: "application/vnd.github+json"
          }
        }
      );

      if (!res.ok) return null;

      const repos = await res.json();

      const years = {};
      const categories = {
        Analytics: 0,
        Automation: 0,
        Infra: 0
      };

      repos.forEach(r => {
        const y = new Date(r.created_at).getFullYear();
        years[y] = (years[y] || 0) + 1;

        const blob = (
          r.name +
          " " +
          (r.description || "")
        ).toLowerCase();

        if (blob.match(/sql|data|analysis|analytics/))
          categories.Analytics++;
        else if (blob.match(/auto|bot|script|workflow/))
          categories.Automation++;
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
      <div class="intel-shell" data-omni-reveal data-hover>
        <header class="intel-header">
          <h3>Project Intelligence</h3>
          <span class="intel-meta">
            ${escapeHTML(data.total + "+ shipped systems")}
          </span>
        </header>

        <div class="intel-timeline">
          ${years
            .map(y => {
              const width = prefersReducedMotion
                ? 0
                : (data.years[y] / maxYear) * 100;

              return `
                <div class="intel-row">
                  <span class="intel-year">${escapeHTML(y)}</span>
                  <i style="width:${width}%"></i>
                  <b>${escapeHTML(data.years[y])}</b>
                </div>
              `;
            })
            .join("")}
        </div>

        <div class="intel-divider"></div>

        <div class="intel-categories">
          ${Object.entries(data.categories)
            .map(
              ([k, v]) => `
                <div>
                  <strong>${escapeHTML(v)}</strong>
                  <span>${escapeHTML(k)}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  /* ================= UTIL ================= */

  function escapeHTML(v) {
    return String(v).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);
  }
})();
