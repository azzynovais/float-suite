/**
 * UI helper functions for Float Suite
 * Toast, modal, and UI component management
 */

const UI = (() => {
  const toastContainer = document.getElementById('toast-container');

  /**
   * Show toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, warning, info)
   * @param {number} duration - Display duration in milliseconds
   */
  function toast(message, type = 'info', duration = 3000) {
    if (!toastContainer) {
      console.error('Toast container not found');
      return;
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s';

      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, duration);
  }

  /**
   * Show error toast
   * @param {string} message - Error message
   */
  function error(message) {
    toast(message, 'error');
  }

  /**
   * Show success toast
   * @param {string} message - Success message
   */
  function success(message) {
    toast(message, 'success');
  }

  /**
   * Show warning toast
   * @param {string} message - Warning message
   */
  function warning(message) {
    toast(message, 'warning');
  }

  /**
   * Show info toast
   * @param {string} message - Info message
   */
  function info(message) {
    toast(message, 'info');
  }

  /**
   * Open modal dialog
   * @param {string} modalId - Modal element ID
   */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('role', 'dialog');
    }
  }

  /**
   * Close modal dialog
   * @param {string} modalId - Modal element ID
   */
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Toggle modal visibility
   * @param {string} modalId - Modal element ID
   */
  function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.toggle('hidden');
    }
  }

  /**
   * Add event listener with error handling
   * @param {HTMLElement} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  function on(element, event, handler) {
    if (!element) return;

    try {
      element.addEventListener(event, handler);
    } catch (err) {
      console.error(`Failed to add event listener: ${err}`);
    }
  }

  /**
   * Remove event listener
   * @param {HTMLElement} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  function off(element, event, handler) {
    if (!element) return;

    try {
      element.removeEventListener(event, handler);
    } catch (err) {
      console.error(`Failed to remove event listener: ${err}`);
    }
  }

  /**
   * Query selector with error handling
   * @param {string} selector - CSS selector
   * @returns {HTMLElement|null} - Element or null
   */
  function query(selector) {
    try {
      return document.querySelector(selector);
    } catch (err) {
      console.error(`Invalid selector: ${selector}`);
      return null;
    }
  }

  /**
   * Query all elements matching selector
   * @param {string} selector - CSS selector
   * @returns {NodeList} - Matching elements
   */
  function queryAll(selector) {
    try {
      return document.querySelectorAll(selector);
    } catch (err) {
      console.error(`Invalid selector: ${selector}`);
      return [];
    }
  }

  /**
   * Add CSS class to element
   * @param {HTMLElement} element - Target element
   * @param {string} className - Class name
   */
  function addClass(element, className) {
    if (element && className) {
      element.classList.add(...className.split(' '));
    }
  }

  /**
   * Remove CSS class from element
   * @param {HTMLElement} element - Target element
   * @param {string} className - Class name
   */
  function removeClass(element, className) {
    if (element && className) {
      element.classList.remove(...className.split(' '));
    }
  }

  /**
   * Toggle CSS class
   * @param {HTMLElement} element - Target element
   * @param {string} className - Class name
   */
  function toggleClass(element, className) {
    if (element && className) {
      element.classList.toggle(className);
    }
  }

  /**
   * Enable element
   * @param {HTMLElement} element - Target element
   */
  function enable(element) {
    if (element) {
      element.disabled = false;
      removeClass(element, 'disabled');
    }
  }

  /**
   * Disable element
   * @param {HTMLElement} element - Target element
   */
  function disable(element) {
    if (element) {
      element.disabled = true;
      addClass(element, 'disabled');
    }
  }

  /**
   * Show element
   * @param {HTMLElement} element - Target element
   */
  function show(element) {
    if (element) {
      element.style.display = '';
      removeClass(element, 'hidden');
    }
  }

  /**
   * Hide element
   * @param {HTMLElement} element - Target element
   */
  function hide(element) {
    if (element) {
      element.style.display = 'none';
      addClass(element, 'hidden');
    }
  }

  return {
    toast,
    error,
    success,
    warning,
    info,
    openModal,
    closeModal,
    toggleModal,
    on,
    off,
    query,
    queryAll,
    addClass,
    removeClass,
    toggleClass,
    enable,
    disable,
    show,
    hide
  };
})();
