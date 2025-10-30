import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UIManager } from '../src/components/UIManager.js';
import { UIEventType, UIEventData } from '../src/types.js';

// Setup test utilities
interface MockElement {
  classList: {
    add: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
    contains: ReturnType<typeof vi.fn>;
  };
  style: Record<string, string>;
  getAttribute: ReturnType<typeof vi.fn>;
  closest: ReturnType<typeof vi.fn>;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  className: string;
  textContent?: string;
  innerHTML?: string;
  appendChild?: ReturnType<typeof vi.fn>;
  getBoundingClientRect?: ReturnType<typeof vi.fn>;
}

const createMockElement = (className = ''): MockElement => ({
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
  (global as any).document = {
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

  (global as any).window = {
    innerHeight: 768,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    requestAnimationFrame: vi.fn((cb: () => void) => setTimeout(cb, 0))
  };
};

describe('UIManager', () => {
  let uiManager: UIManager;

  beforeEach(() => {
    setupDOMMocks();
    uiManager = new UIManager();
  });

  describe('constructor', () => {
    it('should initialize properly', () => {
      expect(uiManager).toBeInstanceOf(UIManager);
    });
  });

  describe('observer pattern', () => {
    it('should add observer for specific event type', () => {
      const callback = vi.fn();
      uiManager.addObserver('buttonClick', callback);
      
      const observerMap = (uiManager as any).observerMap as Map<UIEventType, Set<Function>>;
      const observers = observerMap.get('buttonClick');
      expect(observers?.has(callback)).toBe(true);
    });

    it('should remove observer', () => {
      const callback = vi.fn();
      uiManager.addObserver('buttonClick', callback);
      uiManager.removeObserver('buttonClick', callback);
      
      const observerMap = (uiManager as any).observerMap as Map<UIEventType, Set<Function>>;
      const observers = observerMap.get('buttonClick');
      expect(observers?.has(callback)).toBe(false);
    });

    it('should handle observer errors gracefully', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Observer error');
      });
      const normalCallback = vi.fn();
      
      uiManager.addObserver('buttonClick', errorCallback);
      uiManager.addObserver('buttonClick', normalCallback);
      
      const testData: UIEventData = {
        type: 'buttonClick',
        timestamp: Date.now()
      };

      expect(() => {
        (uiManager as any).triggerObservers('buttonClick', testData);
      }).not.toThrow();
      
      expect(normalCallback).toHaveBeenCalled();
    });
  });

  describe('animation management', () => {
    it('should add animation callback', () => {
      const animationCallback = vi.fn();
      uiManager.addAnimation('fadeIn', animationCallback);
      
      const animationCallbacks = (uiManager as any).animationCallbacks as Map<string, Function>;
      expect(animationCallbacks.has('fadeIn')).toBe(true);
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
      (document.getElementById as any).mockReturnValue(mockElement);
      
      const result = uiManager.updateElement('test-id', 'New content');
      
      expect(result).toBe(true);
      expect(mockElement.textContent).toBe('New content');
    });

    it('should return false for non-existent element', () => {
      (document.getElementById as any).mockReturnValue(null);
      
      const result = uiManager.updateElement('non-existent', 'Content');
      
      expect(result).toBe(false);
    });

    it('should update multiple elements', () => {
      const mockElement1 = createMockElement();
      const mockElement2 = createMockElement();
      
      (document.getElementById as any).mockImplementation((id: string) => {
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
      mockElement.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 100 // Element is visible
      });
      
      (document.querySelectorAll as any).mockReturnValue([mockElement]);
      
      // Re-initialize to pick up the new elements
      uiManager = new UIManager();
      (uiManager as any).handleScrollReveal();
      
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
      
      (uiManager as any).handleIconHover(mockEvent);
      
      expect(mockIcon.style.transform).toBe('scale(1.2) rotate(10deg)');
      expect(mockIcon.style.filter).toBe('drop-shadow(0 0 15px rgba(208, 93, 9, 0.7))');
    });

    it('should handle icon leave effects', () => {
      const mockIcon = createMockElement('interactive-icon');
      const mockEvent = {
        target: mockIcon
      };
      
      mockIcon.closest.mockReturnValue(mockIcon);
      
      (uiManager as any).handleIconLeave(mockEvent);
      
      expect(mockIcon.style.transform).toBe('scale(1) rotate(0deg)');
      expect(mockIcon.style.filter).toBe('none');
    });

    it('should handle button animations', () => {
      const mockButton = createMockElement('morphing-button');
      const mockEvent = {
        target: mockButton
      };
      
      mockButton.closest.mockReturnValue(mockButton);
      
      (uiManager as any).handleButtonHover(mockEvent);
      
      expect(mockButton.style.transform).toBe('scale(1.05) translateY(-2px)');
      expect(mockButton.style.boxShadow).toBe('0 15px 35px rgba(208, 93, 9, 0.4)');
    });
  });

  describe('particle system', () => {
    it('should create particles for particle systems', () => {
      const mockSystem = createMockElement('particle-system');
      mockSystem.appendChild = vi.fn();
      
      (uiManager as any).createParticles(mockSystem);
      
      expect(mockSystem.appendChild).toHaveBeenCalledTimes(5);
    });
  });
});