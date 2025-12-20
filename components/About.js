function About() {
    const skills = [
        { category: "Analytics", items: ["Statistical Analysis", "A/B Testing", "Predictive Modeling", "KPI Tracking"] },
        { category: "Data Viz", items: ["Tableau", "Power BI", "Looker", "D3.js"] },
        { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "BigQuery"] },
        { category: "Tools & Code", items: ["Python (Pandas, NumPy)", "R", "Git", "Jupyter"] },
    ];

    return (
        <section id="about" className="section-padding bg-slate-900/50" data-name="about" data-file="components/About.js">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        <span className="text-[var(--primary)]">01.</span> About Me
                    </h2>
                    <div className="space-y-4 text-[var(--text-muted)] text-lg leading-relaxed">
                        <p>
                            Hello! I'm a passionate Data Analyst with a strong technical background. My journey began in software engineering, where I discovered my love for uncovering patterns in complex datasets.
                        </p>
                        <p>
                            Today, I leverage code and visualization tools to tell compelling stories with data. I don't just extract numbers; I provide the context and strategy that drives business decisions.
                        </p>
                        <p>
                            Whether it's optimizing marketing funnels, predicting customer churn, or building automated reporting pipelines, I thrive on solving difficult problems.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((skillGroup, idx) => (
                        <div key={idx} className="card bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 transition-all">
                            <h3 className="text-[var(--primary)] font-semibold mb-3 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                                {skillGroup.category}
                            </h3>
                            <ul className="space-y-2">
                                {skillGroup.items.map((item) => (
                                    <li key={item} className="text-sm text-slate-300 flex items-center gap-2">
                                        <div className="icon-check text-xs text-[var(--accent)]"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
