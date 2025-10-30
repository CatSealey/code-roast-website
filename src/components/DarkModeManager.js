import { ThemeManager } from './ThemeManager.js';

/**
 * Dark mode implementation of ThemeManager
 * Follows Single Responsibility Principle - only handles dark mode functionality
 */
export class DarkModeManager extends ThemeManager {
  constructor() {
    super('darkMode');
    this.darkModeClass = 'dark-mode';
    this.transitionClass = 'dark-mode-transition';
    this.iconIds = {
      sun: 'sun-icon',
      moon: 'moon-icon'
    };
    
    this.init();
  }

  /**
   * Initialize dark mode
   */
  init() {
    this.currentTheme = this.getStoredTheme();
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
    this.addTransitionClasses();
  }

  /**
   * Apply the specified theme
   * @param {string} theme - 'true' for dark mode, 'false' for light mode
   */
  applyTheme(theme) {
    const isDark = theme === 'true';
    const body = document.body;
    const sunIcon = document.getElementById(this.iconIds.sun);
    const moonIcon = document.getElementById(this.iconIds.moon);

    if (isDark) {
      body.classList.add(this.darkModeClass);
      if (sunIcon) this.toggleIcon(sunIcon, true);
      if (moonIcon) this.toggleIcon(moonIcon, false);
    } else {
      body.classList.remove(this.darkModeClass);
      if (sunIcon) this.toggleIcon(sunIcon, false);
      if (moonIcon) this.toggleIcon(moonIcon, true);
    }

    this.currentTheme = theme;
    this.storeTheme(theme);
  }

  /**
   * Toggle between dark and light modes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'true' ? 'false' : 'true';
    this.applyTheme(newTheme);
  }

  /**
   * Toggle icon visibility
   * @param {HTMLElement} icon - Icon element to toggle
   * @param {boolean} hide - Whether to hide the icon
   */
  toggleIcon(icon, hide) {
    if (icon) {
      if (hide) {
        icon.classList.add('hidden');
      } else {
        icon.classList.remove('hidden');
      }
    }
  }

  /**
   * Add transition classes to all elements for smooth theme switching
   */
  addTransitionClasses() {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (!el.classList.contains(this.transitionClass)) {
        el.classList.add(this.transitionClass);
      }
    });
  }

  /**
   * Setup event listeners for dark mode toggle
   */
  setupEventListeners() {
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleTheme());
    }
  }

  /**
   * Check if currently in dark mode
   * @returns {boolean} True if in dark mode
   */
  isDarkMode() {
    return this.currentTheme === 'true';
  }

  /**
   * Force dark mode
   */
  enableDarkMode() {
    this.applyTheme('true');
  }

  /**
   * Force light mode
   */
  enableLightMode() {
    this.applyTheme('false');
  }
}