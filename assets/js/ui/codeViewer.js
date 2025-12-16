import { fetchRepoTree, fetchFileContent } from "../services/githubCode.js";

export async function loadProjectCode(container, repo) {
  const tree = await fetchRepoTree(repo);

  // You will wire this to UI later
  return tree;
}

export async function loadFile(repo, path) {
  return await fetchFileContent(repo, path);
}
