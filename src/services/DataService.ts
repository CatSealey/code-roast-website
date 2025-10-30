import { 
  DataEventType, 
  DataEventData, 
  DataObserver, 
  CacheStats, 
  RequestOptions
} from '../types.js';

interface Endpoints {
  analytics: string;
  config: string;
  reports: string;
}

interface AnalyticsParams {
  startDate?: string;
  endDate?: string;
  metric?: string;
  [key: string]: unknown;
}

interface MockAnalytics {
  revenue: number;
  users: number;
  conversion: number;
  trends: Array<{ month: string; value: number }>;
}

interface MockConfig {
  company_name: string;
  theme: string;
  features: string[];
}

interface MockReports {
  quarterly: {
    [key: string]: { revenue: number; growth: number };
  };
}

type MockDataType = 'analytics' | 'config' | 'reports';

/**
 * Data Service
 * Handles data management and API interactions
 * Follows Single Responsibility Principle
 */
export class DataService {
  private readonly cache = new Map<string, unknown>();
  private readonly observers = new Set<DataObserver>();
  private readonly endpoints: Endpoints = {
    analytics: '/api/analytics',
    config: '/api/config',
    reports: '/api/reports'
  };

  /**
   * Fetch data from API
   */
  async fetchData<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const cacheKey = this.generateCacheKey(endpoint, options);
    const { cache: enableCache = true, timeout, ...fetchOptions } = options;
    
    // Check cache first
    if (enableCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as T;
    }

    try {
      const controller = new AbortController();
      const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;

      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers
        },
        method: fetchOptions.method || 'GET',
        body: fetchOptions.body,
        signal: controller.signal,
        ...fetchOptions
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as T;
      
      // Cache successful responses
      if (enableCache) {
        this.cache.set(cacheKey, data);
      }
      
      // Notify observers
      this.notifyObservers('dataFetched', { 
        endpoint, 
        data, 
        timestamp: Date.now() 
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      this.notifyObservers('dataError', { 
        endpoint, 
        error: error as Error, 
        timestamp: Date.now() 
      });
      throw error;
    }
  }

  /**
   * Post data to API
   */
  async postData<T = unknown, R = unknown>(
    endpoint: string, 
    data: T, 
    options: RequestOptions = {}
  ): Promise<R> {
    try {
      const { timeout, cache, ...fetchOptions } = options;
      const controller = new AbortController();
      const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers
        },
        body: JSON.stringify(data),
        signal: controller.signal,
        ...fetchOptions
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json() as R;
      
      // Clear related cache entries
      this.clearCacheByPattern(endpoint);
      
      // Notify observers
      this.notifyObservers('dataFetched', { 
        endpoint, 
        data: responseData, 
        timestamp: Date.now() 
      });
      
      return responseData;
    } catch (error) {
      console.error('Error posting data:', error);
      this.notifyObservers('dataError', { 
        endpoint, 
        error: error as Error, 
        timestamp: Date.now() 
      });
      throw error;
    }
  }

  /**
   * Get analytics data
   */
  async getAnalytics(params: AnalyticsParams = {}): Promise<MockAnalytics> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = `${this.endpoints.analytics}?${queryString}`;
    return this.fetchData<MockAnalytics>(endpoint);
  }

  /**
   * Get configuration data
   */
  async getConfig(): Promise<MockConfig> {
    return this.fetchData<MockConfig>(this.endpoints.config);
  }

  /**
   * Update configuration
   */
  async updateConfig(config: Partial<MockConfig>): Promise<MockConfig> {
    return this.postData<Partial<MockConfig>, MockConfig>(this.endpoints.config, config);
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(endpoint: string, options: RequestOptions): string {
    const key = endpoint + JSON.stringify(options);
    return btoa(key); // Base64 encode for safe key
  }

  /**
   * Clear cache by pattern
   */
  private clearCacheByPattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (atob(key).includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cache.clear();
    this.notifyObservers('cacheCleared', { timestamp: Date.now() });
  }

  /**
   * Add observer for data events
   */
  addObserver(callback: DataObserver): void {
    this.observers.add(callback);
  }

  /**
   * Remove observer
   */
  removeObserver(callback: DataObserver): void {
    this.observers.delete(callback);
  }

  /**
   * Notify observers
   */
  private notifyObservers(eventType: DataEventType, data: DataEventData): void {
    this.observers.forEach(observer => {
      try {
        observer(eventType, data);
      } catch (error) {
        console.error('Error in data observer:', error);
      }
    });
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): CacheStats {
    return {
      size: this.cache.size,
      hits: 0, // Would need to implement hit tracking
      misses: 0, // Would need to implement miss tracking
      lastCleared: null // Would need to track last clear time
    };
  }

  /**
   * Mock data for development
   */
  getMockData(type: MockDataType): MockAnalytics | MockConfig | MockReports | Record<string, never> {
    const mockData = {
      analytics: {
        revenue: 150000,
        users: 2500,
        conversion: 3.2,
        trends: [
          { month: 'Jan', value: 120000 },
          { month: 'Feb', value: 135000 },
          { month: 'Mar', value: 150000 }
        ]
      } as MockAnalytics,
      config: {
        company_name: "Code-Roast",
        theme: "default",
        features: ["analytics", "reports", "dashboard"]
      } as MockConfig,
      reports: {
        quarterly: {
          q1: { revenue: 400000, growth: 15 },
          q2: { revenue: 450000, growth: 12.5 },
          q3: { revenue: 425000, growth: -5.5 },
          q4: { revenue: 480000, growth: 13 }
        }
      } as MockReports
    };

    return mockData[type] || {};
  }
}