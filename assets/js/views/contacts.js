// assets/js/views/contacts.js

function renderContacts() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="fade-in">
      <h1>Contact</h1>
      <p>You can reach me on the platforms below.</p>

      <div class="card">
        <p>
          <b>LinkedIn:</b>
          <a href="https://linkedin.com/in/pranab-dnath" target="_blank">
            linkedin.com/in/pranab-dnath
          </a>
        </p>

        <p>
          <b>GitHub:</b>
          <a href="https://github.com/alsopranab" target="_blank">
            github.com/alsopranab
          </a>
        </p>

        <p>
          <b>LeetCode:</b>
          <a href="https://leetcode.com/alsopranab" target="_blank">
            leetcode.com/alsopranab
          </a>
        </p>

        <p>
          <b>HackerRank:</b>
          <a href="https://hackerrank.com/alsopranab" target="_blank">
            hackerrank.com/alsopranab
          </a>
        </p>

        <p>
          <b>Instagram:</b>
          <a href="https://instagram.com/alsopranab" target="_blank">
            instagram.com/alsopranab
          </a>
        </p>
      </div>
    </section>
  `;
}

window.renderContacts = renderContacts;
