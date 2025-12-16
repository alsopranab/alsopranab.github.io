import { CONFIG } from "../core/config.js";

/**
 * LeetCode is BLOCKED by browser CORS.
 * On GitHub Pages, we MUST short-circuit.
 * This prevents SPA crash.
 */
export async function fetchLeetCodeStats() {
  // Detect browser environment
  const isBrowser = typeof window !== "undefined";

  // 🚫 Skip fetch entirely in browser
  if (isBrowser) {
    console.warn(
      "[LeetCode] Browser CORS blocked. Skipping fetch."
    );

    return [
      { difficulty: "Easy", count: 0 },
      { difficulty: "Medium", count: 0 },
      { difficulty: "Hard", count: 0 }
    ];
  }

  // (This block is future-proof for server/proxy)
  try {
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

    return (
      json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? []
    );
  } catch (err) {
    console.warn("[LeetCode] Proxy fetch failed.", err);
    return [];
  }
}
