/**
 * Selects an image URL based on project keywords and priority.
 * Uses hashing to deterministically pick different images for different projects
 * within the highest priority match group.
 * 
 * @param {Object} project - The project object (must have name, description, topics)
 * @param {Array} categories - Array of category objects from category-images.json
 * @returns {string} - The matching image URL
 */
function getProjectImage(project, categories) {
    if (!categories || categories.length === 0) return '';
    
    // Combine all text to search
    const text = `${project.name} ${project.description || ''} ${(project.topics || []).join(' ')}`.toLowerCase();
    
    // Helper to generate a consistent hash from a string
    const getHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

    // 1. Find ALL matches, not just the first one
    const matches = categories.filter(cat => {
        if (cat.keywords[0] === 'default') return false;
        return cat.keywords.some(k => text.includes(k));
    });

    if (matches.length > 0) {
        // 2. Determine the highest priority among the matches
        // If priority is undefined, default to 0
        const maxPriority = Math.max(...matches.map(m => m.priority || 0));

        // 3. Filter matches to keep only those with the highest priority
        const bestMatches = matches.filter(m => (m.priority || 0) === maxPriority);

        // 4. Select from the best matches using hash
        const hash = getHash(project.name + (project.id || ''));
        const index = hash % bestMatches.length;
        return bestMatches[index].url;
    }

    // 5. If no specific match, use one of the default images
    const defaultCats = categories.filter(c => c.keywords[0] === 'default');
    if (defaultCats.length > 0) {
        const hash = getHash(project.name + (project.id || ''));
        const index = hash % defaultCats.length;
        return defaultCats[index].url;
    }

    return '';
}
