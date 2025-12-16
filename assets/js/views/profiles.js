import { CONFIG } from "../core/config.js";

export async function ProfilesView(container) {
  container.innerHTML = `
    <section>
      <h2>Profiles</h2>

      <div>
        <a href="https://github.com/${CONFIG.github.username}" target="_blank">
          GitHub
        </a>
      </div>

      <div>
        <a href="https://leetcode.com/${CONFIG.leetcode.username}" target="_blank">
          LeetCode
        </a>
      </div>

      <div>
        <a href="https://www.hackerrank.com/${CONFIG.hackerrank.username}" target="_blank">
          HackerRank
        </a>
      </div>
    </section>
  `;
}
