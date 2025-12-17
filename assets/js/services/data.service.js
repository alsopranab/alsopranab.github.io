/**
 * Advanced Centralized Data Service (FINAL — FIXED)
 * =================================================
 * GitHub Pages safe
 * Absolute-path resilient
 * Silent in prod, loud in debug
 */

const DataService = (() => {
  /* =========================
     CONFIGURATION
  ========================= */

  // Automatically resolve base path safely
  const BASE_PATH = (() => {
    const path = window.location.pathname;
    if (path === "/" || path.endsWith(".html")) {
      return "/assets/data/";
    }
    return path.replace(/\/[^/]*$/, "/assets/data/");
  })();

  const FETCH_TIMEOUT = 8000;
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

  function warn(...args) {
    console.warn("[DataService]", ...args);
  }

  function error(...args) {
    console.error("[DataService]", ...args);
  }

  function withTimeout(promise, timeoutMs) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error("Request timed out")),
        timeoutMs
      );

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
     CORE FETCH
  ========================= */

  async function fetchJSON(fileName) {
    const url = `${BASE_PATH}${fileName}`;
    log("Fetching:", url);

    const response = await withTimeout(fetch(url, { cache: "no-store" }), FETCH_TIMEOUT);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} — ${url}`);
    }

    return response.json();
  }

  async function loadJSON(fileName) {
    /* ---- Memory Cache ---- */
    if (memoryCache[fileName]) {
      log("Memory cache hit:", fileName);
      return memoryCache[fileName];
    }

    /* ---- Session Cache ---- */
    if (ENABLE_SESSION_CACHE) {
      const cached = sessionStorage.getItem(getSessionKey(fileName));
      if (cached) {
        const parsed = JSON.parse(cached);
        memoryCache[fileName] = parsed;
        log("Session cache hit:", fileName);
        return parsed;
      }
    }

    /* ---- In-flight Dedup ---- */
    if (inFlightRequests[fileName]) {
      return inFlightRequests[fileName];
    }

    /* ---- Network ---- */
    const request = (async () => {
      try {
        const data = await fetchJSON(fileName);

        if (!data) {
          warn("Empty data:", fileName);
          return null;
        }

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

        // DEV VISIBILITY — do not stay silent
        if (DEBUG) {
          warn(
            `⚠️ ${fileName} missing. Renderer will skip this section.`
          );
        }

        return null;
      } finally {
        delete inFlightRequests[fileName];
      }
    })();

    inFlightRequests[fileName] = request;
    return request;
  }

  /* =========================
     PUBLIC API
  ========================= */

  return Object.freeze({
    getProfile: () => loadJSON("profile.json"),
    getExperience: () => loadJSON("experience.json"),
    getEducation: () => loadJSON("education.json"),
    getProjects: () => loadJSON("projects.json"),
    getFeatured: () => loadJSON("featured.json"),
    getLicenses: () => loadJSON("licenses.json"),
    getContact: () => loadJSON("contact.json"),
    getSocials: () => loadJSON("social.json"),

    preloadAll: async () => {
      log("Preloading all data...");
      await Promise.allSettled([
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

    debugSnapshot: () => ({
      basePath: BASE_PATH,
      memoryCache: Object.keys(memoryCache),
      inFlightRequests: Object.keys(inFlightRequests)
    })
  });
})();
