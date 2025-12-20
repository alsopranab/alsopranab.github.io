function Experience() {
    const experiences = [
        {
            role: "Operations Data Analyst",
            company: "MagicBricks",
            period: "Jan 2025 – Present",
            desc: "Built automated reporting pipelines using SQL, Python, Google Apps Script, and Power Automate. Performed in-depth EDA on agent performance, lead funnels, schedule rates, and user behavior. Developed KPI dashboards, unified CRM and dialer data, improved data accuracy, and delivered insights that enhanced operational efficiency and conversion outcomes."
        },
        {
            role: "Account Manager",
            company: "MagicBricks",
            period: "Oct 2024 – Dec 2024",
            desc: "Handled client requirements, ensured timely resolution, and supported operational teams through data-backed reporting and performance tracking to improve customer satisfaction and repeat interactions."
        },
        {
            role: "Unit Head",
            company: "NoBroker",
            period: "Jun 2024 – Oct 2024",
            desc: "Led a sales unit to achieve 15% month-on-month growth in conversions. Mentored team members, analyzed sales calls, tracked KPIs, and collaborated with senior management to align sales strategies with business objectives."
        },
        {
            role: "Business Development Executive (NRI)",
            company: "NoBroker",
            period: "Dec 2023 – May 2024",
            desc: "Provided tailored real estate solutions for NRI clients. Consistently exceeded sales targets with performance achievements up to 230% and was recognized as a top performer for six consecutive months."
        }
    ];

    return (
        <section
            id="experience"
            className="section-padding relative overflow-hidden"
            data-name="experience"
            data-file="components/Experience.js"
        >
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center tracking-tight">
                Professional{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Journey
                </span>
            </h2>

            <div className="relative max-w-4xl mx-auto">

                {/* DESKTOP GLOWING CURVED LINE */}
                <svg
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full pointer-events-none z-0 hidden md:block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="
                          M 50 0
                          C 60 150, 40 300, 50 450
                          C 60 600, 40 750, 50 900
                          C 60 1050, 40 1200, 50 1350
                        "
                        fill="none"
                        stroke="url(#glowGradient)"
                        strokeWidth="4"
                        opacity="0.6"
                    />

                    <defs>
                        <linearGradient
                            id="glowGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* MOBILE VERTICAL LINE */}
                <div className="absolute left-4 top-0 bottom-0 w-[3px] md:hidden">
                    <div className="h-full w-full bg-gradient-to-b from-blue-400/0 via-purple-500 to-blue-400/0 shadow-[0_0_12px_rgba(139,92,246,0.8)] rounded-full"></div>
                </div>

                <div className="space-y-12 relative z-10">
                    {experiences.map((exp, idx) => (
                        <div
                            key={idx}
                            className={`relative flex flex-col md:flex-row gap-8 items-center ${
                                idx % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            <div className="flex-1 w-full pl-10 md:pl-0">
                                <div className="card glass-panel p-6 transform hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-purple-500">
                                    <span className="text-xs font-mono text-purple-400 mb-2 block">
                                        {exp.period}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {exp.role}
                                    </h3>
                                    <div className="text-slate-400 text-sm font-medium mb-3">
                                        {exp.company}
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {exp.desc}
                                    </p>
                                </div>
                            </div>

                            {/* DOT */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.8)] -translate-x-[7px] md:-translate-x-2"></div>

                            <div className="flex-1 hidden md:block"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
