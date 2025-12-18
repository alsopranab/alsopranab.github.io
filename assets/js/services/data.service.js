/**
 * Centralized Data Service (FINAL — LOCKED & SCHEMA SAFE)
 * ======================================================
 * - GitHub Pages safe
 * - Absolute-path resilient
 * - Memory + session cache
 * - In-flight deduplication
 * - Canonical schema output
 * - Fail-open (never crashes UI)
 */

const DataService = (() => {
  /* =========================
     CONFIGURATION
  ========================= */

  const BASE_PATH = (() => {
    const path = window.location.pathname;

    // Root or direct HTML access
    if (path === "/" || path.endsWith(".html")) {
      return "/assets/data/";
    }

    // Sub-paths (GitHub Pages)
    return path.replace(/\/[^/]*$/, "/assets/data/");
  })();

  const FETCH_TIMEOUT = 8000;
  const ENABLE_SESSION_CACHE = true;

  // Disable noisy logs in production
  const DEBUG = location.hostname === "localhost";

  /* =========================
     INTERNAL STATE
  ========================= */

  const memoryCache = Object.create(null);
  const inFlightRequests = Object.create(null);

  /* =========================
     LOGGING
  ========================= */

  const log = (...a) => DEBUG && console.log("[DataService]", ...a);
  const warn = (...a) => console.warn("[DataService]", ...a);
  const err  = (...a) => console.error("[DataService]", ...a);

  /* =========================
     UTILITIES
  ========================= */

  const withTimeout = (promise, ms) =>
    new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error("Timeout")), ms);
      promise.then(
        r => { clearTimeout(t); resolve(r); },
        e => { clearTimeout(t); reject(e); }
      );
    });

  const sessionKey = file => `DataService::${file}`;

  /* =========================
     SCHEMA NORMALIZERS
  ========================= */

  function normalizeSocial(data) {
    if (!Array.isArray(data?.profiles)) {
      warn("social.json malformed — returning empty profiles");
      return { profiles: [] };
    }

    return {
      profiles: data.profiles
        .filter(p => p && typeof p === "object" && p.enabled !== false)
        .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
    };
  }

  /* =========================
     CORE FETCH
  ========================= */

  async function fetchJSON(file) {
    const url = `${BASE_PATH}${file}`;
    log("Fetching:", url);

    const res = await withTimeout(
      fetch(url, { cache: "no-store" }),
      FETCH_TIMEOUT
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} → ${url}`);
    }

    return res.json();
  }

  async function loadJSON(file) {
    /* ---- Memory cache ---- */
    if (memoryCache[file]) {
      log("Memory hit:", file);
      return memoryCache[file];
    }

    /* ---- Session cache ---- */
    if (ENABLE_SESSION_CACHE) {
      const cached = sessionStorage.getItem(sessionKey(file));
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          memoryCache[file] = parsed;
          log("Session hit:", file);
          return parsed;
        } catch {
          sessionStorage.removeItem(sessionKey(file));
        }
      }
    }

    /* ---- In-flight dedupe ---- */
    if (inFlightRequests[file]) {
      return inFlightRequests[file];
    }

    /* ---- Network fetch ---- */
    const request = (async () => {
      try {
        let data = await fetchJSON(file);
        if (!data) return null;

        // Canonical schema lock
        if (file === "social.json") {
          data = normalizeSocial(data);
        }

        memoryCache[file] = data;

        if (ENABLE_SESSION_CACHE) {
          sessionStorage.setItem(
            sessionKey(file),
            JSON.stringify(data)
          );
        }

        log("Loaded:", file);
        return data;
      } catch (e) {
        err(`Failed loading ${file}`, e);
        return null;
      } finally {
        delete inFlightRequests[file];
      }
    })();

    inFlightRequests[file] = request;
    return request;
  }

  /* =========================
     PUBLIC API (LOCKED)
  ========================= */

  return Object.freeze({
    getProfile:    () => loadJSON("profile.json"),
    getExperience: () => loadJSON("experience.json"),
    getEducation:  () => loadJSON("education.json"),
    getProjects:   () => loadJSON("projects.json"),
    getFeatured:   () => loadJSON("featured.json"),
    getLicenses:   () => loadJSON("licenses.json"),
    getContact:    () => loadJSON("contact.json"),
    getSocials:    () => loadJSON("social.json"),

    preloadAll: async () => {
      log("Preloading all JSON…");
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
      inFlight: Object.keys(inFlightRequests)
    })
  });
})();
