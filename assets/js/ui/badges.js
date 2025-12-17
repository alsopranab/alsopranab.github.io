/**
 * Render README-style badges safely
 * - No API calls
 * - No secrets
 * - Auto-updating
 */
export function renderBadges(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="badges-grid">

      <!-- Profile Views -->
      <div class="badge-block">
        <img
          src="https://komarev.com/ghpvc/?username=alsopranab&style=for-the-badge&color=006400&label=PROFILE+VIEWS"
          alt="Profile Views"
        />
      </div>

      <!-- HackerRank -->
      <div class="badge-block">
        <a href="https://www.hackerrank.com/profile/alsopranab" target="_blank">
          <img
            src="https://img.shields.io/badge/HackerRank-SQL%20Gold-0d1117?style=for-the-badge&logo=hackerrank&logoColor=00ff99"
          />
        </a>

        <img
          src="https://img.shields.io/badge/58%20%2F%2058%20Problems-Solved-0d1117?style=flat-square&color=006400"
        />

        <img
          src="https://img.shields.io/badge/World%20Rank-1%20in%20SQL-0d1117?style=flat-square&color=006400"
        />
      </div>

      <!-- LeetCode -->
      <div class="badge-block">
        <a href="https://leetcode.com/u/alsopranab/" target="_blank">
          <img
            src="https://leetcard.jacoblin.cool/alsopranab?theme=dark&border=0&radius=12&hide=rating,heatmap,calendar&bg=0d1117"
          />
        </a>
      </div>

      <!-- GitHub -->
      <div class="badge-block">
        <a href="https://github.com/alsopranab" target="_blank">
          <img
            src="https://img.shields.io/badge/GitHub-Visit%20Profile-0d1117?style=for-the-badge&logo=github&logoColor=white"
          />
        </a>

        <img
          src="https://img.shields.io/badge/Projects-Data%20Analysis-1f6feb?style=flat-square&logo=github&logoColor=white"
        />

        <img
          src="https://img.shields.io/badge/Projects-SQL%20Practice-238636?style=flat-square&logo=github&logoColor=white"
        />
      </div>

      <!-- LinkedIn -->
      <div class="badge-block">
        <a href="https://www.linkedin.com/in/alsopranab/" target="_blank">
          <img
            src="https://img.shields.io/badge/LinkedIn-Visit%20Profile-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"
          />
        </a>

        <img
          src="https://img.shields.io/badge/Connections-500%2B-0A66C2?style=flat-square&logo=linkedin&logoColor=white"
        />

        <img
          src="https://img.shields.io/badge/Skills-SQL%20%7C%20Data%20Analysis-0A66C2?style=flat-square&logo=linkedin&logoColor=white"
        />
      </div>

    </div>
  `;
}
