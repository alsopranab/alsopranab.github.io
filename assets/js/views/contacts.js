function renderContacts() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section>
      <h1>Contact</h1>
      <p class="muted">
        Reach out for opportunities, collaboration, or discussion.
        Email is the fastest way to connect.
      </p>
    </section>

    <!-- EMAIL -->
    <section>
      <div class="grid">
        <div class="card">
          <h3>Email</h3>
          <p class="muted">Direct communication</p>
          <p><strong>${PROFILE.email}</strong></p>
          <button onclick="openEmail()">
            Write Email
          </button>
        </div>
      </div>
    </section>

    <!-- PROFESSIONAL PROFILES -->
    <section>
      <h2>Professional Profiles</h2>
      <div class="grid">
        ${profileCard(
          "LinkedIn",
          "Professional background & experience",
          `https://www.linkedin.com/in/${PROFILE.linkedin}`
        )}

        ${profileCard(
          "GitHub",
          "Projects, code, and automation work",
          `https://github.com/${PROFILE.github}`
        )}

        ${profileCard(
          "LeetCode",
          "Problem solving & DSA practice",
          `https://leetcode.com/${PROFILE.social.leetcode}`
        )}

        ${profileCard(
          "HackerRank",
          "SQL & problem-solving practice",
          `https://www.hackerrank.com/${PROFILE.social.hackerrank}`
        )}
      </div>
    </section>

    <!-- INSTAGRAM -->
    <section>
      <h2>Instagram</h2>
      <div class="grid">
        ${profileCard(
          "The Query Guy",
          "Data analytics content & insights",
          `https://www.instagram.com/${PROFILE.social.instagram_data}`
        )}

        ${profileCard(
          "Personal",
          "Personal updates & life",
          `https://www.instagram.com/${PROFILE.social.instagram_personal}`
        )}
      </div>
    </section>
  `;
}

/* =========================
   HELPERS
========================= */

function profileCard(title, desc, link) {
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

function openEmail() {
  const subject = encodeURIComponent("Opportunity / Collaboration");
  const body = encodeURIComponent(
    "Hi Pranab,\n\nI came across your portfolio and would like to connect.\n\nRegards,"
  );

  window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
}
