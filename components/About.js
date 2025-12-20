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
                            Hello! I'm a Data Analyst with a strong interest in turning raw data into meaningful business insights. My experience comes from working closely with sales, operations, and performance-driven teams, where data plays a key role in decision-making.
                        </p>
                        <p>
                            I use SQL, Python, Excel, and visualization tools to analyze trends, track KPIs, and build clear, actionable reports. My focus is not just on numbers, but on explaining what the data means and how it can be used to improve outcomes.
                        </p>
                        <p>
                            From performance analysis and process automation to structured reporting and exploratory data analysis, I enjoy solving real-world business problems with a practical, ownership-driven approach.
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
