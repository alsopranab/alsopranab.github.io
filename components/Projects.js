import React from "react";
import CodeViewer from "./CodeViewer";

function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [activeCode, setActiveCode] = React.useState(null);

  // Best-effort icon resolver (ONLY option without manual config)
  const resolveIcon = (name = "", language = "") => {
    const n = name.toLowerCase();

    if (n.includes("uber") || n.includes("analytics")) return "bar-chart";
    if (n.includes("etl") || n.includes("automation")) return "activity";
    if (n.includes("sql")) return "database";
    if (n.includes("sentiment") || n.includes("nlp")) return "message-circle";
    if (language?.toLowerCase() === "python") return "bar-chart";
    if (language?.toLowerCase() === "javascript") return "shopping-cart";

    return "shopping-cart"; // visual-safe fallback
  };

  React.useEffect(() => {
    const load = async () => {
      try {
        const repoRes = await fetch(
          "https://api.github.com/users/alsopranab/repos?per_page=100"
        );
        const repos = await repoRes.json();

        const enriched = await Promise.all(
          repos
            .filter(r => !r.fork)
            .map(async repo => {
              let code = "// Preview not available";

              // Try README first (industry standard)
              try {
                const readme = await fetch(
                  `https://raw.githubusercontent.com/alsopranab/${repo.name}/main/README.md`
                );
                if (readme.ok) code = await readme.text();
              } catch {}

              return {
                title: repo.name,
                desc: repo.description || "No description provided.",
                tags: repo.language ? [repo.language] : ["Project"],
                icon: resolveIcon(repo.name, repo.language),
                demo: repo.html_url,
                codeSnippet: code,
                lang: repo.language?.toLowerCase() || "text",
                file: "README.md"
              };
            })
        );

        setProjects(enriched);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    };

    load();
  }, []);

  return (
    <section id="projects" className="section-padding">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="text-[var(--primary)]">02.</span> Featured Projects
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="card flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                <div className={`icon-${project.icon} text-2xl`} />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActiveCode(activeCode === idx ? null : idx)
                  }
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-800"
                >
                  View Code
                </button>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-800"
                >
                  Repo
                </a>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
            <p className="text-[var(--text-muted)] mb-6">{project.desc}</p>

            {activeCode === idx && (
              <CodeViewer
                code={project.codeSnippet}
                language={project.lang}
                title={project.file}
              />
            )}

            <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
              {project.tags.map(t => (
                <span key={t} className="text-xs px-3 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
