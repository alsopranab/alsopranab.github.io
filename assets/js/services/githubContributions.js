import { CONFIG } from "../core/config.js";
import { store } from "../core/store.js";

/**
 * Fetch GitHub contribution calendar
 * Uses GitHub GraphQL API (official, stable)
 */
export async function fetchGitHubContributions() {
  return store.cached(
    "github_contributions",
    1000 * 60 * 60 * 6, // 6 hours
    async () => {
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
        throw new Error("GitHub GraphQL failed");
      }

      const json = await res.json();

      const weeks =
        json?.data?.user?.contributionsCollection
          ?.contributionCalendar?.weeks || [];

      // Flatten into array
      return weeks.flatMap(w =>
        w.contributionDays.map(d => ({
          date: d.date,
          count: d.contributionCount
        }))
      );
    }
  );
}
