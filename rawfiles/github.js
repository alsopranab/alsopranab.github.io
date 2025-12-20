async function fetchGitHubData(username) {
    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const user = await userResponse.json();
        
        // Fetch repos to calculate languages or other stats if needed, simplified for now
        // const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        // const repos = await reposResponse.json();

        if (user.message === "Not Found") {
            throw new Error("User not found");
        }

        return {
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            name: user.name,
            bio: user.bio,
            login: user.login
        };
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
        return null;
    }
}