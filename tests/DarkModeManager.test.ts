import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DarkModeManager } from '../src/components/DarkModeManager.js';

// Mock DOM elements
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock DOM methods
Object.defineProperty(document, 'getElementById', {
  value: vi.fn(),
  writable: true
});

Object.defineProperty(document, 'body', {
  value: {
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn()
    }
  },
  writable: true
});

Object.defineProperty(document, 'querySelectorAll', {
  value: vi.fn(() => []),
  writable: true
});

interface MockElement {
  classList: {
    add: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };
}

interface MockButton extends MockElement {
  addEventListener: ReturnType<typeof vi.fn>;
}

describe('DarkModeManager', () => {
  let darkModeManager: DarkModeManager;
  let mockSunIcon: MockElement;
  let mockMoonIcon: MockElement;
  let mockToggleButton: MockButton;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock DOM elements
    mockSunIcon = {
      classList: {
        add: vi.fn(),
        remove: vi.fn()
      }
    };
    
    mockMoonIcon = {
      classList: {
        add: vi.fn(),
        remove: vi.fn()
      }
    };
    
    mockToggleButton = {
      classList: {
        add: vi.fn(),
        remove: vi.fn()
      },
      addEventListener: vi.fn()
    };

    // Setup getElementById mock
    (document.getElementById as any).mockImplementation((id: string) => {
      switch (id) {
        case 'sun-icon':
          return mockSunIcon;
        case 'moon-icon':
          return mockMoonIcon;
        case 'dark-mode-toggle':
          return mockToggleButton;
        default:
          return null;
      }
    });

    // Setup querySelectorAll mock
    (document.querySelectorAll as any).mockReturnValue([]);
  });

  describe('constructor', () => {
    it('should initialize with default values', () => {
      darkModeManager = new DarkModeManager();
      
      expect((darkModeManager as any).storageKey).toBe('darkMode');
    });

    it('should setup event listeners', () => {
      darkModeManager = new DarkModeManager();
      
      expect(mockToggleButton.addEventListener).toHaveBeenCalledWith(
        'click',
        expect.any(Function)
      );
    });
  });

  describe('applyTheme', () => {
    beforeEach(() => {
      darkModeManager = new DarkModeManager();
    });

    it('should apply dark theme when theme is "true"', () => {
      darkModeManager.applyTheme('true');
      
      expect(document.body.classList.add).toHaveBeenCalledWith('dark-mode');
      expect(mockSunIcon.classList.add).toHaveBeenCalledWith('hidden');
      expect(mockMoonIcon.classList.remove).toHaveBeenCalledWith('hidden');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('darkMode', 'true');
    });

    it('should apply light theme when theme is "false"', () => {
      darkModeManager.applyTheme('false');
      
      expect(document.body.classList.remove).toHaveBeenCalledWith('dark-mode');
      expect(mockSunIcon.classList.remove).toHaveBeenCalledWith('hidden');
      expect(mockMoonIcon.classList.add).toHaveBeenCalledWith('hidden');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('darkMode', 'false');
    });

    it('should handle missing icon elements gracefully', () => {
      (document.getElementById as any).mockReturnValue(null);
      
      expect(() => {
        darkModeManager.applyTheme('true');
      }).not.toThrow();
    });
  });

  describe('toggleTheme', () => {
    beforeEach(() => {
      darkModeManager = new DarkModeManager();
    });

    it('should toggle from light to dark', () => {
      (darkModeManager as any).currentTheme = 'false';
      darkModeManager.toggleTheme();
      
      expect((darkModeManager as any).currentTheme).toBe('true');
    });

    it('should toggle from dark to light', () => {
      (darkModeManager as any).currentTheme = 'true';
      darkModeManager.toggleTheme();
      
      expect((darkModeManager as any).currentTheme).toBe('false');
    });
  });

  describe('isDarkMode', () => {
    beforeEach(() => {
      darkModeManager = new DarkModeManager();
    });

    it('should return true when in dark mode', () => {
      (darkModeManager as any).currentTheme = 'true';
      expect(darkModeManager.isDarkMode()).toBe(true);
    });

    it('should return false when in light mode', () => {
      (darkModeManager as any).currentTheme = 'false';
      expect(darkModeManager.isDarkMode()).toBe(false);
    });
  });

  describe('enableDarkMode', () => {
    beforeEach(() => {
      darkModeManager = new DarkModeManager();
    });

    it('should force enable dark mode', () => {
      const applyThemeSpy = vi.spyOn(darkModeManager, 'applyTheme');
      darkModeManager.enableDarkMode();
      
      expect(applyThemeSpy).toHaveBeenCalledWith('true');
    });
  });

  describe('enableLightMode', () => {
    beforeEach(() => {
      darkModeManager = new DarkModeManager();
    });

    it('should force enable light mode', () => {
      const applyThemeSpy = vi.spyOn(darkModeManager, 'applyTheme');
      darkModeManager.enableLightMode();
      
      expect(applyThemeSpy).toHaveBeenCalledWith('false');
    });
  });

  describe('getStoredTheme', () => {
    beforeEach(() => {
      darkModeManager = new DarkModeManager();
    });

    it('should return stored theme from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('true');
      const result = darkModeManager.getStoredTheme();
      
      expect(result).toBe('true');
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('darkMode');
    });

    it('should return default theme when localStorage is empty', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = darkModeManager.getStoredTheme();
      
      expect(result).toBe('light');
    });
  });
});