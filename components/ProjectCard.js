function ProjectCard({ project, onClick, iconData, imageUrl }) {
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

        const { icon, color, bg, shadow } = iconData || { icon: 'icon-folder', color: 'text-gray-600', bg: 'bg-gray-100', shadow: 'text-gray-300' };

        return (
            <div 
                className="card hover:shadow-xl transition-all duration-500 flex flex-col h-full group cursor-pointer border border-gray-100 hover:border-gray-300 bg-white overflow-hidden p-0" 
                data-name="ProjectCard" 
                data-file="components/ProjectCard.js"
                onClick={onClick}
            >
                {/* Header Section: Image Thumbnail OR Icon with Glow */}
                <div className={`h-48 w-full relative overflow-hidden ${imageUrl ? 'bg-gray-100' : bg}`}>
                    {imageUrl ? (
                        <div className="w-full h-full relative">
                            <img 
                                src={imageUrl} 
                                alt={project.name} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center relative">
                            {/* Background Glow Effect for Icon Mode */}
                            <div className={`absolute w-32 h-32 blur-3xl rounded-full opacity-30 ${shadow} bg-current animate-pulse-glow`}></div>
                            
                            {/* Main Icon */}
                            <div className="relative z-10 animate-float">
                                <div className={`${icon} text-[4rem] ${color} drop-shadow-md filter transition-transform duration-500 group-hover:scale-110`}></div>
                            </div>
                        </div>
                    )}
                    
                    {/* Overlay Action Hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
                        <span className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-4 py-2 bg-white/90 rounded-full text-sm font-semibold text-gray-900 shadow-lg backdrop-blur-md border border-white/50 flex items-center gap-2">
                            <div className="icon-maximize-2 w-4 h-4"></div> View Project
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-xl text-gray-900 line-clamp-1 tracking-tight group-hover:text-[var(--primary-color)] transition-colors" title={project.name}>
                            {project.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            <div className="icon-star w-4 h-4 text-yellow-500 fill-yellow-500"></div>
                            {project.stargazers_count}
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3 font-normal leading-relaxed">
                        {project.description || "No description available for this project."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                        {allTags.length > 0 ? (
                            allTags.map(tag => (
                                <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-700 text-[11px] font-semibold uppercase tracking-wider rounded-md border border-gray-200">
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-[11px] font-semibold uppercase tracking-wider rounded-md border border-gray-200">
                                {project.language || "Code"}
                            </span>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                         <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                            <div className="icon-clock w-3.5 h-3.5"></div> {updatedDate}
                         </span>
                         <div className="text-[var(--primary-color)] font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                            Details <div className="icon-arrow-right w-4 h-4"></div>
                         </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProjectCard error:', error);
        return null;
    }
}
