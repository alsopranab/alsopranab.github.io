/**
 * GitHub Signal Dashboard — PRODUCTION
 * -----------------------------------
 * • Real GitHub data (alsopranab)
 * • Session cached
 * • Silent fail
 * • Zero layout coupling
 * • Scroll-activated
 * • Motion-safe
 */

(() => {
  "use strict";

  const USERNAME = "alsopranab";
  const CACHE_KEY = "GH::SIGNAL::v1";
  const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

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
      { threshold: 0.4 }
    );

    io.observe(el);
  }

  /* ===============================
     INIT
  =============================== */
  async function init(host) {
    const data = await getGitHubSignal();
    if (!data) return;

    render(host, data);
  }

  /* ===============================
     DATA
  =============================== */
  async function getGitHubSignal() {
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
      const res = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100`,
        { headers: { Accept: "application/vnd.github+json" } }
      );

      if (!res.ok) return null;

      const repos = await res.json();

      const now = Date.now();
      const activity = repos
        .map(r => new Date(r.updated_at).getTime())
        .filter(Boolean)
        .map(t => Math.max(0, 30 - Math.floor((now - t) / 86400000)));

      const languages = {};
      repos.forEach(r => {
        if (!r.language) return;
        languages[r.language] = (languages[r.language] || 0) + 1;
      });

      const payload = {
        repos: repos.length,
        activity,
        languages
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
  function render(host, data) {
    host.innerHTML = `
      <div class="github-signal-shell" data-hover>
        <header class="signal-header">
          <h3>Live Engineering Signal</h3>
          <span class="signal-status">Active</span>
        </header>

        <canvas class="signal-wave"></canvas>

        <div class="signal-metrics">
          <div>
            <strong>${data.repos}</strong>
            <span>Repositories</span>
          </div>
          <div>
            <strong>${Object.keys(data.languages).length}</strong>
            <span>Languages</span>
          </div>
        </div>

        <div class="signal-langs">
          ${Object.entries(data.languages)
            .slice(0, 5)
            .map(
              ([l, c]) =>
                `<span><i style="width:${Math.min(100, c * 14)}%"></i>${l}</span>`
            )
            .join("")}
        </div>
      </div>
    `;

    drawWave(
      host.querySelector(".signal-wave"),
      data.activity
    );
  }

  /* ===============================
     WAVE VISUAL
  =============================== */
  function drawWave(canvas, activity) {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w, h, raf;

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = 140 * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";

      activity.forEach((v, i) => {
        const x = (i / (activity.length - 1)) * canvas.offsetWidth;
        const y =
          70 +
          Math.sin(i * 0.6 + t) * (v * 0.6);

        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });

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
})();
