import { CONFIG } from "../core/config.js";
import { store } from "../core/store.js";

export async function fetchRepoTree(repo) {
  const res = await fetch(
    `${CONFIG.github.apiBase}/repos/${CONFIG.github.username}/${repo}/contents`
  );
  return res.json();
}

export async function fetchFileContent(repo, path) {
  return store.cached(
    `code_${repo}_${path}`,
    CONFIG.github.cacheTTL,
    async () => {
      const res = await fetch(
        `${CONFIG.github.apiBase}/repos/${CONFIG.github.username}/${repo}/contents/${path}`
      );
      const data = await res.json();
      return atob(data.content);
    }
  );
}
