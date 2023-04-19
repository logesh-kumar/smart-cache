class SmartCache<T = any> {
    private cache: Map<string, T>;
    private maxSize: number;
  
    constructor(maxSize: number = 100) {
      this.cache = new Map<string, T>();
      this.maxSize = maxSize;
    }
  
    get(key: string): T | undefined {
      const value = this.cache.get(key);
      if (value !== undefined) {
        // Move accessed key to the end of the Map (most recently used)
        this.cache.delete(key);
        this.cache.set(key, value);
      }
      return value;
    }
  
    set(key: string, value: T): void {
      if (this.cache.size >= this.maxSize) {
        // Remove the least recently used item (first item in the Map)
        const lruKey = this.cache.keys().next().value;
        this.cache.delete(lruKey);
      }
      this.cache.set(key, value);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }
  
    delete(key: string): void {
      this.cache.delete(key);
    }
  
    clear(): void {
      this.cache.clear();
    }
  
    size(): number {
      return this.cache.size;
    }
}
  
export default SmartCache;
  