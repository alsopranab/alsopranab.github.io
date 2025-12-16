// core/projectClassifier.js

export const PROJECT_CATEGORIES = {
  sql: {
    label: "SQL",
    keywords: [
      "sql",
      "postgres",
      "mysql",
      "query",
      "database",
      "cte",
      "window function"
    ]
  },

  data: {
    label: "Data Analysis",
    keywords: [
      "data",
      "analysis",
      "analytics",
      "pandas",
      "numpy",
      "eda",
      "visualization",
      "dashboard"
    ]
  },

  python: {
    label: "Python",
    keywords: [
      "python",
      "jupyter",
      "notebook",
      "ipynb"
    ]
  },

  ml: {
    label: "Machine Learning",
    keywords: [
      "machine learning",
      "ml",
      "model",
      "prediction",
      "training",
      "regression",
      "classification"
    ]
  },

  automation: {
    label: "Automation",
    keywords: [
      "automation",
      "script",
      "bot",
      "cron",
      "scraper"
    ]
  },

  web: {
    label: "Web",
    keywords: [
      "web",
      "frontend",
      "backend",
      "react",
      "html",
      "css",
      "javascript",
      "node",
      "express"
    ]
  }
};

/**
 * Classify a GitHub repository into a project category
 */
export function classifyProject(repo) {
  if (!repo) return "Other";

  const text = `
    ${repo.name || ""}
    ${repo.description || ""}
    ${(repo.topics || []).join(" ")}
    ${repo.language || ""}
  `.toLowerCase();

  for (const key in PROJECT_CATEGORIES) {
    const { keywords } = PROJECT_CATEGORIES[key];
    if (keywords.some(word => text.includes(word))) {
      return PROJECT_CATEGORIES[key].label;
    }
  }

  return "Other";
}
