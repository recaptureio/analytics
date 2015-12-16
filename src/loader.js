(function(root, doc) {
  var compatible = root.ra_compatible || true;

  if (compatible) {
    root.ra = function() {
      root.ra.q.push([].slice.call(arguments));
    };

    root.ra.q = [];

    var script = doc.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = '//cdn.recapture.io/v1/recapture.min.js';

    doc.body.appendChild(script);
  }
})(window, document);
