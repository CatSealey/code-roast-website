import { 
  UIEventType, 
  UIEventData, 
  UIObserver
} from '../types.js';

interface ModalOptions {
  backdropClose?: boolean;
  escapeClose?: boolean;
}

interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  [key: string]: unknown;
}

type AnimationCallback = (options: AnimationOptions) => void;

/**
 * User Interface Manager
 * Follows Single Responsibility Principle - handles UI interactions and animations
 */
export class UIManager {
  private readonly observerMap = new Map<UIEventType, Set<UIObserver>>();
  private readonly animationCallbacks = new Map<string, AnimationCallback>();
  private readonly scrollRevealElements = new Set<Element>();
  private readonly particleSystems = new Set<HTMLElement>();

  constructor() {
    this.init();
  }

  /**
   * Initialize UI manager
   */
  private init(): void {
    this.setupScrollReveal();
    this.setupSmoothScrolling();
    this.setupInteractiveIcons();
    this.setupParticles();
    this.setupButtonAnimations();
  }

  /**
   * Setup scroll reveal animations
   */
  private setupScrollReveal(): void {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => {
      this.scrollRevealElements.add(element);
    });

    this.handleScrollReveal();
    window.addEventListener('scroll', () => this.handleScrollReveal());
  }

  /**
   * Handle scroll reveal animation
   */
  private handleScrollReveal(): void {
    this.scrollRevealElements.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('revealed');
        this.scrollRevealElements.delete(element);
      }
    });
  }

  /**
   * Setup smooth scrolling for navigation links
   */
  private setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  /**
   * Setup interactive icon animations
   */
  private setupInteractiveIcons(): void {
    document.querySelectorAll('.interactive-icon').forEach(icon => {
      icon.addEventListener('mouseenter', this.handleIconHover.bind(this));
      icon.addEventListener('mouseleave', this.handleIconLeave.bind(this));
    });
  }

  /**
   * Handle icon hover effect
   */
  private handleIconHover(event: Event): void {
    const target = event.target as HTMLElement;
    const icon = target.closest('.interactive-icon') as HTMLElement;
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
      icon.style.filter = 'drop-shadow(0 0 15px rgba(208, 93, 9, 0.7))';
    }
  }

  /**
   * Handle icon leave effect
   */
  private handleIconLeave(event: Event): void {
    const target = event.target as HTMLElement;
    const icon = target.closest('.interactive-icon') as HTMLElement;
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)';
      icon.style.filter = 'none';
    }
  }

  /**
   * Setup particle systems
   */
  private setupParticles(): void {
    document.querySelectorAll('.particle-system').forEach(system => {
      const htmlSystem = system as HTMLElement;
      this.createParticles(htmlSystem);
      this.particleSystems.add(htmlSystem);
    });
  }

  /**
   * Create particles for a particle system
   */
  private createParticles(system: HTMLElement): void {
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (8 + Math.random() * 4) + 's';
      system.appendChild(particle);
    }
  }

  /**
   * Setup button animations
   */
  private setupButtonAnimations(): void {
    document.querySelectorAll('.morphing-button').forEach(button => {
      button.addEventListener('mouseenter', this.handleButtonHover.bind(this));
      button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
      button.addEventListener('click', this.handleButtonClick.bind(this));
    });
  }

  /**
   * Handle button hover effect
   */
  private handleButtonHover(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest('.morphing-button') as HTMLElement;
    if (button) {
      button.style.transform = 'scale(1.05) translateY(-2px)';
      button.style.boxShadow = '0 15px 35px rgba(208, 93, 9, 0.4)';
    }
  }

  /**
   * Handle button leave effect
   */
  private handleButtonLeave(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest('.morphing-button') as HTMLElement;
    if (button) {
      button.style.transform = 'scale(1) translateY(0)';
      button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    }
  }

  /**
   * Handle button click animation
   */
  private handleButtonClick(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest('.morphing-button') as HTMLElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1.05)';
      }, 100);
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 200);

      this.triggerObservers('buttonClick', {
        type: 'buttonClick',
        element: button,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Add observer for UI events (Map-based)
   */
  addObserver(eventType: UIEventType, callback: UIObserver): void {
    if (!this.observerMap.has(eventType)) {
      this.observerMap.set(eventType, new Set());
    }
    this.observerMap.get(eventType)!.add(callback);
  }

  /**
   * Remove observer
   */
  removeObserver(eventType: UIEventType, callback: UIObserver): void {
    const callbacks = this.observerMap.get(eventType);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  /**
   * Trigger observers for an event
   */
  private triggerObservers(eventType: UIEventType, data: UIEventData): void {
    const callbacks = this.observerMap.get(eventType);
    if (callbacks) {
      callbacks.forEach((callback: UIObserver) => {
        try {
          callback(eventType, data);
        } catch (error) {
          console.error(`Error in UI observer for ${eventType}:`, error);
        }
      });
    }
  }

  /**
   * Add animation callback
   */
  addAnimation(name: string, callback: AnimationCallback): void {
    this.animationCallbacks.set(name, callback);
  }

  /**
   * Run animation
   */
  runAnimation(name: string, options: AnimationOptions = {}): void {
    const callback = this.animationCallbacks.get(name);
    if (callback) {
      callback(options);
    }
  }

  /**
   * Show modal
   */
  showModal(content: string, options: ModalOptions = {}): HTMLElement {
    const {
      backdropClose = true,
      escapeClose = true
    } = options;

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.innerHTML = content;

    document.body.appendChild(overlay);

    // Add click outside to close
    if (backdropClose) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
        }
      });
    }

    // Add escape key to close
    if (escapeClose) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          overlay.remove();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    }

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    return overlay;
  }

  /**
   * Update element content safely
   */
  updateElement(id: string, content: string): boolean {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = content;
      return true;
    }
    return false;
  }

  /**
   * Update multiple elements
   */
  updateElements(updates: Record<string, string>): Record<string, boolean> {
    const results: Record<string, boolean> = {};
    Object.entries(updates).forEach(([id, content]) => {
      results[id] = this.updateElement(id, content);
    });
    return results;
  }
}