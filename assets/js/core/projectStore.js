// core/projectStore.js

import { fetchGitHubRepos } from "../services/github.js";
import { classifyProject } from "./projectClassifier.js";

let projects = [];
let groupedProjects = {};

export async function initProjectStore() {
  const repos = await fetchGitHubRepos();

  projects = repos.map(repo => ({
    ...repo,
    category: classifyProject(repo)
  }));

  groupedProjects = projects.reduce((acc, project) => {
    const key = project.category || "Other";
    acc[key] = acc[key] || [];
    acc[key].push(project);
    return acc;
  }, {});
}

/**
 * All projects (classified)
 */
export function getAllProjects() {
  return projects;
}

/**
 * Projects grouped by category
 * - Categories with 0 items are excluded automatically
 */
export function getProjectsByCategory() {
  return groupedProjects;
}

/**
 * Single project lookup
 */
export function getProjectByName(name) {
  return projects.find(p => p.name === name);
}
