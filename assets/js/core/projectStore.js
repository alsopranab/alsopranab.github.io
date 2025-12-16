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

  let repos = [];

  try {
    const result = await fetchGitHubRepos();
    repos = Array.isArray(result) ? result : [];
  } catch (error) {
    console.warn("[ProjectStore] Failed to fetch repos", error);
    repos = [];
  }

  projects = repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    repo: repo.name, // used for code fetching
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    category: classifyProject(repo),
    url: repo.html_url
  }));
}

/**
 * Get all projects
 */
export function getAllProjects() {
  return projects;
}

/**
 * Get project by ID
 */
export function getProjectById(id) {
  return projects.find(p => p.id === Number(id));
}
