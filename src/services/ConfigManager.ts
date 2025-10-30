import { 
  ConfigValues, 
  ConfigKey, 
  ConfigChangeObserver, 
  Capabilities, 
  ObserverPattern 
} from '../types.js';

/**
 * Configuration Management Service
 * Follows Single Responsibility Principle - only handles configuration
 * Follows Dependency Inversion Principle - depends on abstractions
 */
export class ConfigManager implements ObserverPattern<Partial<ConfigValues>> {
  private readonly defaultConfig: ConfigValues = {
    company_name: "Code-Roast",
    hero_title: "Understanding Data Analysis & Business Intelligence",
    hero_subtitle: "Comprehensive insights into how data drives modern business decisions",
    cta_button: "Learn More",
    section_one_title: "The Foundation of Data Analysis",
    section_two_title: "Business Intelligence Explained", 
    section_three_title: "Data Analysis Methodologies",
    footer_text: "© 2024 Code-Roast. Advancing data literacy and business intelligence.",
    background_color: "#d05d09",
    surface_color: "#ffffff",
    text_color: "#2c3e50",
    primary_action_color: "#8b4513",
    secondary_action_color: "#d05d09",
    font_family: "Inter",
    font_size: 16
  };

  private currentConfig: ConfigValues;
  public observers: ConfigChangeObserver[] = [];

  constructor() {
    this.currentConfig = { ...this.defaultConfig };
  }

  /**
   * Get configuration value
   */
  get<K extends ConfigKey>(key: K): ConfigValues[K] {
    return this.currentConfig[key] ?? this.defaultConfig[key];
  }

  /**
   * Set configuration value
   */
  set<K extends ConfigKey>(key: K, value: ConfigValues[K]): void {
    this.currentConfig[key] = value;
    this.notifyObservers({ [key]: value } as Partial<ConfigValues>);
  }

  /**
   * Set multiple configuration values
   */
  setConfig(config: Partial<ConfigValues>): void {
    Object.assign(this.currentConfig, config);
    this.notifyObservers(config);
  }

  /**
   * Get all configuration
   */
  getAll(): ConfigValues {
    return { ...this.currentConfig };
  }

  /**
   * Reset to default configuration
   */
  reset(): void {
    this.currentConfig = { ...this.defaultConfig };
    this.notifyObservers(this.currentConfig);
  }

  /**
   * Add observer for configuration changes
   */
  addObserver(callback: ConfigChangeObserver): void {
    this.observers.push(callback);
  }

  /**
   * Remove observer
   */
  removeObserver(callback: ConfigChangeObserver): void {
    this.observers = this.observers.filter(observer => observer !== callback);
  }

  /**
   * Notify all observers of configuration changes
   */
  notifyObservers(changes: Partial<ConfigValues>): void {
    this.observers.forEach(observer => {
      try {
        observer(changes);
      } catch (error) {
        console.error('Error in config observer:', error);
      }
    });
  }

  /**
   * Validate configuration
   */
  validate(config: Partial<ConfigValues>): boolean {
    const requiredKeys = Object.keys(this.defaultConfig) as ConfigKey[];
    return requiredKeys.every(key => {
      const value = config[key];
      return value !== undefined && value !== null;
    });
  }

  /**
   * Get capabilities mapping for editing
   */
  getCapabilities(): Capabilities {
    return {
      recolorables: [
        {
          get: () => this.get('background_color'),
          set: (value: string) => this.set('background_color', value)
        },
        {
          get: () => this.get('surface_color'),
          set: (value: string) => this.set('surface_color', value)
        },
        {
          get: () => this.get('text_color'),
          set: (value: string) => this.set('text_color', value)
        },
        {
          get: () => this.get('primary_action_color'),
          set: (value: string) => this.set('primary_action_color', value)
        },
        {
          get: () => this.get('secondary_action_color'),
          set: (value: string) => this.set('secondary_action_color', value)
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => this.get('font_family'),
        set: (value: string) => this.set('font_family', value)
      },
      fontSizeable: {
        get: () => this.get('font_size'),
        set: (value: number) => this.set('font_size', value)
      }
    };
  }

  /**
   * Get edit panel values mapping
   */
  getEditPanelValues(): Map<string, unknown> {
    return new Map([
      ["company_name", this.get('company_name')],
      ["hero_title", this.get('hero_title')],
      ["hero_subtitle", this.get('hero_subtitle')],
      ["cta_button", this.get('cta_button')],
      ["section_one_title", this.get('section_one_title')],
      ["section_two_title", this.get('section_two_title')],
      ["section_three_title", this.get('section_three_title')],
      ["footer_text", this.get('footer_text')]
    ]);
  }
}