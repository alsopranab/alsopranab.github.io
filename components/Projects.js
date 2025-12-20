import React from "react";
import CodeViewer from "./CodeViewer"; // 🔴 REQUIRED IMPORT

function Projects() {
  const [activeCode, setActiveCode] = React.useState(null);
  const [projects, setProjects] = React.useState([]);

  // ICON BASED ONLY ON PROJECT NAME (STABLE)
  const resolveIconByName = (name = "") => {
    const n = name.toLowerCase();

    if (n.includes("uber") || n.includes("analytics") || n.includes("analysis"))
      return "bar-chart";

    if (
      n.includes("etl") ||
      n.includes("automation") ||
      n.includes("report") ||
      n.includes("processor")
    )
      return "activity";

    if (n.includes("sql") || n.includes("database"))
      return "database";

    if (n.includes("sentiment") || n.includes("nlp"))
      return "message-circle";

    if (n.includes("leetcode") || n.includes("algorithm"))
      return "code";

    return "shopping-cart"; // fallback (same as before)
  };

  React.useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/alsopranab/repos?per_page=100",
          {
            headers: {
              Accept: "application/vnd.github+json"
            }
          }
        );

        const data = await res.json();

        if (!Array.isArray(data)) return;

        const formatted = data
          .filter(repo => repo && !repo.fork)
          .sort(
            (a, b) =>
              new Date(b.updated_at || 0) -
              new Date(a.updated_at || 0)
          )
          .map(repo => ({
            title: repo.name || "Untitled Project",
            desc:
              repo.description ||
              "Project focused on analytics, automation, and data processing.",
            tags:
              Array.isArray(repo.topics) && repo.topics.length > 0
                ? repo.topics
                : repo.language
                ? [repo.language]
                : ["Project"],
            icon: resolveIconByName(repo.name),
            demo: repo.html_url || "#",

            // CodeViewer SAFE placeholders
            codeSnippet:
              "// Full source code available in the GitHub repository.",
            lang: repo.language
              ? repo.language.toLowerCase()
              : "text",
            file: "README.md"
          }));

        setProjects(formatted);
      } catch (err) {
        console.error("GitHub fetch failed:", err);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section
      id="projects"
      className="section-padding"
      data-name="projects"
      data-file="components/Projects.js"
    >
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
                <div className={`icon-${project.icon} text-2xl`}></div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActiveCode(activeCode === idx ? null : idx)
                  }
                  className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-full transition-all ${
                    activeCode === idx
                      ? "bg-[var(--primary)] text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <div className="icon-code text-sm"></div>
                  {activeCode === idx ? "Hide Code" : "View Code"}
                </button>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                >
                  <div className="icon-external-link text-sm"></div>
                  Repo
                </a>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
              {project.title}
            </h3>

            <p className="text-[var(--text-muted)] mb-6">
              {project.desc}
            </p>

            {activeCode === idx && (
              <div className="mb-6 animate-fade-in-up">
                <CodeViewer
                  code={project.codeSnippet}
                  language={project.lang}
                  title={project.file}
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-medium text-violet-200 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20 hover:border-violet-500/50 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://github.com/alsopranab"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline inline-flex items-center gap-2 group"
        >
          View Full Project Archive
          <div className="icon-arrow-right group-hover:translate-x-1 transition-transform"></div>
        </a>
      </div>
    </section>
  );
}

export default Projects;
