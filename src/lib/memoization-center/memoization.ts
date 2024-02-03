const DEFAULT_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hours

/**
 * A class that provides memoization functionality.
 */
class Memoization {
  private memo: Map<
    string,
    {
      value: any;
      maxAge: number;
      timestamp: number;
    }
  > = new Map();

  /**
   * Memoizes the result of a function based on a given key.
   * @param key - The key used for memoization.
   * @param fn - The function to be memoized.
   * @param options - Optional configuration options.
   * @returns The memoized value.
   */
  public async memoize<T>(
    key: string,
    fn: () => T | Promise<T>,
    options?: {
      maxAge?: number;
    }
  ): Promise<T> {
    const memo = this.memo.get(key);
    if (memo && Date.now() - memo.timestamp < memo.maxAge) {
      return memo.value;
    }

    const value = await fn();
    this.memo.set(key, {
      value,
      maxAge: options?.maxAge || DEFAULT_MAX_AGE,
      timestamp: Date.now(),
    });
    return value;
  }
}

export default new Memoization();
