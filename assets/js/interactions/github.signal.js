(() => {
  "use strict";

  const USERNAME = "alsopranab";
  const TARGET = document.getElementById("github-dashboard");

  if (!TARGET) return;

  /* =======================
     BUILD SHELL
  ======================= */

  TARGET.innerHTML = `
    <div class="github-signal-shell" data-reveal data-hover>
      <div class="signal-header">
        <h3>Engineering Signal</h3>
        <div class="signal-status">LIVE · GitHub</div>
      </div>

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

  /* =======================
     FETCH DATA
  ======================= */

  Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`)
  ])
    .then(r => Promise.all(r.map(x => x.json())))
    .then(([profile, repos]) => {
      renderMetrics(profile, repos);
      renderLanguages(repos);
      renderHeat(repos);
      renderWave(repos.length);
    })
    .catch(() => {
      renderFallback();
    });

  /* =======================
     METRICS
  ======================= */

  function renderMetrics(profile, repos) {
    document.getElementById("gh-repos").textContent = repos.length;
    document.getElementById("gh-years").textContent =
      new Date().getFullYear() - new Date(profile.created_at).getFullYear();

    // Approx commit signal
    document.getElementById("gh-commits").textContent =
      repos.length * 120 + "+";
  }

  /* =======================
     LANG FLOW
  ======================= */

  function renderLanguages(repos) {
    const map = {};
    repos.forEach(r => {
      if (!r.language) return;
      map[r.language] = (map[r.language] || 0) + 1;
    });

    const sorted = Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const wrap = document.getElementById("gh-langs");
    sorted.forEach(([lang]) => {
      const el = document.createElement("span");
      el.innerHTML = `${lang}<i></i>`;
      wrap.appendChild(el);
    });
  }

  /* =======================
     HEAT MAP (ABSTRACT)
  ======================= */

  function renderHeat(repos) {
    const heat = document.getElementById("gh-heat");
    const density = Math.min(160, repos.length * 4);

    for (let i = 0; i < 156; i++) {
      const d = document.createElement("div");
      d.className = "signal-dot" + (i < density ? " active" : "");
      heat.appendChild(d);
    }
  }

  /* =======================
     SIGNAL WAVE
  ======================= */

  function renderWave(intensity) {
    const c = document.querySelector(".signal-wave");
    const ctx = c.getContext("2d");

    function resize() {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.beginPath();

      for (let x = 0; x < c.width; x++) {
        const y =
          c.height / 2 +
          Math.sin(x * 0.02 + t) *
            Math.min(24, intensity);

        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "rgba(255,255,255,.45)";
      ctx.lineWidth = 2;
      ctx.stroke();

      t += 0.03;
      requestAnimationFrame(draw);
    }

    draw();
  }

  /* =======================
     FALLBACK
  ======================= */

  function renderFallback() {
    TARGET.querySelector(".signal-status").textContent = "STATIC MODE";
  }
})();
