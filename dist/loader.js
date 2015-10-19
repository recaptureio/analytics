/*! Recapture.io v1.0.0 | MIT & BSD */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/***/ function(module, exports) {

	(function(root, doc, url, libName, scriptElement, firstScript) {
	  var scriptStr = 'script';

	  /**
	   * Stub global window object until library is loaded
	   * @type {Object|Function}
	   */
	  root[libName] = root[libName] || (root[libName] = function() {
	    // non leaky args proxy
	    // see: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
	    var args = new Array(arguments.length);

	    for (var i=0; i < args.length; ++i) {
	      args[i] = arguments[i];
	    }

	    // generate a function queue on our stub object
	    (root[libName].q = root[libName].q || []).push(args);
	  });

	  // create script element
	  scriptElement = doc.createElement(scriptStr);
	  scriptElement.async = true;
	  scriptElement.src = url;

	  // add script to top of page
	  firstScript = doc.getElementsByTagName(scriptStr)[0];
	  firstScript.parentNode.insertBefore(scriptElement, firstScript);
	})(window, document, '../dist/ra.min.js', 'ra');


/***/ }
/******/ ])
});
;