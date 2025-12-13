const username = "alsopranab";
const container = document.getElementById("projects");

fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
  .then(res => res.json())
  .then(repos => {
    repos
      .filter(repo =>
        !repo.fork &&
        repo.description &&
        !repo.name.includes("github.io")
      )
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${repo.name.replace(/-/g, " ")}</h3>
          <p>${repo.description}</p>
          <p><strong>Language:</strong> ${repo.language || "Multiple"}</p>
          <p>
            <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
          </p>
        `;

        container.appendChild(card);
      });
  })
  .catch(() => {
    container.innerHTML = "<p>Unable to load projects right now.</p>";
  });
