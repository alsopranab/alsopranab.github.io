function Sidebar() {
    try {
        const skills = ["SQL", "Python", "JavaScript", "Power BI", "Excel", "Automation", "Dashboards"];
        
        return (
            <div className="p-6 lg:p-8 flex flex-col h-full" data-name="Sidebar" data-file="components/Sidebar.js">
                <div className="flex flex-col items-center text-center mb-8">
                    {/* Profile Photo */}
                    <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden border-4 border-white shadow-md">
                        <img 
                            src="https://github.com/alsopranab.png" 
                            alt="Pranab Debnath" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <h1 className="text-3xl font-light text-gray-900">Pranab Debnath</h1>
                    <p className="text-[var(--primary-color)] font-normal mt-1 tracking-wide uppercase text-sm">Data Analyst</p>
                    
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                        <div className="icon-map-pin w-4 h-4 opacity-70"></div>
                        <span className="font-light">Bengaluru, India</span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-8">
                        <a href="https://www.linkedin.com/in/alsopranab/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#0077b5] transition-colors" title="LinkedIn">
                            <div className="icon-linkedin w-6 h-6"></div>
                        </a>
                        <a href="https://github.com/alsopranab" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-black transition-colors" title="GitHub">
                            <div className="icon-github w-6 h-6"></div>
                        </a>
                        <a href="https://leetcode.com/u/alsopranab/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#ffa116] transition-colors" title="LeetCode">
                            <div className="icon-code w-6 h-6"></div>
                        </a>
                        <a href="https://www.hackerrank.com/profile/alsopranab" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#2ec866] transition-colors" title="HackerRank">
                            <div className="icon-terminal w-6 h-6"></div>
                        </a>
                    </div>
                </div>

                <div className="space-y-8 flex-1">
                    {/* About */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">About</h3>
                        <p className="text-sm text-gray-600 leading-loose font-light">
                            Data Analyst with a background in operations, reporting, and automation, turning raw information into clean logic and useful insights. Experienced in building KPI reports, automating workflows, and enabling faster, data-driven decisions.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">Highlights</h3>
                        <ul className="space-y-3 text-sm text-gray-600 font-light">
                            <li className="flex gap-3">
                                <span className="text-[var(--primary-color)] opacity-70">•</span>
                                <span>Global Rank #1 in SQL on HackerRank (as of Dec 3).</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[var(--primary-color)] opacity-70">•</span>
                                <span>Top SQL 50 Badge on LeetCode.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[var(--primary-color)] opacity-70">•</span>
                                <span>Strong track record in automation and ownership-driven delivery.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Skills */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span key={skill} className="px-3 py-1 border border-gray-200 text-gray-600 text-xs rounded-md font-light bg-transparent hover:border-gray-400 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <button 
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        className="w-full btn btn-primary flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary-color)]/20"
                    >
                        <div className="icon-mail w-4 h-4"></div>
                        <span>Work with me</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Sidebar error:', error);
        return null;
    }
}
