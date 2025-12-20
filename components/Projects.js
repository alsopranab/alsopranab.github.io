import React from "react";
import CodeViewer from "./CodeViewer"; 

function Projects() {
    const [activeCode, setActiveCode] = React.useState(null);
    const [projects, setProjects] = React.useState([]);

    const resolveIcon = ({ name = "", desc = "", code = "" }) => {
        const text = `${name} ${desc} ${code}`.toLowerCase();

        if (text.includes("sql") || text.includes("database") || text.includes("query"))
            return "database";
        if (text.includes("etl") || text.includes("automation") || text.includes("pipeline"))
            return "activity";
        if (text.includes("analysis") || text.includes("analytics") || text.includes("eda"))
            return "bar-chart";
        if (text.includes("model") || text.includes("ml") || text.includes("prediction"))
            return "users";
        if (text.includes("sentiment") || text.includes("nlp"))
            return "message-circle";
        if (text.includes("api") || text.includes("javascript"))
            return "code";

        return "folder";
    };

    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const repoRes = await fetch(
                    "https://api.github.com/users/alsopranab/repos?per_page=100"
                );
                const repos = await repoRes.json();

                // 🔒 HARD GUARD
                if (!Array.isArray(repos)) return;

                const supportedExt = ["js", "py", "sql", "ipynb"];

                const allProjects = await Promise.all(
                    repos
                        .filter(repo => repo && !repo.fork)
                        .map(async repo => {
                            let codeSnippet = "";
                            let fileName = "";
                            let lang = "text";

                            try {
                                const contentRes = await fetch(
                                    `https://api.github.com/repos/alsopranab/${repo.name}/contents`
                                );
                                const contents = await contentRes.json();

                                if (!Array.isArray(contents)) return null;

                                const codeFile = contents.find(
                                    item =>
                                        item.type === "file" &&
                                        supportedExt.includes(
                                            item.name.split(".").pop()
                                        )
                                );

                                if (!codeFile?.download_url) return null;

                                const rawRes = await fetch(codeFile.download_url);
                                codeSnippet = await rawRes.text();

                                fileName = codeFile.name;
                                lang = fileName.split(".").pop();
                            } catch {
                                return null;
                            }

                            return {
                                title: repo.name,
                                desc:
                                    repo.description ||
                                    "Project focused on analytics and automation.",
                                tags: repo.language ? [repo.language] : ["Project"],
                                icon: resolveIcon({
                                    name: repo.name,
                                    desc: repo.description,
                                    code: codeSnippet
                                }),
                                codeSnippet,
                                lang,
                                file: fileName,
                                updated: repo.updated_at
                            };
                        })
                );

                const bestFour = allProjects
                    .filter(Boolean)
                    .sort((a, b) => new Date(b.updated) - new Date(a.updated))
                    .slice(0, 4);

                setProjects(bestFour);
            } catch (err) {
                console.error("Projects fetch failed:", err);
            }
        };

        fetchProjects();
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
                            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                                <div className={`icon-${project.icon} text-2xl`} />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        setActiveCode(activeCode === idx ? null : idx)
                                    }
                                    className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300"
                                >
                                    {activeCode === idx ? "Hide Code" : "View Code"}
                                </button>

                                <a
                                    href={`https://github.com/alsopranab/${project.title}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300"
                                >
                                    Repo
                                </a>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                        <p className="text-slate-400 mb-6">{project.desc}</p>

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
                                    className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-200"
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
