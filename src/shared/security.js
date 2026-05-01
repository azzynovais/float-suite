/**
 * Security utilities for Float Suite
 * Provides safe HTML sanitization and XSS prevention
 */

const Security = (() => {
  // Whitelist of allowed HTML tags
  const ALLOWED_TAGS = {
    b: true, i: true, u: true, strong: true, em: true,
    h1: true, h2: true, h3: true, h4: true, p: true,
    br: true, hr: true, div: true, span: true,
    ul: true, ol: true, li: true,
    table: true, tr: true, td: true, th: true,
    blockquote: true, code: true, pre: true,
    a: true, img: true, svg: true, canvas: true
  };

  // Whitelist of allowed attributes
  const ALLOWED_ATTRS = {
    href: true, src: true, alt: true, title: true,
    id: true, class: true, style: true,
    width: true, height: true, data: true,
    type: true, value: true
  };

  /**
   * Sanitize HTML string to prevent XSS
   * @param {string} html - Unsanitized HTML string
   * @returns {string} - Sanitized HTML
   */
  function sanitizeHTML(html) {
    if (typeof html !== 'string') return '';

    const temp = document.createElement('div');
    temp.innerHTML = html;

    const walk = (node) => {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        const child = node.childNodes[i];

        if (child.nodeType === 3) continue; // Text node

        if (child.nodeType === 1) { // Element node
          // Remove if not in whitelist
          if (!ALLOWED_TAGS[child.tagName.toLowerCase()]) {
            node.removeChild(child);
            continue;
          }

          // Remove disallowed attributes
          for (let j = child.attributes.length - 1; j >= 0; j--) {
            const attr = child.attributes[j];
            if (!ALLOWED_ATTRS[attr.name.toLowerCase()]) {
              child.removeAttribute(attr.name);
            }
          }

          // Recursively walk children
          walk(child);
        } else {
          node.removeChild(child); // Remove other node types
        }
      }
    };

    walk(temp);
    return temp.innerHTML;
  }

  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text
   */
  function escapeHTML(text) {
    if (typeof text !== 'string') return '';

    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, char => map[char]);
  }

  /**
   * Safely set inner HTML
   * @param {HTMLElement} element - Target element
   * @param {string} html - HTML to set
   */
  function setInnerHTML(element, html) {
    if (!element || typeof html !== 'string') return;
    element.innerHTML = sanitizeHTML(html);
  }

  /**
   * Safely set text content (no HTML parsing)
   * @param {HTMLElement} element - Target element
   * @param {string} text - Text to set
   */
  function setText(element, text) {
    if (!element) return;
    element.textContent = text;
  }

  /**
   * Create safe element with event listener
   * @param {string} tag - HTML tag name
   * @param {Object} options - Element options
   * @returns {HTMLElement} - Created element
   */
  function createElement(tag, options = {}) {
    const el = document.createElement(tag);

    if (options.class) el.className = options.class;
    if (options.id) el.id = options.id;
    if (options.text) el.textContent = options.text;
    if (options.html) el.innerHTML = sanitizeHTML(options.html);
    if (options.attrs) {
      for (const [key, value] of Object.entries(options.attrs)) {
        if (ALLOWED_ATTRS[key.toLowerCase()]) {
          el.setAttribute(key, String(value));
        }
      }
    }

    return el;
  }

  /**
   * Validate URL to prevent javascript: and data: URIs
   * @param {string} url - URL to validate
   * @returns {boolean} - Is URL safe
   */
  function isValidURL(url) {
    if (typeof url !== 'string') return false;

    try {
      const parsed = new URL(url, window.location.href);
      const protocol = parsed.protocol.toLowerCase();

      // Allow http, https, and relative URLs
      return protocol === 'http:' || protocol === 'https:' || !parsed.protocol;
    } catch {
      return false;
    }
  }

  /**
   * Validate file type
   * @param {File} file - File to validate
   * @param {Array} allowedTypes - Allowed MIME types
   * @returns {boolean} - Is file valid
   */
  function isValidFile(file, allowedTypes = []) {
    if (!file || !file.type) return false;
    return allowedTypes.length === 0 || allowedTypes.includes(file.type);
  }

  /**
   * Sanitize input for data storage
   * @param {*} input - Input to sanitize
   * @returns {*} - Sanitized value
   */
  function sanitizeInput(input) {
    if (typeof input === 'string') {
      return input.trim().substring(0, 10000); // Limit size
    }
    return input;
  }

  return {
    sanitizeHTML,
    escapeHTML,
    setInnerHTML,
    setText,
    createElement,
    isValidURL,
    isValidFile,
    sanitizeInput
  };
})();
