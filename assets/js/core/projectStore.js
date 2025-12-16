import { fetchGitHubRepos } from "../services/github.js";
import { classifyProject } from "./projectClassifier.js";

let projects = [];
let groupedProjects = {};
let initialized = false;

/**
 * Initialize project store (RUN ONCE)
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

  // Build grouped map ONCE
  groupedProjects = projects.reduce((acc, project) => {
    const key = project.category || "Other";
    acc[key] = acc[key] || [];
    acc[key].push(project);
    return acc;
  }, {});
}

/**
 * Get all projects (flat list)
 */
export function getAllProjects() {
  return projects;
}

/**
 * Get projects grouped by category (REQUIRED BY ANALYTICS)
 */
export function getProjectsByCategory() {
  return groupedProjects;
}

/**
 * Get single project by ID
 */
export function getProjectById(id) {
  return projects.find(p => p.id === Number(id));
}
