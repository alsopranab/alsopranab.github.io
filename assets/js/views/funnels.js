function renderFunnels() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Career Funnel</h1>
      <p>
        How my professional experience converts into skills,
        projects, and real business impact.
      </p>
    </section>

    <section class="funnel">
      <!-- EXPERIENCE -->
      <div class="card funnel-stage" onclick="toggleFunnel(this)">
        <h2>Experience</h2>
        <p>Where real-world problems come from</p>

        <div class="funnel-details">
          <ul>
            <li>MagicBricks — Client & site-visit analytics</li>
            <li>NoBroker — Revenue, conversion & team performance</li>
            <li>Daily operational reporting & tracking</li>
          </ul>
        </div>
      </div>

      <div class="funnel-arrow">↓</div>

      <!-- SKILLS -->
      <div class="card funnel-stage" onclick="toggleFunnel(this)">
        <h2>Skills</h2>
        <p>Tools used to solve those problems</p>

        <div class="funnel-details">
          <ul>
            <li>SQL — joins, CTEs, window functions</li>
            <li>Python — EDA, automation, scripting</li>
            <li>Excel — dashboards & KPI models</li>
            <li>Business analysis — funnels & metrics</li>
          </ul>
        </div>
      </div>

      <div class="funnel-arrow">↓</div>

      <!-- PROJECTS -->
      <div class="card funnel-stage" onclick="toggleFunnel(this)">
        <h2>Projects</h2>
        <p>Hands-on implementation</p>

        <div class="funnel-details">
          <ul>
            <li>SQL problem repositories</li>
            <li>Titanic survival prediction (Python)</li>
            <li>Email & report automation scripts</li>
          </ul>

          <button onclick="location.hash='#/projects'">
            View Projects
          </button>
        </div>
      </div>

      <div class="funnel-arrow">↓</div>

      <!-- IMPACT -->
      <div class="card funnel-stage" onclick="toggleFunnel(this)">
        <h2>Impact</h2>
        <p>What changed because of the work</p>

        <div class="funnel-details">
          <ul>
            <li>~15% monthly revenue growth at NoBroker</li>
            <li>Improved lead-to-visit visibility</li>
            <li>Reduced manual reporting effort</li>
          </ul>

          <button onclick="location.hash='#/dashboard'">
            View Dashboard
          </button>
        </div>
      </div>
    </section>
  `;
}

/* TOGGLE FUNNEL STAGES */
function toggleFunnel(stage) {
  stage.classList.toggle("active");
}
