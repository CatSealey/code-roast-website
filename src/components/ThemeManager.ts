/**
 * Base class for theme management
 * Follows the Open/Closed Principle - open for extension, closed for modification
 */
export abstract class ThemeManager {
  protected readonly storageKey: string;
  protected currentTheme: string;

  constructor(storageKey: string = 'theme') {
    this.storageKey = storageKey;
    this.currentTheme = this.getStoredTheme();
  }

  /**
   * Get the currently stored theme
   */
  getStoredTheme(): string {
    return localStorage.getItem(this.storageKey) || 'light';
  }

  /**
   * Store theme preference
   */
  storeTheme(theme: string): void {
    localStorage.setItem(this.storageKey, theme);
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): string {
    return this.currentTheme;
  }

  /**
   * Apply theme - must be implemented by subclasses
   */
  abstract applyTheme(theme: string): void;

  /**
   * Toggle theme - must be implemented by subclasses
   */
  abstract toggleTheme(): void;
}