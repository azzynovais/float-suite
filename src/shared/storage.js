/**
 * Storage management for Float Suite
 * Unified API for localStorage and IndexedDB
 */

const Storage = (() => {
  const DB_NAME = 'FloatSuite';
  const DB_VERSION = 1;

  /**
   * Save data to localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   */
  function saveLocal(key, value) {
    try {
      localStorage.setItem(`float_${key}`, JSON.stringify(value));
    } catch (err) {
      console.error(`Storage error: ${err}`);
    }
  }

  /**
   * Load data from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if not found
   * @returns {*} - Stored value or default
   */
  function loadLocal(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(`float_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error(`Storage error: ${err}`);
      return defaultValue;
    }
  }

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  function removeLocal(key) {
    try {
      localStorage.removeItem(`float_${key}`);
    } catch (err) {
      console.error(`Storage error: ${err}`);
    }
  }

  /**
   * Clear all localStorage data for Float Suite
   */
  function clearLocal() {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('float_'));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (err) {
      console.error(`Storage error: ${err}`);
    }
  }

  /**
   * Initialize IndexedDB
   * @returns {Promise<IDBDatabase>}
   */
  function initDB() {
    return new Promise((resolve, reject) => {
      if (!Utils.isSupported('indexedDB')) {
        reject(new Error('IndexedDB not supported'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores
        if (!db.objectStoreNames.contains('projects')) {
          db.createObjectStore('projects', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'id' });
        }
      };
    });
  }

  /**
   * Save document to IndexedDB
   * @param {string} storeName - Object store name
   * @param {*} data - Data to store
   * @returns {Promise<void>}
   */
  async function saveDB(storeName, data) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (err) {
      console.error(`IndexedDB error: ${err}`);
      throw err;
    }
  }

  /**
   * Load document from IndexedDB
   * @param {string} storeName - Object store name
   * @param {string} id - Document ID
   * @returns {Promise<*>}
   */
  async function loadDB(storeName, id) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (err) {
      console.error(`IndexedDB error: ${err}`);
      throw err;
    }
  }

  /**
   * Delete document from IndexedDB
   * @param {string} storeName - Object store name
   * @param {string} id - Document ID
   * @returns {Promise<void>}
   */
  async function deleteDB(storeName, id) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (err) {
      console.error(`IndexedDB error: ${err}`);
      throw err;
    }
  }

  /**
   * Get all documents from IndexedDB
   * @param {string} storeName - Object store name
   * @returns {Promise<Array>}
   */
  async function getAllDB(storeName) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (err) {
      console.error(`IndexedDB error: ${err}`);
      throw err;
    }
  }

  /**
   * Clear all IndexedDB data
   * @returns {Promise<void>}
   */
  async function clearDB() {
    try {
      const db = await initDB();
      const stores = ['projects', 'files', 'cache'];

      for (const storeName of stores) {
        await new Promise((resolve, reject) => {
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.clear();

          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve();
        });
      }
    } catch (err) {
      console.error(`IndexedDB error: ${err}`);
      throw err;
    }
  }

  return {
    saveLocal,
    loadLocal,
    removeLocal,
    clearLocal,
    saveDB,
    loadDB,
    deleteDB,
    getAllDB,
    clearDB
  };
})();
