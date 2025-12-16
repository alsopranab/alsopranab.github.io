import { CONFIG } from "../core/config.js";

export async function fetchLeetCodeStats() {
  const query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const res = await fetch(CONFIG.leetcode.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { username: CONFIG.leetcode.username }
    })
  });

  const json = await res.json();
  return json.data.matchedUser.submitStatsGlobal.acSubmissionNum;
}
