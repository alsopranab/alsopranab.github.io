class Store {
  constructor() {
    this.memory = {};
    this.isBrowser =
      typeof window !== "undefined" &&
      typeof localStorage !== "undefined";
  }

  get(key) {
    return this.memory[key];
  }

  set(key, value) {
    this.memory[key] = value;
  }

  /**
   * Cached fetch with TTL
   * - Never caches failures
   * - Safe for SPA
   * - localStorage + memory hybrid
   */
  async cached(key, ttl, fetcher) {
    const now = Date.now();

    // 1️⃣ Memory cache (fastest)
    const mem = this.memory[key];
    if (mem && now - mem.timestamp < ttl) {
      return mem.data;
    }

    // 2️⃣ localStorage cache (safe)
    if (this.isBrowser) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            parsed &&
            parsed.timestamp &&
            now - parsed.timestamp < ttl
          ) {
            // Sync back to memory
            this.memory[key] = parsed;
            return parsed.data;
          }
        }
      } catch (error) {
        console.warn("[Store] Cache read failed", error);
        localStorage.removeItem(key);
      }
    }

    // 3️⃣ Fetch fresh data (never cache failure)
    let data;
    try {
      data = await fetcher();
    } catch (error) {
      console.warn("[Store] Fetcher failed, cache skipped", error);
      return mem?.data ?? null;
    }

    const record = {
      data,
      timestamp: now
    };

    // 4️⃣ Save to memory
    this.memory[key] = record;

    // 5️⃣ Save to localStorage (best effort)
    if (this.isBrowser) {
      try {
        localStorage.setItem(key, JSON.stringify(record));
      } catch (error) {
        console.warn("[Store] Cache write failed", error);
      }
    }

    return data;
  }

  /**
   * Clear a specific cache key
   */
  clear(key) {
    delete this.memory[key];
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Clear all cache (memory + storage)
   */
  clearAll() {
    this.memory = {};
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}

export const store = new Store();
