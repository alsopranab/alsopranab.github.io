function Projects() {
    try {
        const [projects, setProjects] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [filter, setFilter] = React.useState('All');

        React.useEffect(() => {
            const fetchProjects = async () => {
                try {
                    const response = await fetch(
                        'https://api.github.com/users/alsopranab/repos?sort=updated&per_page=12'
                    );
                    if (!response.ok) throw new Error('Failed to fetch projects');
                    const data = await response.json();
                    setProjects(data);
                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching projects:", err);
                    {/* Fallback data */}
                    setProjects([
                        {
                            id: 1,
                            name: "Portfolio-v1",
                            description: "Personal portfolio website built with React and Tailwind CSS made by Pranab Debnath.",
                            stargazers_count: 5,
                            forks_count: 2,
                            updated_at: new Date().toISOString(),
                            topics: ["react", "javascript", "tailwind"],
                            html_url: "https://github.com/alsopranab",
                            language: "JavaScript"
                        },
                        {
                            id: 2,
                            name: "SQL-Analytics-Suite",
                            description: "A collection of complex SQL queries for business intelligence reporting.",
                            stargazers_count: 12,
                            forks_count: 4,
                            updated_at: "2024-11-15T10:00:00Z",
                            topics: ["sql", "analytics", "case-study"],
                            html_url: "https://github.com/alsopranab",
                            language: "SQL"
                        }
                    ]);
                    setLoading(false);
                }
            };

            fetchProjects();
        }, []);

        const filters = [
            'All',
            'Case Studies',
            'Dashboards',
            'Automation',
            'SQL',
            'Exploratory Data Analysis'
        ];

        {/* FIXED FILTERING LOGIC */}
        const filteredProjects = projects.filter(project => {
            if (filter === 'All') return true;

            const normalizedFilter = filter.toLowerCase();

            {/* Topic-based matching (preferred) */}
            if (Array.isArray(project.topics)) {
                const topicMatch = project.topics.some(topic => {
                    const t = topic.toLowerCase();
                    return (
                        t.includes(normalizedFilter.replace(/\s+/g, '-')) ||
                        t.includes(normalizedFilter.replace(/\s+/g, ''))
                    );
                });
                if (topicMatch) return true;
            }

            { /*Language-based matching (for SQL, etc.)*/ }
            if (project.language) {
                if (project.language.toLowerCase().includes(normalizedFilter)) {
                    return true;
                }
            }

            { /*Fallback: name + description*/ }
            const searchStr = `${project.name || ''} ${project.description || ''}`.toLowerCase();
            return searchStr.includes(normalizedFilter);
        });

        return (
            <div className="space-y-8" data-name="Projects" data-file="components/Projects.js">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-100 pb-4">
                    <h2 className="section-title mb-0 font-light text-3xl">
                        <div className="icon-folder-open text-[var(--primary-color)] w-6 h-6 opacity-80"></div>
                        Projects
                    </h2>

                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-all whitespace-nowrap ${
                                    filter === f
                                        ? 'bg-gray-900 text-white font-normal shadow-sm'
                                        : 'bg-transparent text-gray-500 hover:text-gray-900 font-light'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="card h-48 animate-pulse bg-gray-100 border-none"
                            ></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Projects component error:', error);
        return null;
    }
}
