function Experience() {
    try {
        return (
            <div className="space-y-8" data-name="Experience" data-file="components/Experience.js">
                <h2 className="section-title font-light text-3xl border-b border-gray-100 pb-4">
                    <div className="icon-briefcase text-[var(--primary-color)] w-6 h-6 opacity-80"></div>
                    Experience
                </h2>

                <div className="relative border-l border-gray-100 ml-3 space-y-12">
                    {/* Experience Item 1 */}
                    <div className="ml-10 relative">
                        <div className="absolute -left-[45px] top-1 bg-white border border-[var(--primary-color)] w-4 h-4 rounded-full ring-4 ring-gray-50"></div>
                        <div className="card py-6 px-8 border-l-4 border-l-[var(--primary-color)]">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                <h3 className="text-xl font-medium text-gray-900">Data Analyst</h3>
                                <span className="text-xs text-gray-400 font-light uppercase tracking-wider">2022 - Present</span>
                            </div>
                            <div className="text-gray-500 text-sm font-light mb-4">Tech Solutions Inc.</div>
                            <p className="text-sm text-gray-600 mb-5 leading-relaxed font-light">
                                Spearheaded automation of weekly operational reports, reducing manual effort by 40%. Developed interactive Power BI dashboards for senior management to track KPIs in real-time.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Power BI</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">SQL</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Python</span>
                            </div>
                        </div>
                    </div>

                    {/* Experience Item 2 */}
                    <div className="ml-10 relative">
                        <div className="absolute -left-[45px] top-1 bg-white border border-gray-300 w-4 h-4 rounded-full ring-4 ring-gray-50"></div>
                        <div className="card py-6 px-8">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                <h3 className="text-xl font-medium text-gray-900">Operations Associate</h3>
                                <span className="text-xs text-gray-400 font-light uppercase tracking-wider">2020 - 2022</span>
                            </div>
                            <div className="text-gray-500 text-sm font-light mb-4">Logistics Co.</div>
                            <p className="text-sm text-gray-600 leading-relaxed font-light">
                                Managed daily logistics operations and identified process bottlenecks. Initiated data collection projects that led to a 15% improvement in delivery efficiency.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recommendation Highlight */}
                <div className="mt-10">
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100 relative">
                        <div className="icon-quote text-4xl text-gray-200 absolute top-4 left-4"></div>
                        <div className="relative z-10 pl-8">
                            <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                                "Pranab has a unique ability to not just understand data, but to see the operational story behind it. His work on automating our reporting workflow was a game-changer for the team."
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="font-bold text-gray-900">Former Operations Manager</div>
                                    <div className="text-xs text-gray-500">Excerpt from Recommendation</div>
                                </div>
                                <a 
                                    href="https://www.linkedin.com/in/alsopranab/details/recommendations/" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-[var(--primary-color)] hover:underline flex items-center gap-1"
                                >
                                    Read full on LinkedIn
                                    <div className="icon-arrow-right w-4 h-4"></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Experience component error:', error);
        return null;
    }
}
