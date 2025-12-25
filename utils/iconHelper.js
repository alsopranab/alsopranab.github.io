/**
 * Determines the appropriate icon and color theme for a project based on its content.
 * 
 * @param {Object} project - The project object
 * @returns {Object} - { icon, color, bg, shadow } classes
 */
function getProjectIcon(project) {
    if (!project) return { icon: 'icon-folder', color: 'text-gray-600', bg: 'bg-gray-100', shadow: 'shadow-gray-200' };

    const text = `${project.name} ${project.description || ''} ${(project.topics || []).join(' ')}`.toLowerCase();

    // Priority-based mappings with stronger colors
    const mappings = [
        // Specific Case Studies
        { keywords: ['titanic', 'ship', 'boat', 'disaster', 'sea'], icon: 'icon-anchor', color: 'text-blue-600', bg: 'bg-blue-50', shadow: 'text-blue-400' },
        { keywords: ['house', 'housing', 'estate', 'property', 'rent'], icon: 'icon-house', color: 'text-emerald-600', bg: 'bg-emerald-50', shadow: 'text-emerald-400' },
        { keywords: ['iris', 'flower', 'plant', 'botany', 'garden'], icon: 'icon-leaf', color: 'text-green-600', bg: 'bg-green-50', shadow: 'text-green-400' },
        { keywords: ['covid', 'virus', 'health', 'medical', 'pandemic'], icon: 'icon-activity', color: 'text-red-600', bg: 'bg-red-50', shadow: 'text-red-400' },
        
        // Tech Domains
        { keywords: ['finance', 'money', 'bank', 'sales', 'revenue', 'cost'], icon: 'icon-dollar-sign', color: 'text-amber-600', bg: 'bg-amber-50', shadow: 'text-amber-400' },
        { keywords: ['dashboard', 'analytics', 'report', 'visualization', 'bi'], icon: 'icon-chart-pie', color: 'text-indigo-600', bg: 'bg-indigo-50', shadow: 'text-indigo-400' },
        { keywords: ['chart', 'graph', 'trend'], icon: 'icon-chart-bar', color: 'text-purple-600', bg: 'bg-purple-50', shadow: 'text-purple-400' },
        { keywords: ['sql', 'database', 'query', 'postgres', 'mysql', 'data'], icon: 'icon-database', color: 'text-slate-700', bg: 'bg-slate-100', shadow: 'text-slate-400' },
        { keywords: ['python', 'script', 'automation', 'pandas', 'numpy'], icon: 'icon-file-code', color: 'text-yellow-600', bg: 'bg-yellow-50', shadow: 'text-yellow-400' },
        { keywords: ['react', 'web', 'frontend', 'js', 'html', 'css', 'ui'], icon: 'icon-layout', color: 'text-cyan-600', bg: 'bg-cyan-50', shadow: 'text-cyan-400' },
        { keywords: ['api', 'server', 'cloud', 'backend', 'node'], icon: 'icon-cloud', color: 'text-sky-600', bg: 'bg-sky-50', shadow: 'text-sky-400' },
        { keywords: ['mobile', 'app', 'android', 'ios'], icon: 'icon-smartphone', color: 'text-pink-600', bg: 'bg-pink-50', shadow: 'text-pink-400' },
        { keywords: ['security', 'auth', 'login'], icon: 'icon-lock', color: 'text-gray-700', bg: 'bg-gray-100', shadow: 'text-gray-400' },
        { keywords: ['game', 'play'], icon: 'icon-gamepad-2', color: 'text-violet-600', bg: 'bg-violet-50', shadow: 'text-violet-400' },
    ];

    const match = mappings.find(m => m.keywords.some(k => text.includes(k)));
    
    if (match) return match;

    // Default Fallback
    return { icon: 'icon-folder-git', color: 'text-gray-600', bg: 'bg-gray-50', shadow: 'text-gray-400' };
}
