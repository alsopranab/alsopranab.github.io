import React from "react";
import CodeViewer from "./CodeViewer";

function Projects() {
  const [activeCode, setActiveCode] = React.useState(null);
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        // DEFINE YOUR PROJECTS (icons stay SAME)
        const baseProjects = [
          {
            title: "Uber-Data-Analysis",
            icon: "shopping-cart",
            repo: "Uber-Data-Analysis",
            lang: "python"
          },
          {
            title: "DynamicReport-ETL",
            icon: "users",
            repo: "DynamicReport-ETL",
            lang: "javascript"
          },
          {
            title: "SQL-Problems-Solutions",
            icon: "database",
            repo: "SQL-Problems-Solutions",
            lang: "sql"
          }
        ];

        const enriched = await Promise.all(
          baseProjects.map(async project => {
            // Repo metadata
            const repoRes = await fetch(
              `https://api.github.com/repos/alsopranab/${project.repo}`
            );
            const repoData = await repoRes.json();

            // README as code (SAFE)
            let code = "// Code preview not available";
            try {
              const readmeRes = await fetch(
                `https://raw.githubusercontent.com/alsopranab/${project.repo}/main/README.md`
              );
              if (readmeRes.ok) {
                code = await readmeRes.text();
              }
            } catch {}

            return {
              title: project.title,
              icon: project.icon,
              desc: repoData.description || "Project description not provided.",
              tags: repoData.language ? [repoData.language] : ["Project"],
              demo: repoData.html_url,
              codeSnippet: code,
              lang: project.lang,
              file: "README.md"
            };
          })
        );

        setProjects(enriched);
      } catch (err) {
        console.error("Project load failed", err);
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="projects" className="section-padding">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="text-[var(--primary)]">02.</span> Featured Projects
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="card group hover:-translate-y-2 transition-transform duration-300 flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-colors">
                <div className={`icon-${project.icon} text-2xl`} />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActiveCode(activeCode === idx ? null : idx)
                  }
                  className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-full ${
                    activeCode === idx
                      ? "bg-[var(--primary)] text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  <div className="icon-code text-sm" />
                  {activeCode === idx ? "Hide Code" : "View Code"}
                </button>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 text-slate-300"
                >
                  <div className="icon-external-link text-sm" />
                  Repo
                </a>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3">
              {project.title}
            </h3>

            <p className="text-[var(--text-muted)] mb-6">
              {project.desc}
            </p>

            {activeCode === idx && (
              <CodeViewer
                code={project.codeSnippet}
                language={project.lang}
                title={project.file}
              />
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-medium text-violet-200 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20"
                >
                  {tag}
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
