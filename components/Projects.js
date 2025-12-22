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
                } catch (err) {
                    console.error('Error fetching projects:', err);
                    setProjects([
                        {
                            id: 1,
                            name: 'Portfolio-v1',
                            description: 'Personal portfolio website built with React and Tailwind CSS.',
                            stargazers_count: 5,
                            forks_count: 2,
                            updated_at: new Date().toISOString(),
                            topics: ['portfolio', 'react'],
                            html_url: 'https://github.com/alsopranab',
                            language: 'JavaScript'
                        },
                        {
                            id: 2,
                            name: 'SQL-Analytics-Suite',
                            description: 'Advanced SQL queries for business analytics.',
                            stargazers_count: 12,
                            forks_count: 4,
                            updated_at: '2024-11-15T10:00:00Z',
                            topics: ['sql', 'case-study'],
                            html_url: 'https://github.com/alsopranab',
                            language: 'SQL'
                        }
                    ]);
                } finally {
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

        // Filter → topic mapping (THIS IS THE KEY)
        const filterMap = {
            'case studies': ['case-study', 'case', 'study'],
            'dashboards': ['dashboard', 'powerbi', 'tableau', 'looker'],
            'automation': ['automation', 'etl', 'pipeline', 'script'],
            'sql': ['sql'],
            'exploratory data analysis': ['eda', 'exploratory', 'data-analysis']
        };

        const filteredProjects = projects.filter(project => {
            if (filter === 'All') return true;

            const normalizedFilter = filter.toLowerCase();
            const allowedTopics = filterMap[normalizedFilter] || [];

            // 1️⃣ Topic-based matching (PRIMARY)
            if (Array.isArray(project.topics)) {
                const topicMatch = project.topics.some(topic =>
                    allowedTopics.includes(topic.toLowerCase())
                );
                if (topicMatch) return true;
            }

            // 2️⃣ Language-based matching (SQL fallback)
            if (
                project.language &&
                allowedTopics.includes(project.language.toLowerCase())
            ) {
                return true;
            }

            // 3️⃣ Name / description fallback
            const searchStr = `${project.name || ''} ${project.description || ''}`.toLowerCase();
            return allowedTopics.some(tag => searchStr.includes(tag));
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
