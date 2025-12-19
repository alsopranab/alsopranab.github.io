(function (window) {
  "use strict";
  const FETCH_TIMEOUT = 8000;
  const ENABLE_SESSION_CACHE = true;
  const DEBUG = true; // TEMPORARILY TRUE — need disable later



  const BASE_PATH = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, "")}/assets/data/`;


  const memoryCache = Object.create(null);
  const inFlight = Object.create(null);



  const log = (...a) => DEBUG && console.log("[DataService]", ...a);
  const warn = (...a) => console.warn("[DataService]", ...a);
  const error = (...a) => console.error("[DataService]", ...a);


  const withTimeout = (promise, ms) =>
    new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error("Timeout")), ms);
      promise.then(
        v => {
          clearTimeout(t);
          resolve(v);
        },
        e => {
          clearTimeout(t);
          reject(e);
        }
      );
    });

  const sessionKey = file => `DS::${file}`;


  function normalizeSocial(data) {
    if (!Array.isArray(data?.profiles)) {
      warn("social.json malformed — fallback used");
      return { profiles: [] };
    }

    return {
      profiles: data.profiles
        .filter(p => p && typeof p === "object" && p.enabled !== false)
        .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
    };
  }


  async function fetchJSON(file) {
    const url = `${BASE_PATH}${file}`;
    log("Fetching:", url);

    const res = await withTimeout(
      fetch(url, { cache: "no-store" }),
      FETCH_TIMEOUT
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} – ${file}`);
    }

    return res.json();
  }


  async function load(file) {
    if (memoryCache[file]) return memoryCache[file];

    if (ENABLE_SESSION_CACHE) {
      const cached = sessionStorage.getItem(sessionKey(file));
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          memoryCache[file] = parsed;
          return parsed;
        } catch {
          sessionStorage.removeItem(sessionKey(file));
        }
      }
    }

    if (inFlight[file]) return inFlight[file];

    const request = (async () => {
      try {
        let data = await fetchJSON(file);

        if (!data || typeof data !== "object") {
          warn(`${file} returned invalid JSON`);
          return {};
        }

        if (file === "social.json") {
          data = normalizeSocial(data);
        }

        memoryCache[file] = data;

        if (ENABLE_SESSION_CACHE) {
          sessionStorage.setItem(sessionKey(file), JSON.stringify(data));
        }

        log("Loaded:", file);
        return data;
      } catch (e) {
        error(`Failed loading ${file}`, e);
        return {};
      } finally {
        delete inFlight[file];
      }
    })();

    inFlight[file] = request;
    return request;
  }

  window.DataService = Object.freeze({
    getProfile:    () => load("profile.json"),
    getExperience: () => load("experience.json"),
    getEducation:  () => load("education.json"),
    getProjects:   () => load("projects.json"),
    getFeatured:   () => load("featured.json"),
    getLicenses:   () => load("licenses.json"),
    getContact:    () => load("contact.json"),
    getSocials:    () => load("social.json"),

    preloadAll: () =>
      Promise.allSettled([
        load("profile.json"),
        load("experience.json"),
        load("education.json"),
        load("projects.json"),
        load("featured.json"),
        load("licenses.json"),
        load("contact.json"),
        load("social.json")
      ]),

    debugSnapshot: () => ({
      basePath: BASE_PATH,
      memory: Object.keys(memoryCache),
      inflight: Object.keys(inFlight)
    })
  });

})(window);
