/**
 * GitHub Engineering Signal — FINAL PRODUCTION BUILD
 * =================================================
 * • Single source of truth
 * • Lazy-loaded (IntersectionObserver)
 * • Session cached (rate-limit safe)
 * • Motion-safe (reduced motion respected)
 * • Zero dependency on layout order
 * • Silent fallback
 */

(() => {
  "use strict";

  const USERNAME = "alsopranab";
  const CACHE_KEY = "GH_SIGNAL_V1";
  const CACHE_TTL = 30 * 60 * 1000; // 30 min

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===============================
     APP READY
  =============================== */
  window.addEventListener("app:ready", () => {
    const host = document.getElementById("github-dashboard");
    if (!host) return;

    observe(host);
  });

  /* ===============================
     VISIBILITY GATE
  =============================== */
  function observe(el) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          io.disconnect();
          init(el);
        });
      },
      { threshold: 0.35 }
    );

    io.observe(el);
  }

  /* ===============================
     INIT
  =============================== */
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
    drawWave(host.querySelector(".signal-wave"), data.activity);
  }

  /* ===============================
     SHELL
  =============================== */
  function buildShell() {
    return `
      <div class="github-signal-shell" data-reveal data-hover>
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

  /* ===============================
     DATA (CACHED)
  =============================== */
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
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`),
        fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`)
      ]);

      if (!profileRes.ok || !reposRes.ok) return null;

      const profile = await profileRes.json();
      const repos = await reposRes.json();

      const languages = {};
      repos.forEach(r => {
        if (!r.language) return;
        languages[r.language] = (languages[r.language] || 0) + 1;
      });

      const activity = repos
        .map(r => new Date(r.updated_at).getTime())
        .map(t => Math.max(0, 30 - Math.floor((Date.now() - t) / 86400000)));

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

  /* ===============================
     RENDER
  =============================== */
  function renderMetrics(data) {
    document.getElementById("gh-repos").textContent = data.repos;
    document.getElementById("gh-years").textContent = data.years;
    document.getElementById("gh-commits").textContent =
      data.commits.toLocaleString() + "+";
  }

  function renderLanguages(languages) {
    const wrap = document.getElementById("gh-langs");
    Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([lang, count]) => {
        const el = document.createElement("span");
        el.innerHTML = `${lang}<i style="width:${Math.min(
          100,
          count * 16
        )}%"></i>`;
        wrap.appendChild(el);
      });
  }

  function renderHeat(repoCount) {
    const heat = document.getElementById("gh-heat");
    const density = Math.min(156, repoCount * 4);

    for (let i = 0; i < 156; i++) {
      const d = document.createElement("div");
      d.className = "signal-dot" + (i < density ? " active" : "");
      heat.appendChild(d);
    }
  }

  /* ===============================
     WAVE (GPU SAFE)
  =============================== */
  function drawWave(canvas, activity) {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w, h, raf;
    let t = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = 120 * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();

      activity.forEach((v, i) => {
        const x = (i / (activity.length - 1)) * canvas.offsetWidth;
        const y = 60 + Math.sin(i * 0.6 + t) * (v * 0.6);
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });

      ctx.strokeStyle = "rgba(255,255,255,0.75)";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (!prefersReducedMotion) {
        t += 0.015;
        raf = requestAnimationFrame(draw);
      }
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
  }

  /* ===============================
     FALLBACK
  =============================== */
  function renderFallback(host) {
    const status = host.querySelector(".signal-status");
    if (status) status.textContent = "STATIC MODE";
  }
})();
