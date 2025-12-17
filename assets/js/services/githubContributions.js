import { CONFIG } from "../core/config.js";
import { store } from "../core/store.js";

/**
 * Fetch GitHub contribution calendar (SAFE)
 * - Uses GraphQL if token exists
 * - Falls back silently if not available
 * - NEVER crashes analytics page
 */
export async function fetchGitHubContributions() {
  // 🔒 Hard guard: token required
  if (!CONFIG.github.token) {
    console.warn(
      "[GitHub] No token provided. Contribution heatmap disabled."
    );
    return [];
  }

  return store.cached(
    "github_contributions",
    1000 * 60 * 60 * 6, // 6 hours
    async () => {
      try {
        const query = `
          query ($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await fetch(CONFIG.github.graphql, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CONFIG.github.token}`
          },
          body: JSON.stringify({
            query,
            variables: { login: CONFIG.github.username }
          })
        });

        if (!res.ok) {
          throw new Error(`GitHub GraphQL HTTP ${res.status}`);
        }

        const json = await res.json();

        const weeks =
          json?.data?.user?.contributionsCollection
            ?.contributionCalendar?.weeks || [];

        return weeks.flatMap(week =>
          week.contributionDays.map(day => ({
            date: day.date,
            count: day.contributionCount
          }))
        );
      } catch (error) {
        console.warn(
          "[GitHub] Failed to load contributions",
          error
        );
        return [];
      }
    }
  );
}
