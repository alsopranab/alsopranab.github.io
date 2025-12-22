function CompetitiveProgramming() {
    try {
        return (
            <div className="space-y-8" data-name="CompetitiveProgramming" data-file="components/CompetitiveProgramming.js">
                <h2 className="section-title font-light text-3xl border-b border-gray-100 pb-4">
                    <div className="icon-trophy text-[var(--primary-color)] w-6 h-6 opacity-80"></div>
                    SQL & Problem Solving
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* HackerRank Card */}
                    <div className="card relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity grayscale">
                             <div className="icon-terminal text-8xl"></div>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-green-50 text-green-700 p-3 rounded-full">
                                    <div className="icon-code w-5 h-5"></div>
                                </span>
                                <h3 className="font-medium text-xl text-gray-900">HackerRank</h3>
                            </div>
                            <div className="mb-5 pl-1">
                                <div className="text-green-700 font-medium text-lg">Global Rank #1 in SQL</div>
                                <div className="text-xs text-gray-400 font-light mt-1">Achieved Dec 3, 2024</div>
                            </div>
                            <p className="text-sm text-gray-600 mb-8 font-light leading-relaxed">
                                Demonstrated advanced SQL expertise and problem-solving speed through consistent 5-star performance across complex join, aggregation, and sub-query challenges.
                            </p>
                            <a 
                                href="https://www.hackerrank.com/profile/alsopranab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline w-full text-sm font-normal text-gray-500 hover:text-gray-900 border-gray-200"
                            >
                                View Profile
                            </a>
                        </div>
                    </div>

                    {/* LeetCode Card */}
                    <div className="card relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity grayscale">
                             <div className="icon-file-code text-8xl"></div>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-yellow-50 text-yellow-700 p-3 rounded-full">
                                    <div className="icon-code w-5 h-5"></div>
                                </span>
                                <h3 className="font-medium text-xl text-gray-900">LeetCode</h3>
                            </div>
                            <div className="mb-5 pl-1">
                                <div className="text-yellow-700 font-medium text-lg">Top SQL 50 Badge</div>
                                <div className="text-xs text-gray-400 font-light mt-1">Consistent Solver</div>
                            </div>
                            <p className="text-sm text-gray-600 mb-8 font-light leading-relaxed">
                                Focused on Data Structures and SQL optimization. Regular practice in writing efficient, scalable queries and solving algorithmic problems.
                            </p>
                            <a 
                                href="https://leetcode.com/u/alsopranab/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline w-full text-sm font-normal text-gray-500 hover:text-gray-900 border-gray-200"
                            >
                                View Profile
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border-l-2 border-[var(--primary-color)] p-6 rounded-r-lg">
                    <h4 className="font-medium text-gray-900 mb-3 tracking-wide text-sm uppercase">Real-world Application</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 font-light">
                        <li>Optimizing complex queries for faster reporting times.</li>
                        <li>Building scalable data pipelines that handle growing datasets.</li>
                        <li>Translating business logic into precise, error-free SQL transformations.</li>
                    </ul>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CompetitiveProgramming component error:', error);
        return null;
    }
}
