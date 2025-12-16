import { classifyProject } from "./projectClassifier.js";

export function normalizeProjects(repos) {
  return repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    category: classifyProject(repo)
  }));
}
