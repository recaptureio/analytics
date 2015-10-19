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
