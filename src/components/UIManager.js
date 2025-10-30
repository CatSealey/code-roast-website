/**
 * User Interface Manager
 * Follows Single Responsibility Principle - handles UI interactions and animations
 */
export class UIManager {
  constructor() {
    this.observers = new Map();
    this.animationCallbacks = new Map();
    this.scrollRevealElements = new Set();
    this.particleSystems = new Set();
    
    this.init();
  }

  /**
   * Initialize UI manager
   */
  init() {
    this.setupScrollReveal();
    this.setupSmoothScrolling();
    this.setupInteractiveIcons();
    this.setupParticles();
    this.setupButtonAnimations();
  }

  /**
   * Setup scroll reveal animations
   */
  setupScrollReveal() {
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
  handleScrollReveal() {
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
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Setup interactive icon animations
   */
  setupInteractiveIcons() {
    document.querySelectorAll('.interactive-icon').forEach(icon => {
      icon.addEventListener('mouseenter', this.handleIconHover.bind(this));
      icon.addEventListener('mouseleave', this.handleIconLeave.bind(this));
    });
  }

  /**
   * Handle icon hover effect
   * @param {Event} event - Mouse event
   */
  handleIconHover(event) {
    const icon = event.target.closest('.interactive-icon');
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
      icon.style.filter = 'drop-shadow(0 0 15px rgba(208, 93, 9, 0.7))';
    }
  }

  /**
   * Handle icon leave effect
   * @param {Event} event - Mouse event
   */
  handleIconLeave(event) {
    const icon = event.target.closest('.interactive-icon');
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)';
      icon.style.filter = 'none';
    }
  }

  /**
   * Setup particle systems
   */
  setupParticles() {
    document.querySelectorAll('.particle-system').forEach(system => {
      this.createParticles(system);
      this.particleSystems.add(system);
    });
  }

  /**
   * Create particles for a particle system
   * @param {HTMLElement} system - Particle system container
   */
  createParticles(system) {
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
  setupButtonAnimations() {
    document.querySelectorAll('.morphing-button').forEach(button => {
      button.addEventListener('mouseenter', this.handleButtonHover.bind(this));
      button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
      button.addEventListener('click', this.handleButtonClick.bind(this));
    });
  }

  /**
   * Handle button hover effect
   * @param {Event} event - Mouse event
   */
  handleButtonHover(event) {
    const button = event.target.closest('.morphing-button');
    if (button) {
      button.style.transform = 'scale(1.05) translateY(-2px)';
      button.style.boxShadow = '0 15px 35px rgba(208, 93, 9, 0.4)';
    }
  }

  /**
   * Handle button leave effect
   * @param {Event} event - Mouse event
   */
  handleButtonLeave(event) {
    const button = event.target.closest('.morphing-button');
    if (button) {
      button.style.transform = 'scale(1) translateY(0)';
      button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    }
  }

  /**
   * Handle button click animation
   * @param {Event} event - Click event
   */
  handleButtonClick(event) {
    const button = event.target.closest('.morphing-button');
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1.05)';
      }, 100);
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 200);
    }
  }

  /**
   * Add observer for UI events
   * @param {string} eventType - Type of event to observe
   * @param {Function} callback - Callback function
   */
  addObserver(eventType, callback) {
    if (!this.observers.has(eventType)) {
      this.observers.set(eventType, new Set());
    }
    this.observers.get(eventType).add(callback);
  }

  /**
   * Remove observer
   * @param {string} eventType - Type of event
   * @param {Function} callback - Callback function to remove
   */
  removeObserver(eventType, callback) {
    const callbacks = this.observers.get(eventType);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  /**
   * Trigger observers for an event
   * @param {string} eventType - Type of event
   * @param {any} data - Event data
   */
  triggerObservers(eventType, data) {
    const callbacks = this.observers.get(eventType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in UI observer for ${eventType}:`, error);
        }
      });
    }
  }

  /**
   * Add animation callback
   * @param {string} name - Animation name
   * @param {Function} callback - Animation callback
   */
  addAnimation(name, callback) {
    this.animationCallbacks.set(name, callback);
  }

  /**
   * Run animation
   * @param {string} name - Animation name
   * @param {any} options - Animation options
   */
  runAnimation(name, options = {}) {
    const callback = this.animationCallbacks.get(name);
    if (callback) {
      callback(options);
    }
  }

  /**
   * Show modal
   * @param {string} content - Modal content HTML
   * @param {Object} options - Modal options
   */
  showModal(content, options = {}) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.innerHTML = content;

    document.body.appendChild(overlay);

    // Add click outside to close
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });

    // Add escape key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    return overlay;
  }

  /**
   * Update element content safely
   * @param {string} id - Element ID
   * @param {string} content - New content
   */
  updateElement(id, content) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = content;
      return true;
    }
    return false;
  }

  /**
   * Update multiple elements
   * @param {Object} updates - Object with id: content pairs
   */
  updateElements(updates) {
    const results = {};
    Object.entries(updates).forEach(([id, content]) => {
      results[id] = this.updateElement(id, content);
    });
    return results;
  }
}