/**
 * Global application configuration
 * READ-ONLY
 */
export const CONFIG = Object.freeze({
  owner: Object.freeze({
    name: "Pranab Debnath",
    designation: "Analytics • Data • Insights"
  }),

  github: Object.freeze({
    username: "alsopranab",

    // REST API (repos, metadata)
    apiBase: "https://api.github.com",

    // GraphQL API (contributions)
    graphql: "https://api.github.com/graphql",

    /**
     * ⚠️ IMPORTANT
     * Leave token EMPTY in production (GitHub Pages)
     * Use token ONLY in local development if needed
     */
    token: "",

    cacheTTL: 60 * 60 * 1000 // 1 hour
  }),

  leetcode: Object.freeze({
    username: "alsopranab",
    endpoint: "https://leetcode.com/graphql",
    enabled: false
  }),

  hackerrank: Object.freeze({
    username: "alsopranab",
    enabled: false
  }),

  routing: Object.freeze({
    defaultRoute: "intro"
  })
});
