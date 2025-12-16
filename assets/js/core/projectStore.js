import { fetchGitHubRepos } from "../services/github.js";
import { classifyProject } from "./projectClassifier.js";

let projects = [];
let initialized = false;

/**
 * Initialize project store (run once)
 */
export async function initProjectStore() {
  if (initialized) return;
  initialized = true;

  const repos = await fetchGitHubRepos();

  projects = repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    repo: repo.name, // used by githubCode.js
    description: repo.description,
    language: repo.language,
    stars: repo.stars,
    category: classifyProject(repo),
    url: repo.htmlUrl
  }));
}

/**
 * Get all projects
 */
export function getAllProjects() {
  return projects;
}

/**
 * Get single project by ID (REQUIRED)
 */
export function getProjectById(id) {
  return projects.find(
    project => project.id === Number(id)
  );
}
