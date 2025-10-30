import { DarkModeManager } from './components/DarkModeManager.js';
import { UIManager } from './components/UIManager.js';
import { ConfigManager } from './services/ConfigManager.js';
import { DataService } from './services/DataService.js';

/**
 * Main Application Class
 * Follows Dependency Injection and Single Responsibility principles
 * Acts as the composition root for the application
 */
export class CodeRoastApp {
  constructor() {
    // Initialize services
    this.configManager = new ConfigManager();
    this.dataService = new DataService();
    this.uiManager = new UIManager();
    this.darkModeManager = new DarkModeManager();
    
    // Application state
    this.isInitialized = false;
    this.version = '1.0.0';
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('Initializing Code-Roast Application...');
      
      // Setup configuration observers
      this.setupConfigObservers();
      
      // Setup data observers
      this.setupDataObservers();
      
      // Setup UI observers
      this.setupUIObservers();
      
      // Initialize external SDK if available
      this.initializeSDK();
      
      // Load initial data
      await this.loadInitialData();
      
      // Apply initial configuration
      this.applyInitialConfig();
      
      this.isInitialized = true;
      console.log('Code-Roast Application initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize application:', error);
    }
  }

  /**
   * Setup configuration change observers
   */
  setupConfigObservers() {
    this.configManager.addObserver((changes) => {
      this.handleConfigChange(changes);
    });
  }

  /**
   * Setup data service observers
   */
  setupDataObservers() {
    this.dataService.addObserver((eventType, data) => {
      this.handleDataEvent(eventType, data);
    });
  }

  /**
   * Setup UI observers
   */
  setupUIObservers() {
    this.uiManager.addObserver('buttonClick', (data) => {
      this.handleButtonClick(data);
    });
  }

  /**
   * Handle configuration changes
   * @param {Object} changes - Configuration changes
   */
  handleConfigChange(changes) {
    console.log('Configuration changed:', changes);
    
    // Update UI elements
    Object.entries(changes).forEach(([key, value]) => {
      if (this.isTextContent(key)) {
        this.uiManager.updateElement(this.getElementId(key), value);
      } else if (this.isStyleProperty(key)) {
        this.updateStyles(key, value);
      }
    });
  }

  /**
   * Handle data service events
   * @param {string} eventType - Type of event
   * @param {Object} data - Event data
   */
  handleDataEvent(eventType, data) {
    console.log(`Data event: ${eventType}`, data);
    
    switch (eventType) {
      case 'dataFetched':
        this.handleDataFetched(data);
        break;
      case 'dataError':
        this.handleDataError(data);
        break;
      case 'cacheCleared':
        console.log('Data cache cleared');
        break;
    }
  }

  /**
   * Handle successful data fetch
   * @param {Object} data - Fetched data
   */
  handleDataFetched(data) {
    // Update UI with new data
    if (data.endpoint.includes('analytics')) {
      this.updateAnalyticsDisplay(data.data);
    } else if (data.endpoint.includes('config')) {
      this.configManager.setConfig(data.data);
    }
  }

  /**
   * Handle data fetch errors
   * @param {Object} error - Error data
   */
  handleDataError(error) {
    console.error('Data service error:', error);
    // Could show error toast or fallback UI
  }

  /**
   * Handle button clicks
   * @param {Object} data - Click data
   */
  handleButtonClick(data) {
    console.log('Button clicked:', data);
    // Handle different button actions
  }

  /**
   * Initialize external SDK
   */
  initializeSDK() {
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig: this.configManager.getAll(),
        onConfigChange: (config) => this.configManager.setConfig(config),
        mapToCapabilities: () => this.configManager.getCapabilities(),
        mapToEditPanelValues: () => this.configManager.getEditPanelValues()
      });
      console.log('Element SDK initialized');
    }
  }

  /**
   * Load initial data
   */
  async loadInitialData() {
    try {
      // Try to load configuration from server
      // Fall back to default if not available
      const config = await this.dataService.getConfig().catch(() => null);
      if (config) {
        this.configManager.setConfig(config);
      }
    } catch (error) {
      console.warn('Could not load initial data, using defaults:', error);
    }
  }

  /**
   * Apply initial configuration
   */
  applyInitialConfig() {
    const config = this.configManager.getAll();
    this.handleConfigChange(config);
  }

  /**
   * Check if key represents text content
   * @param {string} key - Configuration key
   * @returns {boolean} True if text content
   */
  isTextContent(key) {
    const textKeys = [
      'company_name', 'hero_title', 'hero_subtitle', 'cta_button',
      'section_one_title', 'section_two_title', 'section_three_title',
      'footer_text'
    ];
    return textKeys.includes(key);
  }

  /**
   * Check if key represents style property
   * @param {string} key - Configuration key
   * @returns {boolean} True if style property
   */
  isStyleProperty(key) {
    const styleKeys = [
      'background_color', 'surface_color', 'text_color',
      'primary_action_color', 'secondary_action_color',
      'font_family', 'font_size'
    ];
    return styleKeys.includes(key);
  }

  /**
   * Get element ID for configuration key
   * @param {string} key - Configuration key
   * @returns {string} Element ID
   */
  getElementId(key) {
    const mapping = {
      'company_name': 'company-name',
      'hero_title': 'hero-title',
      'hero_subtitle': 'hero-subtitle',
      'cta_button': 'cta-button',
      'section_one_title': 'section-one-title',
      'section_two_title': 'section-two-title',
      'section_three_title': 'section-three-title',
      'footer_text': 'footer-text'
    };
    return mapping[key] || key;
  }

  /**
   * Update styles based on configuration
   * @param {string} key - Style key
   * @param {any} value - Style value
   */
  updateStyles(key, value) {
    const root = document.documentElement;
    const body = document.body;
    
    switch (key) {
      case 'background_color':
        root.style.setProperty('--color-primary', value);
        break;
      case 'surface_color':
        root.style.setProperty('--color-surface', value);
        break;
      case 'text_color':
        root.style.setProperty('--color-text', value);
        break;
      case 'primary_action_color':
        root.style.setProperty('--color-secondary', value);
        break;
      case 'secondary_action_color':
        root.style.setProperty('--color-accent', value);
        break;
      case 'font_family':
        body.style.fontFamily = `${value}, var(--font-family-base)`;
        break;
      case 'font_size':
        root.style.setProperty('--font-size-base', `${value}px`);
        break;
    }
  }

  /**
   * Update analytics display
   * @param {Object} analyticsData - Analytics data to display
   */
  updateAnalyticsDisplay(analyticsData) {
    // This would update charts and analytics displays
    console.log('Updating analytics display:', analyticsData);
  }

  /**
   * Get application status
   * @returns {Object} Application status
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      version: this.version,
      darkMode: this.darkModeManager.isDarkMode(),
      cacheStats: this.dataService.getCacheStats()
    };
  }

  /**
   * Destroy application and clean up
   */
  destroy() {
    console.log('Destroying Code-Roast Application...');
    
    // Clean up observers and event listeners
    this.configManager.observers.length = 0;
    this.dataService.observers.clear();
    this.uiManager.observers.clear();
    
    // Clear caches
    this.dataService.clearCache();
    
    this.isInitialized = false;
    console.log('Code-Roast Application destroyed');
  }
}