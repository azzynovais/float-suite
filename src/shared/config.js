/**
 * Float Suite Configuration
 * Global settings and app configurations
 */

const Config = {
  // App metadata
  APP_NAME: 'Float Suite',
  APP_VERSION: '3.0',
  APPS: {
    paint: {
      name: 'Paint.web',
      version: '4.0',
      description: 'Raster graphics editor'
    },
    inkling: {
      name: 'Inkling.web',
      version: '3.0',
      description: 'Vector graphics editor'
    },
    thesis: {
      name: 'Thesis.web',
      version: '2.0',
      description: 'Academic writing suite'
    }
  },

  // Theme configuration
  THEMES: {
    light: {
      name: 'light',
      label: 'Light Mode',
      icon: 'fa-sun'
    },
    dark: {
      name: 'dark',
      label: 'Dark Mode',
      icon: 'fa-moon'
    }
  },

  // Default theme
  DEFAULT_THEME: 'light',

  // Storage configuration
  STORAGE: {
    PREFIX: 'float_',
    VERSION: '1.0',
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    MAX_FILE_SIZE: 104857600 // 100MB
  },

  // Performance settings
  PERFORMANCE: {
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
    IMAGE_QUALITY: 0.9,
    CANVAS_SCALE: 1
  },

  // Security settings
  SECURITY: {
    ENABLE_CSP: true,
    ALLOW_EXTERNAL_RESOURCES: false,
    SANITIZE_IMAGES: true
  },

  // UI settings
  UI: {
    TOAST_DURATION: 3000,
    MODAL_ANIMATION: 200,
    ANIMATION_DURATION: 300,
    KEYBOARD_SHORTCUTS: true
  },

  // Keyboard shortcuts
  SHORTCUTS: {
    SAVE: 'ctrl+s',
    UNDO: 'ctrl+z',
    REDO: 'ctrl+y',
    ZOOM_IN: 'ctrl+plus',
    ZOOM_OUT: 'ctrl+minus',
    RESET_ZOOM: 'ctrl+0',
    FULLSCREEN: 'f11',
    FIND: 'ctrl+f',
    REPLACE: 'ctrl+h'
  },

  // Supported file types
  FILE_TYPES: {
    IMAGE: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
    VECTOR: ['image/svg+xml'],
    DOCUMENT: ['application/pdf', 'text/plain', 'text/html'],
    AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg']
  },

  // API endpoints (if needed)
  API: {
    BASE_URL: '',
    TIMEOUT: 5000
  },

  // Feature flags
  FEATURES: {
    AUTO_SAVE: true,
    CLOUD_SYNC: false,
    DARK_MODE: true,
    KEYBOARD_SHORTCUTS: true,
    SPELL_CHECK: true,
    ANALYTICS: false // Privacy first
  },

  // Accessibility settings
  A11Y: {
    FOCUS_VISIBLE: true,
    HIGH_CONTRAST: false,
    REDUCE_MOTION: false
  },

  // Get current theme from localStorage or system preference
  getTheme() {
    const stored = Storage.loadLocal('theme');
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return this.DEFAULT_THEME;
  },

  // Set theme
  setTheme(theme) {
    if (this.THEMES[theme]) {
      document.documentElement.setAttribute('data-theme', theme);
      Storage.saveLocal('theme', theme);
      return true;
    }
    return false;
  },

  // Initialize configuration
  init() {
    // Apply saved theme
    const theme = this.getTheme();
    this.setTheme(theme);

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.A11Y.REDUCE_MOTION = true;
      document.documentElement.style.setProperty('--animation-duration', '0ms');
    }

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!Storage.loadLocal('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
};

// Initialize config when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Config.init());
} else {
  Config.init();
}
