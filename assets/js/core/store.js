class Store {
  constructor() {
    this.state = {};
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
  }

  async cached(key, ttl, fetcher) {
    const cached = JSON.parse(localStorage.getItem(key) || "null");

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }

    const data = await fetcher();
    localStorage.setItem(
      key,
      JSON.stringify({ data, timestamp: Date.now() })
    );

    return data;
  }
}

export const store = new Store();

