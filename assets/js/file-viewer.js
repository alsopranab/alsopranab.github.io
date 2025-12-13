const p = new URLSearchParams(location.search);
const repo = p.get("repo");
const path = p.get("path");

document.getElementById("file-name").textContent = path;

fetch(`https://api.github.com/repos/${repo}/contents/${path}`)
  .then(r => r.json())
  .then(d => {
    let code = atob(d.content);
    code = highlight(code);
    document.getElementById("code").innerHTML = code;
  });

function highlight(code) {
  return code
    .replace(/(SELECT|FROM|WHERE|JOIN|GROUP BY|ORDER BY)/gi, `<span style="color:#38bdf8">$1</span>`)
    .replace(/(--.*)/g, `<span style="color:#9ca3af">$1</span>`)
    .replace(/('[^']*')/g, `<span style="color:#22c55e">$1</span>`);
}
