function renderContacts() {
  const app = document.getElementById("app");

  const { contact } = PROFILE;

  app.innerHTML = `
    <!-- HEADER -->
    <section>
      <h1>Contact</h1>
      <p class="muted">
        Reach out for opportunities, collaboration, or discussion.
        Email is the fastest way to connect.
      </p>
    </section>

    <!-- EMAIL COMPOSE -->
    <section>
      <h2>Email</h2>

      <div class="grid">
        <div class="card">
          <h3>Write an Email</h3>
          <p class="muted">Opens your email client with details filled in.</p>

          <form onsubmit="sendEmail(event)">
            <input
              type="text"
              id="emailSubject"
              value="Opportunity / Collaboration"
              required
              style="width:100%;margin-bottom:12px;"
            />

            <textarea
              id="emailBody"
              rows="6"
              required
              style="width:100%;margin-bottom:14px;"
            >Hi Pranab,

I came across your portfolio and would like to connect.

Regards,</textarea>

            <button type="submit">Send Email</button>
          </form>

          <p class="muted" style="margin-top:12px;">
            Or email directly: <strong>${contact.email}</strong>
          </p>
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
          `https://www.linkedin.com/in/${contact.linkedin}`
        )}

        ${profileCard(
          "GitHub",
          "Projects, code, and automation work",
          `https://github.com/${contact.github}`
        )}

        ${profileCard(
          "LeetCode",
          "Problem solving & DSA practice",
          `https://leetcode.com/${contact.social.leetcode}`
        )}

        ${profileCard(
          "HackerRank",
          "SQL & problem-solving practice",
          `https://www.hackerrank.com/${contact.social.hackerrank}`
        )}
      </div>
    </section>

    <!-- INSTAGRAM -->
    <section>
      <h2>Instagram</h2>

      <div class="grid">
        ${instagramQueryGuyCard(
          "The Query Guy",
          "Analytics tips & SQL content",
          contact.social.instagram_data
        )}

        ${profileCard(
          "Personal",
          "Personal updates & life",
          `https://www.instagram.com/${contact.social.instagram_personal}`
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

function instagramQueryGuyCard(title, desc, handle) {
  return `
    <div class="card">
      <img
        src="https://avatars.githubusercontent.com/u/62995713?v=4"
        alt="${title}"
        style="width:120px;height:120px;border-radius:50%;margin-bottom:14px;"
      />
      <h3>${title}</h3>
      <p class="muted">${desc}</p>
      <button onclick="window.open('https://www.instagram.com/${handle}', '_blank')">
        View Profile
      </button>
    </div>
  `;
}

/* =========================
   EMAIL HANDLER
========================= */

function sendEmail(e) {
  e.preventDefault();

  const subject = encodeURIComponent(
    document.getElementById("emailSubject").value
  );

  const body = encodeURIComponent(
    document.getElementById("emailBody").value
  );

  window.location.href =
    `mailto:${PROFILE.contact.email}?subject=${subject}&body=${body}`;
}
