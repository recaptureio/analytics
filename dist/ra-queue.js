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

    //script.src = '../dist/ra.js';
    script.src = '//local.dev:81/recapture-analytics/dist/ra.js';

    doc.body.appendChild(script);
  }
})(window, document);
