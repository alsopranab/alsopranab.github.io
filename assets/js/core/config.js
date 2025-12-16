/**
 * Global application configuration
 * This object is treated as READ-ONLY
 */
export const CONFIG = Object.freeze({
  owner: Object.freeze({
    name: "Pranab Debnath",
    designation: "Analytics • Data • Insights"
  }),

  github: Object.freeze({
    username: "alsopranab",
    apiBase: "https://api.github.com",
    cacheTTL: 60 * 60 * 1000 // 1 hour
  }),

  leetcode: Object.freeze({
    username: "alsopranab",
    // Direct browser access is blocked by CORS
    // Proxy endpoint will be plugged in later
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
