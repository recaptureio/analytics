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
 * IE detection
 * @source https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
 * @method ie
 * @return {Boolean} If browser is IE
 */
exports.ie = function ie() {
  var rv = -1; // Return value assumes failure.
  var ua = navigator.userAgent;

  if (navigator.appName == 'Microsoft Internet Explorer') {
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) {
      rv = parseFloat( RegExp.$1 );
    }
  } else if (navigator.appName == 'Netscape') {
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) {
      rv = parseFloat( RegExp.$1 );
    }
  }

  return rv > -1;
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
