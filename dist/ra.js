/*! Recapture.io SDK v1.1.3 | MIT & BSD */
var ra =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var state = __webpack_require__(1);
	var customer = __webpack_require__(24)(state);
	var collector = __webpack_require__(26)(state);
	var init = __webpack_require__(32)(state, customer);
	var page = __webpack_require__(33)(state);
	var product = __webpack_require__(34)(state);
	var email = __webpack_require__(35)(state, customer);

	var root = window;
	var libName = 'ra';
	var queue = root[libName].q || [];

	/**
	 * Factory function to get things rollin
	 * @method create
	 * @return {Object} Newly constructed ra object
	 */
	function create() {

	  var obj = Object.create({
	    init: init,
	    page: page,
	    product: product,
	    email: email
	  });

	  // run through our queue and apply methods as needed
	  if (queue.length) {
	    queue.forEach(function(q) {
	      var method = q.shift();
	      var args = q.shift();

	      if (obj[method]) {
	        obj[method].apply(obj, args);
	      }
	    });
	  }

	  return obj;
	}

	// override global
	root[libName] = create();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var actions = __webpack_require__(2);
	var redux = __webpack_require__(13);
	var thunk = __webpack_require__(22);
	var createLogger = __webpack_require__(23);

	var createStore = redux.createStore;
	var applyMiddleware = redux.applyMiddleware;
	var logger = createLogger({
	  collapsed: true,
	  duration: true,
	  timestamp: false,
	  predicate: function(getState, action) {
	    return ("development") !== 'production';
	  }
	});

	/**
	 * Action constants
	 * @type {String}
	 */
	var SET_API_KEY = actions.SET_API_KEY;
	var SET_CART_ID = actions.SET_CART_ID;
	var SET_CUSTOMER_ID = actions.SET_CUSTOMER_ID;
	var SET_CUSTOMER_EMAIL = actions.SET_CUSTOMER_EMAIL;
	var SEND_PAGE = actions.SEND_PAGE;
	var SEND_PRODUCT = actions.SEND_PRODUCT;
	var RESET_COLLECTOR = actions.RESET_COLLECTOR;

	/**
	 * Our default application state
	 * @type {Object}
	 */
	var defaultState = {
	  api_key: null,
	  customer_id: null,
	  customer_email: null,
	  collector: null
	};

	/**
	 * Reducer function for our state actions
	 * @method reducer
	 * @param  {Object} state The current state
	 * @param  {Object} action The incoming action
	 * @return {Object} The mutated state
	 */
	function reducer(state, action) {
	  switch (action.type) {
	    case SET_API_KEY:
	      state.api_key = action.payload;
	      return state;

	    case SET_CUSTOMER_ID:
	      state.customer_id = action.payload;
	      return state;

	    case SET_CUSTOMER_EMAIL:
	      state.customer_email = action.payload;
	      return state;

	    case SEND_PAGE:
	      if (action.payload.hasOwnProperty('data')) {
	        if (action.payload.data.hasOwnProperty('collector')) {
	          state.collector = action.payload.data.collector;
	        }
	      }

	      return state;

	    case SEND_PRODUCT:
	      if (action.payload.hasOwnProperty('data')) {
	        if (action.payload.data.hasOwnProperty('collector')) {
	          state.collector = action.payload.data.collector;
	        }
	      }

	      return state;

	    case RESET_COLLECTOR:
	      state.collector = null;
	      return state;

	    default:
	      return state;
	  }
	}

	/**
	 * Creates store with middleware
	 */
	var storeWithMiddleware = applyMiddleware(
	  thunk,
	  logger
	)(createStore);

	module.exports = storeWithMiddleware(reducer, defaultState);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(3);
	var request = __webpack_require__(7);

	function sendRequest(endpoint, data, callback) {

	  var baseURL =  false ?
	    'https://www.recapture.io/beacon/' :
	    'http://localhost:4000/beacon/';

	  request(baseURL + endpoint, data, callback);

	}

	/**
	 * Sets up the the api key for store
	 */
	var SET_API_KEY = 'SET_API_KEY';
	exports.SET_API_KEY = SET_API_KEY;
	exports.setApiKey = function setApiKey(key) {
	  return {
	    type: SET_API_KEY,
	    payload: key
	  };
	};

	/**
	 * Sets cart id of the customer
	 */
	var SET_CART_ID = 'SET_CART_ID';
	exports.SET_CART_ID = SET_CART_ID;
	exports.setCartId = function setCartId(id) {
	  return {
	    type: SET_CART_ID,
	    payload: id
	  };
	};

	/**
	 * Sets customer id and puts it into storage
	 */
	var SET_CUSTOMER_ID = 'SET_CUSTOMER_ID';
	exports.SET_CUSTOMER_ID = SET_CUSTOMER_ID;
	exports.setCustomerId = function setCustomerId(id) {
	  storage.set('ra_customer_id', id);

	  return {
	    type: SET_CUSTOMER_ID,
	    payload: id
	  };
	};

	/**
	 * Sets customer id and puts it into storage
	 */
	var SET_CUSTOMER_EMAIL = 'SET_CUSTOMER_EMAIL';
	exports.SET_CUSTOMER_EMAIL = SET_CUSTOMER_EMAIL;
	exports.setCustomerEmail = function setCustomerEmail(email) {
	  storage.set('ra_customer_email', email);

	  return {
	    type: SET_CUSTOMER_EMAIL,
	    payload: email
	  };
	};


	/**
	 * Send customer email to recapture and put it into storage
	 */
	var SEND_CUSTOMER_EMAIL = 'SEND_CUSTOMER_EMAIL';
	exports.SEND_CUSTOMER_EMAIL = SEND_CUSTOMER_EMAIL;
	exports.sendCustomerEmail = function(data) {
	  return function(dispatch) {
	    sendRequest('email', data, function(response) {
	      dispatch({
	        type: SEND_CUSTOMER_EMAIL,
	        payload: response
	      });
	    })
	  };
	}

	/**
	 * Send product data to recapture
	 */
	var SEND_PRODUCT = 'SEND_PRODUCT';
	exports.SEND_PRODUCT = SEND_PRODUCT;
	exports.sendProduct = function(data) {
	  return function(dispatch) {
	    sendRequest('product', data, function(response) {
	      dispatch({
	        type: SEND_PRODUCT,
	        payload: response
	      });
	    })
	  };
	};

	/**
	 * Send page data to recapture
	 */
	var SEND_PAGE = 'SEND_PAGE';
	exports.SEND_PAGE = SEND_PAGE;
	exports.sendPage = function(data) {
	  return function(dispatch) {
	    sendRequest('page', data, function(response) {
	      dispatch({
	        type: SEND_PAGE,
	        payload: response
	      });
	    })
	  };
	};


	/**
	 * Send collector close data to recapture
	 */
	var SEND_COLLECTOR_CLOSE = 'SEND_COLLECTOR_CLOSE';
	exports.SEND_COLLECTOR_CLOSE = SEND_COLLECTOR_CLOSE;
	exports.sendCollectorClose = function(url) {
	  if (!url) return;
	  return function(dispatch) {
	    request(url, {}, function(response) {
	      dispatch({
	        type: SEND_COLLECTOR_CLOSE,
	        payload: response
	      });
	    })
	  };
	};


	/**
	 * To make sure subsequent api calls do not show collector again
	 */
	var RESET_COLLECTOR = 'RESET_COLLECTOR';
	exports.RESET_COLLECTOR = RESET_COLLECTOR;
	exports.resetCollector = function() {
	  return {
	    type: RESET_COLLECTOR,
	    payload: {}
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(4);
	var cookies = __webpack_require__(6);

	/**
	 * Gets an item from storage
	 * @method get
	 * @param  {String} key The items key
	 * @return {String} The item
	 */
	function get(key) {
	  return store.get(key);
	}

	/**
	 * Sets an item to storage
	 * @method set
	 * @param  {String} key The items key
	 * @param  {String} value The items value
	 * @return {String} The items value
	 */
	function set(key, value) {
	  cookies.set(key, value, { expires: Infinity });
	  return store.set(key, value);
	}

	/**
	 * Check to see if a item exists, checks both localstorage and cookies
	 * @method has
	 * @param  {String} key The items key
	 * @return {Boolean} Whether an item was found or not
	 */
	function has(key) {
	  // if present in localstorage but not cookie, set in cookie
	  if (store.has(key) && !cookies.get(key)) {
	    cookies.set(key, store.get(key));
	  }

	  // if present in cookie but not localstorage, set in localstorage
	  if (cookies.get(key) && !store.has(key)) {
	    store.set(key, cookies.get(key));
	  }

	  return store.has(key) && cookies.get(key);
	}

	/**
	 * Remove an item from storage
	 * @method remove
	 * @param  {String} key The items key
	 * @return {Object} Not sure
	 */
	function remove(key) {
	  cookies.expire(key);
	  return store.remove(key);
	}

	module.exports = Object.create({
	  get: get,
	  set: set,
	  has: has,
	  remove: remove
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {;(function(win){
		var store = {},
			doc = win.document,
			localStorageName = 'localStorage',
			scriptTag = 'script',
			storage

		store.disabled = false
		store.version = '1.3.17'
		store.set = function(key, value) {}
		store.get = function(key, defaultVal) {}
		store.has = function(key) { return store.get(key) !== undefined }
		store.remove = function(key) {}
		store.clear = function() {}
		store.transact = function(key, defaultVal, transactionFn) {
			if (transactionFn == null) {
				transactionFn = defaultVal
				defaultVal = null
			}
			if (defaultVal == null) {
				defaultVal = {}
			}
			var val = store.get(key, defaultVal)
			transactionFn(val)
			store.set(key, val)
		}
		store.getAll = function() {}
		store.forEach = function() {}

		store.serialize = function(value) {
			return JSON.stringify(value)
		}
		store.deserialize = function(value) {
			if (typeof value != 'string') { return undefined }
			try { return JSON.parse(value) }
			catch(e) { return value || undefined }
		}

		// Functions to encapsulate questionable FireFox 3.6.13 behavior
		// when about.config::dom.storage.enabled === false
		// See https://github.com/marcuswestin/store.js/issues#issue/13
		function isLocalStorageNameSupported() {
			try { return (localStorageName in win && win[localStorageName]) }
			catch(err) { return false }
		}

		if (isLocalStorageNameSupported()) {
			storage = win[localStorageName]
			store.set = function(key, val) {
				if (val === undefined) { return store.remove(key) }
				storage.setItem(key, store.serialize(val))
				return val
			}
			store.get = function(key, defaultVal) {
				var val = store.deserialize(storage.getItem(key))
				return (val === undefined ? defaultVal : val)
			}
			store.remove = function(key) { storage.removeItem(key) }
			store.clear = function() { storage.clear() }
			store.getAll = function() {
				var ret = {}
				store.forEach(function(key, val) {
					ret[key] = val
				})
				return ret
			}
			store.forEach = function(callback) {
				for (var i=0; i<storage.length; i++) {
					var key = storage.key(i)
					callback(key, store.get(key))
				}
			}
		} else if (doc.documentElement.addBehavior) {
			var storageOwner,
				storageContainer
			// Since #userData storage applies only to specific paths, we need to
			// somehow link our data to a specific path.  We choose /favicon.ico
			// as a pretty safe option, since all browsers already make a request to
			// this URL anyway and being a 404 will not hurt us here.  We wrap an
			// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
			// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
			// since the iframe access rules appear to allow direct access and
			// manipulation of the document element, even for a 404 page.  This
			// document can be used instead of the current document (which would
			// have been limited to the current path) to perform #userData storage.
			try {
				storageContainer = new ActiveXObject('htmlfile')
				storageContainer.open()
				storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
				storageContainer.close()
				storageOwner = storageContainer.w.frames[0].document
				storage = storageOwner.createElement('div')
			} catch(e) {
				// somehow ActiveXObject instantiation failed (perhaps some special
				// security settings or otherwse), fall back to per-path storage
				storage = doc.createElement('div')
				storageOwner = doc.body
			}
			var withIEStorage = function(storeFunction) {
				return function() {
					var args = Array.prototype.slice.call(arguments, 0)
					args.unshift(storage)
					// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
					// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
					storageOwner.appendChild(storage)
					storage.addBehavior('#default#userData')
					storage.load(localStorageName)
					var result = storeFunction.apply(store, args)
					storageOwner.removeChild(storage)
					return result
				}
			}

			// In IE7, keys cannot start with a digit or contain certain chars.
			// See https://github.com/marcuswestin/store.js/issues/40
			// See https://github.com/marcuswestin/store.js/issues/83
			var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
			function ieKeyFix(key) {
				return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
			}
			store.set = withIEStorage(function(storage, key, val) {
				key = ieKeyFix(key)
				if (val === undefined) { return store.remove(key) }
				storage.setAttribute(key, store.serialize(val))
				storage.save(localStorageName)
				return val
			})
			store.get = withIEStorage(function(storage, key, defaultVal) {
				key = ieKeyFix(key)
				var val = store.deserialize(storage.getAttribute(key))
				return (val === undefined ? defaultVal : val)
			})
			store.remove = withIEStorage(function(storage, key) {
				key = ieKeyFix(key)
				storage.removeAttribute(key)
				storage.save(localStorageName)
			})
			store.clear = withIEStorage(function(storage) {
				var attributes = storage.XMLDocument.documentElement.attributes
				storage.load(localStorageName)
				for (var i=0, attr; attr=attributes[i]; i++) {
					storage.removeAttribute(attr.name)
				}
				storage.save(localStorageName)
			})
			store.getAll = function(storage) {
				var ret = {}
				store.forEach(function(key, val) {
					ret[key] = val
				})
				return ret
			}
			store.forEach = withIEStorage(function(storage, callback) {
				var attributes = storage.XMLDocument.documentElement.attributes
				for (var i=0, attr; attr=attributes[i]; ++i) {
					callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
				}
			})
		}

		try {
			var testKey = '__storejs__'
			store.set(testKey, testKey)
			if (store.get(testKey) != testKey) { store.disabled = true }
			store.remove(testKey)
		} catch(e) {
			store.disabled = true
		}
		store.enabled = !store.disabled

		if (typeof module != 'undefined' && module.exports && this.module !== module) { module.exports = store }
		else if (true) { !(__WEBPACK_AMD_DEFINE_FACTORY__ = (store), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) }
		else { win.store = store }

	})(Function('return this')());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Cookies.js - 1.2.2
	 * https://github.com/ScottHamper/Cookies
	 *
	 * This is free and unencumbered software released into the public domain.
	 */
	(function (global, undefined) {
	    'use strict';

	    var factory = function (window) {
	        if (typeof window.document !== 'object') {
	            throw new Error('Cookies.js requires a `window` with a `document` object');
	        }

	        var Cookies = function (key, value, options) {
	            return arguments.length === 1 ?
	                Cookies.get(key) : Cookies.set(key, value, options);
	        };

	        // Allows for setter injection in unit tests
	        Cookies._document = window.document;

	        // Used to ensure cookie keys do not collide with
	        // built-in `Object` properties
	        Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)
	        
	        Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

	        Cookies.defaults = {
	            path: '/',
	            secure: false
	        };

	        Cookies.get = function (key) {
	            if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
	                Cookies._renewCache();
	            }
	            
	            var value = Cookies._cache[Cookies._cacheKeyPrefix + key];

	            return value === undefined ? undefined : decodeURIComponent(value);
	        };

	        Cookies.set = function (key, value, options) {
	            options = Cookies._getExtendedOptions(options);
	            options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

	            Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

	            return Cookies;
	        };

	        Cookies.expire = function (key, options) {
	            return Cookies.set(key, undefined, options);
	        };

	        Cookies._getExtendedOptions = function (options) {
	            return {
	                path: options && options.path || Cookies.defaults.path,
	                domain: options && options.domain || Cookies.defaults.domain,
	                expires: options && options.expires || Cookies.defaults.expires,
	                secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
	            };
	        };

	        Cookies._isValidDate = function (date) {
	            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
	        };

	        Cookies._getExpiresDate = function (expires, now) {
	            now = now || new Date();

	            if (typeof expires === 'number') {
	                expires = expires === Infinity ?
	                    Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
	            } else if (typeof expires === 'string') {
	                expires = new Date(expires);
	            }

	            if (expires && !Cookies._isValidDate(expires)) {
	                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
	            }

	            return expires;
	        };

	        Cookies._generateCookieString = function (key, value, options) {
	            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
	            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
	            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
	            options = options || {};

	            var cookieString = key + '=' + value;
	            cookieString += options.path ? ';path=' + options.path : '';
	            cookieString += options.domain ? ';domain=' + options.domain : '';
	            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
	            cookieString += options.secure ? ';secure' : '';

	            return cookieString;
	        };

	        Cookies._getCacheFromString = function (documentCookie) {
	            var cookieCache = {};
	            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

	            for (var i = 0; i < cookiesArray.length; i++) {
	                var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

	                if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
	                    cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
	                }
	            }

	            return cookieCache;
	        };

	        Cookies._getKeyValuePairFromCookieString = function (cookieString) {
	            // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
	            var separatorIndex = cookieString.indexOf('=');

	            // IE omits the "=" when the cookie value is an empty string
	            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

	            var key = cookieString.substr(0, separatorIndex);
	            var decodedKey;
	            try {
	                decodedKey = decodeURIComponent(key);
	            } catch (e) {
	                if (console && typeof console.error === 'function') {
	                    console.error('Could not decode cookie with key "' + key + '"', e);
	                }
	            }
	            
	            return {
	                key: decodedKey,
	                value: cookieString.substr(separatorIndex + 1) // Defer decoding value until accessed
	            };
	        };

	        Cookies._renewCache = function () {
	            Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
	            Cookies._cachedDocumentCookie = Cookies._document.cookie;
	        };

	        Cookies._areEnabled = function () {
	            var testKey = 'cookies.js';
	            var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
	            Cookies.expire(testKey);
	            return areEnabled;
	        };

	        Cookies.enabled = Cookies._areEnabled();

	        return Cookies;
	    };

	    var cookiesExport = typeof global.document === 'object' ? factory(global) : factory;

	    // AMD support
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return cookiesExport; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    // CommonJS/Node.js support
	    } else if (typeof exports === 'object') {
	        // Support Node.js specific `module.exports` (which can be a function)
	        if (typeof module === 'object' && typeof module.exports === 'object') {
	            exports = module.exports = cookiesExport;
	        }
	        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
	        exports.Cookies = cookiesExport;
	    } else {
	        global.Cookies = cookiesExport;
	    }
	})(typeof window === 'undefined' ? this : window);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var qwest = __webpack_require__(8);

	/**
	 * JSONP sets up and allows you to execute a JSONP request
	 * @param {String} url  The URL you are requesting with the JSON data
	 * @param {Object} data The Data object you want to generate the URL params from
	 * @param {String} method  The method name for the callback function. Defaults to callback (for example, flickr's is "jsoncallback")
	 * @param {Function} callback  The callback you want to execute as an anonymous function. The first parameter of the anonymous callback function is the JSON
	 *
	 * @example
	 * JSONP('http://twitter.com/users/oscargodson.json',function(json){
	 *  document.getElementById('avatar').innerHTML = '<p>Twitter Pic:</p><img src="'+json.profile_image_url+'">';
	 * });
	 *
	 * @example
	 * JSONP('http://api.flickr.com/services/feeds/photos_public.gne',{'id':'12389944@N03','format':'json'},'jsoncallback',function(json){
	 *  document.getElementById('flickrPic').innerHTML = '<p>Flickr Pic:</p><img src="'+json.items[0].media.m+'">';
	 * });
	 *
	 * @example
	 * JSONP('http://graph.facebook.com/FacebookDevelopers', 'callback', function(json){
	 *  document.getElementById('facebook').innerHTML = json.about;
	 * });
	 */
	(function( window, undefined) {
	  var JSONP = function(url,data,method,callback){
	    //Set the defaults
	    url = url || '';
	    data = data || {};
	    method = method || '';
	    callback = callback || function(){};

	    //Gets all the keys that belong
	    //to an object
	    var getKeys = function(obj){
	      var keys = [];
	      for(var key in obj){
	        if (obj.hasOwnProperty(key)) {
	          keys.push(key);
	        }

	      }
	      return keys;
	    }

	    //Turn the data object into a query string.
	    //Add check to see if the second parameter is indeed
	    //a data object. If not, keep the default behaviour
	    if(typeof data == 'object'){
	      var queryString = '';
	      var keys = getKeys(data);
	      for(var i = 0; i < keys.length; i++){
	        queryString += encodeURIComponent(keys[i]) + '=' + encodeURIComponent(data[keys[i]])
	        if(i != keys.length - 1){
	          queryString += '&';
	        }
	      }
	      url += '?' + queryString;
	    } else if(typeof data == 'function'){
	      method = data;
	      callback = method;
	    }

	    //If no method was set and they used the callback param in place of
	    //the method param instead, we say method is callback and set a
	    //default method of "callback"
	    if(typeof method == 'function'){
	      callback = method;
	      method = 'callback';
	    }

	    //Check to see if we have Date.now available, if not shim it for older browsers
	    if(!Date.now){
	      Date.now = function() { return new Date().getTime(); };
	    }

	    //Use timestamp + a random factor to account for a lot of requests in a short time
	    //e.g. jsonp1394571775161
	    var timestamp = Date.now();
	    var generatedFunction = 'jsonp'+Math.round(timestamp+Math.random()*1000001)

	    //Generate the temp JSONP function using the name above
	    //First, call the function the user defined in the callback param [callback(json)]
	    //Then delete the generated function from the window [delete window[generatedFunction]]
	    window[generatedFunction] = function(json){

	      callback(json);

	      // IE8 throws an exception when you try to delete a property on window
	      // http://stackoverflow.com/a/1824228/751089
	      try {
	        delete window[generatedFunction];
	      } catch(e) {
	        window[generatedFunction] = undefined;
	      }

	    };

	    //Check if the user set their own params, and if not add a ? to start a list of params
	    //If in fact they did we add a & to add onto the params
	    //example1: url = http://url.com THEN http://url.com?callback=X
	    //example2: url = http://url.com?example=param THEN http://url.com?example=param&callback=X
	    if(url.indexOf('?') === -1){ url = url+'?'; }
	    else{ url = url+'&'; }

	    //This generates the <script> tag
	    var jsonpScript = document.createElement('script');
	    jsonpScript.setAttribute("src", url+method+'='+generatedFunction);
	    document.getElementsByTagName("head")[0].appendChild(jsonpScript)
	  }
	  window.JSONP = JSONP;

	  var request = function(url, data, callback){

	    //if this god-awful communication library is present (<=IE9), we fallback to jsonp
	    if (window.XDomainRequest){

	      JSONP(url, data, callback);

	      //otherwise we use qwest, and look to the future
	    } else {

	      qwest.post(url, data)
	        .then(function(xhr, response){
	          callback(response);
	        })
	        ['catch'](function(xhr, response, e){
	          //what should we do here?
	          console.log('failed request');
	        })
	    }
	  }

	  module.exports = JSONP;
	})(window);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*! qwest 2.2.0 (https://github.com/pyrsmk/qwest) */

	module.exports = function() {

		var global = this,
			pinkyswear = __webpack_require__(9),
			jparam = __webpack_require__(12),
			// Default response type for XDR in auto mode
			defaultXdrResponseType = 'json',
			// Variables for limit mechanism
			limit = null,
			requests = 0,
			request_stack = [],
			// Get XMLHttpRequest object
			getXHR = function(){
				return global.XMLHttpRequest?
						new global.XMLHttpRequest():
						new ActiveXObject('Microsoft.XMLHTTP');
			},
			// Guess XHR version
			xhr2 = (getXHR().responseType===''),

		// Core function
		qwest = function(method, url, data, options, before) {

			// Format
			method = method.toUpperCase();
			data = data || null;
			options = options || {};

			// Define variables
			var nativeResponseParsing = false,
				crossOrigin,
				xhr,
				xdr = false,
				timeoutInterval,
				aborted = false,
				attempts = 0,
				headers = {},
				mimeTypes = {
					text: '*/*',
					xml: 'text/xml',
					json: 'application/json',
					post: 'application/x-www-form-urlencoded'
				},
				accept = {
					text: '*/*',
					xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
					json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
				},
				vars = '',
				i, j,
				serialized,
				response,
				sending = false,
				delayed = false,
				timeout_start,

			// Create the promise
			promise = pinkyswear(function(pinky) {
				pinky['catch'] = function(f) {
					return pinky.then(null, f);
				};
				pinky.complete = function(f) {
					return pinky.then(f, f);
				};
				// Override
				if('pinkyswear' in options) {
					for(i in options.pinkyswear) {
						pinky[i] = options.pinkyswear[i];
					}
				}
				pinky.send = function() {
					// Prevent further send() calls
					if(sending) {
						return;
					}
					// Reached request limit, get out!
					if(requests == limit) {
						request_stack.push(pinky);
						return;
					}
					++requests;
					sending = true;
					// Start the chrono
					timeout_start = Date.now();
					// Get XHR object
					xhr = getXHR();
					if(crossOrigin) {
						if(!('withCredentials' in xhr) && global.XDomainRequest) {
							xhr = new XDomainRequest(); // CORS with IE8/9
							xdr = true;
							if(method!='GET' && method!='POST') {
								method = 'POST';
							}
						}
					}
					// Open connection
					if(xdr) {
						xhr.open(method, url);
					}
					else {
						xhr.open(method, url, options.async, options.user, options.password);
						if(xhr2 && options.async) {
							xhr.withCredentials = options.withCredentials;
						}
					}
					// Set headers
					if(!xdr) {
						for(var i in headers) {
							if(headers[i]) {
								xhr.setRequestHeader(i, headers[i]);
							}
						}
					}
					// Verify if the response type is supported by the current browser
					if(xhr2 && options.responseType!='document' && options.responseType!='auto') { // Don't verify for 'document' since we're using an internal routine
						try {
							xhr.responseType = options.responseType;
							nativeResponseParsing = (xhr.responseType==options.responseType);
						}
						catch(e){}
					}
					// Plug response handler
					if(xhr2 || xdr) {
						xhr.onload = handleResponse;
						xhr.onerror = handleError;
					}
					else {
						xhr.onreadystatechange = function() {
							if(xhr.readyState == 4) {
								handleResponse();
							}
						};
					}
					// Override mime type to ensure the response is well parsed
					if(options.responseType!='auto' && 'overrideMimeType' in xhr) {
						xhr.overrideMimeType(mimeTypes[options.responseType]);
					}
					// Run 'before' callback
					if(before) {
						before(xhr);
					}
					// Send request
					if(xdr) {
						setTimeout(function(){ // https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
							xhr.send(method!='GET'?data:null);
						},0);
					}
					else {
						xhr.send(method!='GET'?data:null);
					}
				};
				return pinky;
			}),

			// Handle the response
			handleResponse = function() {
				// Prepare
				var i, responseType;
				--requests;
				sending = false;
				// Verify timeout state
				// --- https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
				if(Date.now()-timeout_start >= options.timeout) {
					if(!options.attempts || ++attempts!=options.attempts) {
						promise.send();
					}
					else {
						promise(false, [xhr,response,new Error('Timeout ('+url+')')]);
					}
					return;
				}
				// Launch next stacked request
				if(request_stack.length) {
					request_stack.shift().send();
				}
				// Handle response
				try{
					// Process response
					if(nativeResponseParsing && 'response' in xhr && xhr.response!==null) {
						response = xhr.response;
					}
					else if(options.responseType == 'document') {
						var frame = document.createElement('iframe');
						frame.style.display = 'none';
						document.body.appendChild(frame);
						frame.contentDocument.open();
						frame.contentDocument.write(xhr.response);
						frame.contentDocument.close();
						response = frame.contentDocument;
						document.body.removeChild(frame);
					}
					else{
						// Guess response type
						responseType = options.responseType;
						if(responseType == 'auto') {
							if(xdr) {
								responseType = defaultXdrResponseType;
							}
							else {
								var ct = xhr.getResponseHeader('Content-Type') || '';
								if(ct.indexOf(mimeTypes.json)>-1) {
									responseType = 'json';
								}
								else if(ct.indexOf(mimeTypes.xml)>-1) {
									responseType = 'xml';
								}
								else {
									responseType = 'text';
								}
							}
						}
						// Handle response type
						switch(responseType) {
							case 'json':
								try {
									if('JSON' in global) {
										response = JSON.parse(xhr.responseText);
									}
									else {
										response = eval('('+xhr.responseText+')');
									}
								}
								catch(e) {
									throw "Error while parsing JSON body : "+e;
								}
								break;
							case 'xml':
								// Based on jQuery's parseXML() function
								try {
									// Standard
									if(global.DOMParser) {
										response = (new DOMParser()).parseFromString(xhr.responseText,'text/xml');
									}
									// IE<9
									else {
										response = new ActiveXObject('Microsoft.XMLDOM');
										response.async = 'false';
										response.loadXML(xhr.responseText);
									}
								}
								catch(e) {
									response = undefined;
								}
								if(!response || !response.documentElement || response.getElementsByTagName('parsererror').length) {
									throw 'Invalid XML';
								}
								break;
							default:
								response = xhr.responseText;
						}
					}
					// Late status code verification to allow passing data when, per example, a 409 is returned
					// --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
					if('status' in xhr && !/^2|1223/.test(xhr.status)) {
						throw xhr.status+' ('+xhr.statusText+')';
					}
					// Fulfilled
					promise(true, [xhr,response]);
				}
				catch(e) {
					// Rejected
					promise(false, [xhr,response,e]);
				}
			},

			// Handle errors
			handleError = function(e) {
				--requests;
				promise(false, [xhr,null,new Error('Connection aborted')]);
			};

			// Normalize options
			options.async = 'async' in options?!!options.async:true;
			options.cache = 'cache' in options?!!options.cache:false;
			options.dataType = 'dataType' in options?options.dataType.toLowerCase():'post';
			options.responseType = 'responseType' in options?options.responseType.toLowerCase():'auto';
			options.user = options.user || '';
			options.password = options.password || '';
			options.withCredentials = !!options.withCredentials;
			options.timeout = 'timeout' in options?parseInt(options.timeout,10):30000;
			options.attempts = 'attempts' in options?parseInt(options.attempts,10):1;

			// Guess if we're dealing with a cross-origin request
			i = url.match(/\/\/(.+?)\//);
			crossOrigin = i && (i[1]?i[1]!=location.host:false);

			// Prepare data
			if('ArrayBuffer' in global && data instanceof ArrayBuffer) {
				options.dataType = 'arraybuffer';
			}
			else if('Blob' in global && data instanceof Blob) {
				options.dataType = 'blob';
			}
			else if('Document' in global && data instanceof Document) {
				options.dataType = 'document';
			}
			else if('FormData' in global && data instanceof FormData) {
				options.dataType = 'formdata';
			}
			switch(options.dataType) {
				case 'json':
					data = JSON.stringify(data);
					break;
				case 'post':
					data = jparam(data);
			}

			// Prepare headers
			if(options.headers) {
				var format = function(match,p1,p2) {
					return p1 + p2.toUpperCase();
				};
				for(i in options.headers) {
					headers[i.replace(/(^|-)([^-])/g,format)] = options.headers[i];
				}
			}
			if(!('Content-Type' in headers) && method!='GET') {
				if(options.dataType in mimeTypes) {
					if(mimeTypes[options.dataType]) {
						headers['Content-Type'] = mimeTypes[options.dataType];
					}
				}
			}
			if(!headers.Accept) {
				headers.Accept = (options.responseType in accept)?accept[options.responseType]:'*/*';
			}
			if(!crossOrigin && !('X-Requested-With' in headers)) { // (that header breaks in legacy browsers with CORS)
				headers['X-Requested-With'] = 'XMLHttpRequest';
			}
			if(!options.cache && !('Cache-Control' in headers)) {
				headers['Cache-Control'] = 'no-cache';
			}

			// Prepare URL
			if(method=='GET' && data) {
				vars += data;
			}
			if(vars) {
				url += (/\?/.test(url)?'&':'?')+vars;
			}

			// Start the request
			if(options.async) {
				promise.send();
			}

			// Return promise
			return promise;

		};

		// Return the external qwest object
		return {
			base: '',
			get: function(url, data, options, before) {
				return qwest('GET', this.base+url, data, options, before);
			},
			post: function(url, data, options, before) {
				return qwest('POST', this.base+url, data, options, before);
			},
			put: function(url, data, options, before) {
				return qwest('PUT', this.base+url, data, options, before);
			},
			'delete': function(url, data, options, before) {
				return qwest('DELETE', this.base+url, data, options, before);
			},
			map: function(type, url, data, options, before) {
				return qwest(type.toUpperCase(), this.base+url, data, options, before);
			},
			xhr2: xhr2,
			// obsolete
			limit: function(by) {
				limit = by;
			},
			// obsolete
			setDefaultXdrResponseType: function(type) {
				defaultXdrResponseType = type.toLowerCase();
			}
		};

	}();


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, setImmediate, process) {/*
	 * PinkySwear.js 2.2.2 - Minimalistic implementation of the Promises/A+ spec
	 * 
	 * Public Domain. Use, modify and distribute it any way you like. No attribution required.
	 *
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 *
	 * PinkySwear is a very small implementation of the Promises/A+ specification. After compilation with the
	 * Google Closure Compiler and gzipping it weighs less than 500 bytes. It is based on the implementation for 
	 * Minified.js and should be perfect for embedding. 
	 *
	 *
	 * PinkySwear has just three functions.
	 *
	 * To create a new promise in pending state, call pinkySwear():
	 *         var promise = pinkySwear();
	 *
	 * The returned object has a Promises/A+ compatible then() implementation:
	 *          promise.then(function(value) { alert("Success!"); }, function(value) { alert("Failure!"); });
	 *
	 *
	 * The promise returned by pinkySwear() is a function. To fulfill the promise, call the function with true as first argument and
	 * an optional array of values to pass to the then() handler. By putting more than one value in the array, you can pass more than one
	 * value to the then() handlers. Here an example to fulfill a promsise, this time with only one argument: 
	 *         promise(true, [42]);
	 *
	 * When the promise has been rejected, call it with false. Again, there may be more than one argument for the then() handler:
	 *         promise(true, [6, 6, 6]);
	 *         
	 * You can obtain the promise's current state by calling the function without arguments. It will be true if fulfilled,
	 * false if rejected, and otherwise undefined.
	 * 		   var state = promise(); 
	 * 
	 * https://github.com/timjansen/PinkySwear.js
	 */
	(function(target) {
		var undef;

		function isFunction(f) {
			return typeof f == 'function';
		}
		function isObject(f) {
			return typeof f == 'object';
		}
		function defer(callback) {
			if (typeof setImmediate != 'undefined')
				setImmediate(callback);
			else if (typeof process != 'undefined' && process['nextTick'])
				process['nextTick'](callback);
			else
				setTimeout(callback, 0);
		}

		target[0][target[1]] = function pinkySwear(extend) {
			var state;           // undefined/null = pending, true = fulfilled, false = rejected
			var values = [];     // an array of values as arguments for the then() handlers
			var deferred = [];   // functions to call when set() is invoked

			var set = function(newState, newValues) {
				if (state == null && newState != null) {
					state = newState;
					values = newValues;
					if (deferred.length)
						defer(function() {
							for (var i = 0; i < deferred.length; i++)
								deferred[i]();
						});
				}
				return state;
			};

			set['then'] = function (onFulfilled, onRejected) {
				var promise2 = pinkySwear(extend);
				var callCallbacks = function() {
		    		try {
		    			var f = (state ? onFulfilled : onRejected);
		    			if (isFunction(f)) {
			   				function resolve(x) {
							    var then, cbCalled = 0;
			   					try {
					   				if (x && (isObject(x) || isFunction(x)) && isFunction(then = x['then'])) {
											if (x === promise2)
												throw new TypeError();
											then['call'](x,
												function() { if (!cbCalled++) resolve.apply(undef,arguments); } ,
												function(value){ if (!cbCalled++) promise2(false,[value]);});
					   				}
					   				else
					   					promise2(true, arguments);
			   					}
			   					catch(e) {
			   						if (!cbCalled++)
			   							promise2(false, [e]);
			   					}
			   				}
			   				resolve(f.apply(undef, values || []));
			   			}
			   			else
			   				promise2(state, values);
					}
					catch (e) {
						promise2(false, [e]);
					}
				};
				if (state != null)
					defer(callCallbacks);
				else
					deferred.push(callCallbacks);
				return promise2;
			};
	        if(extend){
	            set = extend(set);
	        }
			return set;
		};
	})( false ? [window, 'pinkySwear'] : [module, 'exports']);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module), __webpack_require__(10).setImmediate, __webpack_require__(11)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(11).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate, __webpack_require__(10).clearImmediate))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
	 */
	/*global define */
	(function (global) {
	    'use strict';

	    var param = function (a) {
	        var add = function (s, k, v) {
	            v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
	            s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
	        }, buildParams = function (prefix, obj, s) {
	            var i, len, key;

	            if (Object.prototype.toString.call(obj) === '[object Array]') {
	                for (i = 0, len = obj.length; i < len; i++) {
	                    buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i], s);
	                }
	            } else if (obj && obj.toString() === '[object Object]') {
	                for (key in obj) {
	                    if (obj.hasOwnProperty(key)) {
	                        if (prefix) {
	                            buildParams(prefix + '[' + key + ']', obj[key], s, add);
	                        } else {
	                            buildParams(key, obj[key], s, add);
	                        }
	                    }
	                }
	            } else if (prefix) {
	                add(s, prefix, obj);
	            } else {
	                for (key in obj) {
	                    add(s, key, obj[key]);
	                }
	            }
	            return s;
	        };
	        return buildParams('', a, []).join('&').replace(/%20/g, '+');
	    };

	    if (typeof module === 'object' && typeof module.exports === 'object') {
	        module.exports = param;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return param;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        global.param = param;
	    }

	}(this));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(14);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(16);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(19);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(20);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(21);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(15);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);

	    return function unsubscribe() {
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(14);

	var _utilsIsPlainObject = __webpack_require__(15);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsMapValues = __webpack_require__(17);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(18);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_utilsIsPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */

	function combineReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var newState = reducer(state[key], action);
	      if (typeof newState === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      return newState;
	    });

	    if (true) {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return finalState;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(17);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    // eslint-disable-line no-eq-null
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(21);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;

	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string} options.level - console[level]
	 * @property {object} options.logger - implementation of the `console` API.
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {bool} options.duration - print duration of each action?
	 * @property {bool} options.timestamp - print timestamp with each action?
	 * @property {function} options.transformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        var level = options.level;
	        var logger = options.logger;
	        var collapsed = options.collapsed;
	        var predicate = options.predicate;
	        var _options$duration = options.duration;
	        var duration = _options$duration === undefined ? false : _options$duration;
	        var _options$timestamp = options.timestamp;
	        var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	        var _options$transformer = options.transformer;
	        var transformer = _options$transformer === undefined ? function (state) {
	          return state;
	        } : _options$transformer;
	        var _options$actionTransformer = options.actionTransformer;
	        var actionTransformer = _options$actionTransformer === undefined ? function (actn) {
	          return actn;
	        } : _options$actionTransformer;

	        var console = logger || window.console;

	        // exit if console undefined
	        if (typeof console === "undefined") {
	          return next(action);
	        }

	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        var started = timer.now();
	        var prevState = transformer(getState());

	        var returnValue = next(action);
	        var took = timer.now() - started;

	        var nextState = transformer(getState());

	        // formatters
	        var time = new Date();
	        var isCollapsed = typeof collapsed === "function" ? collapsed(getState, action) : collapsed;

	        var formattedTime = timestamp ? " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3) : "";
	        var formattedDuration = duration ? " in " + took.toFixed(2) + " ms" : "";
	        var formattedAction = actionTransformer(action);
	        var message = "action " + formattedAction.type + formattedTime + formattedDuration;
	        var startMessage = isCollapsed ? console.groupCollapsed : console.group;

	        // render
	        try {
	          startMessage.call(console, message);
	        } catch (e) {
	          console.log(message);
	        }

	        if (level) {
	          console[level]("%c prev state", "color: #9E9E9E; font-weight: bold", prevState);
	          console[level]("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
	          console[level]("%c next state", "color: #4CAF50; font-weight: bold", nextState);
	        } else {
	          console.log("%c prev state", "color: #9E9E9E; font-weight: bold", prevState);
	          console.log("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
	          console.log("%c next state", "color: #4CAF50; font-weight: bold", nextState);
	        }

	        try {
	          console.groupEnd();
	        } catch (e) {
	          console.log("—— log end ——");
	        }

	        return returnValue;
	      };
	    };
	  };
	}

	exports["default"] = createLogger;
	module.exports = exports["default"];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var uuid = __webpack_require__(25).uuid;
	var storage = __webpack_require__(3);
	var actions = __webpack_require__(2);

	var setCustomerId = actions.setCustomerId;
	var sendCustomerEmail = actions.sendCustomerEmail;
	var setCustomerEmail = actions.setCustomerEmail;

	module.exports = function(state) {

	  /**
	   * Creates a new user in storage
	   * @method create
	   * @return {Function} Action creator
	   */
	  function create() {
	    state.dispatch(setCustomerId(uuid()));
	  }

	  /**
	   * Adds an email address to our customer in storage
	   * @method email
	   * @param  {String} email The email we want to add to storage
	   * @return {Function} Action creators
	   */
	  function email(email) {
	    var currentState = state.getState();
	    var data = {
	      email: email,
	      customer: currentState.customer_id,
	      api_key: currentState.api_key,
	    };

	    state.dispatch(setCustomerEmail(email));
	    state.dispatch(sendCustomerEmail(data));
	  }

	  /**
	   * Loads user data from storage
	   * @method load
	   * @return {Function} Action creators
	   */
	  function load() {
	    state.dispatch(setCustomerId(storage.get('ra_customer_id')));

	    if (storage.has('ra_customer_email')) {
	      // do we also need to send the email address as well?
	      state.dispatch(setCustomerEmail(storage.get('ra_customer_email')));
	    }
	  }

	  return Object.create({
	    create: create,
	    email: email,
	    load: load
	  });
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    function( callback ){
	      window.setTimeout(callback, 1000 / 60);
	    };
	})();

	/**
	 * Tries to return the exact IE version number to us
	 * @method ieVersion
	 * @return {Integer} The IE version number or -1;
	 */
	exports.ieVersion = function ieVersion() {
	  var version = -1; // Return value assumes failure.
	  var ua = navigator.userAgent;

	  if (navigator.appName == 'Microsoft Internet Explorer') {
	    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	    if (re.exec(ua) != null) {
	      version = parseFloat( RegExp.$1 );
	    }
	  } else if (navigator.appName == 'Netscape') {
	    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
	    if (re.exec(ua) != null) {
	      version = parseFloat( RegExp.$1 );
	    }
	  }

	  return version;
	}

	/**
	 * IE detection
	 * @source https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
	 * @method ie
	 * @return {Boolean} If browser is IE
	 */
	exports.ie = function ie() {
	  return ieVersion() > -1;
	}

	/**
	 * Gives us the vendor prefixed transition event name
	 * @source Modernizr
	 * @method transitionEvent
	 * @return {String} Vendor prefixed event name
	 */
	exports.transitionEvent = function transitionEvent() {
	  var t;
	  var el = document.createElement('fakeelement');
	  var transitions = {
	    'transition':'transitionend',
	    'OTransition':'oTransitionEnd',
	    'MozTransition':'transitionend',
	    'WebkitTransition':'webkitTransitionEnd'
	  }

	  for(t in transitions){
	    if( el.style[t] !== undefined ){
	      return transitions[t];
	    }
	  }
	}

	/**
	 * Generates a UUID for our customer
	 * @method uuid
	 * @return {String} Randomly generated UUID
	 */
	exports.uuid = function uuid() {
	  return('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/1|0/g, function() {
	    return(0 | Math.random() * 16).toString(16);
	  });
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var resetCollector = __webpack_require__(2).resetCollector;
	var sendCollectorClose = __webpack_require__(2).sendCollectorClose;
	var css = __webpack_require__(27);
	var utils = __webpack_require__(25);

	var ie = utils.ie();

	module.exports = function(state) {

	  /**
	   * Removes collector iframe and close button from DOM
	   * @method removeCollector
	   */
	  function removeCollector(logClose) {
	    var iframe = document.getElementById('recapture-collector');

	    var url = iframe.src + '/close';

	    if (ie) {
	      iframe.src = '';
	      iframe.parentNode.removeChild(iframe);
	    } else {
	      var transitionEvent = utils.transitionEvent();

	      css(iframe, 'opacity', '0');

	      iframe.addEventListener(transitionEvent, function() {
	        iframe.parentNode.removeChild(iframe);
	      }, false);
	    }

	    if (logClose){

	    state.dispatch(sendCollectorClose(url));

	    }

	  }

	  /**
	   * Sets up our iframe load event and our subscribe / close button listeners
	   * @method initializeIframe
	   * @param  {Oject} iframe The iframe DOM node
	   */
	  function initializeIframe(iframe) {
	    window.addEventListener('message', function(e) {
	      switch (e.data) {
	        case 'recapture::init':
	          css(iframe, 'display', 'block');

	          if (!ie) {
	            requestAnimFrame(function() {
	              css(iframe, 'opacity', 1);
	            });
	          }
	          break;

	        case 'recapture::close':
	          removeCollector(true);
	          break;

	        case 'recapture::submit':
	          removeCollector();
	          break;

	        default:
	          return;
	      }
	    });
	  }

	  /**
	   * Inject the iframe into the DOM
	   * @method injectIframe
	   * @param  {String} src The src to our collector html
	   * @return {Object} Our inject iframe DOM node
	   */
	  function injectIframe(src) {
	    var iframe = document.createElement('iframe');

	    iframe.src = src;
	    iframe.id = 'recapture-collector';
	    iframe.width = '100%';
	    iframe.height = '100%';

	    var styles = {
	      position: 'fixed',
	      top: 0,
	      left: 0,
	      bottom: 0,
	      right: 0,
	      border: 'none',
	      display: 'none',
	      zIndex: 999
	    };

	    if (!ie) {
	      styles.opacity = '0';
	      styles.transition = 'opacity 400ms cubic-bezier(.25,.8,.25,1)';
	    }

	    css(iframe, styles);

	    document.body.appendChild(iframe);

	    return iframe;
	  }

	  /**
	   * Subscribe to our global state change and inject collector if we have one
	   */
	  state.subscribe(function() {
	    var currentState = state.getState();

	    if (currentState.collector) {
	      initializeIframe(injectIframe(currentState.collector));
	      state.dispatch(resetCollector());
	    }
	  });

	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var prefix = __webpack_require__(28)
	var toCamelCase = __webpack_require__(29)
	var cache = { 'float': 'cssFloat' }

	var suffixMap = {}
	;['top','right','bottom','left',
	    'width','height','fontSize',
	    'paddingLeft','paddingRight',
	    'paddingTop','paddingBottom',
	    'marginLeft','marginRight',
	    'marginTop','marginBottom',
	    'padding','margin','perspective'
	].forEach(function(prop) {
	    suffixMap[prop] = 'px'
	})

	function style(element, property, value) {
	    var camel = cache[property]
	    if (typeof camel === 'undefined')
	        camel = detect(property)

	    //may be false if CSS prop is unsupported
	    if (camel) {
	        if (value === undefined)
	            return element.style[camel]

	        if (typeof value === 'number')
	            value = value + (suffixMap[camel]||'')
	        element.style[camel] = value
	    }
	}

	function each(element, properties) {
	    for (var k in properties) {
	        if (properties.hasOwnProperty(k)) {
	            style(element, k, properties[k])
	        }
	    }
	}

	function detect(cssProp) {
	    var camel = toCamelCase(cssProp)
	    var result = prefix(camel)
	    cache[camel] = cache[cssProp] = cache[result] = result
	    return result
	}

	function set() {
	    if (arguments.length === 2) {
	        each(arguments[0], arguments[1])
	    } else
	        style(arguments[0], arguments[1], arguments[2])
	}

	module.exports = set
	module.exports.set = set

	module.exports.get = function(element, properties) {
	    if (Array.isArray(properties))
	        return properties.reduce(function(obj, prop) {
	            obj[prop] = style(element, prop||'')
	            return obj
	        }, {})
	    else
	        return style(element, properties||'')
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	var elem = null

	//https://gist.github.com/paulirish/523692
	module.exports = function prefix(prop) {
	    var prefixes = ['Moz', 'Khtml', 'Webkit', 'O', 'ms'],
	        upper = prop.charAt(0).toUpperCase() + prop.slice(1)
	    
	    if (!elem)
	        elem = document.createElement('div')

	    if (prop in elem.style)
	        return prop

	    for (var len = prefixes.length; len--;) {
	        if ((prefixes[len] + upper) in elem.style)
	            return (prefixes[len] + upper)
	    }
	    return false
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	var toSpace = __webpack_require__(30);


	/**
	 * Expose `toCamelCase`.
	 */

	module.exports = toCamelCase;


	/**
	 * Convert a `string` to camel case.
	 *
	 * @param {String} string
	 * @return {String}
	 */


	function toCamelCase (string) {
	  return toSpace(string).replace(/\s(\w)/g, function (matches, letter) {
	    return letter.toUpperCase();
	  });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	
	var clean = __webpack_require__(31);


	/**
	 * Expose `toSpaceCase`.
	 */

	module.exports = toSpaceCase;


	/**
	 * Convert a `string` to space case.
	 *
	 * @param {String} string
	 * @return {String}
	 */


	function toSpaceCase (string) {
	  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
	    return match ? ' ' + match : '';
	  });
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	
	/**
	 * Expose `toNoCase`.
	 */

	module.exports = toNoCase;


	/**
	 * Test whether a string is camel-case.
	 */

	var hasSpace = /\s/;
	var hasCamel = /[a-z][A-Z]/;
	var hasSeparator = /[\W_]/;


	/**
	 * Remove any starting case from a `string`, like camel or snake, but keep
	 * spaces and punctuation that may be important otherwise.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function toNoCase (string) {
	  if (hasSpace.test(string)) return string.toLowerCase();

	  if (hasSeparator.test(string)) string = unseparate(string);
	  if (hasCamel.test(string)) string = uncamelize(string);
	  return string.toLowerCase();
	}


	/**
	 * Separator splitter.
	 */

	var separatorSplitter = /[\W_]+(.|$)/g;


	/**
	 * Un-separate a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function unseparate (string) {
	  return string.replace(separatorSplitter, function (m, next) {
	    return next ? ' ' + next : '';
	  });
	}


	/**
	 * Camelcase splitter.
	 */

	var camelSplitter = /(.)([A-Z]+)/g;


	/**
	 * Un-camelcase a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function uncamelize (string) {
	  return string.replace(camelSplitter, function (m, previous, uppers) {
	    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
	  });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(3);
	var actions = __webpack_require__(2);

	var setApiKey = actions.setApiKey;

	module.exports = function(state, customer) {
	  var currentState = state.getState();

	  return function(apiKey) {
	    state.dispatch(setApiKey(apiKey));

	    storage.has('ra_customer_id') ?
	      customer.load() :
	      customer.create();
	  }
	}


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var sendPage = __webpack_require__(2).sendPage;

	/**
	 * Get page data for the current page
	 * @method getPageData
	 * @return {Object} Parsed url data
	 */
	function getPageData() {
	  var parser = document.createElement('a');
	  parser.href = window.location.href;

	  return {
	    url: parser.href,
	    //hostname: parser.hostname || window.location.hostname, // ie fix
	    //path: parser.pathname,
	    //hash: parser.hash,
	    //query: parser.search,
	    //referrer: document.referrer,
	    title: document.title
	  };
	}

	module.exports = function(state) {
	  var currentState = state.getState();
	  var data = getPageData();

	  return function() {
	    data.customer = currentState.customer_id;
	    data.api_key = currentState.api_key;

	    state.dispatch(sendPage(data));
	  };
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var sendProduct = __webpack_require__(2).sendProduct;

	module.exports = function(state) {
	  var currentState = state.getState();

	  return function(productData) {
	    productData.customer = currentState.customer_id;
	    productData.api_key = currentState.api_key;

	    state.dispatch(sendProduct(productData));
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isEmail = __webpack_require__(36);
	var actions = __webpack_require__(2);

	var setCartId = actions.setCartId;

	module.exports = function(state, customer) {

	  var timers = [];
	  var inputs = document.getElementsByTagName('input');

	  /**
	   * Attach keyup listener to all inputs on page
	   * @method attachListeners
	   */
	  function attachListeners() {
	    if (inputs && inputs.length) {
	      for (var i = 0, len = inputs.length; i < len; i++) {

	        // check to see if input already has a value prefilled
	        if (inputs[i].value && checkIsEmail(inputs[i].value)) {
	          setEmail(inputs[i].value);
	        }

	        inputs[i].addEventListener('keyup', waitForTyping, false);
	        timers.push(0);
	      }
	    }
	  }

	  /**
	   * Event callback for keyp event to put email check in queue
	   * @method waitForTyping
	   * @param  {Object} e Event object
	   */
	  function waitForTyping(e) {
	    var value = e.target.value;

	    for (var i = 0, len = inputs.length; i < len;   i++) {
	      if (inputs[i] === e.target) {
	        clearTimeout(timers[i]);

	        timers[i] = setTimeout(function() {
	          if (checkIsEmail(value)) {
	            setEmail(value);
	          }
	        }, 2000);
	      }
	    }
	  }

	  /**
	   * Conditional check to see if we are recieving a valid email address
	   * @method checkIsEmail
	   * @param  {String} value An email address value
	   * @return {Boolean} Whether our value is an email address or not
	   */
	  function checkIsEmail(value) {
	    return value && isEmail(value);
	  }

	  /**
	   * Set customer email address
	   * @method setEmail
	   * @param  {String} email The email address we want to set
	   */
	  function setEmail(email) {
	    customer.email(email);
	  }

	  return function() {
	    attachListeners();
	  }
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(emailString) {
	  var check, regExp;
	  regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
	  return check = regExp.test(emailString);
	};


/***/ }
/******/ ]);