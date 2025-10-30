/**
 * TypeScript type definitions for Code-Roast Website
 */

// Configuration types
export interface ConfigValues {
  company_name: string;
  hero_title: string;
  hero_subtitle: string;
  cta_button: string;
  section_one_title: string;
  section_two_title: string;
  section_three_title: string;
  footer_text: string;
  background_color: string;
  surface_color: string;
  text_color: string;
  primary_action_color: string;
  secondary_action_color: string;
  font_family: string;
  font_size: number;
}

export type ConfigKey = keyof ConfigValues;

export interface ConfigChangeObserver {
  (changes: Partial<ConfigValues>): void;
}

export interface RecolorableCapability {
  get: () => string;
  set: (value: string) => void;
}

export interface FontCapability {
  get: () => string;
  set: (value: string) => void;
}

export interface FontSizeCapability {
  get: () => number;
  set: (value: number) => void;
}

export interface Capabilities {
  recolorables: RecolorableCapability[];
  borderables: unknown[];
  fontEditable: FontCapability;
  fontSizeable: FontSizeCapability;
}

// Theme Management types
export interface ThemeManager {
  currentTheme: string;
  storageKey: string;
  getStoredTheme(): string;
  storeTheme(theme: string): void;
  applyTheme(theme: string): void;
  toggleTheme(): void;
}

// UI Management types
export type UIEventType = 'buttonClick' | 'inputChange' | 'formSubmit' | 'navigation';

export interface UIEventData {
  type: UIEventType;
  element?: HTMLElement;
  value?: unknown;
  timestamp: number;
}

export interface UIObserver {
  (eventType: UIEventType, data: UIEventData): void;
}

// Data Service types
export type DataEventType = 'dataFetched' | 'dataError' | 'cacheCleared';

export interface DataEventData {
  endpoint?: string;
  data?: unknown;
  error?: Error;
  timestamp: number;
}

export interface DataObserver {
  (eventType: DataEventType, data: DataEventData): void;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  lastCleared: Date | null;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: BodyInit | null;
  cache?: boolean;
  timeout?: number;
}

// Application types
export interface AppStatus {
  initialized: boolean;
  version: string;
  darkMode: boolean;
  cacheStats: CacheStats;
}

export interface ElementSDKConfig {
  defaultConfig: Partial<ConfigValues>;
  onConfigChange: (config: Partial<ConfigValues>) => void;
  mapToCapabilities: () => Capabilities;
  mapToEditPanelValues: () => Map<string, unknown>;
}

// DOM Event types
export interface DarkModeToggleElements {
  sunIcon: HTMLElement | null;
  moonIcon: HTMLElement | null;
}

// Utility types
export type Observer<T = unknown> = (data: T) => void;

export interface ObserverPattern<T = unknown> {
  observers: Observer<T>[];
  addObserver(callback: Observer<T>): void;
  removeObserver(callback: Observer<T>): void;
  notifyObservers(data: T): void;
}

// Generic API Response types
export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface APIError {
  message: string;
  status: number;
  endpoint: string;
  timestamp: Date;
}