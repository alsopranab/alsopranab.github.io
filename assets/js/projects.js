const repo = new URLSearchParams(location.search).get("repo");

fetch(`https://api.github.com/repos/alsopranab/${repo}`)
  .then(r => r.json())
  .then(d => {
    document.getElementById("title").textContent = d.name;
    document.getElementById("desc").textContent = d.description || "";
  });

fetch(`https://api.github.com/repos/alsopranab/${repo}/contents`)
  .then(r => r.json())
  .then(files => {
    files
      .filter(f => f.type === "dir")
      .forEach(f => {
        const div = document.createElement("div");
        div.className = "card";
        div.textContent = f.name;
        document.getElementById("folders").appendChild(div);
      });
  });
