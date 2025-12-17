/**
 * Centralized Data Service
 * ------------------------
 * - Single source of truth for loading JSON data
 * - Prevents duplicate fetch logic
 * - Guarantees consistent error handling
 * - GitHub Pages safe
 */

const DataService = (() => {
  const BASE_PATH = "assets/data/";

  const cache = {};

  async function loadJSON(fileName) {
    if (cache[fileName]) {
      return cache[fileName];
    }

    try {
      const response = await fetch(`${BASE_PATH}${fileName}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${fileName}`);
      }
      const data = await response.json();
      cache[fileName] = data;
      return data;
    } catch (error) {
      console.error(`[DataService] ${error.message}`);
      return null;
    }
  }

  return {
    getProfile: () => loadJSON("profile.json"),
    getExperience: () => loadJSON("experience.json"),
    getEducation: () => loadJSON("education.json"),
    getProjects: () => loadJSON("projects.json"),
    getFeatured: () => loadJSON("featured.json"),
    getLicenses: () => loadJSON("licenses.json"),
    getContact: () => loadJSON("contact.json"),
    getSocials: () => loadJSON("social.json")
  };
})();
