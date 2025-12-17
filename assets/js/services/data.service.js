/**
 * Advanced Centralized Data Service (FINAL)
 * =========================================
 * Responsibilities:
 * - Centralized JSON loading
 * - Intelligent caching (memory + sessionStorage)
 * - Request de-duplication
 * - Timeout protection
 * - Graceful fallback handling
 * - Environment-safe (GitHub Pages)
 * - Debug-friendly
 *
 * This file is the ONLY place that touches fetch().
 */

const DataService = (() => {
  /* =========================
     CONFIGURATION
  ========================= */
  const BASE_PATH = "assets/data/";
  const FETCH_TIMEOUT = 8000; // ms
  const ENABLE_SESSION_CACHE = true;
  const DEBUG = true;

  /* =========================
     INTERNAL STATE
  ========================= */
  const memoryCache = {};
  const inFlightRequests = {};

  /* =========================
     UTILITIES
  ========================= */

  function log(...args) {
    if (DEBUG) console.log("[DataService]", ...args);
  }

  function error(...args) {
    console.error("[DataService]", ...args);
  }

  function withTimeout(promise, timeoutMs) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Request timed out"));
      }, timeoutMs);

      promise
        .then((res) => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  function getSessionKey(fileName) {
    return `DataService::${fileName}`;
  }

  /* =========================
     CORE FETCH LOGIC
  ========================= */

  async function fetchJSON(fileName) {
    const url = `${BASE_PATH}${fileName}`;

    log("Fetching:", url);

    const response = await withTimeout(fetch(url), FETCH_TIMEOUT);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} while loading ${fileName}`);
    }

    return response.json();
  }

  async function loadJSON(fileName) {
    /* ---- 1. Memory Cache ---- */
    if (memoryCache[fileName]) {
      log("Memory cache hit:", fileName);
      return memoryCache[fileName];
    }

    /* ---- 2. Session Storage Cache ---- */
    if (ENABLE_SESSION_CACHE) {
      const cached = sessionStorage.getItem(getSessionKey(fileName));
      if (cached) {
        log("Session cache hit:", fileName);
        const parsed = JSON.parse(cached);
        memoryCache[fileName] = parsed;
        return parsed;
      }
    }

    /* ---- 3. In-flight De-duplication ---- */
    if (inFlightRequests[fileName]) {
      log("Awaiting in-flight request:", fileName);
      return inFlightRequests[fileName];
    }

    /* ---- 4. Network Fetch ---- */
    const request = (async () => {
      try {
        const data = await fetchJSON(fileName);

        memoryCache[fileName] = data;

        if (ENABLE_SESSION_CACHE) {
          sessionStorage.setItem(
            getSessionKey(fileName),
            JSON.stringify(data)
          );
        }

        log("Loaded:", fileName);
        return data;
      } catch (err) {
        error(`Failed to load ${fileName}`, err);
        return null;
      } finally {
        delete inFlightRequests[fileName];
      }
    })();

    inFlightRequests[fileName] = request;
    return request;
  }

  /* =========================
     PUBLIC API (STRICT)
  ========================= */

  return Object.freeze({
    /* ---- Core Data ---- */
    getProfile: () => loadJSON("profile.json"),
    getExperience: () => loadJSON("experience.json"),
    getEducation: () => loadJSON("education.json"),
    getProjects: () => loadJSON("projects.json"),
    getFeatured: () => loadJSON("featured.json"),
    getLicenses: () => loadJSON("licenses.json"),
    getContact: () => loadJSON("contact.json"),
    getSocials: () => loadJSON("social.json"),

    /* ---- Utilities ---- */
    preloadAll: async () => {
      log("Preloading all data...");
      await Promise.all([
        loadJSON("profile.json"),
        loadJSON("experience.json"),
        loadJSON("education.json"),
        loadJSON("projects.json"),
        loadJSON("featured.json"),
        loadJSON("licenses.json"),
        loadJSON("contact.json"),
        loadJSON("social.json")
      ]);
      log("Preload complete");
    },

    clearMemoryCache: () => {
      Object.keys(memoryCache).forEach((k) => delete memoryCache[k]);
      log("Memory cache cleared");
    },

    clearSessionCache: () => {
      Object.keys(sessionStorage)
        .filter((k) => k.startsWith("DataService::"))
        .forEach((k) => sessionStorage.removeItem(k));
      log("Session cache cleared");
    },

    debugSnapshot: () => ({
      memoryCache: Object.keys(memoryCache),
      inFlightRequests: Object.keys(inFlightRequests)
    })
  });
})();
