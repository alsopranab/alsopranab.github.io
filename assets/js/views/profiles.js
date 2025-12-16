import { CONFIG } from "../core/config.js";

export async function ProfilesView(container) {
  const githubUser = CONFIG?.github?.username;
  const leetcodeUser = CONFIG?.leetcode?.username;
  const hackerrankUser = CONFIG?.hackerrank?.username;

  container.innerHTML = `
    <section>
      <h2>Profiles</h2>

      <div>
        ${
          githubUser
            ? `<a href="https://github.com/${githubUser}" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>`
            : `<span>GitHub profile not configured</span>`
        }
      </div>

      <div>
        ${
          leetcodeUser
            ? `<a href="https://leetcode.com/${leetcodeUser}" target="_blank" rel="noopener noreferrer">
                LeetCode
              </a>`
            : `<span>LeetCode profile not available</span>`
        }
      </div>

      <div>
        ${
          hackerrankUser
            ? `<a href="https://www.hackerrank.com/${hackerrankUser}" target="_blank" rel="noopener noreferrer">
                HackerRank
              </a>`
            : `<span>HackerRank profile not available</span>`
        }
      </div>
    </section>
  `;
}
