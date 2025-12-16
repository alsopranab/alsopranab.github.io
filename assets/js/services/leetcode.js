import { CONFIG } from "../core/config.js";

/**
 * Fetch LeetCode stats.
 * NOTE:
 * - Direct browser calls to leetcode.com are BLOCKED by CORS
 * - This function MUST NOT crash the app
 * - Proxy can be plugged in later without changing callers
 */
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

  try {
    const res = await fetch(CONFIG.leetcode.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables: { username: CONFIG.leetcode.username }
      })
    });

    // If fetch somehow succeeds (proxy / non-browser)
    const json = await res.json();

    return (
      json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? []
    );
  } catch (error) {
    // IMPORTANT: Never crash the SPA
    console.warn(
      "[LeetCode] Blocked by CORS or network. Returning fallback.",
      error
    );

    // Safe fallback shape
    return [
      { difficulty: "Easy", count: 0 },
      { difficulty: "Medium", count: 0 },
      { difficulty: "Hard", count: 0 }
    ];
  }
}
