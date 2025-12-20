/**
 * GitHub Engineering Signal — FINAL PRODUCTION (LOCKED)
 * ====================================================
 * • Single source of truth
 * • Lazy-loaded
 * • Session cached (rate-limit safe)
 * • Motion-safe
 * • Visibility-safe
 * • Lifecycle-safe
 * • Silent fallback
 */

(() => {
  "use strict";

  const USERNAME = "alsopranab";
  const CACHE_KEY = `GH_SIGNAL_V1::${USERNAME}`;
  const CACHE_TTL = 30 * 60 * 1000;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let INITIALIZED = false;

  function boot() {
    if (INITIALIZED) return;
    INITIALIZED = true;

    const host = document.getElementById("github-dashboard");
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
    host.innerHTML = buildShell();

    const data = await getGitHubData();
    if (!data) {
      renderFallback(host);
      return;
    }

    renderMetrics(data);
    renderLanguages(data.languages);
    renderHeat(data.repos);
    drawWave(
      host.querySelector(".signal-wave"),
      data.activity
    );
  }

  /* ================= SHELL ================= */
  function buildShell() {
    return `
      <div class="github-signal-shell" data-omni-reveal data-hover>
        <header class="signal-header">
          <h3>Engineering Signal</h3>
          <span class="signal-status">LIVE · GitHub</span>
        </header>

        <canvas class="signal-wave"></canvas>

        <div class="signal-metrics">
          <div><strong id="gh-repos">—</strong><span>Repositories</span></div>
          <div><strong id="gh-commits">—</strong><span>Commits (est.)</span></div>
          <div><strong id="gh-years">—</strong><span>Active Years</span></div>
        </div>

        <div class="signal-divider"></div>

        <div class="signal-caption">Contribution Density</div>
        <div class="signal-heat" id="gh-heat"></div>

        <div class="signal-divider"></div>

        <div class="signal-caption">Primary Languages</div>
        <div class="signal-langs" id="gh-langs"></div>
      </div>
    `;
  }

  /* ================= DATA (CACHED) ================= */
  async function getGitHubData() {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.t < CACHE_TTL) {
          return parsed.d;
        }
      } catch {}
    }

    try {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), 4000);

      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`, {
          signal: ctrl.signal
        }),
        fetch(
          `https://api.github.com/users/${USERNAME}/repos?per_page=100`,
          { signal: ctrl.signal }
        )
      ]);

      if (!profileRes.ok || !reposRes.ok) return null;

      const profile = await profileRes.json();
      const repos = await reposRes.json();

      const languages = {};
      repos.forEach(r => {
        if (!r.language) return;
        languages[r.language] =
          (languages[r.language] || 0) + 1;
      });

      const activity = repos.map(r =>
        Math.max(
          0,
          30 -
            Math.floor(
              (Date.now() -
                new Date(r.updated_at).getTime()) /
                86400000
            )
        )
      );

      const payload = {
        repos: repos.length,
        years:
          new Date().getFullYear() -
          new Date(profile.created_at).getFullYear(),
        commits: repos.length * 120,
        languages,
        activity
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
  function renderMetrics(data) {
    document.getElementById("gh-repos").textContent =
      data.repos;
    document.getElementById("gh-years").textContent =
      data.years;
    document.getElementById("gh-commits").textContent =
      data.commits.toLocaleString() + "+";
  }

  function renderLanguages(languages) {
    const wrap = document.getElementById("gh-langs");
    Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([lang, count]) => {
        const span = document.createElement("span");
        span.textContent = lang;

        const bar = document.createElement("i");
        bar.style.width = `${Math.min(100, count * 16)}%`;

        span.appendChild(bar);
        wrap.appendChild(span);
      });
  }

  function renderHeat(repoCount) {
    const heat = document.getElementById("gh-heat");
    const density = Math.min(156, repoCount * 4);

    for (let i = 0; i < 156; i++) {
      const d = document.createElement("div");
      d.className =
        "signal-dot" + (i < density ? " active" : "");
      heat.appendChild(d);
    }
  }

  /* ================= WAVE ================= */
  function drawWave(canvas, activity) {
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let w = 0,
      h = 0,
      t = 0,
      raf = null,
      running = true;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width * dpr;
      h = canvas.height = 120 * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    let resizeRAF = null;
    window.addEventListener("resize", () => {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(() => {
        resize();
        resizeRAF = null;
      });
    });

    function frame() {
      if (!running) return;

      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();

      activity.forEach((v, i) => {
        const x =
          (i / (activity.length - 1)) *
          canvas.clientWidth;
        const y =
          60 +
          Math.sin(i * 0.6 + t) *
            (prefersReducedMotion ? 0 : v * 0.6);
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });

      ctx.strokeStyle = "rgba(255,255,255,0.75)";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (!prefersReducedMotion) {
        t += 0.015;
        raf = requestAnimationFrame(frame);
      }
    }

    frame();

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running && !prefersReducedMotion) frame();
      if (!running && raf) cancelAnimationFrame(raf);
    });
  }

  /* ================= FALLBACK ================= */
  function renderFallback(host) {
    const status = host.querySelector(".signal-status");
    if (status) status.textContent = "STATIC MODE";
  }
})();
