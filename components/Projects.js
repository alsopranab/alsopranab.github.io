function Projects() {
    const [activeCode, setActiveCode] = React.useState(null);
    const [projects, setProjects] = React.useState([]);

    // ICON RESOLUTION (name + description + code)
    const resolveIcon = ({ name = "", desc = "", code = "" }) => {
        const text = `${name} ${desc} ${code}`.toLowerCase();

        if (text.includes("sql") || text.includes("query") || text.includes("database"))
            return "database";

        if (
            text.includes("etl") ||
            text.includes("automation") ||
            text.includes("pipeline") ||
            text.includes("scheduler")
        )
            return "activity";

        if (
            text.includes("analysis") ||
            text.includes("analytics") ||
            text.includes("eda") ||
            text.includes("visual")
        )
            return "bar-chart";

        if (
            text.includes("model") ||
            text.includes("prediction") ||
            text.includes("ml") ||
            text.includes("classifier")
        )
            return "users";

        if (
            text.includes("sentiment") ||
            text.includes("nlp") ||
            text.includes("text")
        )
            return "message-circle";

        if (text.includes("api") || text.includes("script") || text.includes("javascript"))
            return "code";

        return "folder"; // neutral fallback
    };

    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const repoRes = await fetch(
                    "https://api.github.com/users/alsopranab/repos?per_page=100"
                );
                const repos = await repoRes.json();

                const supportedExt = ["js", "py", "sql", "ipynb"];

                const allProjects = await Promise.all(
                    repos
                        .filter(repo => !repo.fork)
                        .map(async repo => {
                            let codeSnippet = "";
                            let fileName = "";
                            let lang = "text";

                            try {
                                const contentRes = await fetch(
                                    `https://api.github.com/repos/alsopranab/${repo.name}/contents`
                                );
                                const contents = await contentRes.json();

                                const codeFile = contents.find(
                                    item =>
                                        item.type === "file" &&
                                        supportedExt.includes(
                                            item.name.split(".").pop()
                                        )
                                );

                                if (codeFile?.download_url) {
                                    const rawRes = await fetch(codeFile.download_url);
                                    codeSnippet = await rawRes.text();
                                    fileName = codeFile.name;
                                    lang = fileName.split(".").pop();
                                }
                            } catch {}

                            if (!codeSnippet) return null;

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
                    .sort(
                        (a, b) =>
                            new Date(b.updated) - new Date(a.updated)
                    )
                    .slice(0, 4);

                setProjects(bestFour);
            } catch (err) {
                console.error("Failed to load projects", err);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="projects" className="section-padding" data-name="projects" data-file="components/Projects.js">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="text-[var(--primary)]">02.</span> Featured Projects
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <div key={idx} className="card group hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-colors">
                                <div className={`icon-${project.icon} text-2xl`}></div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setActiveCode(activeCode === idx ? null : idx)}
                                    className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-full transition-all ${activeCode === idx ? 'bg-[var(--primary)] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                                >
                                    <div className="icon-code text-sm"></div> 
                                    {activeCode === idx ? 'Hide Code' : 'View Code'}
                                </button>
                                <a
                                    href={`https://github.com/alsopranab/${project.title}`}
                                    target="_blank"
                                    className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                                >
                                    <div className="icon-external-link text-sm"></div> Repo
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
                                    className="text-xs font-medium text-violet-200 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20 hover:border-violet-500/50 transition-all cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <a href="https://github.com/alsopranab" target="_blank" className="btn btn-outline inline-flex items-center gap-2 group">
                    View Full Project Archive 
                    <div className="icon-arrow-right group-hover:translate-x-1 transition-transform"></div>
                </a>
            </div>
        </section>
    );
}
