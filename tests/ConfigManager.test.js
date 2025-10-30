import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ConfigManager } from '../src/services/ConfigManager.js';

describe('ConfigManager', () => {
  let configManager;
  let mockObserver;

  beforeEach(() => {
    configManager = new ConfigManager();
    mockObserver = vi.fn();
  });

  describe('constructor', () => {
    it('should initialize with default configuration', () => {
      expect(configManager.get('company_name')).toBe('Code-Roast');
      expect(configManager.get('background_color')).toBe('#d05d09');
      expect(configManager.get('font_size')).toBe(16);
    });

    it('should initialize empty observers array', () => {
      expect(configManager.observers).toEqual([]);
    });
  });

  describe('get', () => {
    it('should return configuration value for valid key', () => {
      const result = configManager.get('company_name');
      expect(result).toBe('Code-Roast');
    });

    it('should return default value for missing key in current config', () => {
      configManager.currentConfig = {};
      const result = configManager.get('company_name');
      expect(result).toBe('Code-Roast');
    });

    it('should return undefined for non-existent key', () => {
      const result = configManager.get('non_existent_key');
      expect(result).toBeUndefined();
    });
  });

  describe('set', () => {
    it('should set configuration value', () => {
      configManager.set('company_name', 'New Company');
      expect(configManager.get('company_name')).toBe('New Company');
    });

    it('should notify observers when value is set', () => {
      configManager.addObserver(mockObserver);
      configManager.set('company_name', 'New Company');
      
      expect(mockObserver).toHaveBeenCalledWith({
        company_name: 'New Company'
      });
    });
  });

  describe('setConfig', () => {
    it('should set multiple configuration values', () => {
      const config = {
        company_name: 'New Company',
        background_color: '#ff0000'
      };
      
      configManager.setConfig(config);
      
      expect(configManager.get('company_name')).toBe('New Company');
      expect(configManager.get('background_color')).toBe('#ff0000');
    });

    it('should notify observers with all changes', () => {
      configManager.addObserver(mockObserver);
      const config = {
        company_name: 'New Company',
        background_color: '#ff0000'
      };
      
      configManager.setConfig(config);
      
      expect(mockObserver).toHaveBeenCalledWith(config);
    });
  });

  describe('getAll', () => {
    it('should return copy of current configuration', () => {
      const result = configManager.getAll();
      expect(result).toEqual(configManager.currentConfig);
      expect(result).not.toBe(configManager.currentConfig); // Should be a copy
    });
  });

  describe('reset', () => {
    it('should reset configuration to defaults', () => {
      configManager.set('company_name', 'Modified Company');
      configManager.reset();
      
      expect(configManager.get('company_name')).toBe('Code-Roast');
    });

    it('should notify observers when reset', () => {
      configManager.addObserver(mockObserver);
      configManager.reset();
      
      expect(mockObserver).toHaveBeenCalledWith(configManager.defaultConfig);
    });
  });

  describe('observer pattern', () => {
    it('should add observer successfully', () => {
      configManager.addObserver(mockObserver);
      expect(configManager.observers).toContain(mockObserver);
    });

    it('should remove observer successfully', () => {
      configManager.addObserver(mockObserver);
      configManager.removeObserver(mockObserver);
      expect(configManager.observers).not.toContain(mockObserver);
    });

    it('should handle observer errors gracefully', () => {
      const errorObserver = vi.fn(() => {
        throw new Error('Observer error');
      });
      
      configManager.addObserver(errorObserver);
      configManager.addObserver(mockObserver);
      
      // Should not throw and should still call other observers
      expect(() => {
        configManager.set('company_name', 'Test');
      }).not.toThrow();
      
      expect(mockObserver).toHaveBeenCalled();
    });
  });

  describe('validate', () => {
    it('should return true for valid configuration', () => {
      const validConfig = { ...configManager.defaultConfig };
      const result = configManager.validate(validConfig);
      expect(result).toBe(true);
    });

    it('should return false for configuration missing required keys', () => {
      const invalidConfig = { company_name: 'Test' }; // Missing other required keys
      const result = configManager.validate(invalidConfig);
      expect(result).toBe(false);
    });

    it('should return false for configuration with null values', () => {
      const invalidConfig = { ...configManager.defaultConfig };
      invalidConfig.company_name = null;
      const result = configManager.validate(invalidConfig);
      expect(result).toBe(false);
    });
  });

  describe('getCapabilities', () => {
    it('should return capabilities object with correct structure', () => {
      const capabilities = configManager.getCapabilities();
      
      expect(capabilities).toHaveProperty('recolorables');
      expect(capabilities).toHaveProperty('borderables');
      expect(capabilities).toHaveProperty('fontEditable');
      expect(capabilities).toHaveProperty('fontSizeable');
      
      expect(Array.isArray(capabilities.recolorables)).toBe(true);
      expect(capabilities.recolorables).toHaveLength(5);
    });

    it('should have working getter/setter functions in capabilities', () => {
      const capabilities = configManager.getCapabilities();
      const backgroundColorCapability = capabilities.recolorables[0];
      
      // Test getter
      expect(backgroundColorCapability.get()).toBe('#d05d09');
      
      // Test setter
      backgroundColorCapability.set('#ff0000');
      expect(configManager.get('background_color')).toBe('#ff0000');
    });
  });

  describe('getEditPanelValues', () => {
    it('should return Map with correct values', () => {
      const values = configManager.getEditPanelValues();
      
      expect(values instanceof Map).toBe(true);
      expect(values.get('company_name')).toBe('Code-Roast');
      expect(values.get('hero_title')).toBe('Understanding Data Analysis & Business Intelligence');
    });

    it('should reflect current configuration values', () => {
      configManager.set('company_name', 'Updated Company');
      const values = configManager.getEditPanelValues();
      
      expect(values.get('company_name')).toBe('Updated Company');
    });
  });
});