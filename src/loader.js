window.ra = function() {
  window.ra.q.push([].slice.call(arguments));
};

window.ra.q = [];

(function(root, doc) {
   var ua = window.navigator.userAgent;
   var ieUA = ua.indexOf('MSIE ');
   var ie8 = false;

   if (ieUA > 0) {
     ie8 = parseInt(ua.substring(ieUA + 5, ua.indexOf('.', ieUA)), 10) <= 8;
   }

  if (!ie8) {
    var script = doc.createElement('script');
    script.type = 'text/javascript';
    script.async = true;

    //append a timestamp that changes every 10 minutes
    script.src = '//cdn.recapture.io/sdk/v1/ra.min.js?v=' + Math.round(Date.now() / 1000 / (60 * 10));

    doc.body.appendChild(script);
  }
})(window, document);
