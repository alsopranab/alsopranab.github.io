export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  updated_at: string;
  stargazers_count: number;
}

const GITHUB_USERNAME = "alsopranab";

export async function fetchRepos(): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error("Failed to fetch repos");
    const data = await response.json();
    return data.filter((repo: any) => !repo.fork);
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
}

export async function fetchRepoReadme(repoName: string): Promise<string> {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/README.md`);
    if (!response.ok) {
      // Try 'master' if 'main' fails
      const fallback = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/master/README.md`);
      if (!fallback.ok) return "No README available.";
      return await fallback.text();
    }
    return await response.text();
  } catch (error) {
    return "Error loading README.";
  }
}
