/**
 * Universal Compatibility Layer & Runtime Diagnostics Overlay
 * 
 * Provides backwards-compatible polyfills, WebKit/Safari guardrails, safe API wrappers,
 * and a non-invasive runtime diagnostics console overlay for non-production environments
 * or when requested via `?debug=true`.
 *
 * Target Browsers: WebKit (Safari >= 12, iOS), Blink (Chrome, Edge), Gecko (Firefox ESR)
 * Operating Systems: iOS, Android, macOS, Windows
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Core Universal Polyfills
  // ---------------------------------------------------------------------------

  // globalThis Polyfill
  if (typeof globalThis === 'undefined') {
    (function () {
      if (typeof self !== 'undefined') { self.globalThis = self; }
      else if (typeof window !== 'undefined') { window.globalThis = window; }
      else if (typeof global !== 'undefined') { global.globalThis = global; }
    })();
  }

  // Object.hasOwn Polyfill
  if (!Object.hasOwn) {
    Object.hasOwn = function (obj, prop) {
      return obj != null && Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }

  // Object.entries Polyfill
  if (!Object.entries) {
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i);
      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
    };
  }

  // Object.values Polyfill
  if (!Object.values) {
    Object.values = function (obj) {
      return Object.keys(obj).map(function (key) { return obj[key]; });
    };
  }

  // Object.fromEntries Polyfill
  if (!Object.fromEntries) {
    Object.fromEntries = function (iterable) {
      return Array.from(iterable).reduce(function (acc, pair) {
        if (Object(pair) !== pair) throw new TypeError('iterable for fromEntries should yield objects');
        acc[pair[0]] = pair[1];
        return acc;
      }, {});
    };
  }

  // Array.prototype.at Polyfill
  if (!Array.prototype.at) {
    Array.prototype.at = function (n) {
      var k = Math.trunc(n) || 0;
      if (k < 0) k += this.length;
      if (k < 0 || k >= this.length) return undefined;
      return this[k];
    };
  }

  // String.prototype.at Polyfill
  if (!String.prototype.at) {
    String.prototype.at = function (n) {
      var k = Math.trunc(n) || 0;
      if (k < 0) k += this.length;
      if (k < 0 || k >= this.length) return '';
      return this.charAt(k);
    };
  }

  // Array.prototype.flat Polyfill
  if (!Array.prototype.flat) {
    Array.prototype.flat = function (depth) {
      var flatten = function (arr, d) {
        return d > 0
          ? arr.reduce(function (acc, val) {
              return acc.concat(Array.isArray(val) ? flatten(val, d - 1) : val);
            }, [])
          : arr.slice();
      };
      return flatten(this, depth === undefined ? 1 : Number(depth));
    };
  }

  // Array.prototype.flatMap Polyfill
  if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function (callback, thisArg) {
      return Array.prototype.map.call(this, callback, thisArg).flat(1);
    };
  }

  // String.prototype.replaceAll Polyfill
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

  // Promise.allSettled Polyfill
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

  // Promise.any Polyfill
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

  // structuredClone Fallback
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
      console.warn('[Compat] Safe fallback engaged for localStorage (Safari Private Browsing or Restricted Access)');
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
      console.warn('[Compat] Safe fallback engaged for sessionStorage');
      return createMemoryStorage();
    }
  })();

  // Attach safe storage references to window for safe access
  if (typeof window !== 'undefined') {
    window.__safeLocalStorage = safeLocalStorage;
    window.__safeSessionStorage = safeSessionStorage;
  }

  // ---------------------------------------------------------------------------
  // 3. WebKit & Safari Specific Guardrails
  // ---------------------------------------------------------------------------

  /**
   * Safe RegExp Instantiator
   * Wraps complex regex (like Lookbehinds `(?<=...)` which cause SyntaxError in Safari < 16.4)
   */
  window.safeRegExp = function (pattern, flags, fallbackPattern) {
    try {
      return new RegExp(pattern, flags);
    } catch (err) {
      console.warn('[Compat] Host regex engine rejected pattern (' + pattern + '). Using fallback.', err);
      return fallbackPattern ? new RegExp(fallbackPattern, flags) : null;
    }
  };

  /**
   * Safe matchMedia helper for legacy WebKit matchMedia.addListener
   */
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

  /**
   * Safe Clipboard API Guardrail
   */
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
      console.warn('[Compat] Clipboard fallback failed:', err);
      return false;
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Engine & Feature Detection Registry
  // ---------------------------------------------------------------------------

  var detectBrowserEngine = function () {
    var ua = navigator.userAgent || '';
    var vendor = navigator.vendor || '';

    var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var isAndroid = /Android/.test(ua);
    var isMacOS = /Macintosh|Mac OS X/.test(ua) && !isIOS;
    var isWindows = /Windows/.test(ua);

    var engine = 'Unknown Engine';
    var browserName = 'Unknown Browser';

    if (/Chrome|CriOS|HeadlessChrome/.test(ua) && !/Edg/.test(ua)) {
      engine = 'Blink';
      browserName = isIOS ? 'Chrome iOS (WebKit)' : 'Chrome';
    } else if (/Edg/.test(ua)) {
      engine = 'Blink';
      browserName = 'Microsoft Edge';
    } else if (/Firefox|FxiOS/.test(ua)) {
      engine = isIOS ? 'WebKit' : 'Gecko';
      browserName = 'Firefox';
    } else if (/Safari/.test(ua) && (/Apple/.test(vendor) || isIOS)) {
      engine = 'WebKit';
      browserName = 'Safari';
    } else if (/WebKit/.test(ua)) {
      engine = 'WebKit';
      browserName = 'WebKit-based Browser';
    }

    var platform = isIOS ? 'iOS' : isAndroid ? 'Android' : isMacOS ? 'macOS' : isWindows ? 'Windows' : 'Linux/Other';

    return {
      engine: engine,
      browserName: browserName,
      platform: platform,
      isIOS: isIOS,
      isAndroid: isAndroid,
      userAgent: ua
    };
  };

  var getFeatureSupportMatrix = function () {
    return {
      'globalThis': typeof globalThis !== 'undefined',
      'Object.hasOwn': typeof Object.hasOwn === 'function',
      'Array.prototype.at': typeof Array.prototype.at === 'function',
      'Array.prototype.flat': typeof Array.prototype.flat === 'function',
      'String.prototype.replaceAll': typeof String.prototype.replaceAll === 'function',
      'Promise.allSettled': typeof Promise.allSettled === 'function',
      'structuredClone': typeof window.structuredClone === 'function',
      'ResizeObserver': typeof window.ResizeObserver !== 'undefined',
      'IntersectionObserver': typeof window.IntersectionObserver !== 'undefined',
      'WebAssembly': typeof window.WebAssembly !== 'undefined',
      'ServiceWorker': typeof navigator !== 'undefined' && 'serviceWorker' in navigator,
      'Fetch API': typeof window.fetch === 'function',
      'LocalStorage': (function () { try { return !!window.localStorage; } catch (e) { return false; } })(),
      'Backdrop Filter': (function () {
        if (typeof document === 'undefined') return false;
        var el = document.createElement('div');
        return 'backdropFilter' in el.style || '-webkit-backdrop-filter' in el.style;
      })(),
      'CSS Flexbox Gap': (function () {
        if (typeof document === 'undefined') return false;
        var flex = document.createElement('div');
        flex.style.display = 'flex';
        flex.style.gap = '1px';
        flex.appendChild(document.createElement('div'));
        flex.appendChild(document.createElement('div'));
        document.body.appendChild(flex);
        var isSupported = flex.scrollHeight === 1;
        document.body.removeChild(flex);
        return isSupported;
      })()
    };
  };

  var engineInfo = detectBrowserEngine();
  var featureMatrix = getFeatureSupportMatrix();

  // Attach compatibility info to window for runtime checks
  window.__compatInfo = {
    engineInfo: engineInfo,
    featureMatrix: featureMatrix,
    timestamp: new Date().toISOString()
  };

  // ---------------------------------------------------------------------------
  // 5. Non-Invasive Runtime Diagnostics Overlay (Dev / Staging / ?debug=true)
  // ---------------------------------------------------------------------------

  var isDebugMode = (function () {
    if (typeof location === 'undefined') return false;
    var urlParams = new URLSearchParams(location.search);
    if (urlParams.get('debug') === 'true') return true;
    try {
      if (window.localStorage && window.localStorage.getItem('debug') === 'true') return true;
    } catch (e) {}
    // Check Vite development flag safely
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) return true;
    } catch (e) {}
    return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  })();

  if (!isDebugMode) {
    // In production without ?debug=true, log engine summary quietly to console
    console.log(
      '%c[Compat Layer Active]%c Engine: ' + engineInfo.engine + ' (' + engineInfo.browserName + ') | Platform: ' + engineInfo.platform,
      'color: #d4952a; font-weight: bold;',
      'color: #2ecc71;'
    );
    return;
  }

  // Diagnostics State Data
  var diagLogs = [];
  var networkLogs = [];
  var assetFailures = [];

  function addDiagLog(type, title, detail) {
    var logItem = {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      time: new Date().toLocaleTimeString(),
      type: type, // 'error', 'unhandled', 'asset', 'cors', 'warn'
      title: title,
      detail: detail
    };
    diagLogs.unshift(logItem);
    if (diagLogs.length > 100) diagLogs.pop();
    updateOverlayUI();
  }

  // Intercept Global Window Errors
  var originalOnError = window.onerror;
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    var detail = (url || '') + ':' + (lineNo || '') + ':' + (columnNo || '') + '\n' + (error && error.stack ? error.stack : msg);
    addDiagLog('error', 'Unhandled Script Error: ' + msg, detail);
    if (typeof originalOnError === 'function') {
      return originalOnError.apply(this, arguments);
    }
    return false;
  };

  // Intercept Unhandled Promise Rejections
  window.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason;
    var detail = reason instanceof Error ? (reason.stack || reason.message) : JSON.stringify(reason);
    addDiagLog('unhandled', 'Unhandled Promise Rejection', detail);
  });

  // Intercept Resource Asset Load Failures
  window.addEventListener('error', function (event) {
    var target = event.target || event.srcElement;
    if (target && target !== window && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
      var assetUrl = target.src || target.href || 'Unknown Asset';
      var tag = target.tagName.toLowerCase();
      addDiagLog('asset', 'Failed Asset Load (<' + tag + '>)', assetUrl);
      assetFailures.push({ tag: tag, url: assetUrl, time: new Date().toLocaleTimeString() });
    }
  }, true);

  // Monitor Network Fetch Failures (CORS / SSL / 4xx / 5xx)
  if (typeof window.fetch === 'function') {
    var originalFetch = window.fetch;
    window.fetch = function () {
      var args = arguments;
      var requestUrl = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url ? args[0].url : 'Unknown Request');
      return originalFetch.apply(this, args).then(function (response) {
        if (!response.ok) {
          addDiagLog('network', 'HTTP ' + response.status + ': ' + response.statusText, requestUrl);
        }
        return response;
      }).catch(function (err) {
        addDiagLog('cors', 'Network / CORS / SSL Error', requestUrl + '\n' + err.message);
        throw err;
      });
    };
  }

  // ---------------------------------------------------------------------------
  // 6. Diagnostics Console Overlay UI Component
  // ---------------------------------------------------------------------------

  var overlayContainer = null;
  var isExpanded = false;
  var activeTab = 'overview'; // 'overview', 'errors', 'matrix', 'assets'

  function createOverlayDOM() {
    if (document.getElementById('compat-diagnostics-root')) return;

    overlayContainer = document.createElement('div');
    overlayContainer.id = 'compat-diagnostics-root';
    overlayContainer.style.cssText = [
      'position: fixed',
      'bottom: 16px',
      'right: 16px',
      'z-index: 999999',
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'font-size: 13px',
      'line-height: 1.4',
      'color: #e2e6ef',
      'pointer-events: auto'
    ].join(';');

    document.body.appendChild(overlayContainer);
    updateOverlayUI();
  }

  function updateOverlayUI() {
    if (!overlayContainer) return;

    var errorCount = diagLogs.filter(function (l) { return l.type === 'error' || l.type === 'unhandled'; }).length;
    var assetCount = diagLogs.filter(function (l) { return l.type === 'asset' || l.type === 'cors' || l.type === 'network'; }).length;
    var badgeColor = errorCount > 0 ? '#e74c3c' : assetCount > 0 ? '#f39c12' : '#2ecc71';

    if (!isExpanded) {
      overlayContainer.innerHTML = [
        '<div id="compat-badge" style="',
        'background: #0f2440; border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 6px 14px; ',
        'box-shadow: 0 4px 20px rgba(0,0,0,0.4); backdrop-filter: blur(10px); cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.2s;',
        '">',
        '<span style="width: 10px; height: 10px; border-radius: 50%; background: ' + badgeColor + '; display: inline-block;"></span>',
        '<span style="font-weight: 600; color: #fff;">Compat Overlay</span>',
        '<span style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 2px 6px; font-size: 11px;">' + engineInfo.engine + '</span>',
        (errorCount > 0 ? '<span style="background: #e74c3c; color: #fff; border-radius: 10px; padding: 2px 6px; font-size: 11px; font-weight: bold;">' + errorCount + ' err</span>' : ''),
        '</div>'
      ].join('');

      var badgeEl = document.getElementById('compat-badge');
      if (badgeEl) {
        badgeEl.onclick = function () {
          isExpanded = true;
          updateOverlayUI();
        };
      }
      return;
    }

    // Expanded Overlay Panel HTML
    var missingFeatures = Object.keys(featureMatrix).filter(function (k) { return !featureMatrix[k]; });

    var tabHeaderHTML = [
      '<div style="display: flex; border-bottom: 1px solid rgba(255,255,255,0.1); background: #0b192c; padding: 8px 12px; border-radius: 12px 12px 0 0; align-items: center; justify-content: space-between;">',
      '<div style="display: flex; gap: 8px;">',
      '<button id="tab-btn-overview" style="background: ' + (activeTab === 'overview' ? '#1a3a5c' : 'transparent') + '; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 12px;">Overview</button>',
      '<button id="tab-btn-errors" style="background: ' + (activeTab === 'errors' ? '#1a3a5c' : 'transparent') + '; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 12px;">Errors (' + errorCount + ')</button>',
      '<button id="tab-btn-assets" style="background: ' + (activeTab === 'assets' ? '#1a3a5c' : 'transparent') + '; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 12px;">Assets & Network (' + assetCount + ')</button>',
      '<button id="tab-btn-matrix" style="background: ' + (activeTab === 'matrix' ? '#1a3a5c' : 'transparent') + '; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 12px;">Feature Matrix</button>',
      '</div>',
      '<div style="display: flex; gap: 6px;">',
      '<button id="compat-copy-btn" title="Copy Full Diagnostics Log" style="background: #2a5a8c; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Copy Report</button>',
      '<button id="compat-min-btn" style="background: rgba(255,255,255,0.1); color: #fff; border: none; width: 22px; height: 22px; border-radius: 4px; cursor: pointer;">_</button>',
      '</div>',
      '</div>'
    ].join('');

    var contentHTML = '';

    if (activeTab === 'overview') {
      contentHTML = [
        '<div style="padding: 12px;">',
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">',
        '<div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px;">',
        '<div style="color: #94a3b8; font-size: 11px;">Browser Engine</div>',
        '<div style="font-weight: bold; color: #d4952a;">' + engineInfo.engine + ' (' + engineInfo.browserName + ')</div>',
        '</div>',
        '<div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px;">',
        '<div style="color: #94a3b8; font-size: 11px;">Platform / OS</div>',
        '<div style="font-weight: bold; color: #2ecc71;">' + engineInfo.platform + '</div>',
        '</div>',
        '</div>',
        '<div style="margin-bottom: 10px;">',
        '<div style="color: #94a3b8; font-size: 11px; margin-bottom: 4px;">Detected Missing Native APIs (Polyfilled/Guarded):</div>',
        (missingFeatures.length === 0
          ? '<div style="color: #2ecc71; font-size: 12px;">✓ All key browser APIs natively supported.</div>'
          : '<div style="display: flex; flex-wrap: wrap; gap: 4px;">' +
            missingFeatures.map(function (f) {
              return '<span style="background: rgba(231, 76, 60, 0.2); color: #e74c3c; border: 1px solid rgba(231,76,60,0.4); padding: 2px 6px; border-radius: 4px; font-size: 11px;">' + f + '</span>';
            }).join('') + '</div>'),
        '</div>',
        '<div style="font-size: 11px; color: #64748b; margin-top: 8px; word-break: break-all;">',
        'UA: ' + engineInfo.userAgent,
        '</div>',
        '</div>'
      ].join('');
    } else if (activeTab === 'errors') {
      var errors = diagLogs.filter(function (l) { return l.type === 'error' || l.type === 'unhandled'; });
      contentHTML = [
        '<div style="padding: 12px; max-height: 250px; overflow-y: auto;">',
        (errors.length === 0
          ? '<div style="color: #2ecc71; text-align: center; padding: 20px;">✓ No unhandled window errors or promise rejections caught.</div>'
          : errors.map(function (e) {
              return [
                '<div style="background: rgba(231,76,60,0.1); border-left: 3px solid #e74c3c; padding: 8px; margin-bottom: 8px; border-radius: 4px;">',
                '<div style="display: flex; justify-content: space-between; font-weight: bold; color: #f87171; font-size: 12px;">',
                '<span>' + e.title + '</span>',
                '<span style="color: #94a3b8; font-size: 10px;">' + e.time + '</span>',
                '</div>',
                '<pre style="margin: 4px 0 0 0; white-space: pre-wrap; font-size: 11px; color: #cbd5e1; font-family: monospace;">' + e.detail + '</pre>',
                '</div>'
              ].join('');
            }).join('')),
        '</div>'
      ].join('');
    } else if (activeTab === 'assets') {
      var assets = diagLogs.filter(function (l) { return l.type === 'asset' || l.type === 'cors' || l.type === 'network'; });
      contentHTML = [
        '<div style="padding: 12px; max-height: 250px; overflow-y: auto;">',
        (assets.length === 0
          ? '<div style="color: #2ecc71; text-align: center; padding: 20px;">✓ No asset load or network request failures detected.</div>'
          : assets.map(function (a) {
              var color = a.type === 'cors' ? '#f39c12' : '#e74c3c';
              return [
                '<div style="background: rgba(255,255,255,0.04); border-left: 3px solid ' + color + '; padding: 8px; margin-bottom: 8px; border-radius: 4px;">',
                '<div style="display: flex; justify-content: space-between; font-weight: bold; color: ' + color + '; font-size: 12px;">',
                '<span>' + a.title + '</span>',
                '<span style="color: #94a3b8; font-size: 10px;">' + a.time + '</span>',
                '</div>',
                '<div style="font-size: 11px; color: #cbd5e1; word-break: break-all; margin-top: 4px;">' + a.detail + '</div>',
                '</div>'
              ].join('');
            }).join('')),
        '</div>'
      ].join('');
    } else if (activeTab === 'matrix') {
      contentHTML = [
        '<div style="padding: 12px; max-height: 250px; overflow-y: auto;">',
        '<table style="width: 100%; border-collapse: collapse; font-size: 12px;">',
        '<thead><tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; color: #94a3b8;">',
        '<th style="padding: 4px;">Feature / API</th><th style="padding: 4px;">Status</th>',
        '</tr></thead><tbody>',
        Object.keys(featureMatrix).map(function (key) {
          var supported = featureMatrix[key];
          return [
            '<tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">',
            '<td style="padding: 4px; color: #e2e6ef;">' + key + '</td>',
            '<td style="padding: 4px; font-weight: bold; color: ' + (supported ? '#2ecc71' : '#f39c12') + ';">',
            supported ? '✓ Native' : '⚡ Polyfilled / Guarded',
            '</td>',
            '</tr>'
          ].join('');
        }).join(''),
        '</tbody></table>',
        '</div>'
      ].join('');
    }

    overlayContainer.innerHTML = [
      '<div style="background: #0f2440; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; width: 440px; max-width: 90vw; ',
      'box-shadow: 0 10px 40px rgba(0,0,0,0.6); backdrop-filter: blur(16px); display: flex; flex-direction: column; overflow: hidden;">',
      tabHeaderHTML,
      contentHTML,
      '</div>'
    ].join('');

    // Attach Tab Event Listeners
    var btnOverview = document.getElementById('tab-btn-overview');
    var btnErrors = document.getElementById('tab-btn-errors');
    var btnAssets = document.getElementById('tab-btn-assets');
    var btnMatrix = document.getElementById('tab-btn-matrix');
    var btnMin = document.getElementById('compat-min-btn');
    var btnCopy = document.getElementById('compat-copy-btn');

    if (btnOverview) btnOverview.onclick = function () { activeTab = 'overview'; updateOverlayUI(); };
    if (btnErrors) btnErrors.onclick = function () { activeTab = 'errors'; updateOverlayUI(); };
    if (btnAssets) btnAssets.onclick = function () { activeTab = 'assets'; updateOverlayUI(); };
    if (btnMatrix) btnMatrix.onclick = function () { activeTab = 'matrix'; updateOverlayUI(); };
    if (btnMin) btnMin.onclick = function () { isExpanded = false; updateOverlayUI(); };
    if (btnCopy) btnCopy.onclick = function () {
      var report = [
        '=== DIAMOND CONSTRUCTION DIAGNOSTIC REPORT ===',
        'Timestamp: ' + new Date().toISOString(),
        'Engine: ' + engineInfo.engine + ' (' + engineInfo.browserName + ')',
        'Platform: ' + engineInfo.platform,
        'UserAgent: ' + engineInfo.userAgent,
        '',
        '--- MISSING NATIVE APIS ---',
        Object.keys(featureMatrix).filter(function (k) { return !featureMatrix[k]; }).join(', ') || 'None (All Native)',
        '',
        '--- ERRORS LOG (' + diagLogs.length + ') ---',
        diagLogs.map(function (l) { return '[' + l.time + '] [' + l.type.toUpperCase() + '] ' + l.title + ' -> ' + l.detail; }).join('\n')
      ].join('\n');

      window.safeClipboardWrite(report).then(function (success) {
        if (btnCopy) btnCopy.innerText = success ? 'Copied!' : 'Failed';
        setTimeout(function () { if (btnCopy) btnCopy.innerText = 'Copy Report'; }, 2000);
      });
    };
  }

  // Initialize Overlay when DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    createOverlayDOM();
  } else {
    document.addEventListener('DOMContentLoaded', createOverlayDOM);
  }

})();
