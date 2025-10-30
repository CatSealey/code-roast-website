/**
 * Base class for theme management
 * Follows the Open/Closed Principle - open for extension, closed for modification
 */
export class ThemeManager {
  constructor(storageKey = 'theme') {
    this.storageKey = storageKey;
    this.currentTheme = this.getStoredTheme();
  }

  /**
   * Get the currently stored theme
   * @returns {string} The stored theme preference
   */
  getStoredTheme() {
    return localStorage.getItem(this.storageKey) || 'light';
  }

  /**
   * Store theme preference
   * @param {string} theme - The theme to store
   */
  storeTheme(theme) {
    localStorage.setItem(this.storageKey, theme);
  }

  /**
   * Get current theme
   * @returns {string} Current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Apply theme - should be overridden by subclasses
   * @param {string} theme - The theme to apply
   * @throws {Error} If not implemented by subclass
   */
  applyTheme(theme) {
    throw new Error('applyTheme method must be implemented by subclass');
  }

  /**
   * Toggle theme - should be overridden by subclasses
   * @throws {Error} If not implemented by subclass
   */
  toggleTheme() {
    throw new Error('toggleTheme method must be implemented by subclass');
  }
}