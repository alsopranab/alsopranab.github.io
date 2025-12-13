function renderContacts() {
  const app = document.getElementById("app");

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
          <p class="muted">This will open your email client with details filled in.</p>

          <form onsubmit="sendEmail(event)">
            <input
              type="text"
              id="emailSubject"
              placeholder="Subject"
              value="Opportunity / Collaboration"
              required
              style="width:100%;margin-bottom:12px;"
            />

            <textarea
              id="emailBody"
              rows="6"
              placeholder="Write your message here..."
              required
              style="width:100%;margin-bottom:14px;"
            >Hi Pranab,

I came across your portfolio and would like to connect.

Regards,</textarea>

            <button type="submit">Send Email</button>
          </form>

          <p class="muted" style="margin-top:12px;">
            Or email directly: <strong>${PROFILE.email}</strong>
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
        ${instagramCard(
          "The Query Guy",
          "Analytics tips & SQL content",
          PROFILE.social.instagram_data,
          "https://raw.githubusercontent.com/alsopranab/alsopranab.github.io/main/assets/img/instagram-queryguy.jpg"
        )}

        ${instagramCard(
          "Personal",
          "Life & behind-the-scenes",
          PROFILE.social.instagram_personal,
          "https://raw.githubusercontent.com/alsopranab/alsopranab.github.io/main/assets/img/instagram-personal.jpg"
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

function instagramCard(title, desc, handle, img) {
  return `
    <div class="card">
      <img
        src="${img}"
        alt="${title}"
        style="width:100%;border-radius:14px;margin-bottom:12px;"
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

  window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
}
