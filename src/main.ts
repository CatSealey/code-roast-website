import { DarkModeManager } from './components/DarkModeManager.js';
import { UIManager } from './components/UIManager.js';
import { ConfigManager } from './services/ConfigManager.js';
import { DataService } from './services/DataService.js';
import { 
  ConfigValues, 
  ConfigKey, 
  AppStatus, 
  ElementSDKConfig,
  DataEventType,
  DataEventData,
  UIEventType,
  UIEventData
} from './types.js';

// Extend global Window interface for external SDK
declare global {
  interface Window {
    elementSdk?: {
      init: (config: ElementSDKConfig) => void;
    };
    codeRoastApp?: CodeRoastApp;
  }
}

/**
 * Main Application Class
 * Follows Dependency Injection and Single Responsibility principles
 * Acts as the composition root for the application
 */
export class CodeRoastApp {
  private readonly configManager: ConfigManager;
  private readonly dataService: DataService;
  private readonly uiManager: UIManager;
  private readonly darkModeManager: DarkModeManager;
  
  private isInitialized: boolean = false;
  private readonly version: string = '1.0.0';

  constructor() {
    // Initialize services
    this.configManager = new ConfigManager();
    this.dataService = new DataService();
    this.uiManager = new UIManager();
    this.darkModeManager = new DarkModeManager();
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init(): Promise<void> {
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
  private setupConfigObservers(): void {
    this.configManager.addObserver((changes: Partial<ConfigValues>) => {
      this.handleConfigChange(changes);
    });
  }

  /**
   * Setup data service observers
   */
  private setupDataObservers(): void {
    this.dataService.addObserver((eventType: DataEventType, data: DataEventData) => {
      this.handleDataEvent(eventType, data);
    });
  }

  /**
   * Setup UI observers
   */
  private setupUIObservers(): void {
    this.uiManager.addObserver('buttonClick', (_eventType: UIEventType, data: UIEventData) => {
      this.handleButtonClick(data);
    });
  }

  /**
   * Handle configuration changes
   */
  private handleConfigChange(changes: Partial<ConfigValues>): void {
    console.log('Configuration changed:', changes);
    
    // Update UI elements
    Object.entries(changes).forEach(([key, value]) => {
      const configKey = key as ConfigKey;
      if (this.isTextContent(configKey) && typeof value === 'string') {
        this.uiManager.updateElement(this.getElementId(configKey), value);
      } else if (this.isStyleProperty(configKey)) {
        this.updateStyles(configKey, value);
      }
    });
  }

  /**
   * Handle data service events
   */
  private handleDataEvent(eventType: DataEventType, data: DataEventData): void {
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
   */
  private handleDataFetched(data: DataEventData): void {
    // Update UI with new data
    if (data.endpoint?.includes('analytics')) {
      this.updateAnalyticsDisplay(data.data);
    } else if (data.endpoint?.includes('config')) {
      this.configManager.setConfig(data.data as Partial<ConfigValues>);
    }
  }

  /**
   * Handle data fetch errors
   */
  private handleDataError(error: DataEventData): void {
    console.error('Data service error:', error);
    // Could show error toast or fallback UI
  }

  /**
   * Handle button clicks
   */
  private handleButtonClick(data: UIEventData): void {
    console.log('Button clicked:', data);
    // Handle different button actions
  }

  /**
   * Initialize external SDK
   */
  private initializeSDK(): void {
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig: this.configManager.getAll(),
        onConfigChange: (config: Partial<ConfigValues>) => this.configManager.setConfig(config),
        mapToCapabilities: () => this.configManager.getCapabilities(),
        mapToEditPanelValues: () => this.configManager.getEditPanelValues()
      });
      console.log('Element SDK initialized');
    }
  }

  /**
   * Load initial data
   */
  private async loadInitialData(): Promise<void> {
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
  private applyInitialConfig(): void {
    const config = this.configManager.getAll();
    this.handleConfigChange(config);
  }

  /**
   * Check if key represents text content
   */
  private isTextContent(key: ConfigKey): boolean {
    const textKeys: ConfigKey[] = [
      'company_name', 'hero_title', 'hero_subtitle', 'cta_button',
      'section_one_title', 'section_two_title', 'section_three_title',
      'footer_text'
    ];
    return textKeys.includes(key);
  }

  /**
   * Check if key represents style property
   */
  private isStyleProperty(key: ConfigKey): boolean {
    const styleKeys: ConfigKey[] = [
      'background_color', 'surface_color', 'text_color',
      'primary_action_color', 'secondary_action_color',
      'font_family', 'font_size'
    ];
    return styleKeys.includes(key);
  }

  /**
   * Get element ID for configuration key
   */
  private getElementId(key: ConfigKey): string {
    const mapping: Partial<Record<ConfigKey, string>> = {
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
   */
  private updateStyles(key: ConfigKey, value: unknown): void {
    const root = document.documentElement;
    const body = document.body;
    
    switch (key) {
      case 'background_color':
        root.style.setProperty('--color-primary', String(value));
        break;
      case 'surface_color':
        root.style.setProperty('--color-surface', String(value));
        break;
      case 'text_color':
        root.style.setProperty('--color-text', String(value));
        break;
      case 'primary_action_color':
        root.style.setProperty('--color-secondary', String(value));
        break;
      case 'secondary_action_color':
        root.style.setProperty('--color-accent', String(value));
        break;
      case 'font_family':
        body.style.fontFamily = `${String(value)}, var(--font-family-base)`;
        break;
      case 'font_size':
        root.style.setProperty('--font-size-base', `${Number(value)}px`);
        break;
    }
  }

  /**
   * Update analytics display
   */
  private updateAnalyticsDisplay(analyticsData: unknown): void {
    // This would update charts and analytics displays
    console.log('Updating analytics display:', analyticsData);
  }

  /**
   * Get application status
   */
  getStatus(): AppStatus {
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
  destroy(): void {
    console.log('Destroying Code-Roast Application...');
    
    // Clear caches
    this.dataService.clearCache();
    
    this.isInitialized = false;
    console.log('Code-Roast Application destroyed');
  }
}