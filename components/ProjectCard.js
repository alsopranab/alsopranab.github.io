function ProjectCard({ project }) {
    try {
        const updatedDate = new Date(project.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Parse description for potential tech stack keywords if topics are empty
        const commonTech = ['SQL', 'Python', 'JavaScript', 'React', 'Power BI', 'Excel', 'Pandas', 'Node.js'];
        const detectedTech = commonTech.filter(tech => 
            (project.description && project.description.includes(tech)) || 
            (project.topics && project.topics.includes(tech.toLowerCase()))
        );
        
        // Combine with GitHub topics, unique only
        const allTags = [...new Set([...(project.topics || []), ...detectedTech])].slice(0, 4);

        return (
            <div className="card hover:shadow-md transition-shadow flex flex-col h-full group" data-name="ProjectCard" data-file="components/ProjectCard.js">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg text-gray-900 line-clamp-1 tracking-tight" title={project.name}>
                        {project.name}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-400 text-xs font-light">
                        <span className="flex items-center gap-1.5">
                            <div className="icon-star w-3.5 h-3.5"></div>
                            {project.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <div className="icon-git-fork w-3.5 h-3.5"></div>
                            {project.forks_count}
                        </span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3 font-light leading-relaxed">
                    {project.description || "No description available for this project."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {allTags.length > 0 ? (
                        allTags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] uppercase tracking-wider rounded-sm border border-gray-100">
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider rounded-sm border border-gray-100">
                            {project.language || "Code"}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <span className="text-xs text-gray-400 font-light">Updated {updatedDate}</span>
                    <div className="flex gap-4">
                        {project.homepage && (
                             <a 
                                href={project.homepage} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs font-normal text-[var(--primary-color)] hover:underline flex items-center gap-1.5"
                            >
                                <div className="icon-external-link w-3.5 h-3.5"></div>
                                Live Demo
                            </a>
                        )}
                        <a 
                            href={project.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs font-normal text-gray-500 hover:text-black hover:underline flex items-center gap-1.5"
                        >
                            <div className="icon-github w-3.5 h-3.5"></div>
                            View Code
                        </a>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProjectCard error:', error);
        return null;
    }
}
