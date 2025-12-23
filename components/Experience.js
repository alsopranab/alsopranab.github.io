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
                                <h3 className="text-xl font-medium text-gray-900">Operations Data Analyst</h3>
                                <span className="text-xs text-gray-400 font-light uppercase tracking-wider">
                                    Jan 2025 - Dec 2025
                                </span>
                            </div>
                            <div className="text-gray-500 text-sm font-light mb-4">MagicBricks - Bangalore</div>

                            <ul className="text-sm text-gray-600 mb-5 leading-relaxed font-light space-y-2 list-disc pl-5">
                                <li>
                                    Managed multi-center reporting for Bangalore, Noida, and Tier-1/2 branches, improving KPI consistency and data reliability by ~30%.
                                </li>
                                <li>
                                    Built a centralized near real-time operations dashboard by integrating CRM and dialer systems, giving leadership complete visibility into daily performance.
                                </li>
                                <li>
                                    Automated key reporting workflows using Google Apps Script, Power Query, VBA, and Power Automate, reducing manual effort by 60–70% and consolidating analyst workload from 3 to 1 (~76 ms refresh via Power Automate).
                                </li>
                                <li>
                                    Performed detailed EDA on operational funnels including fresh vs repeat leads, contactability, scheduling rates, site visit completion, timeline patterns, and funnel drop-offs, improving funnel efficiency by 20–25%.
                                </li>
                                <li>
                                    Unified data from Ameyo, ReadPro, and internal CRMs to create a single source of truth for performance, quality, and productivity analytics.
                                </li>
                                <li>
                                    Conducted EDA and RCA on QA outcomes, agent dispositions, call quality, connectivity gaps, and operational inconsistencies, enabling faster corrective actions across Ops, Product, QA, and Sales.
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Power BI</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Looker Studio</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">SQL</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Python</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">JS Scripts</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Advanced Excel</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Power Automate</span>
                            </div>
                        </div>
                    </div>

                    {/* Experience Item 2 */}
                    <div className="ml-10 relative">
                        <div className="absolute -left-[45px] top-1 bg-white border border-[var(--primary-color)] w-4 h-4 rounded-full ring-4 ring-gray-50"></div>
                        <div className="card py-6 px-8 border-l-4 border-l-[var(--primary-color)]">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                <h3 className="text-xl font-medium text-gray-900">Account Manager</h3>
                                <span className="text-xs text-gray-400 font-light uppercase tracking-wider">
                                    Jan 2025 - Dec 2025
                                </span>
                            </div>
                            <div className="text-gray-500 text-sm font-light mb-4">MagicBricks - Bangalore</div>

                            <ul className="text-sm text-gray-600 mb-5 leading-relaxed font-light space-y-2 list-disc pl-5">
                                <li>
                                    Managed the end-to-end site visit (SV) coordination process between buyers and builders, ensuring smooth scheduling, requirement mapping, and timely follow-ups.
                                </li>
                                <li>
                                    Handled all buyer–builder communication, including cab coordination with the transport team, to ensure seamless site visit execution.
                                </li>
                                <li>
                                    Collaborated closely with the QA team to maintain call-quality standards, validate dispositions, and ensure reporting accuracy.
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Motivation & Engagement</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Accountability</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Strategic Thinking</span>
                            </div>
                        </div>
                    </div>

                    {/* Experience Item 3 */}
                    <div className="ml-10 relative">
                        <div className="absolute -left-[45px] top-1 bg-white border border-[var(--primary-color)] w-4 h-4 rounded-full ring-4 ring-gray-50"></div>
                        <div className="card py-6 px-8 border-l-4 border-l-[var(--primary-color)]">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                <h3 className="text-xl font-medium text-gray-900">Unit Head</h3>
                                <span className="text-xs text-gray-400 font-light uppercase tracking-wider">
                                    Oct 2024 - Dec 2025
                                </span>
                            </div>
                            <div className="text-gray-500 text-sm font-light mb-4">NoBroker - Bangalore</div>

                            <ul className="text-sm text-gray-600 mb-5 leading-relaxed font-light space-y-2 list-disc pl-5">
                                <li>
                                    Led a 12-member sales team, consistently achieving FTD, WTD, MTD, and MoM targets with sustained conversion growth.
                                </li>
                                <li>
                                    Conducted daily performance huddles to review pipeline health, call quality, and conversion gaps, driving immediate corrective actions.
                                </li>
                                <li>
                                    Analysed lead behaviour and call patterns to improve productivity, close ratios, and overall sales efficiency.
                                </li>
                                <li>
                                    Owned end-to-end KPIs for team and self, ensuring accurate forecasting, target discipline, and predictable performance.
                                </li>
                                <li>
                                    Collaborated with senior leadership to align sales strategy and execute revenue plans effectively.
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Problem-Solving</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Decision-Making</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Team Development</span>
                            </div>
                        </div>
                    </div>

                    {/* Experience Item 4 */}
                    <div className="ml-10 relative">
                        <div className="absolute -left-[45px] top-1 bg-white border border-gray-300 w-4 h-4 rounded-full ring-4 ring-gray-50"></div>
                        <div className="card py-6 px-8 border-l-4 border-l-[var(--primary-color)]">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                <h3 className="text-xl font-medium text-gray-900">Business Development Executive</h3>
                                <span className="text-xs text-gray-400 font-light uppercase tracking-wider">
                                    Jun 2024 - Oct 2024
                                </span>
                            </div>
                            <div className="text-gray-500 text-sm font-light mb-4">NoBroker - Bangalore</div>

                            <ul className="text-sm text-gray-600 leading-relaxed font-light space-y-2 list-disc pl-5">
                                <li>
                                    Delivered customized real estate solutions for NRI tenants and buyers, ensuring smooth end-to-end client experience.
                                </li>
                                <li>
                                    Consistently exceeded sales targets with monthly achievements of 170%, 134.38%, 232.94%, 103.48%, 121.88%, and 119.99%.
                                </li>
                                <li>
                                    Recognized as Top Performer for six consecutive months for exceptional conversion rates and revenue contribution.
                                </li>
                                <li>
                                    Three-time Achiever’s Club awardee.
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Relationship Building</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Communication</span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded border border-gray-100">Sales</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Recommendation Highlight */}
                <div className="mt-10">
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100 relative">
                        <div className="icon-quote text-4xl text-gray-200 absolute top-4 left-4"></div>
                        <div className="relative z-10 pl-8">
                            <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                                "I’ve had the privilege of working with Pranab at MagicBricks.
                                I strongly recommend him for any role that demands analytical thinking, automation expertise, and a proactive, high-performance work style."
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="font-bold text-gray-900">Amit Sarwade – Operations Manager</div>
                                    <div className="text-xs text-gray-500">
                                        November 30, 2025 · Managed Pranab Directly
                                    </div>
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
