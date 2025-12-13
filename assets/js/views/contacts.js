function renderContacts() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Contact</h1>
      <p class="muted">
        Reach out for opportunities, collaboration, or discussion.
        I respond fastest via email.
      </p>
    </section>

    <!-- PRIMARY CONTACT -->
    <section>
      <div class="grid">
        <div class="card">
          <h3>Email</h3>
          <p class="muted">Direct communication</p>
          <p><strong>career.pranab@gmail.com</strong></p>
          <button onclick="location.href='mailto:career.pranab@gmail.com'">
            Write Email
          </button>
        </div>
      </div>
    </section>

    <!-- PROFESSIONAL PROFILES -->
    <section>
      <h2>Professional Profiles</h2>

      <div class="grid">
        ${contactCard(
          "LinkedIn",
          "Professional background & experience",
          "https://www.linkedin.com/in/pranab-dnath"
        )}

        ${contactCard(
          "GitHub",
          "Projects, code, and automation work",
          "https://github.com/alsopranab"
        )}

        ${contactCard(
          "LeetCode",
          "Problem solving & DSA practice",
          "https://leetcode.com/alsopranab"
        )}

        ${contactCard(
          "HackerRank",
          "SQL & problem-solving practice",
          "https://www.hackerrank.com/alsopranab"
        )}
      </div>
    </section>

    <!-- INSTAGRAM -->
    <section>
      <h2>Instagram</h2>

      <div class="grid">
        ${contactCard(
          "The Query Guy",
          "Data analytics content & insights",
          "https://www.instagram.com/the.queryguy"
        )}

        ${contactCard(
          "Personal",
          "Personal updates & life",
          "https://www.instagram.com/alsopranab"
        )}
      </div>
    </section>
  `;

  app.classList.add("fade-in");
}

/* =========================
   HELPERS
========================= */

function contactCard(title, desc, link) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p class="muted">${desc}</p>
      <button onclick="window.open('${link}', '_blank')">
        Open
      </button>
    </div>
  `;
}
