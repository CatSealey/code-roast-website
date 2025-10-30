/**
 * Data Service
 * Handles data management and API interactions
 * Follows Single Responsibility Principle
 */
export class DataService {
  constructor() {
    this.cache = new Map();
    this.observers = new Set();
    this.endpoints = {
      analytics: '/api/analytics',
      config: '/api/config',
      reports: '/api/reports'
    };
  }

  /**
   * Fetch data from API
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise} Promise that resolves to data
   */
  async fetchData(endpoint, options = {}) {
    const cacheKey = this.generateCacheKey(endpoint, options);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache successful responses
      this.cache.set(cacheKey, data);
      
      // Notify observers
      this.notifyObservers('dataFetched', { endpoint, data });
      
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      this.notifyObservers('dataError', { endpoint, error });
      throw error;
    }
  }

  /**
   * Post data to API
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Data to post
   * @param {Object} options - Fetch options
   * @returns {Promise} Promise that resolves to response data
   */
  async postData(endpoint, data, options = {}) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      
      // Clear related cache entries
      this.clearCacheByPattern(endpoint);
      
      // Notify observers
      this.notifyObservers('dataPosted', { endpoint, data: responseData });
      
      return responseData;
    } catch (error) {
      console.error('Error posting data:', error);
      this.notifyObservers('dataError', { endpoint, error });
      throw error;
    }
  }

  /**
   * Get analytics data
   * @param {Object} params - Query parameters
   * @returns {Promise} Analytics data
   */
  async getAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `${this.endpoints.analytics}?${queryString}`;
    return this.fetchData(endpoint);
  }

  /**
   * Get configuration data
   * @returns {Promise} Configuration data
   */
  async getConfig() {
    return this.fetchData(this.endpoints.config);
  }

  /**
   * Update configuration
   * @param {Object} config - Configuration to update
   * @returns {Promise} Updated configuration
   */
  async updateConfig(config) {
    return this.postData(this.endpoints.config, config);
  }

  /**
   * Generate cache key
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {string} Cache key
   */
  generateCacheKey(endpoint, options) {
    const key = endpoint + JSON.stringify(options);
    return btoa(key); // Base64 encode for safe key
  }

  /**
   * Clear cache by pattern
   * @param {string} pattern - Pattern to match
   */
  clearCacheByPattern(pattern) {
    for (const key of this.cache.keys()) {
      if (atob(key).includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clearCache() {
    this.cache.clear();
    this.notifyObservers('cacheCleared', {});
  }

  /**
   * Add observer for data events
   * @param {Function} callback - Observer callback
   */
  addObserver(callback) {
    this.observers.add(callback);
  }

  /**
   * Remove observer
   * @param {Function} callback - Observer callback to remove
   */
  removeObserver(callback) {
    this.observers.delete(callback);
  }

  /**
   * Notify observers
   * @param {string} eventType - Type of event
   * @param {Object} data - Event data
   */
  notifyObservers(eventType, data) {
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
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()).map(key => atob(key))
    };
  }

  /**
   * Mock data for development
   * @param {string} type - Type of mock data
   * @returns {Object} Mock data
   */
  getMockData(type) {
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
      },
      config: {
        company_name: "Code-Roast",
        theme: "default",
        features: ["analytics", "reports", "dashboard"]
      },
      reports: {
        quarterly: {
          q1: { revenue: 400000, growth: 15 },
          q2: { revenue: 450000, growth: 12.5 },
          q3: { revenue: 425000, growth: -5.5 },
          q4: { revenue: 480000, growth: 13 }
        }
      }
    };

    return mockData[type] || {};
  }
}