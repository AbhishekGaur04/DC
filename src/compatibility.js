/**
 * Universal Compatibility Layer — Trimmed for Performance
 * 
 * Provides backwards-compatible polyfills for Safari 12-14 gaps,
 * WebKit/Safari guardrails, and safe API wrappers.
 *
 * Target Browsers: WebKit (Safari >= 12, iOS), Blink (Chrome, Edge), Gecko (Firefox ESR)
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Core Polyfills (only for APIs missing in Safari 12-14)
  // ---------------------------------------------------------------------------

  // globalThis — Safari 12.0 doesn't have it (12.1+ does)
  if (typeof globalThis === 'undefined') {
    (function () {
      if (typeof self !== 'undefined') { self.globalThis = self; }
      else if (typeof window !== 'undefined') { window.globalThis = window; }
      else if (typeof global !== 'undefined') { global.globalThis = global; }
    })();
  }

  // Object.hasOwn — Chrome 93+, FF 92+, Safari 15.4+
  if (!Object.hasOwn) {
    Object.hasOwn = function (obj, prop) {
      return obj != null && Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }

  // Object.fromEntries — Chrome 73+, FF 63+, Safari 12.1+
  if (!Object.fromEntries) {
    Object.fromEntries = function (iterable) {
      return Array.from(iterable).reduce(function (acc, pair) {
        if (Object(pair) !== pair) throw new TypeError('iterable for fromEntries should yield objects');
        acc[pair[0]] = pair[1];
        return acc;
      }, {});
    };
  }

  // Array.prototype.at — Chrome 92+, FF 90+, Safari 15.4+
  if (!Array.prototype.at) {
    Array.prototype.at = function (n) {
      var k = Math.trunc(n) || 0;
      if (k < 0) k += this.length;
      if (k < 0 || k >= this.length) return undefined;
      return this[k];
    };
  }

  // String.prototype.at — Chrome 92+, FF 90+, Safari 15.4+
  if (!String.prototype.at) {
    String.prototype.at = function (n) {
      var k = Math.trunc(n) || 0;
      if (k < 0) k += this.length;
      if (k < 0 || k >= this.length) return '';
      return this.charAt(k);
    };
  }

  // String.prototype.replaceAll — Chrome 85+, FF 77+, Safari 13.1+
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (searchValue, replaceValue) {
      if (searchValue instanceof RegExp) {
        if (!searchValue.global) {
          throw new TypeError('replaceAll called with a non-global RegExp');
        }
        return this.replace(searchValue, replaceValue);
      }
      return this.split(searchValue).join(replaceValue);
    };
  }

  // Promise.allSettled — Chrome 76+, FF 71+, Safari 13+
  if (typeof Promise !== 'undefined' && !Promise.allSettled) {
    Promise.allSettled = function (promises) {
      return Promise.all(
        Array.from(promises).map(function (p) {
          return Promise.resolve(p).then(
            function (value) { return { status: 'fulfilled', value: value }; },
            function (reason) { return { status: 'rejected', reason: reason }; }
          );
        })
      );
    };
  }

  // Promise.any — Chrome 85+, FF 79+, Safari 14+
  if (typeof Promise !== 'undefined' && !Promise.any) {
    Promise.any = function (promises) {
      return new Promise(function (resolve, reject) {
        var arr = Array.from(promises);
        var errors = [];
        var pending = arr.length;
        if (pending === 0) {
          return reject(new (typeof AggregateError !== 'undefined' ? AggregateError : Error)([], 'All promises were rejected'));
        }
        arr.forEach(function (p, i) {
          Promise.resolve(p).then(resolve, function (err) {
            errors[i] = err;
            pending--;
            if (pending === 0) {
              reject(new (typeof AggregateError !== 'undefined' ? AggregateError : Error)(errors, 'All promises were rejected'));
            }
          });
        });
      });
    };
  }

  // structuredClone — Chrome 98+, FF 94+, Safari 15.4+
  if (typeof window !== 'undefined' && typeof window.structuredClone !== 'function') {
    window.structuredClone = function (obj) {
      if (obj === undefined) return undefined;
      try {
        return JSON.parse(JSON.stringify(obj));
      } catch (e) {
        if (Array.isArray(obj)) return obj.slice();
        if (typeof obj === 'object' && obj !== null) return Object.assign({}, obj);
        return obj;
      }
    };
  }

  // ---------------------------------------------------------------------------
  // 2. Storage & Safari Private Browsing Guardrails
  // ---------------------------------------------------------------------------

  var createMemoryStorage = function () {
    var store = {};
    return {
      getItem: function (key) { return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null; },
      setItem: function (key, value) { store[key] = String(value); },
      removeItem: function (key) { delete store[key]; },
      clear: function () { store = {}; },
      key: function (i) { return Object.keys(store)[i] || null; },
      get length() { return Object.keys(store).length; }
    };
  };

  var safeLocalStorage = (function () {
    try {
      var testKey = '__compat_test_storage__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch (e) {
      return createMemoryStorage();
    }
  })();

  var safeSessionStorage = (function () {
    try {
      var testKey = '__compat_test_session__';
      window.sessionStorage.setItem(testKey, '1');
      window.sessionStorage.removeItem(testKey);
      return window.sessionStorage;
    } catch (e) {
      return createMemoryStorage();
    }
  })();

  if (typeof window !== 'undefined') {
    window.__safeLocalStorage = safeLocalStorage;
    window.__safeSessionStorage = safeSessionStorage;
  }

  // ---------------------------------------------------------------------------
  // 3. WebKit & Safari Specific Guardrails
  // ---------------------------------------------------------------------------

  window.safeRegExp = function (pattern, flags, fallbackPattern) {
    try {
      return new RegExp(pattern, flags);
    } catch (err) {
      return fallbackPattern ? new RegExp(fallbackPattern, flags) : null;
    }
  };

  window.safeMatchMedia = function (query, callback) {
    if (!window.matchMedia) return function () {};
    var mql = window.matchMedia(query);
    if (mql.addEventListener) {
      mql.addEventListener('change', callback);
      return function () { mql.removeEventListener('change', callback); };
    } else if (mql.addListener) {
      mql.addListener(callback);
      return function () { mql.removeListener(callback); };
    }
    return function () {};
  };

  window.safeClipboardWrite = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopyText(text);
      });
    }
    return Promise.resolve(fallbackCopyText(text));
  };

  function fallbackCopyText(text) {
    try {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      var successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      return false;
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Minimal Engine Detection (console log only)
  // ---------------------------------------------------------------------------

  var ua = navigator.userAgent || '';
  var vendor = navigator.vendor || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var engine = 'Unknown';

  if (/Chrome|CriOS|HeadlessChrome/.test(ua) && !/Edg/.test(ua)) {
    engine = isIOS ? 'WebKit' : 'Blink';
  } else if (/Edg/.test(ua)) {
    engine = 'Blink';
  } else if (/Firefox|FxiOS/.test(ua)) {
    engine = isIOS ? 'WebKit' : 'Gecko';
  } else if (/Safari/.test(ua) && (/Apple/.test(vendor) || isIOS)) {
    engine = 'WebKit';
  }

  window.__compatInfo = { engine: engine };

  console.log(
    '%c[Compat]%c ' + engine,
    'color: #d4952a; font-weight: bold;',
    'color: #2ecc71;'
  );

})();
