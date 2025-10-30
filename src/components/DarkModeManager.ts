import { ThemeManager } from './ThemeManager.js';
import { DarkModeToggleElements } from '../types.js';

/**
 * Dark mode implementation of ThemeManager
 * Follows Single Responsibility Principle - only handles dark mode functionality
 */
export class DarkModeManager extends ThemeManager {
  private readonly darkModeClass: string = 'dark-mode';
  private readonly transitionClass: string = 'dark-mode-transition';
  private readonly iconIds: { sun: string; moon: string } = {
    sun: 'sun-icon',
    moon: 'moon-icon'
  };

  constructor() {
    super('darkMode');
    this.init();
  }

  /**
   * Initialize dark mode
   */
  private init(): void {
    this.currentTheme = this.getStoredTheme();
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
    this.addTransitionClasses();
  }

  /**
   * Apply the specified theme
   */
  applyTheme(theme: string): void {
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
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'true' ? 'false' : 'true';
    this.applyTheme(newTheme);
  }

  /**
   * Toggle icon visibility
   */
  private toggleIcon(icon: HTMLElement, hide: boolean): void {
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
  private addTransitionClasses(): void {
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
  private setupEventListeners(): void {
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleTheme());
    }
  }

  /**
   * Check if currently in dark mode
   */
  isDarkMode(): boolean {
    return this.currentTheme === 'true';
  }

  /**
   * Force dark mode
   */
  enableDarkMode(): void {
    this.applyTheme('true');
  }

  /**
   * Force light mode
   */
  enableLightMode(): void {
    this.applyTheme('false');
  }

  /**
   * Get dark mode toggle elements
   */
  getToggleElements(): DarkModeToggleElements {
    return {
      sunIcon: document.getElementById(this.iconIds.sun),
      moonIcon: document.getElementById(this.iconIds.moon)
    };
  }
}