/*! Recapture.io SDK v1.4.4 | MIT & BSD */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ra"] = factory();
	else
		root["ra"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	var EventEmitter = __webpack_require__(1);
	var ee = new EventEmitter();

	// an event queue specifically for Recapture
	ee.raEmitQueue = {};

	var state = __webpack_require__(2);
	var customer = __webpack_require__(19)(state);
	var collector = __webpack_require__(22)(state, ee);
	var init = __webpack_require__(29)(state, ee, customer);
	var page = __webpack_require__(30)(state, ee);
	var product = __webpack_require__(31)(state, ee);
	var email = __webpack_require__(32)(state, ee, customer);

	var root = window;
	var libName = 'ra';
	var queue = root[libName] ? root[libName].q : [];

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
	    email: email,
	    state: state,
	    on: function(eventName, callback) {
	      // in 99% of cases this will fire since a user cannot 100% of the time
	      // setup event listeners before the events are emitted
	      if (ee.raEmitQueue[eventName]) {
	        return callback.call(ee, ee.raEmitQueue[eventName]);
	      }

	      return ee.on.call(ee, eventName, callback);
	    },
	  });

	  // run through our queue and apply methods as needed
	  if (queue.length) {
	    queue.forEach(function(q) {
	      var method = q.shift();
	      var args = q.shift();

	      if (obj[method]) {
	        if (method === 'on') {
	          obj[method].apply(ee, args);
	        } else {
	          obj[method].apply(obj, args);
	        }
	      }
	    });
	  }

	  return obj;
	}

	var instance = create();

	// keep signature but dont use queue
	root[libName] = function() {
	  var q = [].slice.call(arguments);
	  var method = q.shift();
	  var args = q.shift();

	  if (instance[method]) {
	    if (method === 'on') {
	      instance[method].apply(ee, args);
	    } else {
	      instance[method].apply(instance, args);
	    }
	  }

	  // expose ra prototype
	  return instance;
	};

	module.exports = root[libName];


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.EventEmitter=t():e.EventEmitter=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){var t,n;if(e&&e.__esModule)return e;if(t={},null!=e)for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s,o,u,f;Object.defineProperty(t,"__esModule",{value:!0}),s=function(){function e(e,t){var n,r;for(n=0;n<t.length;n++)r=t[n],r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(1),u=r(o),f=function(){function e(){i(this,e),this.listeners={},this.maxListeners=10}return s(e,[{key:"setMaxListeners",value:function(e){this.maxListeners=e}},{key:"getMaxListeners",value:function(){return this.maxListeners}},{key:"getAllListeners",value:function(){var e=void 0===arguments[0]?null:arguments[0];return e?this.listeners[e]||[]:this.listeners}},{key:"on",value:function(e,t){if(!u.isFunction(t))throw new TypeError("Listener must be a function");this.listeners[e]||(this.listeners[e]=[]);var n=this.listeners[e];n.push(t),n.length>this.maxListeners}},{key:"once",value:function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}if(!u.isFunction(t))throw new TypeError("Listener must be a function");this.on(e,n)}},{key:"off",value:function(e,t){var n,r,i,s;if(!u.isFunction(t))throw new TypeError("Listener must be a function");if(this.listeners[e])if(n=this.listeners[e],r=n.length,i=-1,1===r)this.listeners[e]=[];else{for(s=0;r>s;s++)if(n[s]===t){i=s;break}if(0>i)return;u.spliceOne(n,i)}}},{key:"emit",value:function(e){var t,n,r,i,s,o;if(this.listeners[e]){for(t=this.listeners[e],n=t.length,r=arguments.length,i=Array(r>1?r-1:0),s=1;r>s;s++)i[s-1]=arguments[s];if(1===n)t[0].apply(this,i);else for(o=0;n>o;o++)t[o].apply(this,i)}}}]),e}(),t.default=f,e.exports=t.default},function(e,t){"use strict";function n(e){return"[object Function]"===Object.prototype.toString.call(e)}function r(e,t){for(var n=t,r=n+1,i=e.length;i>r;n+=1,r+=1)e[n]=e[r];e.pop()}Object.defineProperty(t,"__esModule",{value:!0}),t.isFunction=n,t.spliceOne=r}])});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var actions = __webpack_require__(3);
	var redux = __webpack_require__(8);
	var thunk = __webpack_require__(17);
	var createLogger = __webpack_require__(18);

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(4);
	var request = __webpack_require__(7);

	function sendRequest(endpoint, data, callback) {
	  var baseURL =  false ?
	    'https://www.recapture.io/beacon/' :
	    'http://localhost:4000/beacon/';

	  request(baseURL + endpoint, data, callback);
	}

	function errorMsg(err) {
	  var msg = 'It looks like Recapture.io ran into an issue. Error message:';
	  return msg + '"' + err.message + '"';
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
	    sendRequest('email', data, function(err, response) {
	      if (err) {
	        console.log(errorMsg(err));
	        dispatch({ type: SEND_CUSTOMER_EMAIL, payload: {}});
	      } else {
	        dispatch({
	          type: SEND_CUSTOMER_EMAIL,
	          payload: response
	        });
	      }
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
	    sendRequest('product', data, function(err, response) {
	      if (err) {
	        console.log(errorMsg(err));
	        dispatch({ type: SEND_PRODUCT, payload: {}});
	      } else {
	        dispatch({
	          type: SEND_PRODUCT,
	          payload: response
	        });
	      }
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
	    sendRequest('page', data, function(err, response) {
	      if (err) {
	        console.log(errorMsg(err));
	        dispatch({ type: SEND_PAGE, payload: {}});
	      } else {
	        dispatch({
	          type: SEND_PAGE,
	          payload: response
	        });
	      }
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
	    request(url, function(err, response) {
	      if (err) {
	        console.log(errorMsg(err));
	        dispatch({ type: SEND_COLLECTOR_CLOSE, payload: {}});
	      } else {
	        dispatch({
	          type: SEND_COLLECTOR_CLOSE,
	          payload: response
	        });
	      }
	    })
	  };
	};


	/**
	 * Send collector close data to recapture
	 */
	var SEND_COLLECTOR_OPEN = 'SEND_COLLECTOR_OPEN';
	exports.SEND_COLLECTOR_OPEN = SEND_COLLECTOR_OPEN;
	exports.sendCollectorOpen = function(url) {
	  if (!url) return;
	  return function(dispatch) {
	    request(url, function(err, response) {
	      if (err) {
	        console.log(errorMsg(err));
	        dispatch({ type: SEND_COLLECTOR_OPEN, payload: {}});
	      } else {
	        dispatch({
	          type: SEND_COLLECTOR_OPEN,
	          payload: response
	        });
	      }
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(5);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {"use strict"
	// Module export pattern from
	// https://github.com/umdjs/umd/blob/master/returnExports.js
	;(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.store = factory();
	  }
	}(this, function () {
		
		// Store.js
		var store = {},
			win = (typeof window != 'undefined' ? window : global),
			doc = win.document,
			localStorageName = 'localStorage',
			scriptTag = 'script',
			storage

		store.disabled = false
		store.version = '1.3.20'
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
		} else if (doc && doc.documentElement.addBehavior) {
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
			var ieKeyFix = function(key) {
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
				for (var i=attributes.length-1; i>=0; i--) {
					storage.removeAttribute(attributes[i].name)
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
		
		return store
	}));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

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

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(n,e){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&module.exports?module.exports=e():n.jsonp=e()}(this,function(){function n(n){n=n||5;for(var e="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=o.length,r=0;n>r;r++)e+=o.charAt(Math.floor(Math.random()*t));return e}function e(n){var e="[object Function]",o=Object.prototype.toString;return o.call(n)==e}function o(n,e){var o=a.getElementsByTagName("head")[0],t=a.createElement("script");return t.src=n,t.async=!0,t.defer=!0,o.appendChild(t),t}function t(e){return e+"__"+n()}function r(n,e,o,t){var r=-1===n.indexOf("?")?"?":"&";for(var u in e)e.hasOwnProperty(u)&&(r+=encodeURIComponent(u)+"="+encodeURIComponent(e[u])+"&");return n+r+o+"="+t}function u(n){clearTimeout(n),n=null}function i(n,i,a,f){e(i)&&(f=i,i={},a={}),e(a)&&(f=a,a={});var l=a.timeout||15e3,d=a.prefix||"__jsonp",p=a.param||"callback",m=a.name||t(d),s=r(n,i,p,m),h=setTimeout(function(){f(new Error("jsonp request for "+m+" timed out."),null),u(h)},l);c[m]=function(n){f(null,n),u(h),c[m]=null};var j=o(s);j.onerror=function(){f(new Error("jsonp encountered an error while loading injected script."),null),u(h)}}var c=window,a=document;return i});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(9);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(11);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(14);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(15);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(16);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(10);

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
	    var isSubscribed = true;

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;
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
/* 10 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};
	var objStringValue = fnToString(Object);

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

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === objStringValue;
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(9);

	var _isPlainObject = __webpack_require__(10);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(12);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _pick = __webpack_require__(13);

	var _pick2 = _interopRequireDefault(_pick);

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

	  if (!_isPlainObject2['default'](inputState)) {
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
	  var finalReducers = _pick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _mapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var hasChanged = false;
	    var finalState = _mapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });

	    if (true) {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mapValues = __webpack_require__(12);

	var _mapValues2 = _interopRequireDefault(_mapValues);

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
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _mapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(16);

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
/* 16 */
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
/* 17 */
/***/ function(module, exports) {

	'use strict';

	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}

	module.exports = thunkMiddleware;

/***/ },
/* 18 */
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
	var formatTime = function formatTime(time) {
	  return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        var _options$level = options.level;
	        var level = _options$level === undefined ? "log" : _options$level;
	        var _options$logger = options.logger;
	        var logger = _options$logger === undefined ? window.console : _options$logger;
	        var _options$logErrors = options.logErrors;
	        var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	        var collapsed = options.collapsed;
	        var predicate = options.predicate;
	        var _options$duration = options.duration;
	        var duration = _options$duration === undefined ? false : _options$duration;
	        var _options$timestamp = options.timestamp;
	        var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	        var transformer = options.transformer;
	        var _options$stateTransfo = options.stateTransformer;
	        var // deprecated
	        stateTransformer = _options$stateTransfo === undefined ? function (state) {
	          return state;
	        } : _options$stateTransfo;
	        var _options$actionTransf = options.actionTransformer;
	        var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	          return actn;
	        } : _options$actionTransf;
	        var _options$errorTransfo = options.errorTransformer;
	        var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	          return error;
	        } : _options$errorTransfo;
	        var _options$colors = options.colors;
	        var colors = _options$colors === undefined ? {
	          title: function title() {
	            return "#000000";
	          },
	          prevState: function prevState() {
	            return "#9E9E9E";
	          },
	          action: function action() {
	            return "#03A9F4";
	          },
	          nextState: function nextState() {
	            return "#4CAF50";
	          },
	          error: function error() {
	            return "#F20404";
	          }
	        } : _options$colors;

	        // exit if console undefined

	        if (typeof logger === "undefined") {
	          return next(action);
	        }

	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        if (transformer) {
	          console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	        }

	        var started = timer.now();
	        var prevState = stateTransformer(getState());

	        var formattedAction = actionTransformer(action);
	        var returnedValue = undefined;
	        var error = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }

	        var took = timer.now() - started;
	        var nextState = stateTransformer(getState());

	        // message
	        var time = new Date();
	        var isCollapsed = typeof collapsed === "function" ? collapsed(getState, action) : collapsed;

	        var formattedTime = formatTime(time);
	        var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	        var title = "action " + formattedAction.type + (timestamp ? formattedTime : "") + (duration ? " in " + took.toFixed(2) + " ms" : "");

	        // render
	        try {
	          if (isCollapsed) {
	            if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	          } else {
	            if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	          }
	        } catch (e) {
	          logger.log(title);
	        }

	        if (colors.prevState) logger[level]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[level]("prev state", prevState);

	        if (colors.action) logger[level]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[level]("action", formattedAction);

	        if (error) {
	          if (colors.error) logger[level]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[level]("error", error);
	        } else {
	          if (colors.nextState) logger[level]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[level]("next state", nextState);
	        }

	        try {
	          logger.groupEnd();
	        } catch (e) {
	          logger.log("—— log end ——");
	        }

	        if (error) throw error;
	        return returnedValue;
	      };
	    };
	  };
	}

	exports.default = createLogger;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var uuid = __webpack_require__(20);
	var storage = __webpack_require__(4);
	var actions = __webpack_require__(3);

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
	    state.dispatch(setCustomerId(state.getState().api_key + '__' + uuid.v4()));
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(21);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var css = __webpack_require__(23);
	var utils = __webpack_require__(28);
	var actions = __webpack_require__(3);
	var resetCollector = actions.resetCollector;
	var sendCollectorClose = actions.sendCollectorClose;
	var sendCollectorOpen = actions.sendCollectorOpen;

	var ie = utils.ie();

	module.exports = function(state, ee) {

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

	    if (logClose) {
	      state.dispatch(sendCollectorClose(url));
	    }
	  }

	  /**
	   * Removes collector iframe and close button from DOM
	   * @method removeCollector
	   */
	  function showCollector() {
	    var iframe = document.getElementById('recapture-collector');
	    var url = iframe.src + '/show';

	    css(iframe, 'display', 'block');

	    if (!ie) {
	      requestAnimFrame(function() {
	        css(iframe, 'opacity', 1);
	      });
	    }

	    state.dispatch(sendCollectorOpen(url));
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
	          ee.raEmitQueue['ra.events.collector.show'] = null; // add to emit queue
	          ee.emit('ra.events.collector.show');
	          showCollector();
	          break;

	        case 'recapture::close':
	          ee.raEmitQueue['ra.events.collector.close'] = null; // add to emit queue
	          ee.emit('ra.events.collector.close');
	          removeCollector(true);
	          break;

	        case 'recapture::submit':
	          ee.raEmitQueue['ra.events.collector.submit'] = null; // add to emit queue
	          ee.emit('ra.events.collector.submit');
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var prefix = __webpack_require__(24)
	var toCamelCase = __webpack_require__(25)
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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	var toSpace = __webpack_require__(26);


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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
	var clean = __webpack_require__(27);


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
/* 27 */
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
/* 28 */
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
	};

	/**
	 * IE detection
	 * @source https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
	 * @method ie
	 * @return {Boolean} If browser is IE
	 */
	exports.ie = function ie() {
	  return exports.ieVersion() > -1;
	};

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
	};

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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(4);
	var actions = __webpack_require__(3);

	var setApiKey = actions.setApiKey;

	module.exports = function(state, ee, customer) {
	  var currentState = state.getState();

	  return function(apiKey) {
	    ee.raEmitQueue['ra.events.init'] = null; // add to emit queue
	    ee.emit('ra.events.init');
	    state.dispatch(setApiKey(apiKey));
	    storage.has('ra_customer_id') ? customer.load() : customer.create();
	  }
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var sendPage = __webpack_require__(3).sendPage;

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
	    title: document.title
	  };
	}

	module.exports = function(state, ee) {
	  var currentState = state.getState();
	  var data = getPageData();

	  return function() {
	    data.customer = currentState.customer_id;
	    data.api_key = currentState.api_key;

	    ee.raEmitQueue['ra.events.page'] = data; // add to emit queue
	    ee.emit('ra.events.page', data);
	    state.dispatch(sendPage(data));
	  };
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var sendProduct = __webpack_require__(3).sendProduct;

	module.exports = function(state, ee) {
	  var currentState = state.getState();

	  return function(productData) {
	    productData.customer = currentState.customer_id;
	    productData.api_key = currentState.api_key;
	    productData.url = window.location.href;
	    productData.title = document.title;

	    ee.raEmitQueue['ra.events.product'] = productData; // add to emit queue
	    ee.emit('ra.events.product', productData);
	    state.dispatch(sendProduct(productData));
	  }
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isEmail = __webpack_require__(33);
	var actions = __webpack_require__(3);

	var setCartId = actions.setCartId;

	module.exports = function(state, ee, customer) {
	  var timer = null;
	  var inputs = document.getElementsByTagName('input');
	  var inputsLength = inputs.length;

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
	   * Event callback for keyp event to put email check in queue
	   * @method waitForTyping
	   * @param  {Object} e Event object
	   */
	  function waitForTyping(e) {
	    var target = e.target;
	    var value = target.value;

	    if (target.tagName !== 'INPUT') {
	      return;
	    }

	    clearTimeout(timer);

	    timer = setTimeout(function() {
	      if (checkIsEmail(value)) {
	        setEmail(value);
	      }
	    }, 2000);
	  }

	  /**
	   * Set customer email address
	   * @method setEmail
	   * @param  {String} email The email address we want to set
	   */
	  function setEmail(email) {
	    customer.email(email);
	  }

	  /**
	   * Attach keyup listener to all inputs on page
	   * @method attachListeners
	   */
	  function attachListeners() {
	    document.addEventListener('keyup', waitForTyping, false);

	    if (inputsLength) {
	      for (var i = 0; i < inputsLength; i++) {

	        // check to see if input already has a value prefilled
	        if (inputs[i].value && checkIsEmail(inputs[i].value)) {
	          setEmail(inputs[i].value);
	        }
	      }
	    }
	  }

	  return function emailMethod(email) {
	    if (email) {
	      setEmail(email);
	    }

	    attachListeners();
	  };
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(emailString) {
	  var check, regExp;
	  regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
	  return check = regExp.test(emailString);
	};


/***/ }
/******/ ])
});
;