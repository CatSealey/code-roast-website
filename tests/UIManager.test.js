import { describe, it, expect, beforeEach } from 'vitest';
import { UIManager } from '../src/components/UIManager.js';

// Setup test utilities
const createMockElement = (className = '') => ({
  classList: {
    add: vi.fn(),
    remove: vi.fn(),
    contains: vi.fn()
  },
  style: {},
  getAttribute: vi.fn(),
  closest: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  className
});

const setupDOMMocks = () => {
  global.document = {
    getElementById: vi.fn(),
    querySelector: vi.fn(),
    querySelectorAll: vi.fn(() => []),
    createElement: vi.fn(() => createMockElement()),
    body: {
      appendChild: vi.fn(),
      removeChild: vi.fn()
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  };

  global.window = {
    innerHeight: 768,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    requestAnimationFrame: vi.fn(cb => setTimeout(cb, 0))
  };
};

describe('UIManager', () => {
  let uiManager;

  beforeEach(() => {
    setupDOMMocks();
    uiManager = new UIManager();
  });

  describe('constructor', () => {
    it('should initialize with empty collections', () => {
      expect(uiManager.observers instanceof Map).toBe(true);
      expect(uiManager.animationCallbacks instanceof Map).toBe(true);
      expect(uiManager.scrollRevealElements instanceof Set).toBe(true);
      expect(uiManager.particleSystems instanceof Set).toBe(true);
    });
  });

  describe('observer pattern', () => {
    it('should add observer for specific event type', () => {
      const callback = vi.fn();
      uiManager.addObserver('click', callback);
      
      const observers = uiManager.observers.get('click');
      expect(observers.has(callback)).toBe(true);
    });

    it('should remove observer', () => {
      const callback = vi.fn();
      uiManager.addObserver('click', callback);
      uiManager.removeObserver('click', callback);
      
      const observers = uiManager.observers.get('click');
      expect(observers.has(callback)).toBe(false);
    });

    it('should trigger observers with data', () => {
      const callback = vi.fn();
      uiManager.addObserver('test', callback);
      
      const testData = { message: 'test' };
      uiManager.triggerObservers('test', testData);
      
      expect(callback).toHaveBeenCalledWith(testData);
    });

    it('should handle observer errors gracefully', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Observer error');
      });
      const normalCallback = vi.fn();
      
      uiManager.addObserver('error', errorCallback);
      uiManager.addObserver('error', normalCallback);
      
      expect(() => {
        uiManager.triggerObservers('error', {});
      }).not.toThrow();
      
      expect(normalCallback).toHaveBeenCalled();
    });
  });

  describe('animation management', () => {
    it('should add animation callback', () => {
      const animationCallback = vi.fn();
      uiManager.addAnimation('fadeIn', animationCallback);
      
      expect(uiManager.animationCallbacks.has('fadeIn')).toBe(true);
    });

    it('should run animation with options', () => {
      const animationCallback = vi.fn();
      uiManager.addAnimation('fadeIn', animationCallback);
      
      const options = { duration: 300 };
      uiManager.runAnimation('fadeIn', options);
      
      expect(animationCallback).toHaveBeenCalledWith(options);
    });

    it('should handle missing animation gracefully', () => {
      expect(() => {
        uiManager.runAnimation('nonExistent');
      }).not.toThrow();
    });
  });

  describe('element updates', () => {
    it('should update element content successfully', () => {
      const mockElement = createMockElement();
      document.getElementById.mockReturnValue(mockElement);
      
      const result = uiManager.updateElement('test-id', 'New content');
      
      expect(result).toBe(true);
      expect(mockElement.textContent).toBe('New content');
    });

    it('should return false for non-existent element', () => {
      document.getElementById.mockReturnValue(null);
      
      const result = uiManager.updateElement('non-existent', 'Content');
      
      expect(result).toBe(false);
    });

    it('should update multiple elements', () => {
      const mockElement1 = createMockElement();
      const mockElement2 = createMockElement();
      
      document.getElementById.mockImplementation((id) => {
        if (id === 'element1') return mockElement1;
        if (id === 'element2') return mockElement2;
        return null;
      });
      
      const updates = {
        element1: 'Content 1',
        element2: 'Content 2',
        element3: 'Content 3' // This one doesn't exist
      };
      
      const results = uiManager.updateElements(updates);
      
      expect(results.element1).toBe(true);
      expect(results.element2).toBe(true);
      expect(results.element3).toBe(false);
    });
  });

  describe('modal functionality', () => {
    it('should create and show modal', () => {
      const content = '<div>Modal content</div>';
      const modal = uiManager.showModal(content);
      
      expect(modal).toBeDefined();
      expect(modal.innerHTML).toBe(content);
      expect(document.body.appendChild).toHaveBeenCalledWith(modal);
    });

    it('should setup modal event listeners', () => {
      const modal = uiManager.showModal('<div>Test</div>');
      
      expect(modal.addEventListener).toHaveBeenCalledWith(
        'click',
        expect.any(Function)
      );
      expect(document.addEventListener).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
    });
  });

  describe('scroll reveal functionality', () => {
    it('should handle scroll reveal elements', () => {
      const mockElement = createMockElement('scroll-reveal');
      mockElement.getBoundingClientRect = vi.fn(() => ({
        top: 100 // Element is visible
      }));
      
      document.querySelectorAll.mockReturnValue([mockElement]);
      
      // Re-initialize to pick up the new elements
      uiManager = new UIManager();
      uiManager.handleScrollReveal();
      
      expect(mockElement.classList.add).toHaveBeenCalledWith('revealed');
    });
  });

  describe('interactive elements', () => {
    it('should handle icon hover effects', () => {
      const mockIcon = createMockElement('interactive-icon');
      const mockEvent = {
        target: mockIcon
      };
      
      mockIcon.closest.mockReturnValue(mockIcon);
      
      uiManager.handleIconHover(mockEvent);
      
      expect(mockIcon.style.transform).toBe('scale(1.2) rotate(10deg)');
      expect(mockIcon.style.filter).toBe('drop-shadow(0 0 15px rgba(208, 93, 9, 0.7))');
    });

    it('should handle icon leave effects', () => {
      const mockIcon = createMockElement('interactive-icon');
      const mockEvent = {
        target: mockIcon
      };
      
      mockIcon.closest.mockReturnValue(mockIcon);
      
      uiManager.handleIconLeave(mockEvent);
      
      expect(mockIcon.style.transform).toBe('scale(1) rotate(0deg)');
      expect(mockIcon.style.filter).toBe('none');
    });

    it('should handle button animations', () => {
      const mockButton = createMockElement('morphing-button');
      const mockEvent = {
        target: mockButton
      };
      
      mockButton.closest.mockReturnValue(mockButton);
      
      uiManager.handleButtonHover(mockEvent);
      
      expect(mockButton.style.transform).toBe('scale(1.05) translateY(-2px)');
      expect(mockButton.style.boxShadow).toBe('0 15px 35px rgba(208, 93, 9, 0.4)');
    });
  });

  describe('particle system', () => {
    it('should create particles for particle systems', () => {
      const mockSystem = createMockElement('particle-system');
      mockSystem.appendChild = vi.fn();
      
      uiManager.createParticles(mockSystem);
      
      expect(mockSystem.appendChild).toHaveBeenCalledTimes(5);
    });
  });
});