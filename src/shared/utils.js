/**
 * Utility functions for Float Suite
 * Common helpers used across all apps
 */

const Utils = (() => {
  /**
   * Debounce function to limit event frequency
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  function debounce(func, wait = 300) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function to limit event frequency
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} - Throttled function
   */
  function throttle(func, limit = 300) {
    let inThrottle;

    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} - Formatted size string
   */
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Format time for display
   * @param {number} ms - Time in milliseconds
   * @returns {string} - Formatted time string
   */
  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  /**
   * Generate unique ID
   * @returns {string} - Unique identifier
   */
  function generateID() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Deep clone object
   * @param {Object} obj - Object to clone
   * @returns {Object} - Cloned object
   */
  function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
      const cloned = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = deepClone(obj[key]);
        }
      }
      return cloned;
    }
  }

  /**
   * Check if device is mobile
   * @returns {boolean} - Is mobile device
   */
  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  /**
   * Check if browser supports feature
   * @param {string} feature - Feature to check
   * @returns {boolean} - Is supported
   */
  function isSupported(feature) {
    const checks = {
      localStorage: () => {
        try {
          localStorage.setItem('test', '1');
          localStorage.removeItem('test');
          return true;
        } catch {
          return false;
        }
      },
      indexedDB: () => typeof indexedDB !== 'undefined',
      serviceWorker: () => 'serviceWorker' in navigator,
      fileAPI: () => typeof File !== 'undefined' && typeof FileReader !== 'undefined',
      canvas: () => document.createElement('canvas').getContext !== undefined,
      webGL: () => {
        try {
          return !!document.createElement('canvas').getContext('webgl');
        } catch {
          return false;
        }
      }
    };

    return checks[feature] ? checks[feature]() : false;
  }

  /**
   * Download file
   * @param {string|Blob} content - File content
   * @param {string} filename - File name
   * @param {string} type - MIME type
   */
  function downloadFile(content, filename, type = 'text/plain') {
    let blob;

    if (content instanceof Blob) {
      blob = content;
    } else {
      blob = new Blob([content], { type });
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Parse query parameters
   * @param {string} queryString - Query string
   * @returns {Object} - Parsed parameters
   */
  function parseQueryParams(queryString = window.location.search) {
    const params = {};

    if (!queryString) return params;

    const pairs = queryString.substring(1).split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });

    return params;
  }

  /**
   * Convert hex color to RGB
   * @param {string} hex - Hex color code
   * @returns {Object} - RGB values
   */
  function hexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Convert RGB to hex color
   * @param {Object} rgb - RGB values
   * @returns {string} - Hex color code
   */
  function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    return '#' + [rgb.r, rgb.g, rgb.b].map(x => {
      const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} - Success status
   */
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        const result = document.execCommand('copy');
        document.body.removeChild(textArea);
        return result;
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }

  return {
    debounce,
    throttle,
    formatFileSize,
    formatTime,
    generateID,
    deepClone,
    isMobile,
    isSupported,
    downloadFile,
    parseQueryParams,
    hexToRGB,
    rgbToHex,
    copyToClipboard
  };
})();
