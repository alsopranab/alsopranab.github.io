function ProjectModal({ project, isOpen, onClose, iconData }) {
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    try {
        const updatedDate = new Date(project.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const { icon, color, bg, shadow } = iconData || { icon: 'icon-folder', color: 'text-gray-600', bg: 'bg-gray-100', shadow: 'text-gray-300' };

        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" data-name="ProjectModal" data-file="components/ProjectModal.js">
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal Content */}
                <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-300 border border-gray-100">
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 rounded-full transition-colors backdrop-blur-sm shadow-sm border border-gray-100"
                    >
                        <div className="icon-x w-6 h-6"></div>
                    </button>

                    {/* Glowing Header */}
                    <div className={`h-64 w-full ${bg} relative flex items-center justify-center overflow-hidden`}>
                        {/* Background Glow */}
                        <div className={`absolute w-64 h-64 blur-[100px] rounded-full opacity-40 ${shadow} bg-current animate-pulse-glow`}></div>
                        
                        {/* Background Icon Watermark */}
                        <div className={`${icon} w-96 h-96 ${color} opacity-5 transform scale-150 absolute rotate-12`}></div>
                        
                        {/* Main Icon */}
                        <div className={`${icon} text-[6rem] ${color} relative z-10 drop-shadow-xl animate-float`}></div>
                        
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                    </div>

                    {/* Body */}
                    <div className="px-8 pb-10 -mt-12 relative z-20">
                        <div className="mb-8 text-center sm:text-left">
                             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-100 rounded-full shadow-sm mb-4 text-xs font-bold text-gray-600 uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]"></div>
                                {project.language || 'Code'}
                             </div>
                             <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">{project.name}</h2>
                             <div className="text-sm text-gray-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                                <div className="icon-calendar w-4 h-4"></div> Last updated on {updatedDate}
                             </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="flex-1 space-y-8">
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4 flex items-center gap-2">
                                        <div className="icon-file-text w-4 h-4"></div> About
                                    </h3>
                                    <p className="text-gray-700 leading-8 font-normal text-lg">
                                        {project.description || "No description provided for this project."}
                                    </p>
                                </div>

                                {project.topics && project.topics.length > 0 && (
                                    <div>
                                        <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4 flex items-center gap-2">
                                            <div className="icon-cpu w-4 h-4"></div> Technologies
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.topics.map(topic => (
                                                <span key={topic} className="px-4 py-2 bg-gray-50 text-gray-700 text-xs rounded-lg border border-gray-200 font-semibold uppercase tracking-wide hover:border-[var(--primary-color)] transition-colors cursor-default">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar / Stats */}
                            <div className="md:w-72 space-y-6">
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-5">
                                    <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Statistics</h3>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium flex items-center gap-2">
                                            <div className="icon-star w-4 h-4 text-yellow-500 fill-yellow-500"></div> Stars
                                        </span>
                                        <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-100">{project.stargazers_count}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium flex items-center gap-2">
                                            <div className="icon-git-fork w-4 h-4 text-gray-400"></div> Forks
                                        </span>
                                        <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-100">{project.forks_count}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium flex items-center gap-2">
                                            <div className="icon-eye w-4 h-4 text-blue-400"></div> Watchers
                                        </span>
                                        <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-100">{project.watchers_count || 0}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {project.homepage && (
                                        <a 
                                            href={project.homepage} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-primary w-full flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary-color)]/20 py-3 text-sm font-bold"
                                        >
                                            <div className="icon-external-link w-4 h-4"></div>
                                            View Live Demo
                                        </a>
                                    )}
                                    <a 
                                        href={project.html_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 w-full flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all"
                                    >
                                        <div className="icon-github w-4 h-4"></div>
                                        Source Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProjectModal error:', error);
        return null;
    }
}
