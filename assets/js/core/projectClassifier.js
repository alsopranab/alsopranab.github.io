import { PROJECT_CATEGORIES } from "./projectCategories.js";

/**
 * Classify a GitHub repo into a category
 * - Uses name, description, language, topics
 * - Falls back to "others"
 */
export function classifyProject(repo) {
  if (!repo) return "others";

  const text = [
    repo.name,
    repo.description,
    repo.language,
    ...(repo.topics || [])
  ]
    .join(" ")
    .toLowerCase();

  for (const [key, config] of Object.entries(PROJECT_CATEGORIES)) {
    if (!config.keywords) continue;

    for (const keyword of config.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return key;
      }
    }
  }

  return "others";
}
