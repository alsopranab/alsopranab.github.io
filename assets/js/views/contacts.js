function renderContacts() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Contact</h1>
      <p>
        I’m open to discussions around data analytics roles,
        automation projects, and learning collaborations.
      </p>
    </section>

    <section>
      <h2>Connect With Me</h2>

      <div class="grid">
        <div class="card">
          <h3>LinkedIn</h3>
          <p>Professional profile & experience.</p>
          <button onclick="window.open('https://www.linkedin.com/in/pranab-dnath','_blank')">
            Open LinkedIn
          </button>
        </div>

        <div class="card">
          <h3>GitHub</h3>
          <p>All projects, SQL practice, and automation code.</p>
          <button onclick="window.open('https://github.com/alsopranab','_blank')">
            Open GitHub
          </button>
        </div>

        <div class="card">
          <h3>Email</h3>
          <p>For direct communication.</p>
          <button onclick="window.location.href='mailto:alsopranab@gmail.com'">
            Send Email
          </button>
        </div>

        <div class="card">
          <h3>Location</h3>
          <p>Bangalore, India</p>
          <p style="color: var(--muted);">
            Open to relocation & remote roles
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2>What I’m Looking For</h2>
      <div class="grid">
        <div class="card">
          <h3>Roles</h3>
          <ul>
            <li>Data Analyst</li>
            <li>Business Analyst</li>
            <li>Analytics-focused roles</li>
          </ul>
        </div>

        <div class="card">
          <h3>Work Type</h3>
          <ul>
            <li>Full-time</li>
            <li>Contract / Freelance</li>
            <li>Remote / Hybrid</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}
