export class CacheServices {
  private cacheStores: any;

  constructor() {
    this.cacheStores = {};
  }

  getStore(cacheStoreName: string) {
    if (!this.cacheStores[cacheStoreName]) {
      this.cacheStores[cacheStoreName] = new CacheStore();
    }

    return this.cacheStores[cacheStoreName];
  }


}

export class CacheStore {
  private caches: any;
  constructor() {
    this.caches = {};
  }

  get(cacheName: string, propertyName: string) {
    let cache = this.caches[cacheName];

    if (!cache)
      return null;
    else
      return cache.get(propertyName);
  }

  put(cacheName: string, propertyName: string, value: any) {
    if (!this.caches[cacheName]) {
      this.caches[cacheName] = new Cache();
    }
    let cache = this.caches[cacheName];

    return cache.put(propertyName, value);
  }
}

export class Cache {
  private cache: any;

  constructor() {
    this.cache = {};
  }

  get(propertyName: string): any {
    return this.cache[propertyName];
  }

  put(propertyName: string, value: any): any {
    this.cache[propertyName] = value;
  }
}

