export function ProfilesView(container) {
  if (!container) return;

  container.innerHTML = `
    <section class="profiles">

      <header class="profiles-header" data-reveal>
        <h1>Social Profiles</h1>
        <p>Professional & data-focused platforms</p>
      </header>

      <div class="profiles-grid" data-reveal>
        <a class="profile-item" href="https://linkedin.com/in/alsopranab" target="_blank" rel="noopener">
          <span class="icon linkedin"></span>
          <span class="handle">@alsopranab</span>
        </a>

        <a class="profile-item" href="https://github.com/alsopranab" target="_blank" rel="noopener">
          <span class="icon github"></span>
          <span class="handle">@alsopranab</span>
        </a>

        <a class="profile-item" href="https://leetcode.com/alsopranab" target="_blank" rel="noopener">
          <span class="icon leetcode"></span>
          <span class="handle">@alsopranab</span>
        </a>

        <a class="profile-item" href="https://hackerrank.com/alsopranab" target="_blank" rel="noopener">
          <span class="icon hackerrank"></span>
          <span class="handle">@alsopranab</span>
        </a>

        <a class="profile-item" href="https://datalemur.com/profile/alsopranab" target="_blank" rel="noopener">
          <span class="icon datalemur"></span>
          <span class="handle">@alsopranab</span>
        </a>

        <a class="profile-item" href="https://instagram.com/the.queryguy" target="_blank" rel="noopener">
          <span class="icon instagram"></span>
          <span class="handle">the.queryguy</span>
        </a>

        <a class="profile-item" href="https://kaggle.com/pranabdn" target="_blank" rel="noopener">
          <span class="icon kaggle"></span>
          <span class="handle">@pranabdn</span>
        </a>
      </div>

    </section>
  `;
}
