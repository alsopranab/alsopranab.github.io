export async function fetchGitHubContributions() {
  try {
    const res = await fetch("./assets/data/contributions.json");
    if (!res.ok) throw new Error("No data");
    return await res.json();
  } catch {
    return [];
  }
}
